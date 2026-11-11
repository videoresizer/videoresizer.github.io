import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { TranslationSchema } from '../i18n/ui';
import {
  formatAspectRatioLabel,
  formatBytes,
  getFFmpegInstance,
  makeEven,
  probeVideoFile,
  processVideoWithFFmpeg,
  terminateFFmpeg,
  type CompressScaleMax,
  type CropPosition,
  type FitMode,
  type QualityPreset,
  type ResizeResult,
  type WorkspaceMode,
} from '../lib/ffmpegEngine';

interface Props {
  t: TranslationSchema;
}

interface InputVideoItem {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
  duration: number;
}

interface ProcessedVideoItem {
  id: string;
  originalName: string;
  origWidth: number;
  origHeight: number;
  origSize: number;
  result: ResizeResult;
}

type Step = 1 | 2 | 3 | 4;

interface PresetDef {
  id: 'tiktok' | 'square' | 'youtube' | 'facebook' | 'classic' | 'cinema';
  width: number;
  height: number;
  ratioText: string;
}

const ALL_PRESETS: PresetDef[] = [
  { id: 'tiktok', width: 1080, height: 1920, ratioText: '9:16' },
  { id: 'square', width: 1080, height: 1080, ratioText: '1:1' },
  { id: 'youtube', width: 1920, height: 1080, ratioText: '16:9' },
  { id: 'facebook', width: 1080, height: 1350, ratioText: '4:5' },
  { id: 'classic', width: 1440, height: 1080, ratioText: '4:3' },
  { id: 'cinema', width: 2560, height: 1080, ratioText: '21:9' },
];

export default function VideoResizerApp({ t }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [mode, setMode] = useState<WorkspaceMode>('social');
  const [showModeTabs, setShowModeTabs] = useState<boolean>(false);

  const [inputs, setInputs] = useState<InputVideoItem[]>([]);
  const [activeInputIndex, setActiveInputIndex] = useState(0);

  const [selectedPreset, setSelectedPreset] = useState<string>('tiktok');
  const [targetWidth, setTargetWidth] = useState<number>(1080);
  const [targetHeight, setTargetHeight] = useState<number>(1920);
  const [lockRatio, setLockRatio] = useState<boolean>(false);

  const [fitMode, setFitMode] = useState<FitMode>('crop');
  const [cropPosition, setCropPosition] = useState<CropPosition>('center');
  const [cropOffsetX, setCropOffsetX] = useState<number>(0.5);
  const [cropOffsetY, setCropOffsetY] = useState<number>(0.5);

  const [quality, setQuality] = useState<QualityPreset>('high');
  const [compressScaleMax, setCompressScaleMax] = useState<CompressScaleMax>('720');
  const [muteAudio, setMuteAudio] = useState<boolean>(false);

  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [stage, setStage] = useState<'initializing' | 'analyzing' | 'processing' | 'finalizing'>('initializing');
  const [progress, setProgress] = useState<number>(0);
  const [batchCurrent, setBatchCurrent] = useState<number>(1);
  const [batchTotal, setBatchTotal] = useState<number>(1);
  const [currentFilename, setCurrentFilename] = useState<string>('');

  const [results, setResults] = useState<ProcessedVideoItem[]>([]);
  const [activeResultIndex, setActiveResultIndex] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const addMoreInputRef = useRef<HTMLInputElement | null>(null);
  const cancelFlagRef = useRef<boolean>(false);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);
  const fgVideoRef = useRef<HTMLVideoElement | null>(null);

  const activeInput = inputs[activeInputIndex] ?? inputs[0] ?? null;
  const activeResult = results[activeResultIndex] ?? results[0] ?? null;

  // Cleanup URLs on unmount
  const inputsRef = useRef<InputVideoItem[]>([]);
  const resultsRef = useRef<ProcessedVideoItem[]>([]);
  inputsRef.current = inputs;
  resultsRef.current = results;

  useEffect(() => {
    return () => {
      inputsRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      resultsRef.current.forEach((item) => URL.revokeObjectURL(item.result.url));
    };
  }, []);

  // Warm up FFmpeg lazily as soon as user loads a video into Step 2
  useEffect(() => {
    if (step === 2 && inputs.length > 0) {
      getFFmpegInstance().catch(() => {
        // Silent warm-up; errors will surface cleanly if Resize is clicked
      });
    }
  }, [step, inputs.length]);

  const visiblePresets = useMemo(() => {
    return mode === 'aspect' ? ALL_PRESETS : ALL_PRESETS.slice(0, 4);
  }, [mode]);

  const handleModeChange = (nextMode: WorkspaceMode) => {
    setMode(nextMode);
    if (nextMode === 'crop') {
      setFitMode('crop');
    }
  };

  const applyPreset = (preset: PresetDef) => {
    setSelectedPreset(preset.id);
    setTargetWidth(preset.width);
    setTargetHeight(preset.height);
  };

  const handleWidthChange = (raw: string) => {
    const val = parseInt(raw, 10);
    if (!Number.isFinite(val)) return;
    const clamped = Math.max(64, Math.min(4096, val));
    setSelectedPreset('custom');
    if (lockRatio && targetWidth > 0 && targetHeight > 0) {
      const ratio = targetHeight / targetWidth;
      setTargetHeight(makeEven(Math.max(64, Math.min(4096, Math.round(clamped * ratio)))));
    }
    setTargetWidth(clamped);
  };

  const handleHeightChange = (raw: string) => {
    const val = parseInt(raw, 10);
    if (!Number.isFinite(val)) return;
    const clamped = Math.max(64, Math.min(4096, val));
    setSelectedPreset('custom');
    if (lockRatio && targetWidth > 0 && targetHeight > 0) {
      const ratio = targetWidth / targetHeight;
      setTargetWidth(makeEven(Math.max(64, Math.min(4096, Math.round(clamped * ratio)))));
    }
    setTargetHeight(clamped);
  };

  const handleCropPresetClick = (pos: CropPosition) => {
    setCropPosition(pos);
    switch (pos) {
      case 'top':
        setCropOffsetX(0.5);
        setCropOffsetY(0);
        break;
      case 'bottom':
        setCropOffsetX(0.5);
        setCropOffsetY(1);
        break;
      case 'left':
        setCropOffsetX(0);
        setCropOffsetY(0.5);
        break;
      case 'right':
        setCropOffsetX(1);
        setCropOffsetY(0.5);
        break;
      case 'center':
      default:
        setCropOffsetX(0.5);
        setCropOffsetY(0.5);
        break;
    }
  };

  const ingestFiles = useCallback(
    async (fileList: FileList | File[], append = false) => {
      setErrorMsg(null);
      const validExt = /\.(mp4|webm|mov|mkv|avi|m4v|ogv)$/i;
      const validFiles = Array.from(fileList).filter(
        (f) => f.type.startsWith('video/') || validExt.test(f.name)
      );

      if (validFiles.length === 0) {
        setErrorMsg(t.errors.invalidFile);
        return;
      }

      const loadedItems: InputVideoItem[] = await Promise.all(
        validFiles.map(async (file) => {
          const meta = await probeVideoFile(file);
          return {
            id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            file,
            previewUrl: URL.createObjectURL(file),
            width: meta.width,
            height: meta.height,
            duration: meta.duration,
          };
        })
      );

      if (append) {
        setInputs((prev) => [...prev, ...loadedItems]);
      } else {
        inputs.forEach((item) => URL.revokeObjectURL(item.previewUrl));
        results.forEach((item) => URL.revokeObjectURL(item.result.url));
        setResults([]);
        setInputs(loadedItems);
        setActiveInputIndex(0);
        setStep(2);
      }
    },
    [inputs, results, t.errors.invalidFile]
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      void ingestFiles(e.dataTransfer.files, false);
    }
  };

  const removeInputItem = (id: string) => {
    setInputs((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      const next = prev.filter((i) => i.id !== id);
      if (next.length === 0) {
        setStep(1);
      } else if (activeInputIndex >= next.length) {
        setActiveInputIndex(next.length - 1);
      }
      return next;
    });
  };

  const resetAll = () => {
    inputs.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    results.forEach((item) => URL.revokeObjectURL(item.result.url));
    setInputs([]);
    setResults([]);
    setActiveInputIndex(0);
    setActiveResultIndex(0);
    setErrorMsg(null);
    setStep(1);
  };

  // Compute target dimensions for Live Preview display
  const previewDimensions = useMemo(() => {
    if (!activeInput) return { w: targetWidth, h: targetHeight };
    if (mode === 'compress') {
      const sw = activeInput.width || 1280;
      const sh = activeInput.height || 720;
      if (compressScaleMax === 'original') return { w: makeEven(sw), h: makeEven(sh) };
      const limit = Number(compressScaleMax);
      const minSide = Math.min(sw, sh);
      if (minSide <= limit) return { w: makeEven(sw), h: makeEven(sh) };
      const factor = limit / minSide;
      return { w: makeEven(sw * factor), h: makeEven(sh * factor) };
    }
    return { w: makeEven(targetWidth), h: makeEven(targetHeight) };
  }, [activeInput, compressScaleMax, mode, targetHeight, targetWidth]);

  // Keep background blurred preview video synced with foreground preview video
  const syncBlurredVideo = () => {
    if (bgVideoRef.current && fgVideoRef.current) {
      bgVideoRef.current.currentTime = fgVideoRef.current.currentTime;
    }
  };

  const startResize = async () => {
    if (inputs.length === 0) return;
    setErrorMsg(null);
    cancelFlagRef.current = false;

    results.forEach((item) => URL.revokeObjectURL(item.result.url));
    setResults([]);
    setActiveResultIndex(0);
    setBatchTotal(inputs.length);
    setBatchCurrent(1);
    setProgress(2);
    setStage('initializing');
    setStep(3);

    const completed: ProcessedVideoItem[] = [];

    try {
      for (let i = 0; i < inputs.length; i++) {
        if (cancelFlagRef.current) {
          throw new Error('CANCELLED');
        }
        const item = inputs[i];
        setBatchCurrent(i + 1);
        setCurrentFilename(item.file.name);
        setProgress(4);

        const res = await processVideoWithFFmpeg(
          item.file,
          {
            mode,
            targetWidth: makeEven(targetWidth),
            targetHeight: makeEven(targetHeight),
            fitMode: mode === 'compress' ? 'crop' : fitMode,
            cropPosition,
            cropOffsetX,
            cropOffsetY,
            quality,
            compressScaleMax,
            muteAudio,
            sourceWidth: item.width,
            sourceHeight: item.height,
            sourceDuration: item.duration,
          },
          (st) => {
            if (!cancelFlagRef.current) setStage(st);
          },
          (pct) => {
            if (!cancelFlagRef.current) setProgress(pct);
          }
        );

        completed.push({
          id: item.id,
          originalName: item.file.name,
          origWidth: item.width,
          origHeight: item.height,
          origSize: item.file.size,
          result: res,
        });
      }

      if (cancelFlagRef.current) {
        completed.forEach((c) => URL.revokeObjectURL(c.result.url));
        return;
      }

      setResults(completed);
      setActiveResultIndex(0);
      setStep(4);
    } catch (err) {
      completed.forEach((c) => URL.revokeObjectURL(c.result.url));
      if (cancelFlagRef.current || (err instanceof Error && err.message === 'CANCELLED')) {
        setErrorMsg(t.errors.cancelled);
        setStep(2);
      } else {
        const msg = err instanceof Error ? err.message : String(err);
        setErrorMsg(msg.toLowerCase().includes('load') ? t.errors.ffmpegLoadFailed : t.errors.encodeFailed);
        setStep(2);
      }
    }
  };

  const handleCancelProcessing = () => {
    cancelFlagRef.current = true;
    terminateFFmpeg();
    setErrorMsg(t.errors.cancelled);
    setStep(2);
  };

  const triggerDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownloadAll = () => {
    results.forEach((item, idx) => {
      window.setTimeout(() => {
        triggerDownload(item.result.url, item.result.filename);
      }, idx * 250);
    });
  };

  const stageLabel = useMemo(() => {
    switch (stage) {
      case 'initializing':
        return t.step3.initializing;
      case 'analyzing':
        return t.step3.analyzing;
      case 'finalizing':
        return t.step3.finalizing;
      case 'processing':
      default:
        return t.step3.processing;
    }
  }, [stage, t.step3]);

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl border-2 p-3.5 sm:p-6 md:p-8 transition-colors duration-200"
      style={{
        backgroundColor: 'var(--workspace-box-bg)',
        borderColor: 'var(--border-color)',
        boxShadow: 'var(--shadow-workspace)',
      }}
    >
      {/* Collapsible Mode Selector Pills (hidden on initial load behind arrow toggle) */}
      <div className="mb-4 sm:mb-5">
        <div className="flex justify-center">
          <button
            type="button"
            id="vr-mode-toggle-btn"
            disabled={step === 3}
            aria-expanded={showModeTabs}
            aria-controls="vr-mode-tablist"
            aria-label={`${t.modes.toggleLabel}: ${t.modes[mode]}`}
            onClick={() => setShowModeTabs((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border text-xs sm:text-sm font-bold cursor-pointer transition-all disabled:opacity-60"
            style={{
              backgroundColor: showModeTabs ? 'var(--highlight-pill-badge)' : 'var(--surface-muted)',
              borderColor: showModeTabs ? 'var(--border-color)' : 'var(--border-soft)',
              color: 'var(--text-primary)',
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ color: 'var(--text-secondary)' }}
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
              <circle cx="9" cy="6" r="2" fill="currentColor" />
              <circle cx="15" cy="12" r="2" fill="currentColor" />
              <circle cx="9" cy="18" r="2" fill="currentColor" />
            </svg>
            <span>{t.modes[mode]}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`w-4 h-4 transition-transform duration-200 ${showModeTabs ? 'rotate-180' : ''}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

        {showModeTabs && (
          <div
            id="vr-mode-tablist"
            role="tablist"
            aria-label="Video Tool Modes"
            className="vr-animate-step mt-3 grid grid-cols-1 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-2 sm:gap-2.5"
          >
            {(
              [
                { id: 'social', label: t.modes.social },
                { id: 'crop', label: t.modes.crop },
                { id: 'aspect', label: t.modes.aspect },
                { id: 'compress', label: t.modes.compress },
              ] as Array<{ id: WorkspaceMode; label: string }>
            ).map((tab) => {
              const isActive = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  disabled={step === 3}
                  onClick={() => handleModeChange(tab.id)}
                  className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm md:text-base font-bold transition-all cursor-pointer disabled:opacity-60"
                  style={
                    isActive
                      ? {
                          backgroundColor: 'var(--btn-primary-bg)',
                          color: 'var(--btn-primary-text)',
                          boxShadow: '0 6px 16px -4px rgba(66, 122, 91, 0.35)',
                        }
                      : {
                          backgroundColor: 'var(--surface-muted)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-soft)',
                        }
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Inline Error Alert */}
      {errorMsg && (
        <div
          role="alert"
          className="mb-5 px-4 py-3 rounded-2xl border-2 text-sm sm:text-base font-semibold flex items-center justify-between gap-3"
          style={{
            backgroundColor: 'var(--highlight-pill-badge)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
        >
          <span>{errorMsg}</span>
          <button
            type="button"
            onClick={() => setErrorMsg(null)}
            aria-label="Dismiss message"
            className="px-2.5 py-1 rounded-lg font-bold cursor-pointer opacity-80 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*,.mp4,.webm,.mov,.mkv,.avi,.m4v"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            void ingestFiles(e.target.files, false);
          }
          e.target.value = '';
        }}
      />
      <input
        ref={addMoreInputRef}
        type="file"
        accept="video/*,.mp4,.webm,.mov,.mkv,.avi,.m4v"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            void ingestFiles(e.target.files, true);
          }
          e.target.value = '';
        }}
      />

      {/* STEP 1: GIANT DROPZONE */}
      {step === 1 && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isDragging) setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
          }}
          onDrop={handleDrop}
          className={`vr-animate-step rounded-2xl border-[3px] border-dashed px-3.5 py-6 sm:px-8 sm:py-11 md:py-14 text-center transition-all duration-200 ${
            isDragging ? 'vr-dropzone-active' : ''
          }`}
          style={{
            borderColor: isDragging ? '#B4CD93' : 'var(--border-color)',
            backgroundColor: isDragging ? 'var(--surface-muted)' : 'var(--surface-subtle)',
          }}
        >
          {/* Floating Oversized SVG Icon (64px) */}
          <div className="vr-animate-float inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-5 shadow-sm"
            style={{ backgroundColor: 'var(--highlight-pill-badge)', border: '2px solid var(--border-color)' }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 64 64"
              fill="none"
              aria-hidden="true"
              className="w-11 h-11 sm:w-14 sm:h-14"
              style={{ color: 'var(--text-secondary)' }}
            >
              <rect x="8" y="14" width="48" height="36" rx="8" stroke="currentColor" strokeWidth="3.5" />
              <path d="M26 26L38 32L26 38V26Z" fill="currentColor" />
              <path d="M32 6V14M32 6L26 11M32 6L38 11" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2
            className="text-xl sm:text-3xl font-extrabold mb-2 sm:mb-2.5 tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            {isDragging ? t.step1.dropActive : t.step1.dropTitle}
          </h2>

          <p
            className="ui-lead-text max-w-2xl mx-auto mb-5 sm:mb-7 font-medium opacity-90"
            style={{ color: 'var(--text-muted)' }}
          >
            {t.step1.dropSubtitle}
          </p>

          {/* Oversized Action Button */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="vr-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-4 py-3.5 sm:px-10 sm:py-4 rounded-2xl text-[15px] sm:text-xl font-extrabold cursor-pointer shadow-md"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>{t.step1.selectBtn}</span>
            </button>
          </div>

          <p className="mt-5 text-sm font-semibold opacity-75" style={{ color: 'var(--text-secondary)' }}>
            {t.step1.batchTip}
          </p>
        </div>
      )}

      {/* STEP 2: ASPECT RATIO CONTROLS + LIVE HTML5 VISUAL PREVIEW */}
      {step === 2 && activeInput && (
        <div className="vr-animate-step space-y-5">
          {/* Batch Queue Strip (when multiple files or managing inputs) */}
          {inputs.length > 1 && (
            <div
              className="p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-2.5"
              style={{ backgroundColor: 'var(--surface-subtle)', borderColor: 'var(--border-soft)' }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-extrabold uppercase tracking-wide px-2" style={{ color: 'var(--text-secondary)' }}>
                  {t.step2.batchQueueTitle} ({inputs.length})
                </span>
                {inputs.map((item, idx) => {
                  const isSel = idx === activeInputIndex;
                  return (
                    <div
                      key={item.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold border"
                      style={
                        isSel
                          ? {
                              backgroundColor: 'var(--btn-primary-bg)',
                              color: 'var(--btn-primary-text)',
                              borderColor: 'transparent',
                            }
                          : {
                              backgroundColor: 'var(--workspace-box-bg)',
                              color: 'var(--text-primary)',
                              borderColor: 'var(--border-soft)',
                            }
                      }
                    >
                      <button
                        type="button"
                        onClick={() => setActiveInputIndex(idx)}
                        className="cursor-pointer truncate max-w-[140px]"
                      >
                        {item.file.name}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeInputItem(item.id)}
                        aria-label={`Remove ${item.file.name}`}
                        className="ml-1 opacity-80 hover:opacity-100 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addMoreInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl border text-sm font-bold cursor-pointer"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  + {t.step2.addMoreBtn}
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-3 py-1.5 rounded-xl text-sm font-bold opacity-80 hover:opacity-100 cursor-pointer"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {t.step2.clearAllBtn}
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            {/* Controls Column */}
            <div className="lg:col-span-7 space-y-5 min-w-0">
              {mode !== 'compress' ? (
                <>
                  {/* Social Media Aspect Ratio Presets */}
                  <div>
                    <h3
                      className="text-base sm:text-lg font-extrabold mb-3"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {t.step2.presetsTitle}
                    </h3>
                    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5 sm:gap-3">
                      {visiblePresets.map((preset) => {
                        const info = t.step2.presets[preset.id];
                        const isActive =
                          selectedPreset === preset.id &&
                          targetWidth === preset.width &&
                          targetHeight === preset.height;
                        const maxSide = Math.max(preset.width, preset.height);
                        const iconW = Math.max(12, Math.round((preset.width / maxSide) * 28));
                        const iconH = Math.max(12, Math.round((preset.height / maxSide) * 28));

                        return (
                          <button
                            key={preset.id}
                            type="button"
                            aria-pressed={isActive}
                            aria-label={`${info.label} (${preset.width}×${preset.height}) — ${info.sub}`}
                            onClick={() => applyPreset(preset)}
                            className="flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer"
                            style={
                              isActive
                                ? {
                                    backgroundColor: 'var(--btn-primary-bg)',
                                    color: 'var(--btn-primary-text)',
                                    borderColor: 'var(--btn-primary-bg)',
                                    boxShadow: '0 8px 18px -6px rgba(66, 122, 91, 0.35)',
                                  }
                                : {
                                    backgroundColor: 'var(--surface-subtle)',
                                    color: 'var(--text-primary)',
                                    borderColor: 'var(--border-soft)',
                                  }
                            }
                          >
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                              style={{
                                backgroundColor: isActive ? 'rgba(255,255,255,0.18)' : 'var(--workspace-box-bg)',
                              }}
                            >
                              <span
                                className="inline-block rounded-[4px] border-2"
                                style={{
                                  width: `${iconW}px`,
                                  height: `${iconH}px`,
                                  borderColor: 'currentColor',
                                }}
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm sm:text-base font-extrabold leading-tight truncate">
                                {info.label}
                              </div>
                              <div className="text-xs font-semibold opacity-80 truncate">
                                {info.sub} • {preset.width}×{preset.height}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Dimensions (W x H) */}
                  <div
                    className="p-3.5 sm:p-4 rounded-2xl border"
                    style={{ backgroundColor: 'var(--surface-subtle)', borderColor: 'var(--border-soft)' }}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-sm sm:text-base font-extrabold" style={{ color: 'var(--text-primary)' }}>
                        {t.step2.customDimensions}
                      </span>
                      <button
                        type="button"
                        onClick={() => setLockRatio((v) => !v)}
                        aria-pressed={lockRatio}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border cursor-pointer"
                        style={
                          lockRatio
                            ? {
                                backgroundColor: 'var(--btn-primary-bg)',
                                color: 'var(--btn-primary-text)',
                                borderColor: 'transparent',
                              }
                            : {
                                backgroundColor: 'var(--workspace-box-bg)',
                                color: 'var(--text-primary)',
                                borderColor: 'var(--border-soft)',
                              }
                        }
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d={lockRatio ? 'M7 11V7a5 5 0 0 1 10 0v4' : 'M7 11V7a5 5 0 0 1 9.9-1'} />
                        </svg>
                        <span>{t.step2.lockRatio}</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3">
                      <label className="block min-w-0">
                        <span className="block text-xs font-bold mb-1 opacity-80" style={{ color: 'var(--text-primary)' }}>
                          {t.step2.widthLabel}
                        </span>
                        <input
                          type="number"
                          min={64}
                          max={4096}
                          step={2}
                          value={targetWidth}
                          onChange={(e) => handleWidthChange(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 font-bold text-base"
                          style={{
                            backgroundColor: 'var(--workspace-box-bg)',
                            borderColor: 'var(--border-soft)',
                            color: 'var(--text-primary)',
                          }}
                        />
                      </label>
                      <label className="block">
                        <span className="block text-xs font-bold mb-1 opacity-80" style={{ color: 'var(--text-primary)' }}>
                          {t.step2.heightLabel}
                        </span>
                        <input
                          type="number"
                          min={64}
                          max={4096}
                          step={2}
                          value={targetHeight}
                          onChange={(e) => handleHeightChange(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 font-bold text-base"
                          style={{
                            backgroundColor: 'var(--workspace-box-bg)',
                            borderColor: 'var(--border-soft)',
                            color: 'var(--text-primary)',
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Fit Mode Toggles: Crop to Fill vs Pad with Blur/Black */}
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold mb-2.5" style={{ color: 'var(--text-primary)' }}>
                      {t.step2.fitModeTitle}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {(
                        [
                          { id: 'crop', label: t.step2.fitModes.crop, desc: t.step2.fitModes.cropDesc },
                          { id: 'pad-blur', label: t.step2.fitModes.padBlur, desc: t.step2.fitModes.padBlurDesc },
                          { id: 'pad-black', label: t.step2.fitModes.padBlack, desc: t.step2.fitModes.padBlackDesc },
                        ] as Array<{ id: FitMode; label: string; desc: string }>
                      ).map((opt) => {
                        const active = fitMode === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            aria-pressed={active}
                            aria-label={`${opt.label}: ${opt.desc}`}
                            onClick={() => setFitMode(opt.id)}
                            className="p-3 rounded-2xl border-2 text-left transition-all cursor-pointer"
                            style={
                              active
                                ? {
                                    backgroundColor: 'var(--btn-primary-bg)',
                                    color: 'var(--btn-primary-text)',
                                    borderColor: 'var(--btn-primary-bg)',
                                  }
                                : {
                                    backgroundColor: 'var(--surface-subtle)',
                                    color: 'var(--text-primary)',
                                    borderColor: 'var(--border-soft)',
                                  }
                            }
                          >
                            <div className="text-sm font-extrabold mb-0.5">{opt.label}</div>
                            <div className="text-xs font-medium opacity-85 leading-snug">{opt.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Crop Framing Focal Controls */}
                  {fitMode === 'crop' && (
                    <div
                      className="p-3.5 rounded-2xl border"
                      style={{ backgroundColor: 'var(--surface-subtle)', borderColor: 'var(--border-soft)' }}
                    >
                      <div className="text-sm font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>
                        {t.step2.cropPositionTitle}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(['center', 'top', 'bottom', 'left', 'right'] as CropPosition[]).map((pos) => {
                          const isPos = cropPosition === pos;
                          return (
                            <button
                              key={pos}
                              type="button"
                              aria-pressed={isPos}
                              aria-label={`${t.step2.cropPositionTitle}: ${t.step2.positions[pos]}`}
                              onClick={() => handleCropPresetClick(pos)}
                              className="px-3.5 py-1.5 rounded-xl text-sm font-bold border cursor-pointer transition-colors"
                              style={
                                isPos
                                  ? {
                                      backgroundColor: 'var(--btn-primary-bg)',
                                      color: 'var(--btn-primary-text)',
                                      borderColor: 'transparent',
                                    }
                                  : {
                                      backgroundColor: 'var(--workspace-box-bg)',
                                      color: 'var(--text-primary)',
                                      borderColor: 'var(--border-soft)',
                                    }
                              }
                            >
                              {t.step2.positions[pos]}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* COMPRESS MODE CONTROLS */
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold mb-2.5" style={{ color: 'var(--text-primary)' }}>
                      {t.step2.compressionTitle}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {(
                        [
                          { id: 'high', label: t.step2.qualityPresets.high },
                          { id: 'medium', label: t.step2.qualityPresets.medium },
                          { id: 'compact', label: t.step2.qualityPresets.compact },
                        ] as Array<{ id: QualityPreset; label: string }>
                      ).map((q) => {
                        const active = quality === q.id;
                        return (
                          <button
                            key={q.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setQuality(q.id)}
                            className="p-3.5 rounded-2xl border-2 text-sm font-extrabold cursor-pointer transition-all"
                            style={
                              active
                                ? {
                                    backgroundColor: 'var(--btn-primary-bg)',
                                    color: 'var(--btn-primary-text)',
                                    borderColor: 'var(--btn-primary-bg)',
                                  }
                                : {
                                    backgroundColor: 'var(--surface-subtle)',
                                    color: 'var(--text-primary)',
                                    borderColor: 'var(--border-soft)',
                                  }
                            }
                          >
                            {q.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {t.step2.resolutionScale}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(
                        [
                          { id: 'original', label: t.step2.originalRes },
                          { id: '1080', label: '1080p' },
                          { id: '720', label: '720p' },
                          { id: '480', label: '480p' },
                        ] as Array<{ id: CompressScaleMax; label: string }>
                      ).map((sc) => {
                        const active = compressScaleMax === sc.id;
                        return (
                          <button
                            key={sc.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setCompressScaleMax(sc.id)}
                            className="py-2.5 px-3 rounded-xl border-2 text-sm font-extrabold cursor-pointer"
                            style={
                              active
                                ? {
                                    backgroundColor: 'var(--btn-primary-bg)',
                                    color: 'var(--btn-primary-text)',
                                    borderColor: 'var(--btn-primary-bg)',
                                  }
                                : {
                                    backgroundColor: 'var(--surface-subtle)',
                                    color: 'var(--text-primary)',
                                    borderColor: 'var(--border-soft)',
                                  }
                            }
                          >
                            {sc.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <label
                    className="flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer"
                    style={{ backgroundColor: 'var(--surface-subtle)', borderColor: 'var(--border-soft)' }}
                  >
                    <input
                      type="checkbox"
                      checked={muteAudio}
                      onChange={(e) => setMuteAudio(e.target.checked)}
                      className="w-5 h-5 accent-[#427A5B]"
                    />
                    <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                      {t.step2.muteAudio}
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Live HTML5 Visual Aspect Ratio Preview Column */}
            <div className="lg:col-span-5 space-y-4 min-w-0">
              <div
                className="p-3.5 sm:p-4 rounded-2xl border"
                style={{ backgroundColor: 'var(--surface-subtle)', borderColor: 'var(--border-soft)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm sm:text-base font-extrabold" style={{ color: 'var(--text-primary)' }}>
                    {t.step2.livePreviewTitle}
                  </span>
                  <span
                    className="text-xs font-extrabold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: 'var(--highlight-pill-badge)', color: 'var(--text-primary)' }}
                  >
                    {formatAspectRatioLabel(previewDimensions.w, previewDimensions.h)}
                  </span>
                </div>
                <p className="text-xs font-semibold mb-3 opacity-80" style={{ color: 'var(--text-muted)' }}>
                  {t.step2.livePreviewHint}
                </p>

                {/* Live Framing Container */}
                <div
                  className="w-full rounded-xl flex items-center justify-center p-3 overflow-hidden"
                  style={{ backgroundColor: '#121212', minHeight: '230px', maxHeight: '300px' }}
                >
                  <div
                    className="relative overflow-hidden rounded-lg shadow-lg border-2"
                    style={{
                      aspectRatio: `${previewDimensions.w} / ${previewDimensions.h}`,
                      maxHeight: '268px',
                      maxWidth: '100%',
                      width:
                        previewDimensions.w >= previewDimensions.h
                          ? '100%'
                          : `calc(268px * ${previewDimensions.w / previewDimensions.h})`,
                      borderColor: '#B4CD93',
                      backgroundColor: '#121212',
                    }}
                  >
                    {mode !== 'compress' && fitMode === 'pad-blur' && (
                      <video
                        ref={bgVideoRef}
                        src={activeInput.previewUrl}
                        muted
                        loop
                        autoPlay
                        playsInline
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        style={{ filter: 'blur(14px) brightness(0.85)', transform: 'scale(1.14)' }}
                      />
                    )}
                    <video
                      ref={fgVideoRef}
                      src={activeInput.previewUrl}
                      muted
                      loop
                      autoPlay
                      playsInline
                      controls
                      onTimeUpdate={syncBlurredVideo}
                      className="relative z-10 w-full h-full"
                      style={{
                        objectFit: mode !== 'compress' && fitMode === 'crop' ? 'cover' : 'contain',
                        objectPosition: `${cropOffsetX * 100}% ${cropOffsetY * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Metadata Summary Pills */}
                <div className="grid grid-cols-1 min-[340px]:grid-cols-2 gap-2 mt-3 text-xs font-bold">
                  <div
                    className="px-3 py-2 rounded-xl text-center"
                    style={{ backgroundColor: 'var(--workspace-box-bg)', color: 'var(--text-primary)' }}
                  >
                    <span className="opacity-70">{t.step2.originalMeta}: </span>
                    <span>
                      {activeInput.width}×{activeInput.height}
                    </span>
                  </div>
                  <div
                    aria-live="polite"
                    className="px-3 py-2 rounded-xl text-center"
                    style={{ backgroundColor: 'var(--highlight-pill-badge)', color: 'var(--text-primary)' }}
                  >
                    <span className="opacity-70">{t.step2.targetMeta}: </span>
                    <span>
                      {previewDimensions.w}×{previewDimensions.h}
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary CTA Button */}
              <button
                type="button"
                onClick={startResize}
                className="vr-btn-primary w-full py-4 px-6 rounded-2xl text-lg sm:text-xl font-extrabold cursor-pointer shadow-lg flex items-center justify-center gap-2.5"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 3h6v6" />
                  <path d="M9 21H3v-6" />
                  <path d="M21 3l-7 7" />
                  <path d="M3 21l7-7" />
                </svg>
                <span>
                  {inputs.length > 1 ? `${t.step2.resizeBatchBtn} (${inputs.length})` : t.step2.resizeNowBtn}
                </span>
              </button>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => addMoreInputRef.current?.click()}
                  className="flex-1 py-2.5 px-3 rounded-xl border text-sm font-bold cursor-pointer transition-colors"
                  style={{ borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                >
                  + {t.step2.addMoreBtn}
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="flex-1 py-2.5 px-3 rounded-xl border text-sm font-bold cursor-pointer transition-colors"
                  style={{ borderColor: 'var(--border-soft)', color: 'var(--text-primary)' }}
                >
                  {t.step2.changeVideoBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: ANIMATED PROGRESS */}
      {step === 3 && (
        <div
          aria-live="polite"
          aria-atomic="true"
          className="vr-animate-step py-8 sm:py-12 px-2 sm:px-6 text-center max-w-2xl mx-auto"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold mb-6 border"
            style={{
              backgroundColor: 'var(--highlight-pill-badge)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>{t.step3.privacyBadge}</span>
          </div>

          {batchTotal > 1 && (
            <div className="text-sm font-bold mb-2 opacity-85" style={{ color: 'var(--text-secondary)' }}>
              {t.step3.batchProgress
                .replace('{current}', String(batchCurrent))
                .replace('{total}', String(batchTotal))}{' '}
              • {currentFilename}
            </div>
          )}

          <div
            className="text-4xl sm:text-5xl font-black tabular-nums mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            {progress}%
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold mb-6" style={{ color: 'var(--text-primary)' }}>
            {stageLabel}
          </h2>

          {/* Animated Gradient Progress Bar (#B4CD93 -> #427A5B) */}
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="w-full h-6 rounded-full overflow-hidden border p-1 mb-8"
            style={{ backgroundColor: 'var(--surface-subtle)', borderColor: 'var(--border-soft)' }}
          >
            <div
              className="vr-progress-bar-fill h-full rounded-full"
              style={{ width: `${Math.max(4, progress)}%` }}
            />
          </div>

          <button
            type="button"
            onClick={handleCancelProcessing}
            className="px-6 py-3 rounded-2xl border-2 text-base font-bold cursor-pointer transition-colors"
            style={{
              backgroundColor: 'var(--workspace-box-bg)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          >
            {t.step3.cancelBtn}
          </button>
        </div>
      )}

      {/* STEP 4: INSTANT PREVIEW & DOWNLOAD */}
      {step === 4 && activeResult && (
        <div className="vr-animate-step space-y-5">
          {/* Batch Output Selector if >1 video */}
          {results.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              {results.map((item, idx) => {
                const isSel = idx === activeResultIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveResultIndex(idx)}
                    className="px-3.5 py-2 rounded-xl text-sm font-bold border cursor-pointer truncate max-w-[200px]"
                    style={
                      isSel
                        ? {
                            backgroundColor: 'var(--btn-primary-bg)',
                            color: 'var(--btn-primary-text)',
                            borderColor: 'transparent',
                          }
                        : {
                            backgroundColor: 'var(--surface-subtle)',
                            color: 'var(--text-primary)',
                            borderColor: 'var(--border-soft)',
                          }
                    }
                  >
                    {item.result.filename}
                  </button>
                );
              })}
            </div>
          )}

          {/* Resolution & File Size Summary Banner */}
          <div
            aria-live="polite"
            aria-atomic="true"
            className="p-4 sm:p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{
              backgroundColor: 'var(--highlight-pill-badge)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
          >
            <div className="text-center sm:text-left">
              <div className="text-sm font-extrabold uppercase tracking-wide mb-1" style={{ color: 'var(--text-secondary)' }}>
                {t.step4.doneTitle}
              </div>
              <div className="text-base sm:text-lg font-extrabold">
                {t.step4.summaryTemplate
                  .replace('{origW}', String(activeResult.origWidth))
                  .replace('{origH}', String(activeResult.origHeight))
                  .replace('{newW}', String(activeResult.result.outputWidth))
                  .replace('{newH}', String(activeResult.result.outputHeight))
                  .replace(
                    '{ratio}',
                    formatAspectRatioLabel(activeResult.result.outputWidth, activeResult.result.outputHeight)
                  )}
              </div>
            </div>
            <div
              className="px-4 py-2 rounded-xl text-sm font-extrabold shrink-0"
              style={{ backgroundColor: 'var(--workspace-box-bg)', color: 'var(--text-primary)' }}
            >
              {t.step4.sizeComparison
                .replace('{origSize}', formatBytes(activeResult.origSize))
                .replace('{newSize}', formatBytes(activeResult.result.outputSize))}
            </div>
          </div>

          {/* Instant HTML5 <video controls> Preview Player */}
          <div
            className="w-full rounded-2xl overflow-hidden flex items-center justify-center p-3"
            style={{ backgroundColor: '#121212' }}
          >
            <video
              key={activeResult.result.url}
              src={activeResult.result.url}
              controls
              playsInline
              className="max-h-[340px] w-auto max-w-full rounded-xl shadow-lg"
            />
          </div>

          {/* Download & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => triggerDownload(activeResult.result.url, activeResult.result.filename)}
              className="vr-btn-primary w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-lg sm:text-xl font-extrabold cursor-pointer shadow-lg"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{t.step4.downloadBtn}</span>
            </button>

            {results.length > 1 && (
              <button
                type="button"
                onClick={handleDownloadAll}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl border-2 text-base sm:text-lg font-extrabold cursor-pointer"
                style={{
                  backgroundColor: 'var(--secondary-accent-surface)',
                  borderColor: 'var(--border-color)',
                  color: '#403F3F',
                }}
              >
                {t.step4.downloadAllBtn.replace('{count}', String(results.length))}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-5 py-2.5 rounded-xl border-2 text-sm sm:text-base font-bold cursor-pointer"
              style={{
                backgroundColor: 'var(--workspace-box-bg)',
                borderColor: 'var(--border-soft)',
                color: 'var(--text-primary)',
              }}
            >
              {t.step4.adjustSettingsBtn}
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="px-5 py-2.5 rounded-xl border-2 text-sm sm:text-base font-bold cursor-pointer"
              style={{
                backgroundColor: 'var(--workspace-box-bg)',
                borderColor: 'var(--border-soft)',
                color: 'var(--text-primary)',
              }}
            >
              {t.step4.resizeAnotherBtn}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
