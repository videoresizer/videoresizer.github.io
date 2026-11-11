import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

export type WorkspaceMode = 'social' | 'crop' | 'aspect' | 'compress';
export type FitMode = 'crop' | 'pad-blur' | 'pad-black';
export type CropPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';
export type QualityPreset = 'high' | 'medium' | 'compact';
export type CompressScaleMax = 'original' | '1080' | '720' | '480';

export interface VideoMetadata {
  width: number;
  height: number;
  duration: number;
}

export interface ResizeOptions {
  mode: WorkspaceMode;
  targetWidth: number;
  targetHeight: number;
  fitMode: FitMode;
  cropPosition: CropPosition;
  cropOffsetX?: number;
  cropOffsetY?: number;
  quality: QualityPreset;
  compressScaleMax: CompressScaleMax;
  muteAudio: boolean;
  sourceWidth: number;
  sourceHeight: number;
  sourceDuration: number;
}

export interface ResizeResult {
  blob: Blob;
  url: string;
  outputWidth: number;
  outputHeight: number;
  outputSize: number;
  filename: string;
}

export type StageCallback = (stage: 'initializing' | 'analyzing' | 'processing' | 'finalizing') => void;
export type ProgressCallback = (percent: number) => void;

export const makeEven = (value: number): number => Math.max(2, Math.round(value / 2) * 2);

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const idx = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const val = bytes / Math.pow(1024, idx);
  return `${val >= 100 || idx === 0 ? Math.round(val) : val.toFixed(1)} ${units[idx]}`;
}

export function formatAspectRatioLabel(w: number, h: number): string {
  if (!w || !h) return 'Custom';
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const d = gcd(Math.round(w), Math.round(h));
  const rw = Math.round(w / d);
  const rh = Math.round(h / d);
  if (rw <= 32 && rh <= 32) return `${rw}:${rh}`;
  const ratio = w / h;
  const known: Array<[number, string]> = [
    [9 / 16, '9:16'],
    [16 / 9, '16:9'],
    [1, '1:1'],
    [4 / 5, '4:5'],
    [4 / 3, '4:3'],
    [21 / 9, '21:9'],
  ];
  for (const [val, label] of known) {
    if (Math.abs(ratio - val) < 0.03) return label;
  }
  return `${ratio.toFixed(2)}:1`;
}

export async function probeVideoFile(file: File): Promise<VideoMetadata> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    let settled = false;
    const finish = (meta: VideoMetadata) => {
      if (settled) return;
      settled = true;
      URL.revokeObjectURL(objectUrl);
      video.removeAttribute('src');
      video.load();
      resolve(meta);
    };

    const timer = window.setTimeout(() => {
      finish({ width: 1280, height: 720, duration: 0 });
    }, 3500);

    video.onloadedmetadata = () => {
      window.clearTimeout(timer);
      const width = video.videoWidth || 1280;
      const height = video.videoHeight || 720;
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      finish({ width, height, duration });
    };

    video.onerror = () => {
      window.clearTimeout(timer);
      finish({ width: 1280, height: 720, duration: 0 });
    };

    video.src = objectUrl;
  });
}

let ffmpegSingleton: FFmpeg | null = null;
let ffmpegLoadPromise: Promise<FFmpeg> | null = null;

export async function getFFmpegInstance(): Promise<FFmpeg> {
  if (ffmpegSingleton && ffmpegSingleton.loaded) {
    return ffmpegSingleton;
  }
  if (ffmpegLoadPromise) {
    return ffmpegLoadPromise;
  }

  ffmpegLoadPromise = (async () => {
    const ffmpeg = new FFmpeg();
    const origin = window.location.origin;
    await ffmpeg.load({
      classWorkerURL: `${origin}/ffmpeg/worker.js`,
      coreURL: `${origin}/ffmpeg/ffmpeg-core.js`,
      wasmURL: `${origin}/ffmpeg/ffmpeg-core.wasm`,
    });
    ffmpegSingleton = ffmpeg;
    return ffmpeg;
  })();

  try {
    return await ffmpegLoadPromise;
  } catch (err) {
    ffmpegLoadPromise = null;
    ffmpegSingleton = null;
    throw err;
  }
}

export function terminateFFmpeg(): void {
  if (ffmpegSingleton) {
    try {
      ffmpegSingleton.terminate();
    } catch {
      // Ignore termination errors
    }
  }
  ffmpegSingleton = null;
  ffmpegLoadPromise = null;
}

function resolveCropFocus(
  pos: CropPosition,
  customX?: number,
  customY?: number
): { fx: number; fy: number } {
  if (typeof customX === 'number' && typeof customY === 'number') {
    return {
      fx: Math.min(1, Math.max(0, customX)),
      fy: Math.min(1, Math.max(0, customY)),
    };
  }
  switch (pos) {
    case 'top':
      return { fx: 0.5, fy: 0 };
    case 'bottom':
      return { fx: 0.5, fy: 1 };
    case 'left':
      return { fx: 0, fy: 0.5 };
    case 'right':
      return { fx: 1, fy: 0.5 };
    case 'center':
    default:
      return { fx: 0.5, fy: 0.5 };
  }
}

function getFileExtension(name: string): string {
  const parts = name.split('.');
  if (parts.length < 2) return 'mp4';
  const ext = parts.pop()!.toLowerCase().replace(/[^a-z0-9]/g, '');
  return ext || 'mp4';
}

function buildOutputFilename(originalName: string, outW: number, outH: number): string {
  const base = originalName.replace(/\.[^.]+$/, '') || 'video';
  return `${base}_${outW}x${outH}_videoresizer.mp4`;
}

export async function processVideoWithFFmpeg(
  file: File,
  options: ResizeOptions,
  onStage: StageCallback,
  onProgress: ProgressCallback
): Promise<ResizeResult> {
  onStage('initializing');
  onProgress(2);

  const ffmpeg = await getFFmpegInstance();
  onStage('analyzing');
  onProgress(6);

  const stamp = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const ext = getFileExtension(file.name);
  const inputName = `in_${stamp}.${ext}`;
  const outputName = `out_${stamp}.mp4`;

  const crfMap: Record<QualityPreset, string> = {
    high: '22',
    medium: '27',
    compact: '32',
  };
  const crf = crfMap[options.quality] || '24';

  const srcW = options.sourceWidth > 0 ? options.sourceWidth : 0;
  const srcH = options.sourceHeight > 0 ? options.sourceHeight : 0;

  let outW = makeEven(options.targetWidth);
  let outH = makeEven(options.targetHeight);

  if (options.mode === 'compress') {
    if (srcW > 0 && srcH > 0) {
      if (options.compressScaleMax === 'original') {
        outW = makeEven(srcW);
        outH = makeEven(srcH);
      } else {
        const limit = Number(options.compressScaleMax);
        const minSide = Math.min(srcW, srcH);
        if (minSide <= limit) {
          outW = makeEven(srcW);
          outH = makeEven(srcH);
        } else {
          const factor = limit / minSide;
          outW = makeEven(srcW * factor);
          outH = makeEven(srcH * factor);
        }
      }
    }
  }

  let vf: string | null = null;
  let filterComplex: string | null = null;

  if (options.mode === 'compress') {
    if (srcW > 0 && srcH > 0) {
      vf = `scale=${outW}:${outH},setsar=1`;
    } else if (options.compressScaleMax === 'original') {
      vf = 'scale=trunc(iw/2)*2:trunc(ih/2)*2,setsar=1';
    } else {
      const limit = Number(options.compressScaleMax);
      vf = `scale='min(iw\\,${limit})':-2,scale=trunc(iw/2)*2:trunc(ih/2)*2,setsar=1`;
    }
  } else if (options.fitMode === 'crop') {
    const { fx, fy } = resolveCropFocus(options.cropPosition, options.cropOffsetX, options.cropOffsetY);
    if (srcW > 0 && srcH > 0) {
      const scale = Math.max(outW / srcW, outH / srcH);
      const scaledW = Math.max(outW, makeEven(Math.ceil(srcW * scale)));
      const scaledH = Math.max(outH, makeEven(Math.ceil(srcH * scale)));
      const cropX = Math.max(0, Math.round((scaledW - outW) * fx));
      const cropY = Math.max(0, Math.round((scaledH - outH) * fy));
      vf = `scale=${scaledW}:${scaledH},crop=${outW}:${outH}:${cropX}:${cropY},setsar=1`;
    } else {
      vf = `scale=${outW}:${outH}:force_original_aspect_ratio=increase,pad=max(iw\\,${outW}):max(ih\\,${outH}):(ow-iw)/2:(oh-ih)/2,crop=${outW}:${outH}:(in_w-out_w)*${fx}:(in_h-out_h)*${fy},setsar=1`;
    }
  } else if (options.fitMode === 'pad-black') {
    if (srcW > 0 && srcH > 0) {
      const scale = Math.min(outW / srcW, outH / srcH);
      const scaledW = Math.min(outW, makeEven(Math.floor(srcW * scale)));
      const scaledH = Math.min(outH, makeEven(Math.floor(srcH * scale)));
      const padX = Math.max(0, Math.floor((outW - scaledW) / 2));
      const padY = Math.max(0, Math.floor((outH - scaledH) / 2));
      vf = `scale=${scaledW}:${scaledH},pad=${outW}:${outH}:${padX}:${padY}:black,setsar=1`;
    } else {
      vf = `scale=${outW}:${outH}:force_original_aspect_ratio=decrease,pad=${outW}:${outH}:(ow-iw)/2:(oh-ih)/2:color=black,setsar=1`;
    }
  } else {
    // Smart Scale & Pad with Blurred Backdrop
    if (srcW > 0 && srcH > 0) {
      const fgScale = Math.min(outW / srcW, outH / srcH);
      const fgW = Math.min(outW, makeEven(Math.floor(srcW * fgScale)));
      const fgH = Math.min(outH, makeEven(Math.floor(srcH * fgScale)));

      if (fgW === outW && fgH === outH) {
        vf = `scale=${outW}:${outH},setsar=1`;
      } else {
        const bgW = makeEven(Math.max(128, Math.round(outW / 4)));
        const bgH = makeEven(Math.max(128, Math.round(outH / 4)));
        const bgScale = Math.max(bgW / srcW, bgH / srcH);
        const bgScaledW = Math.max(bgW, makeEven(Math.ceil(srcW * bgScale)));
        const bgScaledH = Math.max(bgH, makeEven(Math.ceil(srcH * bgScale)));
        const bgCropX = Math.max(0, Math.floor((bgScaledW - bgW) / 2));
        const bgCropY = Math.max(0, Math.floor((bgScaledH - bgH) / 2));
        const overlayX = Math.max(0, Math.floor((outW - fgW) / 2));
        const overlayY = Math.max(0, Math.floor((outH - fgH) / 2));

        filterComplex =
          `[0:v]split=2[bg][fg];` +
          `[bg]scale=${bgScaledW}:${bgScaledH},crop=${bgW}:${bgH}:${bgCropX}:${bgCropY},boxblur=6:2:3:2,scale=${outW}:${outH}:flags=bilinear[bgblur];` +
          `[fg]scale=${fgW}:${fgH}[fgscaled];` +
          `[bgblur][fgscaled]overlay=${overlayX}:${overlayY},setsar=1,format=yuv420p[vout]`;
      }
    } else {
      filterComplex =
        `[0:v]split=2[bg][fg];` +
        `[bg]scale=${outW}:${outH}:force_original_aspect_ratio=increase,pad=max(iw\\,${outW}):max(ih\\,${outH}):(ow-iw)/2:(oh-ih)/2,crop=${outW}:${outH},boxblur=8:2:4:2[bgblur];` +
        `[fg]scale=${outW}:${outH}:force_original_aspect_ratio=decrease[fgscaled];` +
        `[bgblur][fgscaled]overlay=(W-w)/2:(H-h)/2,setsar=1,format=yuv420p[vout]`;
    }
  }

  let latestPct = 8;
  const progressHandler = ({ progress, time }: { progress: number; time: number }) => {
    let pct = 0;
    if (Number.isFinite(progress) && progress > 0 && progress <= 1.05) {
      pct = Math.round(progress * 100);
    } else if (options.sourceDuration > 0 && Number.isFinite(time) && time > 0) {
      pct = Math.round((time / 1_000_000 / options.sourceDuration) * 100);
    }
    const clamped = Math.max(latestPct, Math.min(96, 8 + Math.round(pct * 0.88)));
    latestPct = clamped;
    onProgress(clamped);
  };

  const logEntries: string[] = [];
  const logHandler = ({ message }: { message: string }) => {
    if (message) {
      logEntries.push(message);
      if (logEntries.length > 40) logEntries.shift();
    }
  };

  ffmpeg.on('progress', progressHandler);
  ffmpeg.on('log', logHandler);

  try {
    const fileData = await fetchFile(file);
    await ffmpeg.writeFile(inputName, fileData);

    onStage('processing');
    onProgress(10);

    const args: string[] = ['-i', inputName];

    if (filterComplex) {
      args.push('-filter_complex', filterComplex, '-map', '[vout]');
      if (!options.muteAudio) {
        args.push('-map', '0:a?');
      }
    } else if (vf) {
      args.push('-vf', vf);
    }

    args.push(
      '-c:v',
      'libx264',
      '-preset',
      options.mode === 'compress' ? 'veryfast' : 'ultrafast',
      '-crf',
      crf,
      '-pix_fmt',
      'yuv420p'
    );

    if (options.muteAudio) {
      args.push('-an');
    } else {
      args.push('-c:a', 'aac', '-b:a', '128k');
    }

    args.push('-movflags', '+faststart', outputName);

    const exitCode = await ffmpeg.exec(args);
    if (exitCode !== 0) {
      throw new Error(`FFmpeg exited with code ${exitCode}: ${logEntries.slice(-4).join(' | ')}`);
    }

    onStage('finalizing');
    onProgress(98);

    const data = await ffmpeg.readFile(outputName);
    const uint8 = data instanceof Uint8Array ? new Uint8Array(data) : new TextEncoder().encode(String(data));
    const blob = new Blob([uint8], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);

    onProgress(100);

    return {
      blob,
      url,
      outputWidth: outW,
      outputHeight: outH,
      outputSize: blob.size,
      filename: buildOutputFilename(file.name, outW, outH),
    };
  } finally {
    ffmpeg.off('progress', progressHandler);
    ffmpeg.off('log', logHandler);
    try {
      await ffmpeg.deleteFile(inputName);
    } catch {
      // Ignore cleanup errors
    }
    try {
      await ffmpeg.deleteFile(outputName);
    } catch {
      // Ignore cleanup errors
    }
  }
}
