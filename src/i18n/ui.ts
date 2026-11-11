export const LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English', short: 'EN', ogLocale: 'en_US' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', short: 'ES', ogLocale: 'es_ES' },
  pt: { code: 'pt', name: 'Portuguese', nativeName: 'Português', short: 'PT', ogLocale: 'pt_BR' },
  de: { code: 'de', name: 'German', nativeName: 'Deutsch', short: 'DE', ogLocale: 'de_DE' },
  fr: { code: 'fr', name: 'French', nativeName: 'Français', short: 'FR', ogLocale: 'fr_FR' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', short: 'JA', ogLocale: 'ja_JP' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文', short: 'ZH', ogLocale: 'zh_CN' },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', short: 'RU', ogLocale: 'ru_RU' },
} as const;

export type Locale = keyof typeof LANGUAGES;

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LIST = Object.keys(LANGUAGES) as Locale[];

export const TARGET_META_KEYWORDS =
  'video resizer online, online video resizer, video resizer free, youtube video resizer, youtube video, video resizer online free, video size resizer, resize video, video resize, video resizer for instagram, kapwing, kapwing video resizer, canva video, canva, tiktok, video resizer software, adobe express, resize, instagram, video resizer download, adobe, adobe video resizer, video editor online, adobe express video resizer, online video editor, capcut, clideo, video compressor, video converter, video file resizer, mp4 resizer, video resizer mb, ratio, ai video generator, video editor, video crop, video resolution, video cropper, free video compressor, resize video online';

export interface FaqItem {
  q: string;
  a: string;
}

export interface ComparisonRow {
  feature: string;
  videoResizer: string;
  cloudEditors: string;
}

export interface GuideCard {
  title: string;
  text: string;
}

export interface TranslationSchema {
  meta: {
    title: string;
    description: string;
    ogImageAlt: string;
  };
  nav: {
    brand: string;
    languageSelector: string;
    toggleTheme: string;
    github: string;
    installPwa: string;
    pwaInstalled: string;
    pwaInstructions: string;
    supportDev: string;
    supportDevAria: string;
    menuToggle: string;
  };
  hero: {
    h1: string;
  };
  modes: {
    toggleLabel: string;
    social: string;
    crop: string;
    aspect: string;
    compress: string;
  };
  step1: {
    dropTitle: string;
    dropSubtitle: string;
    selectBtn: string;
    dropActive: string;
    batchTip: string;
  };
  step2: {
    presetsTitle: string;
    presets: {
      tiktok: { label: string; sub: string };
      square: { label: string; sub: string };
      youtube: { label: string; sub: string };
      facebook: { label: string; sub: string };
      classic: { label: string; sub: string };
      cinema: { label: string; sub: string };
    };
    customDimensions: string;
    widthLabel: string;
    heightLabel: string;
    lockRatio: string;
    fitModeTitle: string;
    fitModes: {
      crop: string;
      cropDesc: string;
      padBlur: string;
      padBlurDesc: string;
      padBlack: string;
      padBlackDesc: string;
    };
    cropPositionTitle: string;
    positions: {
      center: string;
      top: string;
      bottom: string;
      left: string;
      right: string;
    };
    compressionTitle: string;
    qualityPresets: {
      high: string;
      medium: string;
      compact: string;
    };
    resolutionScale: string;
    originalRes: string;
    muteAudio: string;
    livePreviewTitle: string;
    livePreviewHint: string;
    originalMeta: string;
    targetMeta: string;
    batchQueueTitle: string;
    addMoreBtn: string;
    clearAllBtn: string;
    resizeNowBtn: string;
    resizeBatchBtn: string;
    changeVideoBtn: string;
  };
  step3: {
    initializing: string;
    analyzing: string;
    processing: string;
    finalizing: string;
    batchProgress: string;
    privacyBadge: string;
    cancelBtn: string;
  };
  step4: {
    doneTitle: string;
    summaryTemplate: string;
    sizeComparison: string;
    downloadBtn: string;
    downloadAllBtn: string;
    adjustSettingsBtn: string;
    resizeAnotherBtn: string;
  };
  errors: {
    invalidFile: string;
    ffmpegLoadFailed: string;
    encodeFailed: string;
    cancelled: string;
  };
  breadcrumbs: {
    home: string;
    tools: string;
    current: string;
  };
  explain: {
    sectionTitle: string;
    sectionSubtitle: string;
    cropCardTitle: string;
    cropCardText: string;
    padCardTitle: string;
    padCardText: string;
    privacyCardTitle: string;
    privacyCardText: string;
  };
  howTo: {
    title: string;
    subtitle: string;
    steps: [string, string, string];
  };
  comparison: {
    title: string;
    subtitle: string;
    colFeature: string;
    colVideoResizer: string;
    colOthers: string;
    rows: ComparisonRow[];
  };
  formatsGuide: {
    title: string;
    subtitle: string;
    cards: GuideCard[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  footer: {
    tagline: string;
    privacyNote: string;
  };
}

export const ui: Record<Locale, TranslationSchema> = {
  en: {
    meta: {
      title: 'Free Video Resizer Online — Resize & Crop (No Upload)',
      description:
        '100% free online video resizer & cropper. Resize MP4, MOV & WebM for TikTok, Instagram & YouTube in your browser — zero uploads, no watermark.',
      ogImageAlt: 'VideoResizer — Free Online Video Resizer & Cropper with Zero Uploads',
    },
    nav: {
      brand: 'VideoResizer',
      languageSelector: 'Select language',
      toggleTheme: 'Toggle light and dark theme',
      github: 'View VideoResizer repository on GitHub',
      installPwa: 'Add to Home Screen',
      pwaInstalled: 'Installed',
      pwaInstructions: 'Use your browser menu ("Install app" or "Add to Home Screen") to install VideoResizer.',
      supportDev: 'Support the Developer',
      supportDevAria: 'Support the Developer with a coffee on Gumroad',
      menuToggle: 'Toggle navigation menu',
    },
    hero: {
      h1: 'Free Online Video Resizer',
    },
    modes: {
      toggleLabel: 'Tool mode presets',
      social: 'Resize for Social Media',
      crop: 'Crop Video',
      aspect: 'Change Aspect Ratio',
      compress: 'Compress Video',
    },
    step1: {
      dropTitle: 'Drop your video here to resize',
      dropSubtitle: 'MP4, WebM, MOV & batch files — 100% private in browser RAM, zero uploads',
      selectBtn: 'Select Video to Resize',
      dropActive: 'Drop to load your video',
      batchTip: 'Drop one or multiple videos for instant batch resizing',
    },
    step2: {
      presetsTitle: 'Social Media Aspect Ratio Presets',
      presets: {
        tiktok: { label: '9:16 Instagram/TikTok', sub: 'Reels, Shorts & Stories' },
        square: { label: '1:1 Square Post', sub: 'Instagram & LinkedIn' },
        youtube: { label: '16:9 YouTube', sub: 'Widescreen HD 1080p' },
        facebook: { label: '4:5 Facebook', sub: 'Mobile Portrait Feed' },
        classic: { label: '4:3 Classic', sub: 'Standard Landscape' },
        cinema: { label: '21:9 Ultrawide', sub: 'Cinematic Frame' },
      },
      customDimensions: 'Custom Dimensions',
      widthLabel: 'Width (px)',
      heightLabel: 'Height (px)',
      lockRatio: 'Lock Ratio',
      fitModeTitle: 'Fit Mode',
      fitModes: {
        crop: 'Crop to Fill',
        cropDesc: 'Fills target frame cleanly by trimming excess edges',
        padBlur: 'Pad with Blur',
        padBlurDesc: 'Keeps entire video visible over a soft blurred backdrop',
        padBlack: 'Pad with Black',
        padBlackDesc: 'Keeps entire video visible with clean black bars',
      },
      cropPositionTitle: 'Crop Focal Point',
      positions: {
        center: 'Center',
        top: 'Top',
        bottom: 'Bottom',
        left: 'Left',
        right: 'Right',
      },
      compressionTitle: 'Compression & Bitrate',
      qualityPresets: {
        high: 'High Quality (CRF 22)',
        medium: 'Balanced Web (CRF 27)',
        compact: 'Compact File (CRF 32)',
      },
      resolutionScale: 'Output Scale',
      originalRes: 'Original Size',
      muteAudio: 'Remove Audio',
      livePreviewTitle: 'Live Aspect Ratio Preview',
      livePreviewHint: 'Instant framing preview in browser',
      originalMeta: 'Original',
      targetMeta: 'Target',
      batchQueueTitle: 'Batch Queue',
      addMoreBtn: 'Add Videos',
      clearAllBtn: 'Reset',
      resizeNowBtn: 'Resize Video Now',
      resizeBatchBtn: 'Resize All Videos',
      changeVideoBtn: 'Change Video',
    },
    step3: {
      initializing: 'Loading WebAssembly FFmpeg Engine...',
      analyzing: 'Reading Video Dimensions...',
      processing: 'Resizing & Optimizing...',
      finalizing: 'Finalizing MP4 File...',
      batchProgress: 'Processing video {current} of {total}',
      privacyBadge: '100% Local Browser RAM Processing — Zero Server Uploads, No Watermark',
      cancelBtn: 'Cancel',
    },
    step4: {
      doneTitle: 'Video Resized Successfully!',
      summaryTemplate: 'Original: {origW}×{origH} → Resized: {newW}×{newH} ({ratio})',
      sizeComparison: 'File Size: {origSize} → {newSize}',
      downloadBtn: 'Download Resized Video',
      downloadAllBtn: 'Download All ({count})',
      adjustSettingsBtn: 'Adjust Settings',
      resizeAnotherBtn: 'Resize Another Video',
    },
    errors: {
      invalidFile: 'Please select a supported video file (MP4, WebM, MOV, MKV, or AVI).',
      ffmpegLoadFailed: 'Unable to initialize the browser FFmpeg engine. Please refresh and try again.',
      encodeFailed: 'Could not process this video with current settings. Try another preset or resolution.',
      cancelled: 'Video processing was cancelled.',
    },
    breadcrumbs: {
      home: 'Home',
      tools: 'Video Editing Tools',
      current: 'Free Online Video Resizer',
    },
    explain: {
      sectionTitle: 'Smart Scale, Pad & Crop Architecture',
      sectionSubtitle: 'A fast video resizer online engineered for creators who want zero server queues and total privacy.',
      cropCardTitle: 'Smart Video Cropper Engine',
      cropCardText: 'Resize video for Instagram and TikTok effortlessly. Automatically scales and crops footage to edge-free 9:16, 1:1, or 4:5 dimensions in sharp H.264.',
      padCardTitle: 'Smart Scale & Pad Engine',
      padCardText: 'Change video resolution without losing corner details. Scales proportionally inside any frame and fills margins with Gaussian blur or deep black bars.',
      privacyCardTitle: 'Free Video Compressor & MP4 Resizer',
      privacyCardText: 'Reduce video file size in MB locally in browser RAM via FFmpeg WebAssembly. Zero bandwidth limits, no software download, and zero watermarks.',
    },
    howTo: {
      title: 'How to Resize and Crop a Video Online for Free',
      subtitle: 'Format clips for YouTube, Instagram, TikTok, or Facebook in three simple browser steps.',
      steps: [
        "Drop your MP4, MOV, or WebM file into the VideoResizer workspace (or click 'Select Video to Resize').",
        'Select your target aspect ratio (e.g., 9:16 for TikTok/Reels) and choose whether to Crop or Pad the video.',
        "Click 'Resize Video Now' to scale your video instantly in your browser and download the optimized MP4.",
      ],
    },
    comparison: {
      title: 'The Best Kapwing, Canva & Clideo Alternative',
      subtitle: 'Why creators switch to this zero-upload online video editor and video file resizer.',
      colFeature: 'Feature',
      colVideoResizer: 'VideoResizer (100% Browser)',
      colOthers: 'Kapwing / Canva / Adobe Express / Clideo',
      rows: [
        { feature: 'Watermark on Free Exports', videoResizer: 'Never — 100% Watermark-Free', cloudEditors: 'Often added unless upgraded' },
        { feature: 'Server File Uploads', videoResizer: 'Zero Uploads (Runs in Browser RAM)', cloudEditors: 'Slow upload & cloud queue wait' },
        { feature: 'Account / Sign-Up Required', videoResizer: 'None — Instant Access', cloudEditors: 'Required to export HD MP4' },
        { feature: 'File Size & MB Limits', videoResizer: 'Unlimited Local Device Memory', cloudEditors: '250MB–500MB free-tier caps' },
        { feature: 'Social Media Ratio Presets', videoResizer: '9:16, 1:1, 16:9, 4:5, 21:9 + Custom', cloudEditors: 'Many presets locked behind Pro' },
      ],
    },
    formatsGuide: {
      title: 'Complete Aspect Ratio & Video Size Resizer Guide',
      subtitle: 'Pick exact dimensions for every social platform without needing heavy video resizer software.',
      cards: [
        {
          title: 'YouTube Video Resizer (16:9 Widescreen)',
          text: 'Convert vertical or square clips into crisp 1920×1080 HD YouTube video dimensions using Smart Pad with Blur or clean black letterbox bars.',
        },
        {
          title: 'Resize Video for Instagram & TikTok (9:16 & 1:1)',
          text: 'Turn landscape recordings into 1080×1920 TikTok, Reels, and Shorts or 1080×1080 Instagram feed squares with custom focal cropping.',
        },
        {
          title: 'Free Video Compressor & MP4 Resizer in MB',
          text: 'Shrink large MOV, WebM, or MP4 recordings to Discord- and email-friendly file sizes by adjusting CRF bitrate and scaling to 720p or 480p.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'How do I resize a video for Instagram, TikTok, or YouTube without a watermark?',
          a: "Upload your video to VideoResizer, select the '9:16 Instagram/TikTok' or '16:9 YouTube' preset, choose fit or crop, and click convert. It resizes your video 100% free with zero watermarks and no sign-up required.",
        },
        {
          q: 'What is the difference between Crop and Pad when resizing a video?',
          a: 'Crop will zoom into your video to fill the new dimensions, cutting off the excess edges. Pad will keep your entire original video visible and add black or blurred bars to fill the remaining empty space.',
        },
        {
          q: 'Are my videos uploaded to a cloud server when resizing?',
          a: 'No. VideoResizer runs 100% locally inside your device using FFmpeg WebAssembly. Your private videos never upload to any cloud server, saving bandwidth and keeping your files completely secure.',
        },
        {
          q: 'Can I use VideoResizer as an offline app or batch MP4 converter?',
          a: 'Yes! Drop multiple videos at once for batch resizing, and click "Add to Home Screen" in the navbar to install VideoResizer as a lightweight PWA.',
        },
      ],
    },
    footer: {
      tagline: '100% Client-Side Free Online Video Resizer & Cropper powered by FFmpeg WebAssembly.',
      privacyNote: 'Zero server uploads. No watermark. Open source.',
    },
  },

  es: {
    meta: {
      title: 'Redimensionar Video Online Gratis — Sin Subir (Sin Marca)',
      description:
        'Redimensionador y recortador de video 100% gratis online. Ajusta MP4 para TikTok, Instagram y YouTube en tu navegador sin subir archivos ni marca.',
      ogImageAlt: 'VideoResizer — Redimensionador y Recortador de Video Gratis Online',
    },
    nav: {
      brand: 'VideoResizer',
      languageSelector: 'Seleccionar idioma',
      toggleTheme: 'Cambiar tema claro u oscuro',
      github: 'Ver repositorio de VideoResizer en GitHub',
      installPwa: 'Añadir a inicio',
      pwaInstalled: 'Instalada',
      pwaInstructions: 'Usa el menú de tu navegador ("Instalar aplicación" o "Añadir a la pantalla de inicio") para instalar VideoResizer.',
      supportDev: 'Apoyar al Desarrollador',
      supportDevAria: 'Apoyar al desarrollador con un café en Gumroad',
      menuToggle: 'Abrir o cerrar menú',
    },
    hero: {
      h1: 'Redimensionador de Video Gratis',
    },
    modes: {
      toggleLabel: 'Cambiar modo de herramienta',
      social: 'Redes Sociales',
      crop: 'Recortar Video',
      aspect: 'Cambiar Aspecto',
      compress: 'Comprimir Video',
    },
    step1: {
      dropTitle: 'Arrastra tu video aquí para redimensionar',
      dropSubtitle: 'MP4, WebM, MOV y lotes — 100% privado en la RAM del navegador, sin subidas',
      selectBtn: 'Seleccionar Video',
      dropActive: 'Suelta para cargar tu video',
      batchTip: 'Arrastra uno o varios videos para procesarlos por lotes',
    },
    step2: {
      presetsTitle: 'Formatos Predefinidos para Redes Sociales',
      presets: {
        tiktok: { label: '9:16 Instagram/TikTok', sub: 'Reels, Shorts e Historias' },
        square: { label: '1:1 Cuadrado', sub: 'Instagram y LinkedIn' },
        youtube: { label: '16:9 YouTube', sub: 'Panorámico HD 1080p' },
        facebook: { label: '4:5 Facebook', sub: 'Feed Vertical Móvil' },
        classic: { label: '4:3 Clásico', sub: 'Formato Estándar' },
        cinema: { label: '21:9 Ultraancho', sub: 'Cine Panorámico' },
      },
      customDimensions: 'Dimensiones Personalizadas',
      widthLabel: 'Ancho (px)',
      heightLabel: 'Alto (px)',
      lockRatio: 'Bloquear Proporción',
      fitModeTitle: 'Modo de Ajuste',
      fitModes: {
        crop: 'Recortar para Llenar',
        cropDesc: 'Llena todo el marco recortando los bordes sobrantes',
        padBlur: 'Rellenar con Desenfoque',
        padBlurDesc: 'Muestra el video completo sobre un fondo difuminado',
        padBlack: 'Rellenar con Negro',
        padBlackDesc: 'Muestra el video completo con barras negras limpias',
      },
      cropPositionTitle: 'Posición de Recorte',
      positions: {
        center: 'Centro',
        top: 'Arriba',
        bottom: 'Abajo',
        left: 'Izquierda',
        right: 'Derecha',
      },
      compressionTitle: 'Compresión y Calidad',
      qualityPresets: {
        high: 'Alta Calidad (CRF 22)',
        medium: 'Equilibrado Web (CRF 27)',
        compact: 'Archivo Compacto (CRF 32)',
      },
      resolutionScale: 'Escala de Salida',
      originalRes: 'Tamaño Original',
      muteAudio: 'Quitar Audio',
      livePreviewTitle: 'Vista Previa en Vivo',
      livePreviewHint: 'Previsualización instantánea del encuadre',
      originalMeta: 'Original',
      targetMeta: 'Destino',
      batchQueueTitle: 'Cola por Lotes',
      addMoreBtn: 'Añadir Videos',
      clearAllBtn: 'Reiniciar',
      resizeNowBtn: 'Redimensionar Video',
      resizeBatchBtn: 'Procesar Todos',
      changeVideoBtn: 'Cambiar Video',
    },
    step3: {
      initializing: 'Cargando motor FFmpeg WebAssembly...',
      analyzing: 'Analizando dimensiones del video...',
      processing: 'Redimensionando y Optimizando...',
      finalizing: 'Finalizando archivo MP4...',
      batchProgress: 'Procesando video {current} de {total}',
      privacyBadge: 'Procesamiento 100% Local en RAM — Sin Subidas al Servidor, Sin Marca de Agua',
      cancelBtn: 'Cancelar',
    },
    step4: {
      doneTitle: '¡Video Redimensionado con Éxito!',
      summaryTemplate: 'Original: {origW}×{origH} → Nuevo: {newW}×{newH} ({ratio})',
      sizeComparison: 'Tamaño: {origSize} → {newSize}',
      downloadBtn: 'Descargar Video',
      downloadAllBtn: 'Descargar Todos ({count})',
      adjustSettingsBtn: 'Ajustar Opciones',
      resizeAnotherBtn: 'Redimensionar Otro',
    },
    errors: {
      invalidFile: 'Selecciona un archivo de video válido (MP4, WebM, MOV, MKV o AVI).',
      ffmpegLoadFailed: 'No se pudo cargar el motor FFmpeg del navegador. Recarga la página e inténtalo de nuevo.',
      encodeFailed: 'No se pudo procesar este video con los ajustes actuales. Prueba otro formato.',
      cancelled: 'Procesamiento cancelado.',
    },
    breadcrumbs: {
      home: 'Inicio',
      tools: 'Herramientas de Edición',
      current: 'Redimensionador de Video Gratis',
    },
    explain: {
      sectionTitle: 'Motor Inteligente de Escala, Relleno y Recorte',
      sectionSubtitle: 'Editor de video online rápido diseñado para formatear clips sin colas en servidores.',
      cropCardTitle: 'Motor de Recorte Inteligente',
      cropCardText: 'Adapta videos para Instagram y TikTok en 9:16, 1:1 o 4:5 automáticamente con nitidez H.264 sin bordes negros.',
      padCardTitle: 'Motor de Escala y Relleno',
      padCardText: 'Cambia la resolución del video conservando el 100% de la imagen con fondo difuminado o barras negras limpias.',
      privacyCardTitle: 'Compresor de Video Gratis y MP4',
      privacyCardText: 'Reduce el peso en MB dentro de la RAM del navegador mediante FFmpeg WebAssembly. Sin límites y sin marca de agua.',
    },
    howTo: {
      title: 'Cómo Redimensionar y Recortar un Video Online Gratis',
      subtitle: 'Prepara tus videos para YouTube, Instagram, TikTok o Facebook en tres pasos.',
      steps: [
        'Arrastra tu archivo MP4, MOV o WebM al espacio de trabajo de VideoResizer (o pulsa «Seleccionar Video»).',
        'Elige la relación de aspecto deseada (por ejemplo, 9:16 para TikTok/Reels) y selecciona Recortar o Rellenar.',
        'Pulsa «Redimensionar Video» para escalar el clip al instante en tu navegador y descargar el MP4 optimizado.',
      ],
    },
    comparison: {
      title: 'La Mejor Alternativa a Kapwing, Canva y Clideo',
      subtitle: 'Por qué los creadores prefieren este redimensionador sin subidas frente a editores en la nube.',
      colFeature: 'Característica',
      colVideoResizer: 'VideoResizer (100% Navegador)',
      colOthers: 'Kapwing / Canva / Adobe Express / Clideo',
      rows: [
        { feature: 'Marca de agua gratis', videoResizer: 'Nunca — 100% Sin Marca', cloudEditors: 'Habitual en planes gratuitos' },
        { feature: 'Subidas a servidores', videoResizer: 'Cero subidas (RAM local)', cloudEditors: 'Largas esperas y colas en la nube' },
        { feature: 'Registro obligatorio', videoResizer: 'Sin cuenta — Uso inmediato', cloudEditors: 'Cuenta requerida para exportar' },
        { feature: 'Límites de peso en MB', videoResizer: 'Ilimitado según memoria local', cloudEditors: 'Topes de 250MB–500MB' },
        { feature: 'Formatos sociales', videoResizer: '9:16, 1:1, 16:9, 4:5, 21:9 + Libre', cloudEditors: 'Opciones Pro bloqueadas' },
      ],
    },
    formatsGuide: {
      title: 'Guía de Relaciones de Aspecto y Compresión MP4',
      subtitle: 'Medidas exactas para cada red social sin instalar software pesado.',
      cards: [
        {
          title: 'Redimensionador para YouTube (16:9)',
          text: 'Convierte clips verticales o cuadrados a 1920×1080 HD con relleno desenfocado o barras negras limpias.',
        },
        {
          title: 'Redimensionar para Instagram y TikTok (9:16 y 1:1)',
          text: 'Transforma videos horizontales a 1080×1920 para Reels/Shorts o 1080×1080 para el feed con encuadre personalizado.',
        },
        {
          title: 'Compresor de Video Gratis en MB',
          text: 'Reduce archivos MOV, WebM o MP4 para Discord o correo ajustando calidad CRF y bajando a 720p o 480p.',
        },
      ],
    },
    faq: {
      title: 'Preguntas Frecuentes',
      items: [
        {
          q: '¿Cómo redimensiono un video para Instagram, TikTok o YouTube sin marca de agua?',
          a: 'Carga tu video en VideoResizer, elige el formato 9:16 Instagram/TikTok o 16:9 YouTube, selecciona recorte o relleno y pulsa convertir. Es 100% gratis y sin marca de agua.',
        },
        {
          q: '¿Qué diferencia hay entre Recortar y Rellenar al redimensionar un video?',
          a: 'Recortar amplía el video para llenar todo el cuadro eliminando los bordes sobrantes. Rellenar conserva toda la imagen original añadiendo fondo borroso o barras negras.',
        },
        {
          q: '¿Se suben mis videos a algún servidor en la nube?',
          a: 'No. VideoResizer se ejecuta 100% localmente en tu dispositivo mediante FFmpeg WebAssembly, manteniendo tus archivos totalmente privados y ahorrando ancho de banda.',
        },
        {
          q: '¿Puedo instalarlo como app sin conexión y procesar por lotes?',
          a: 'Sí, puedes arrastrar varios videos a la vez y pulsar «Añadir a inicio» en el menú para instalarlo como PWA.',
        },
      ],
    },
    footer: {
      tagline: 'Redimensionador y Recortador de Video 100% local con FFmpeg WebAssembly.',
      privacyNote: 'Cero subidas. Sin marca de agua. Código abierto.',
    },
  },

  pt: {
    meta: {
      title: 'Redimensionar Vídeo Online Grátis — Sem Marca d’Água',
      description:
        'Redimensionador e cortador de vídeo 100% grátis online. Ajuste MP4 para TikTok, Instagram e YouTube no navegador sem uploads e sem marca d’água.',
      ogImageAlt: 'VideoResizer — Redimensionador e Cortador de Vídeo Grátis Online',
    },
    nav: {
      brand: 'VideoResizer',
      languageSelector: 'Selecionar idioma',
      toggleTheme: 'Alternar tema claro e escuro',
      github: 'Ver repositório do VideoResizer no GitHub',
      installPwa: 'Adicionar à Tela Inicial',
      pwaInstalled: 'Instalado',
      pwaInstructions: 'Use o menu do navegador ("Instalar aplicativo" ou "Adicionar à tela inicial") para instalar o VideoResizer.',
      supportDev: 'Apoiar o Desenvolvedor',
      supportDevAria: 'Apoiar o desenvolvedor com um café no Gumroad',
      menuToggle: 'Alternar menu de navegação',
    },
    hero: {
      h1: 'Redimensionador de Vídeo Grátis',
    },
    modes: {
      toggleLabel: 'Alternar modo da ferramenta',
      social: 'Redes Sociais',
      crop: 'Cortar Vídeo',
      aspect: 'Mudar Proporção',
      compress: 'Comprimir Vídeo',
    },
    step1: {
      dropTitle: 'Solte seu vídeo aqui para redimensionar',
      dropSubtitle: 'MP4, WebM, MOV e em lote — 100% privado na RAM do navegador, sem uploads',
      selectBtn: 'Selecionar Vídeo',
      dropActive: 'Solte para carregar seu vídeo',
      batchTip: 'Solte um ou vários vídeos para redimensionar em lote',
    },
    step2: {
      presetsTitle: 'Formatos para Redes Sociais',
      presets: {
        tiktok: { label: '9:16 Instagram/TikTok', sub: 'Reels, Shorts e Stories' },
        square: { label: '1:1 Quadrado', sub: 'Instagram e LinkedIn' },
        youtube: { label: '16:9 YouTube', sub: 'Widescreen HD 1080p' },
        facebook: { label: '4:5 Facebook', sub: 'Feed Retrato Mobile' },
        classic: { label: '4:3 Clássico', sub: 'Formato Padrão' },
        cinema: { label: '21:9 Ultrawide', sub: 'Cinema Panorâmico' },
      },
      customDimensions: 'Dimensões Personalizadas',
      widthLabel: 'Largura (px)',
      heightLabel: 'Altura (px)',
      lockRatio: 'Travar Proporção',
      fitModeTitle: 'Modo de Ajuste',
      fitModes: {
        crop: 'Cortar para Preencher',
        cropDesc: 'Preenche todo o quadro cortando as bordas excedentes',
        padBlur: 'Preencher com Desfoque',
        padBlurDesc: 'Mantém todo o vídeo visível com fundo desfocado',
        padBlack: 'Preencher com Preto',
        padBlackDesc: 'Mantém todo o vídeo visível com faixas pretas',
      },
      cropPositionTitle: 'Posição do Corte',
      positions: {
        center: 'Centro',
        top: 'Topo',
        bottom: 'Base',
        left: 'Esquerda',
        right: 'Direita',
      },
      compressionTitle: 'Compressão e Qualidade',
      qualityPresets: {
        high: 'Alta Qualidade (CRF 22)',
        medium: 'Equilibrado Web (CRF 27)',
        compact: 'Arquivo Compacto (CRF 32)',
      },
      resolutionScale: 'Escala de Saída',
      originalRes: 'Tamanho Original',
      muteAudio: 'Remover Áudio',
      livePreviewTitle: 'Prévia em Tempo Real',
      livePreviewHint: 'Visualização instantânea do enquadramento',
      originalMeta: 'Original',
      targetMeta: 'Destino',
      batchQueueTitle: 'Fila em Lote',
      addMoreBtn: 'Adicionar Vídeos',
      clearAllBtn: 'Limpar',
      resizeNowBtn: 'Redimensionar Vídeo',
      resizeBatchBtn: 'Processar Todos',
      changeVideoBtn: 'Trocar Vídeo',
    },
    step3: {
      initializing: 'Carregando motor FFmpeg WebAssembly...',
      analyzing: 'Lendo dimensões do vídeo...',
      processing: 'Redimensionando e Otimizando...',
      finalizing: 'Finalizando arquivo MP4...',
      batchProgress: 'Processando vídeo {current} de {total}',
      privacyBadge: 'Processamento 100% Local na RAM — Zero Uploads ao Servidor, Sem Marca d’Água',
      cancelBtn: 'Cancelar',
    },
    step4: {
      doneTitle: 'Vídeo Redimensionado com Sucesso!',
      summaryTemplate: 'Original: {origW}×{origH} → Novo: {newW}×{newH} ({ratio})',
      sizeComparison: 'Tamanho: {origSize} → {newSize}',
      downloadBtn: 'Baixar Vídeo Redimensionado',
      downloadAllBtn: 'Baixar Todos ({count})',
      adjustSettingsBtn: 'Ajustar Opções',
      resizeAnotherBtn: 'Redimensionar Outro',
    },
    errors: {
      invalidFile: 'Selecione um arquivo de vídeo válido (MP4, WebM, MOV, MKV ou AVI).',
      ffmpegLoadFailed: 'Falha ao carregar o motor FFmpeg no navegador. Atualize a página e tente novamente.',
      encodeFailed: 'Não foi possível processar este vídeo. Tente outra predefinição ou resolução.',
      cancelled: 'Processamento cancelado.',
    },
    breadcrumbs: {
      home: 'Início',
      tools: 'Ferramentas de Edição',
      current: 'Redimensionador de Vídeo Grátis',
    },
    explain: {
      sectionTitle: 'Motor Inteligente de Escala, Preenchimento e Corte',
      sectionSubtitle: 'Editor de vídeo online rápido feito para formatar clipes sem filas em servidores.',
      cropCardTitle: 'Motor de Corte Inteligente',
      cropCardText: 'Redimensiona e corta para 9:16 TikTok, 1:1 Instagram ou 4:5 Facebook automaticamente com nitidez H.264.',
      padCardTitle: 'Motor de Escala e Preenchimento',
      padCardText: 'Preserva 100% da imagem original adicionando fundo desfocado suave ou barras pretas limpas.',
      privacyCardTitle: 'Compressor de Vídeo Grátis e MP4',
      privacyCardText: 'Reduza o tamanho do vídeo em MB na RAM do navegador via FFmpeg WebAssembly. Sem limites e sem marca d’água.',
    },
    howTo: {
      title: 'Como Redimensionar e Cortar um Vídeo Online Grátis',
      subtitle: 'Formate vídeos para YouTube, Instagram, TikTok ou Facebook em três passos.',
      steps: [
        'Solte seu arquivo MP4, MOV ou WebM no VideoResizer (ou clique em «Selecionar Vídeo»).',
        'Escolha a proporção desejada (ex.: 9:16 para TikTok/Reels) e defina Cortar ou Preencher.',
        'Clique em «Redimensionar Vídeo» para processar no navegador e baixar o MP4 otimizado.',
      ],
    },
    comparison: {
      title: 'A Melhor Alternativa ao Kapwing, Canva e Clideo',
      subtitle: 'Por que criadores escolhem este editor sem uploads em vez de ferramentas na nuvem.',
      colFeature: 'Recurso',
      colVideoResizer: 'VideoResizer (100% Navegador)',
      colOthers: 'Kapwing / Canva / Adobe Express / Clideo',
      rows: [
        { feature: 'Marca d’água grátis', videoResizer: 'Nunca — 100% Limpo', cloudEditors: 'Comum em contas gratuitas' },
        { feature: 'Envio para servidores', videoResizer: 'Zero uploads (RAM local)', cloudEditors: 'Filas e upload demorado' },
        { feature: 'Cadastro obrigatório', videoResizer: 'Sem conta — Uso imediato', cloudEditors: 'Login exigido para exportar' },
        { feature: 'Limites de tamanho (MB)', videoResizer: 'Ilimitado na memória local', cloudEditors: 'Limites de 250MB–500MB' },
        { feature: 'Proporções sociais', videoResizer: '9:16, 1:1, 16:9, 4:5, 21:9 + Livre', cloudEditors: 'Presets pagos bloqueados' },
      ],
    },
    formatsGuide: {
      title: 'Guia de Proporções e Compressão MP4',
      subtitle: 'Dimensões exatas para cada rede social sem instalar softwares pesados.',
      cards: [
        {
          title: 'Redimensionador para YouTube (16:9)',
          text: 'Converta vídeos verticais para 1920×1080 HD com fundo desfocado ou barras pretas.',
        },
        {
          title: 'Redimensionar para Instagram e TikTok (9:16 e 1:1)',
          text: 'Adapte gravações para 1080×1920 no Reels/Shorts ou 1080×1080 no feed com foco ajustável.',
        },
        {
          title: 'Compressor de Vídeo Grátis em MB',
          text: 'Diminua o peso de arquivos MOV, WebM ou MP4 ajustando CRF e reduzindo para 720p ou 480p.',
        },
      ],
    },
    faq: {
      title: 'Perguntas Frequentes',
      items: [
        {
          q: 'Como redimensionar um vídeo para Instagram, TikTok ou YouTube sem marca d’água?',
          a: 'Envie o vídeo no VideoResizer, escolha 9:16 Instagram/TikTok ou 16:9 YouTube, selecione corte ou preenchimento e converta. É 100% grátis e sem marca d’água.',
        },
        {
          q: 'Qual a diferença entre Cortar e Preencher ao redimensionar um vídeo?',
          a: 'Cortar preenche todo o quadro removendo as bordas extras. Preencher mantém todo o vídeo visível adicionando fundo desfocado ou barras pretas.',
        },
        {
          q: 'Meus vídeos são enviados para algum servidor na nuvem?',
          a: 'Não. O VideoResizer roda 100% localmente no seu dispositivo usando FFmpeg WebAssembly, mantendo seus arquivos totalmente seguros.',
        },
        {
          q: 'Posso instalar como app e processar em lote?',
          a: 'Sim, solte vários vídeos de uma vez e clique em «Adicionar à Tela Inicial» para instalar como PWA.',
        },
      ],
    },
    footer: {
      tagline: 'Redimensionador e Cortador de Vídeo 100% no navegador com FFmpeg WebAssembly.',
      privacyNote: 'Zero uploads. Sem marca d’água. Código aberto.',
    },
  },

  de: {
    meta: {
      title: 'Video Resizer Online Kostenlos — Zuschneiden (Ohne Upload)',
      description:
        '100% kostenloser Online Video-Resizer & Cropper. MP4 für TikTok, Instagram & YouTube lokal im Browser skalieren — ohne Upload und ohne Wasserzeichen.',
      ogImageAlt: 'VideoResizer — Kostenloser Online Video-Resizer & Cropper',
    },
    nav: {
      brand: 'VideoResizer',
      languageSelector: 'Sprache wählen',
      toggleTheme: 'Helles/Dunkles Design umschalten',
      github: 'VideoResizer Repository auf GitHub ansehen',
      installPwa: 'Zum Startbildschirm',
      pwaInstalled: 'Installiert',
      pwaInstructions: 'Nutzen Sie das Browser-Menü („App installieren“ oder „Zum Startbildschirm hinzufügen“), um VideoResizer zu installieren.',
      supportDev: 'Entwickler unterstützen',
      supportDevAria: 'Den Entwickler auf Gumroad mit einem Kaffee unterstützen',
      menuToggle: 'Navigationsmenü umschalten',
    },
    hero: {
      h1: 'Kostenloser Online Video-Resizer',
    },
    modes: {
      toggleLabel: 'Werkzeugmodus wechseln',
      social: 'Social Media Format',
      crop: 'Video zuschneiden',
      aspect: 'Seitenverhältnis ändern',
      compress: 'Video komprimieren',
    },
    step1: {
      dropTitle: 'Video hier ablegen zum Skalieren',
      dropSubtitle: 'MP4, WebM, MOV & Stapelverarbeitung — 100% privat im Browser-RAM, kein Upload',
      selectBtn: 'Video auswählen',
      dropActive: 'Loslassen zum Laden',
      batchTip: 'Ein oder mehrere Videos für die Stapelverarbeitung ablegen',
    },
    step2: {
      presetsTitle: 'Social-Media-Seitenverhältnisse',
      presets: {
        tiktok: { label: '9:16 Instagram/TikTok', sub: 'Reels, Shorts & Stories' },
        square: { label: '1:1 Quadratisch', sub: 'Instagram & LinkedIn' },
        youtube: { label: '16:9 YouTube', sub: 'Breitbild HD 1080p' },
        facebook: { label: '4:5 Facebook', sub: 'Mobiles Hochformat' },
        classic: { label: '4:3 Klassisch', sub: 'Standardformat' },
        cinema: { label: '21:9 Ultrawide', sub: 'Kinoformat' },
      },
      customDimensions: 'Eigene Abmessungen',
      widthLabel: 'Breite (px)',
      heightLabel: 'Höhe (px)',
      lockRatio: 'Verhältnis sperren',
      fitModeTitle: 'Anpassungsmodus',
      fitModes: {
        crop: 'Zuschneiden (Füllen)',
        cropDesc: 'Füllt den gesamten Rahmen durch Beschneiden der Ränder',
        padBlur: 'Mit Unschärfe auffüllen',
        padBlurDesc: 'Behält das gesamte Bild vor weichem Unschärfe-Hintergrund',
        padBlack: 'Mit Schwarz auffüllen',
        padBlackDesc: 'Behält das gesamte Bild mit schwarzen Balken',
      },
      cropPositionTitle: 'Ausschnitt-Position',
      positions: {
        center: 'Mitte',
        top: 'Oben',
        bottom: 'Unten',
        left: 'Links',
        right: 'Rechts',
      },
      compressionTitle: 'Komprimierung & Qualität',
      qualityPresets: {
        high: 'Hohe Qualität (CRF 22)',
        medium: 'Web-Optimiert (CRF 27)',
        compact: 'Kompakt (CRF 32)',
      },
      resolutionScale: 'Ausgabeauflösung',
      originalRes: 'Originalgröße',
      muteAudio: 'Ton entfernen',
      livePreviewTitle: 'Live-Seitenverhältnis-Vorschau',
      livePreviewHint: 'Sofortige Rahmenvorschau im Browser',
      originalMeta: 'Original',
      targetMeta: 'Ziel',
      batchQueueTitle: 'Warteschlange',
      addMoreBtn: 'Weitere Videos',
      clearAllBtn: 'Zurücksetzen',
      resizeNowBtn: 'Video skalieren',
      resizeBatchBtn: 'Alle skalieren',
      changeVideoBtn: 'Video wechseln',
    },
    step3: {
      initializing: 'WebAssembly FFmpeg-Engine wird geladen...',
      analyzing: 'Videoabmessungen werden gelesen...',
      processing: 'Wird skaliert & optimiert...',
      finalizing: 'MP4-Datei wird erstellt...',
      batchProgress: 'Verarbeite Video {current} von {total}',
      privacyBadge: '100% Lokale Browser-RAM-Verarbeitung — Keine Server-Uploads, Kein Wasserzeichen',
      cancelBtn: 'Abbrechen',
    },
    step4: {
      doneTitle: 'Video erfolgreich skaliert!',
      summaryTemplate: 'Original: {origW}×{origH} → Neu: {newW}×{newH} ({ratio})',
      sizeComparison: 'Dateigröße: {origSize} → {newSize}',
      downloadBtn: 'Skaliertes Video herunterladen',
      downloadAllBtn: 'Alle herunterladen ({count})',
      adjustSettingsBtn: 'Einstellungen ändern',
      resizeAnotherBtn: 'Weiteres Video bearbeiten',
    },
    errors: {
      invalidFile: 'Bitte wählen Sie eine gültige Videodatei (MP4, WebM, MOV, MKV oder AVI).',
      ffmpegLoadFailed: 'FFmpeg-Engine konnte nicht geladen werden. Bitte Seite neu laden.',
      encodeFailed: 'Verarbeitung fehlgeschlagen. Bitte versuchen Sie ein anderes Preset.',
      cancelled: 'Verarbeitung abgebrochen.',
    },
    breadcrumbs: {
      home: 'Startseite',
      tools: 'Videobearbeitung',
      current: 'Kostenloser Online Video-Resizer',
    },
    explain: {
      sectionTitle: 'Smart Scale, Pad & Crop Architektur',
      sectionSubtitle: 'Schneller Online Video-Editor ohne Server-Warteschlangen und mit voller Privatsphäre.',
      cropCardTitle: 'Smart Crop Engine',
      cropCardText: 'Skaliert und beschneidet Videos für 9:16 TikTok, 1:1 Instagram oder 4:5 Facebook in scharfem H.264.',
      padCardTitle: 'Smart Scale & Pad Engine',
      padCardText: 'Ändert die Videoauflösung ohne Bildverlust mit weichem Unschärfe-Hintergrund oder schwarzen Balken.',
      privacyCardTitle: 'Kostenloser Video Compressor & MP4 Resizer',
      privacyCardText: 'Verkleinert Videodateien direkt im Browser-RAM via FFmpeg WebAssembly. Keine Limits und kein Wasserzeichen.',
    },
    howTo: {
      title: 'Videos online kostenlos skalieren und zuschneiden',
      subtitle: 'Optimieren Sie Clips für YouTube, Instagram, TikTok und Facebook in drei Schritten.',
      steps: [
        'Ziehen Sie Ihre MP4-, MOV- oder WebM-Datei in den VideoResizer-Arbeitsbereich (oder klicken Sie auf „Video auswählen“).',
        'Wählen Sie das gewünschte Seitenverhältnis (z. B. 9:16 für TikTok/Reels) sowie Zuschneiden oder Auffüllen.',
        'Klicken Sie auf „Video skalieren“, um das Video direkt im Browser zu konvertieren und als MP4 herunterzuladen.',
      ],
    },
    comparison: {
      title: 'Die bessere Kapwing-, Canva- & Clideo-Alternative',
      subtitle: 'Warum Creator diesen lokalen Video-Resizer gegenüber Cloud-Tools bevorzugen.',
      colFeature: 'Funktion',
      colVideoResizer: 'VideoResizer (100% Browser)',
      colOthers: 'Kapwing / Canva / Adobe Express / Clideo',
      rows: [
        { feature: 'Wasserzeichen bei Free-Export', videoResizer: 'Nie — 100% Ohne Wasserzeichen', cloudEditors: 'Oft ohne Abo enthalten' },
        { feature: 'Server-Uploads', videoResizer: 'Kein Upload (Browser-RAM)', cloudEditors: 'Langsame Uploads & Cloud-Warteschlange' },
        { feature: 'Konto / Anmeldung', videoResizer: 'Keine Anmeldung nötig', cloudEditors: 'Login für HD-Export nötig' },
        { feature: 'Dateigrößen-Limits', videoResizer: 'Unbegrenzt im Gerätespeicher', cloudEditors: '250MB–500MB Limit im Gratis-Tarif' },
        { feature: 'Social-Media-Presets', videoResizer: '9:16, 1:1, 16:9, 4:5, 21:9 + Frei', cloudEditors: 'Viele Formate hinter Paywall' },
      ],
    },
    formatsGuide: {
      title: 'Seitenverhältnis- & Video-Kompressor-Leitfaden',
      subtitle: 'Exakte Pixelmaße für jede Plattform ohne schwere Desktop-Software.',
      cards: [
        {
          title: 'YouTube Video-Resizer (16:9)',
          text: 'Wandeln Sie Hochformat-Clips per Unschärfe-Padding oder schwarzen Balken in scharfes 1920×1080 HD um.',
        },
        {
          title: 'Für Instagram & TikTok skalieren (9:16 & 1:1)',
          text: 'Bringen Sie Querformat-Aufnahmen auf 1080×1920 Reels/Shorts oder 1080×1080 Feed-Quadrate.',
        },
        {
          title: 'Kostenloser MP4-Kompressor',
          text: 'Reduzieren Sie MOV-, WebM- oder MP4-Dateien per CRF-Qualität und 720p/480p-Skalierung.',
        },
      ],
    },
    faq: {
      title: 'Häufig gestellte Fragen',
      items: [
        {
          q: 'Wie skaliere ich ein Video für Instagram, TikTok oder YouTube ohne Wasserzeichen?',
          a: 'Laden Sie Ihr Video in VideoResizer, wählen Sie 9:16 Instagram/TikTok oder 16:9 YouTube, bestimmen Sie Zuschneiden oder Auffüllen und starten Sie. 100% gratis ohne Wasserzeichen.',
        },
        {
          q: 'Was ist der Unterschied zwischen Zuschneiden und Auffüllen?',
          a: 'Zuschneiden füllt das Zielformat randlos aus. Auffüllen zeigt das gesamte Originalbild mit Unschärfe-Hintergrund oder schwarzen Balken.',
        },
        {
          q: 'Werden meine Videos auf einen Cloud-Server hochgeladen?',
          a: 'Nein. VideoResizer läuft zu 100% lokal über FFmpeg WebAssembly auf Ihrem Gerät — schnell, privat und ohne Bandbreitenverlust.',
        },
        {
          q: 'Funktioniert VideoResizer als PWA und im Stapelbetrieb?',
          a: 'Ja, ziehen Sie mehrere Videos gleichzeitig hinein und installieren Sie die Seite über „Zum Startbildschirm“.',
        },
      ],
    },
    footer: {
      tagline: '100% Client-seitiger Video-Resizer & Cropper mit FFmpeg WebAssembly.',
      privacyNote: 'Keine Uploads. Kein Wasserzeichen. Open Source.',
    },
  },

  fr: {
    meta: {
      title: 'Redimensionner Vidéo Gratuit — Recadrer Sans Envoi',
      description:
        'Redimensionneur et recadreur vidéo 100% gratuit en ligne. Adaptez vos MP4 pour TikTok, Instagram et YouTube dans le navigateur sans filigrane.',
      ogImageAlt: 'VideoResizer — Redimensionneur et Recadreur Vidéo Gratuit en Ligne',
    },
    nav: {
      brand: 'VideoResizer',
      languageSelector: 'Choisir la langue',
      toggleTheme: 'Basculer thème clair/sombre',
      github: 'Voir le dépôt VideoResizer sur GitHub',
      installPwa: 'Ajouter à l’écran d’accueil',
      pwaInstalled: 'Installée',
      pwaInstructions: 'Utilisez le menu de votre navigateur (« Installer l’application » ou « Ajouter à l’écran d’accueil ») pour installer VideoResizer.',
      supportDev: 'Soutenir le Développeur',
      supportDevAria: 'Soutenir le développeur sur Gumroad',
      menuToggle: 'Ouvrir ou fermer le menu',
    },
    hero: {
      h1: 'Redimensionneur Vidéo Gratuit',
    },
    modes: {
      toggleLabel: 'Changer le mode d’outil',
      social: 'Réseaux Sociaux',
      crop: 'Recadrer la Vidéo',
      aspect: 'Changer le Ratio',
      compress: 'Compresser',
    },
    step1: {
      dropTitle: 'Déposez votre vidéo ici pour la redimensionner',
      dropSubtitle: 'MP4, WebM, MOV et traitement par lots — 100% privé en RAM navigateur, zéro envoi',
      selectBtn: 'Sélectionner une Vidéo',
      dropActive: 'Relâchez pour charger la vidéo',
      batchTip: 'Déposez une ou plusieurs vidéos pour un traitement par lots',
    },
    step2: {
      presetsTitle: 'Formats Réseaux Sociaux',
      presets: {
        tiktok: { label: '9:16 Instagram/TikTok', sub: 'Reels, Shorts & Stories' },
        square: { label: '1:1 Carré', sub: 'Instagram & LinkedIn' },
        youtube: { label: '16:9 YouTube', sub: 'Grand écran HD 1080p' },
        facebook: { label: '4:5 Facebook', sub: 'Fil Mobile Portrait' },
        classic: { label: '4:3 Classique', sub: 'Format Standard' },
        cinema: { label: '21:9 Cinéma', sub: 'Ultra-large' },
      },
      customDimensions: 'Dimensions Personnalisées',
      widthLabel: 'Largeur (px)',
      heightLabel: 'Hauteur (px)',
      lockRatio: 'Verrouiller Ratio',
      fitModeTitle: 'Mode d’Ajustement',
      fitModes: {
        crop: 'Recadrer pour Remplir',
        cropDesc: 'Remplit tout le cadre en coupant les bords superflus',
        padBlur: 'Bordures Floutées',
        padBlurDesc: 'Conserve toute la vidéo sur un arrière-plan flou',
        padBlack: 'Bordures Noires',
        padBlackDesc: 'Conserve toute la vidéo avec des bandes noires nettes',
      },
      cropPositionTitle: 'Position du Recadrage',
      positions: {
        center: 'Centre',
        top: 'Haut',
        bottom: 'Bas',
        left: 'Gauche',
        right: 'Droite',
      },
      compressionTitle: 'Compression & Qualité',
      qualityPresets: {
        high: 'Haute Qualité (CRF 22)',
        medium: 'Équilibré Web (CRF 27)',
        compact: 'Fichier Compact (CRF 32)',
      },
      resolutionScale: 'Résolution de Sortie',
      originalRes: 'Taille d’Origine',
      muteAudio: 'Supprimer l’Audio',
      livePreviewTitle: 'Aperçu en Direct',
      livePreviewHint: 'Prévisualisation instantanée du cadrage',
      originalMeta: 'Original',
      targetMeta: 'Cible',
      batchQueueTitle: 'File d’attente',
      addMoreBtn: 'Ajouter des Vidéos',
      clearAllBtn: 'Réinitialiser',
      resizeNowBtn: 'Redimensionner',
      resizeBatchBtn: 'Tout Redimensionner',
      changeVideoBtn: 'Changer de Vidéo',
    },
    step3: {
      initializing: 'Chargement du moteur FFmpeg WebAssembly...',
      analyzing: 'Analyse des dimensions vidéo...',
      processing: 'Redimensionnement & Optimisation...',
      finalizing: 'Finalisation du fichier MP4...',
      batchProgress: 'Traitement vidéo {current} sur {total}',
      privacyBadge: 'Traitement 100% Local en RAM — Zéro Envoi Serveur, Sans Filigrane',
      cancelBtn: 'Annuler',
    },
    step4: {
      doneTitle: 'Vidéo Redimensionnée avec Succès !',
      summaryTemplate: 'Original : {origW}×{origH} → Nouveau : {newW}×{newH} ({ratio})',
      sizeComparison: 'Taille : {origSize} → {newSize}',
      downloadBtn: 'Télécharger la Vidéo',
      downloadAllBtn: 'Tout Télécharger ({count})',
      adjustSettingsBtn: 'Modifier les Réglages',
      resizeAnotherBtn: 'Autre Vidéo',
    },
    errors: {
      invalidFile: 'Veuillez sélectionner un fichier vidéo valide (MP4, WebM, MOV, MKV ou AVI).',
      ffmpegLoadFailed: 'Impossible de charger FFmpeg dans le navigateur. Veuillez actualiser.',
      encodeFailed: 'Échec du traitement avec ces paramètres. Essayez un autre format.',
      cancelled: 'Traitement annulé.',
    },
    breadcrumbs: {
      home: 'Accueil',
      tools: 'Outils Vidéo',
      current: 'Redimensionneur Vidéo Gratuit',
    },
    explain: {
      sectionTitle: 'Architecture Smart Scale, Pad & Crop',
      sectionSubtitle: 'Éditeur vidéo en ligne rapide sans file d’attente serveur et 100% confidentiel.',
      cropCardTitle: 'Moteur de Recadrage Intelligent',
      cropCardText: 'Adapte vos vidéos pour TikTok 9:16, Instagram 1:1 ou Facebook 4:5 en H.264 sans aucune bordure.',
      padCardTitle: 'Moteur d’Échelle & Remplissage',
      padCardText: 'Changez la résolution vidéo en conservant 100% de l’image avec flou d’arrière-plan ou bandes noires.',
      privacyCardTitle: 'Compresseur Vidéo Gratuit & MP4',
      privacyCardText: 'Réduisez le poids en Mo directement en RAM navigateur via FFmpeg WebAssembly. Sans limite ni filigrane.',
    },
    howTo: {
      title: 'Comment Redimensionner et Recadrer une Vidéo Gratuitement',
      subtitle: 'Formatez vos clips pour YouTube, Instagram, TikTok ou Facebook en trois étapes.',
      steps: [
        'Déposez votre fichier MP4, MOV ou WebM dans VideoResizer (ou cliquez sur « Sélectionner une Vidéo »).',
        'Choisissez le ratio cible (par ex. 9:16 pour TikTok/Reels) puis sélectionnez Recadrer ou Bordures.',
        'Cliquez sur « Redimensionner » pour traiter la vidéo dans votre navigateur et télécharger le MP4.',
      ],
    },
    comparison: {
      title: 'La Meilleure Alternative à Kapwing, Canva & Clideo',
      subtitle: 'Pourquoi les créateurs préfèrent ce redimensionneur local aux éditeurs cloud.',
      colFeature: 'Critère',
      colVideoResizer: 'VideoResizer (100% Navigateur)',
      colOthers: 'Kapwing / Canva / Adobe Express / Clideo',
      rows: [
        { feature: 'Filigrane sur export gratuit', videoResizer: 'Jamais — 100% Sans Filigrane', cloudEditors: 'Souvent imposé sans abonnement' },
        { feature: 'Envoi vers un serveur', videoResizer: 'Zéro envoi (RAM locale)', cloudEditors: 'Temps d’upload et files cloud' },
        { feature: 'Compte obligatoire', videoResizer: 'Aucun — Accès instantané', cloudEditors: 'Inscription requise pour exporter' },
        { feature: 'Limite de taille (Mo)', videoResizer: 'Illimité selon la RAM', cloudEditors: 'Plafonds à 250Mo–500Mo' },
        { feature: 'Formats sociaux', videoResizer: '9:16, 1:1, 16:9, 4:5, 21:9 + Libre', cloudEditors: 'Préréglages payants' },
      ],
    },
    formatsGuide: {
      title: 'Guide des Ratios & Compression MP4',
      subtitle: 'Dimensions exactes pour chaque réseau social sans logiciel lourd.',
      cards: [
        {
          title: 'Redimensionneur YouTube (16:9)',
          text: 'Convertissez vos clips verticaux en 1920×1080 HD avec arrière-plan flouté ou bandes noires.',
        },
        {
          title: 'Redimensionner pour Instagram & TikTok (9:16 & 1:1)',
          text: 'Adaptez vos vidéos en 1080×1920 Reels/Shorts ou 1080×1080 carré avec cadrage précis.',
        },
        {
          title: 'Compresseur Vidéo Gratuit en Mo',
          text: 'Allégez vos fichiers MOV, WebM ou MP4 en réglant le CRF et la résolution 720p ou 480p.',
        },
      ],
    },
    faq: {
      title: 'Questions Fréquentes',
      items: [
        {
          q: 'Comment redimensionner une vidéo pour Instagram, TikTok ou YouTube sans filigrane ?',
          a: 'Importez votre vidéo dans VideoResizer, choisissez 9:16 Instagram/TikTok ou 16:9 YouTube, sélectionnez recadrage ou bordures et convertissez. 100% gratuit et sans filigrane.',
        },
        {
          q: 'Quelle différence entre Recadrer et Bordures lors du redimensionnement ?',
          a: 'Recadrer zoome pour remplir tout le cadre en coupant les bords. Les bordures conservent toute la vidéo avec un fond flou ou noir.',
        },
        {
          q: 'Mes vidéos sont-elles envoyées sur un serveur cloud ?',
          a: 'Non. VideoResizer fonctionne 100% localement via FFmpeg WebAssembly dans votre navigateur, préservant votre confidentialité.',
        },
        {
          q: 'Puis-je installer l’application et traiter plusieurs fichiers ?',
          a: 'Oui, déposez plusieurs vidéos par lots et cliquez sur « Ajouter à l’écran d’accueil » pour installer la PWA.',
        },
      ],
    },
    footer: {
      tagline: 'Redimensionneur & Recadreur Vidéo 100% client propulsé par FFmpeg WebAssembly.',
      privacyNote: 'Zéro envoi serveur. Sans filigrane. Open source.',
    },
  },

  ja: {
    meta: {
      title: '無料動画リサイズ＆トリミング — 透かしなし・ローカル処理',
      description:
        '100%無料のオンライン動画リサイズ・切り抜きツール。TikTok、Instagram、YouTube向けにブラウザ内でMP4を変換。アップロード不要・透かしなし。',
      ogImageAlt: 'VideoResizer — 無料オンライン動画リサイズ＆トリミング',
    },
    nav: {
      brand: 'VideoResizer',
      languageSelector: '言語を選択',
      toggleTheme: 'ライト・ダークテーマ切替',
      github: 'GitHubでVideoResizerを見る',
      installPwa: 'ホーム画面に追加',
      pwaInstalled: 'インストール済み',
      pwaInstructions: 'ブラウザのメニュー（「アプリをインストール」または「ホーム画面に追加」）からインストールできます。',
      supportDev: '開発者を支援',
      supportDevAria: 'Gumroadで開発者を支援する',
      menuToggle: 'ナビゲーションメニューを切り替える',
    },
    hero: {
      h1: '無料オンライン動画リサイズ',
    },
    modes: {
      toggleLabel: 'ツールモードを切り替える',
      social: 'SNS向けリサイズ',
      crop: '動画トリミング',
      aspect: 'アスペクト比変更',
      compress: '動画圧縮',
    },
    step1: {
      dropTitle: 'ここに動画をドロップしてリサイズ',
      dropSubtitle: 'MP4・WebM・MOV・一括処理対応 — ブラウザRAM内で100%完結、アップロード不要',
      selectBtn: '動画を選択してリサイズ',
      dropActive: 'ドロップして動画を読み込む',
      batchTip: '複数動画をドロップして一括リサイズできます',
    },
    step2: {
      presetsTitle: 'SNSアスペクト比プリセット',
      presets: {
        tiktok: { label: '9:16 Instagram/TikTok', sub: 'リール・ショート向け' },
        square: { label: '1:1 正方形投稿', sub: 'Instagram・LinkedIn' },
        youtube: { label: '16:9 YouTube', sub: 'ワイドHD 1080p' },
        facebook: { label: '4:5 Facebook', sub: 'モバイル縦長フィード' },
        classic: { label: '4:3 クラシック', sub: '標準比率' },
        cinema: { label: '21:9 ウルトラワイド', sub: 'シネマ画面' },
      },
      customDimensions: 'カスタムサイズ',
      widthLabel: '幅 (px)',
      heightLabel: '高さ (px)',
      lockRatio: '比率を固定',
      fitModeTitle: 'フィットモード',
      fitModes: {
        crop: '切り抜きで埋める',
        cropDesc: '余分な端を切り落として画面いっぱいに表示',
        padBlur: 'ぼかし背景で余白埋め',
        padBlurDesc: '動画全体を保持し、背景をぼかしで補完',
        padBlack: '黒帯で余白埋め',
        padBlackDesc: '動画全体を保持し、黒枠を追加',
      },
      cropPositionTitle: '切り抜き基準位置',
      positions: {
        center: '中央',
        top: '上',
        bottom: '下',
        left: '左',
        right: '右',
      },
      compressionTitle: '圧縮・品質設定',
      qualityPresets: {
        high: '高画質 (CRF 22)',
        medium: '標準バランス (CRF 27)',
        compact: '高圧縮コンパクト (CRF 32)',
      },
      resolutionScale: '出力解像度',
      originalRes: '元のサイズ',
      muteAudio: '音声を削除',
      livePreviewTitle: 'リアルタイムプレビュー',
      livePreviewHint: '変換前のフレーミング即時確認',
      originalMeta: '元サイズ',
      targetMeta: '変換後',
      batchQueueTitle: '一括処理キュー',
      addMoreBtn: '動画を追加',
      clearAllBtn: 'リセット',
      resizeNowBtn: '動画をリサイズ',
      resizeBatchBtn: 'すべてリサイズ',
      changeVideoBtn: '別の動画を選ぶ',
    },
    step3: {
      initializing: 'WebAssembly FFmpegエンジンを読み込み中...',
      analyzing: '動画解像度を解析中...',
      processing: 'リサイズ・最適化を実行中...',
      finalizing: 'MP4ファイルを書き出し中...',
      batchProgress: '処理中: {current} / {total}',
      privacyBadge: '100%ブラウザRAM内ローカル処理 — サーバー送信ゼロ・透かしなし',
      cancelBtn: 'キャンセル',
    },
    step4: {
      doneTitle: 'リサイズが完了しました！',
      summaryTemplate: '元: {origW}×{origH} → 変換後: {newW}×{newH} ({ratio})',
      sizeComparison: '容量: {origSize} → {newSize}',
      downloadBtn: 'リサイズ動画をダウンロード',
      downloadAllBtn: 'すべてダウンロード ({count})',
      adjustSettingsBtn: '設定を調整',
      resizeAnotherBtn: '別の動画をリサイズ',
    },
    errors: {
      invalidFile: '有効な動画ファイルを選択してください（MP4, WebM, MOV, MKV, AVI）。',
      ffmpegLoadFailed: 'ブラウザFFmpegエンジンの読み込みに失敗しました。再読み込みしてお試しください。',
      encodeFailed: 'この設定で処理できませんでした。別のプリセットをお試しください。',
      cancelled: '処理がキャンセルされました。',
    },
    breadcrumbs: {
      home: 'ホーム',
      tools: '動画編集ツール',
      current: '無料オンライン動画リサイズ',
    },
    explain: {
      sectionTitle: 'スマートスケール・余白埋め・切り抜きエンジン',
      sectionSubtitle: 'サーバー待ち時間ゼロ、プライバシー完全保護の高速オンライン動画リサイズ。',
      cropCardTitle: 'スマートクロップ機能',
      cropCardText: '9:16 TikTok、1:1 Instagram、4:5 Facebookなどの画面に合わせて余白なしで自動リサイズ・切り抜き。',
      padCardTitle: 'スマートスケール＆余白補完',
      padCardText: '動画の端を切り落とさず全体を残したまま、ぼかし背景または黒帯でアスペクト比を整えます。',
      privacyCardTitle: '無料MP4圧縮＆プライバシー保護',
      privacyCardText: 'FFmpeg WebAssemblyにより端末のRAM内で直接変換。容量制限や透かしは一切ありません。',
    },
    howTo: {
      title: 'オンラインで無料動画リサイズ＆切り抜きの手順',
      subtitle: 'YouTube、Instagram、TikTok、Facebook向けの最適化が3ステップで完了。',
      steps: [
        'MP4、MOV、またはWebMファイルをVideoResizerの作業エリアにドロップ（または「動画を選択してリサイズ」をクリック）します。',
        '目的のアスペクト比（TikTok/リール用の9:16など）を選び、「切り抜き」または「余白埋め」を選択します。',
        '「動画をリサイズ」をクリックしてブラウザ内で変換し、最適化されたMP4をダウンロードします。',
      ],
    },
    comparison: {
      title: 'Kapwing・Canva・Clideoとの比較',
      subtitle: 'ローカル処理ならではの無制限・高速・透かしなしワークフロー。',
      colFeature: '機能',
      colVideoResizer: 'VideoResizer (100%ブラウザ完結)',
      colOthers: 'Kapwing / Canva / Adobe Express / Clideo',
      rows: [
        { feature: '無料版の透かし', videoResizer: '一切なし（完全透かしなし）', cloudEditors: '有料プラン以外は透かしあり' },
        { feature: 'サーバーへのアップロード', videoResizer: 'ゼロ（端末RAM内で処理）', cloudEditors: 'アップロード待機と順番待ち' },
        { feature: 'アカウント登録', videoResizer: '不要・すぐ使える', cloudEditors: '書き出しにログイン必須' },
        { feature: 'ファイルサイズ上限', videoResizer: '端末メモリ内で無制限', cloudEditors: '250MB〜500MBの上限' },
        { feature: 'SNSプリセット', videoResizer: '9:16, 1:1, 16:9, 4:5, 21:9 + カスタム', cloudEditors: '一部プリセットが有料' },
      ],
    },
    formatsGuide: {
      title: 'SNSアスペクト比＆MP4圧縮ガイド',
      subtitle: '重い専用ソフトなしで各SNSの最適解像度へ変換。',
      cards: [
        {
          title: 'YouTube 動画リサイズ (16:9)',
          text: '縦型や正方形の動画をぼかし背景や黒帯付きの1920×1080 HD横画面に変換します。',
        },
        {
          title: 'Instagram・TikTok リサイズ (9:16 & 1:1)',
          text: '横長動画を1080×1920のリール/ショート、または1080×1080の正方形フィードへ美しく切り抜き。',
        },
        {
          title: '無料動画圧縮（MB削減）',
          text: 'CRF品質と720p/480pスケール設定で、MOV・WebM・MP4のファイル容量を手軽に軽量化。',
        },
      ],
    },
    faq: {
      title: 'よくある質問',
      items: [
        {
          q: 'Instagram、TikTok、YouTube向けに透かしなしで動画をリサイズするには？',
          a: 'VideoResizerに動画を読み込み、「9:16 Instagram/TikTok」または「16:9 YouTube」を選択し、切り抜きか余白埋めを選んで変換します。登録不要・完全無料で透かしは入りません。',
        },
        {
          q: 'リサイズ時の「切り抜き」と「余白埋め」の違いは何ですか？',
          a: '切り抜きは画面いっぱいに拡大して端をカットします。余白埋めは映像全体を残し、ぼかし背景または黒枠で空きスペースを補完します。',
        },
        {
          q: '動画はクラウドサーバーにアップロードされますか？',
          a: 'いいえ。VideoResizerはFFmpeg WebAssemblyを使用して端末内で100%ローカル動作するため、動画が外部送信されることはありません。',
        },
        {
          q: 'アプリとしてインストールや一括変換はできますか？',
          a: 'はい、複数ファイルのドロップによる一括リサイズと「ホーム画面に追加」でのPWAインストールに対応しています。',
        },
      ],
    },
    footer: {
      tagline: 'FFmpeg WebAssembly搭載 100%クライアントサイド動画リサイズ＆トリミング。',
      privacyNote: 'アップロード不要。透かしなし。オープンソース。',
    },
  },

  zh: {
    meta: {
      title: '免费在线视频改尺寸与裁剪 — 无水印、零上传本地处理',
      description:
        '100% 免费在线视频调整大小与裁剪工具。直接在浏览器内将 MP4 转换为抖音、TikTok、Instagram 与 YouTube 比例，零上传、无水印。',
      ogImageAlt: 'VideoResizer — 免费在线视频调整尺寸与裁剪工具',
    },
    nav: {
      brand: 'VideoResizer',
      languageSelector: '选择语言',
      toggleTheme: '切换浅色/深色主题',
      github: '在 GitHub 查看 VideoResizer',
      installPwa: '添加到主屏幕',
      pwaInstalled: '已安装',
      pwaInstructions: '请使用浏览器菜单中的“安装应用”或“添加到主屏幕”来安装 VideoResizer。',
      supportDev: '支持开发者',
      supportDevAria: '在 Gumroad 请开发者喝杯咖啡',
      menuToggle: '打开或关闭导航菜单',
    },
    hero: {
      h1: '免费在线视频改尺寸',
    },
    modes: {
      toggleLabel: '切换工具模式',
      social: '社交媒体尺寸',
      crop: '裁剪视频画面',
      aspect: '更改宽高比',
      compress: '压缩视频体积',
    },
    step1: {
      dropTitle: '拖放视频到此处立即调整尺寸',
      dropSubtitle: '支持 MP4、WebM、MOV 及批量处理 — 100% 浏览器内存本地运行，零上传',
      selectBtn: '选择要调整的视频',
      dropActive: '松开鼠标即可加载视频',
      batchTip: '支持同时拖入多个视频进行批量调整',
    },
    step2: {
      presetsTitle: '社交媒体比例预设',
      presets: {
        tiktok: { label: '9:16 竖屏 / TikTok', sub: 'Reels、Shorts 与短视频' },
        square: { label: '1:1 正方形', sub: 'Instagram 与动态信息流' },
        youtube: { label: '16:9 横屏 YouTube', sub: '高清宽屏 1080p' },
        facebook: { label: '4:5 竖版信息流', sub: 'Facebook 移动端推荐' },
        classic: { label: '4:3 经典比例', sub: '标准横屏展示' },
        cinema: { label: '21:9 超宽银幕', sub: '电影宽屏比例' },
      },
      customDimensions: '自定义分辨率',
      widthLabel: '宽度 (px)',
      heightLabel: '高度 (px)',
      lockRatio: '锁定比例',
      fitModeTitle: '画面适配模式',
      fitModes: {
        crop: '裁剪填满',
        cropDesc: '自动缩放并裁剪多余边缘以铺满目标画面',
        padBlur: '模糊背景填充',
        padBlurDesc: '完整保留原视频画面，周围填充柔和模糊背景',
        padBlack: '黑边填充',
        padBlackDesc: '完整保留原视频画面，上下或左右添加纯黑边',
      },
      cropPositionTitle: '裁剪焦点位置',
      positions: {
        center: '居中',
        top: '顶部',
        bottom: '底部',
        left: '左侧',
        right: '右侧',
      },
      compressionTitle: '压缩与画质控制',
      qualityPresets: {
        high: '高清画质 (CRF 22)',
        medium: '网页均衡 (CRF 27)',
        compact: '极限压缩 (CRF 32)',
      },
      resolutionScale: '输出分辨率',
      originalRes: '保持原尺寸',
      muteAudio: '移除音轨',
      livePreviewTitle: '实时比例预览',
      livePreviewHint: '导出前即时查看构图效果',
      originalMeta: '原始',
      targetMeta: '目标',
      batchQueueTitle: '批量队列',
      addMoreBtn: '继续添加',
      clearAllBtn: '重置',
      resizeNowBtn: '开始调整视频',
      resizeBatchBtn: '批量处理全部',
      changeVideoBtn: '更换视频',
    },
    step3: {
      initializing: '正在加载 FFmpeg WebAssembly 引擎...',
      analyzing: '正在读取视频分辨率...',
      processing: '正在调整尺寸与编码优化...',
      finalizing: '正在封装 MP4 文件...',
      batchProgress: '正在处理第 {current} / {total} 个视频',
      privacyBadge: '100% 本地浏览器内存处理 — 零服务器上传，绝对无水印',
      cancelBtn: '取消',
    },
    step4: {
      doneTitle: '视频尺寸调整完成！',
      summaryTemplate: '原始：{origW}×{origH} → 调整后：{newW}×{newH} ({ratio})',
      sizeComparison: '体积：{origSize} → {newSize}',
      downloadBtn: '下载调整后的视频',
      downloadAllBtn: '下载全部 ({count})',
      adjustSettingsBtn: '微调参数',
      resizeAnotherBtn: '处理下一个视频',
    },
    errors: {
      invalidFile: '请选择有效的视频文件（MP4、WebM、MOV、MKV 或 AVI）。',
      ffmpegLoadFailed: '浏览器 FFmpeg 引擎加载失败，请刷新页面后重试。',
      encodeFailed: '当前参数处理失败，请尝试切换预设或分辨率。',
      cancelled: '已取消视频处理。',
    },
    breadcrumbs: {
      home: '首页',
      tools: '视频编辑工具',
      current: '免费在线视频改尺寸',
    },
    explain: {
      sectionTitle: '智能缩放、填充与裁剪引擎',
      sectionSubtitle: '零服务器排队、完全本地私密的在线视频编辑器与比例转换工具。',
      cropCardTitle: '智能裁剪引擎',
      cropCardText: '自动将横竖屏视频无黑边裁剪为 9:16 短视频、1:1 正方形或 4:5 信息流尺寸，画质清晰锐利。',
      padCardTitle: '智能缩放与填充引擎',
      padCardText: '100% 保留原始画面不裁切细节，通过高清模糊背景或纯黑电影边框自然适配目标画幅。',
      privacyCardTitle: '免费视频压缩与 MP4 改尺寸',
      privacyCardText: '依托 FFmpeg WebAssembly 在本地浏览器内存中减小文件 MB 体积，无文件大小门槛、绝无水印。',
    },
    howTo: {
      title: '如何免费在线调整与裁剪视频尺寸',
      subtitle: '只需三步，即可在浏览器中适配 YouTube、Instagram、TikTok 或 Facebook。',
      steps: [
        '将 MP4、MOV 或 WebM 文件拖入 VideoResizer 工作区（或点击“选择要调整的视频”）。',
        '选择目标宽高比（如 TikTok/Reels 的 9:16），并选择“裁剪填满”或“模糊/黑边填充”。',
        '点击“开始调整视频”立即在浏览器本地完成缩放，并下载优化后的 MP4 文件。',
      ],
    },
    comparison: {
      title: 'Kapwing、Canva 与 Clideo 的轻量替代方案',
      subtitle: '为什么创作者更青睐这款无需上传服务器的浏览器视频编辑工具。',
      colFeature: '核心对比',
      colVideoResizer: 'VideoResizer（100% 浏览器本地）',
      colOthers: 'Kapwing / Canva / Adobe Express / Clideo',
      rows: [
        { feature: '免费导出水印', videoResizer: '永不添加 — 100% 无水印', cloudEditors: '免费版常强制附带水印' },
        { feature: '服务器上传', videoResizer: '零上传（浏览器内存直出）', cloudEditors: '需耗时上传并云端排队' },
        { feature: '注册登录要求', videoResizer: '无需账号 — 打开即用', cloudEditors: '导出高清 MP4 需登录' },
        { feature: '文件大小限制', videoResizer: '仅受本地设备内存限制', cloudEditors: '免费版限制 250MB–500MB' },
        { feature: '社交媒体比例预设', videoResizer: '9:16、1:1、16:9、4:5、21:9 + 自定义', cloudEditors: '部分预设需 Pro 订阅' },
      ],
    },
    formatsGuide: {
      title: '各平台宽高比与 MP4 压缩指南',
      subtitle: '无需下载笨重桌面软件，精准输出各大视频平台尺寸。',
      cards: [
        {
          title: 'YouTube 视频改尺寸 (16:9 宽屏)',
          text: '通过模糊背景填充或纯黑电影边距，将竖屏或方形片段无缝转为 1920×1080 高清横屏。',
        },
        {
          title: 'Instagram 与 TikTok 比例转换 (9:16 & 1:1)',
          text: '支持焦点定位裁剪，将横屏素材转为 1080×1920 竖屏短视频或 1080×1080 正方形动态。',
        },
        {
          title: '免费在线视频压缩（减小 MB）',
          text: '通过 CRF 码率控制与 720p/480p 分辨率缩放，快速减小 MOV、WebM 与 MP4 体积。',
        },
      ],
    },
    faq: {
      title: '常见问题解答',
      items: [
        {
          q: '如何无水印调整 Instagram、TikTok 或 YouTube 视频尺寸？',
          a: '将视频导入 VideoResizer，选择“9:16 竖屏 / TikTok”或“16:9 横屏 YouTube”预设，设置裁剪或填充并点击开始。100% 免费、免注册、无水印。',
        },
        {
          q: '调整大小时“裁剪”和“填充”有什么区别？',
          a: '裁剪会放大视频并切除多余边缘以铺满画框；填充则保留完整原始画面，在四周补充模糊背景或黑边。',
        },
        {
          q: '调整视频尺寸时文件会上传到云服务器吗？',
          a: '不会。VideoResizer 通过 FFmpeg WebAssembly 在您的设备本地 100% 运行，视频从不离开浏览器，既省流量又绝对安全。',
        },
        {
          q: '支持批量处理或安装为桌面应用吗？',
          a: '支持！可一次拖入多个视频批量转换，也可点击导航栏“添加到主屏幕”安装为 PWA 应用。',
        },
      ],
    },
    footer: {
      tagline: '基于 FFmpeg WebAssembly 的 100% 浏览器端免费在线视频尺寸调整与裁剪工具。',
      privacyNote: '零上传。无水印。开源免费。',
    },
  },

  ru: {
    meta: {
      title: 'Онлайн Ресайзер и Обрезка Видео — Бесплатно Без Загрузки',
      description:
        '100% бесплатный онлайн ресайзер и кроппер видео. Меняйте размер MP4 для TikTok, Instagram и YouTube в браузере — без загрузки и водяных знаков.',
      ogImageAlt: 'VideoResizer — Бесплатный Онлайн Ресайзер и Обрезка Видео',
    },
    nav: {
      brand: 'VideoResizer',
      languageSelector: 'Выбрать язык',
      toggleTheme: 'Переключить светлую и тёмную тему',
      github: 'Репозиторий VideoResizer на GitHub',
      installPwa: 'На экран «Домой»',
      pwaInstalled: 'Установлено',
      pwaInstructions: 'Используйте меню браузера («Установить приложение» или «На экран Домой»), чтобы установить VideoResizer.',
      supportDev: 'Поддержать Автора',
      supportDevAria: 'Поддержать разработчика на Gumroad',
      menuToggle: 'Открыть или закрыть меню',
    },
    hero: {
      h1: 'Бесплатный Онлайн Ресайзер Видео',
    },
    modes: {
      toggleLabel: 'Переключить режим инструмента',
      social: 'Для соцсетей',
      crop: 'Обрезать видео',
      aspect: 'Соотношение сторон',
      compress: 'Сжать видео',
    },
    step1: {
      dropTitle: 'Перетащите видео сюда для изменения размера',
      dropSubtitle: 'MP4, WebM, MOV и пакетная обработка — 100% приватно в ОЗУ браузера, без загрузок',
      selectBtn: 'Выбрать видео',
      dropActive: 'Отпустите, чтобы загрузить видео',
      batchTip: 'Перетащите одно или несколько видео для пакетной обработки',
    },
    step2: {
      presetsTitle: 'Пресеты для социальных сетей',
      presets: {
        tiktok: { label: '9:16 Instagram/TikTok', sub: 'Reels, Shorts и Истории' },
        square: { label: '1:1 Квадрат', sub: 'Instagram и LinkedIn' },
        youtube: { label: '16:9 YouTube', sub: 'Широкий экран HD 1080p' },
        facebook: { label: '4:5 Facebook', sub: 'Мобильная лента' },
        classic: { label: '4:3 Классика', sub: 'Стандартный формат' },
        cinema: { label: '21:9 Широкоформат', sub: 'Киноформат' },
      },
      customDimensions: 'Свои размеры',
      widthLabel: 'Ширина (px)',
      heightLabel: 'Высота (px)',
      lockRatio: 'Сохранить пропорции',
      fitModeTitle: 'Режим заполнения',
      fitModes: {
        crop: 'Обрезать (Заполнить)',
        cropDesc: 'Заполняет весь кадр, аккуратно обрезая лишние края',
        padBlur: 'Размытый фон',
        padBlurDesc: 'Сохраняет весь кадр целиком на фоне с размытием',
        padBlack: 'Чёрные полосы',
        padBlackDesc: 'Сохраняет весь кадр целиком с чёткими чёрными полями',
      },
      cropPositionTitle: 'Позиция обрезки',
      positions: {
        center: 'Центр',
        top: 'Сверху',
        bottom: 'Снизу',
        left: 'Слева',
        right: 'Справа',
      },
      compressionTitle: 'Сжатие и качество',
      qualityPresets: {
        high: 'Высокое качество (CRF 22)',
        medium: 'Баланс для Web (CRF 27)',
        compact: 'Минимальный размер (CRF 32)',
      },
      resolutionScale: 'Разрешение',
      originalRes: 'Исходный размер',
      muteAudio: 'Удалить звук',
      livePreviewTitle: 'Предпросмотр кадра',
      livePreviewHint: 'Мгновенный предпросмотр перед кодированием',
      originalMeta: 'Исходник',
      targetMeta: 'Результат',
      batchQueueTitle: 'Очередь файлов',
      addMoreBtn: 'Добавить видео',
      clearAllBtn: 'Сброс',
      resizeNowBtn: 'Изменить размер',
      resizeBatchBtn: 'Обработать все',
      changeVideoBtn: 'Сменить видео',
    },
    step3: {
      initializing: 'Загрузка движка WebAssembly FFmpeg...',
      analyzing: 'Чтение параметров видео...',
      processing: 'Изменение размера и оптимизация...',
      finalizing: 'Сохранение файла MP4...',
      batchProgress: 'Обработка видео {current} из {total}',
      privacyBadge: '100% Обработка в ОЗУ Браузера — Без Загрузки на Сервер, Без Водяных Знаков',
      cancelBtn: 'Отмена',
    },
    step4: {
      doneTitle: 'Видео готово!',
      summaryTemplate: 'Исходник: {origW}×{origH} → Результат: {newW}×{newH} ({ratio})',
      sizeComparison: 'Размер: {origSize} → {newSize}',
      downloadBtn: 'Скачать видео',
      downloadAllBtn: 'Скачать все ({count})',
      adjustSettingsBtn: 'Настройки',
      resizeAnotherBtn: 'Другое видео',
    },
    errors: {
      invalidFile: 'Выберите поддерживаемый видеофайл (MP4, WebM, MOV, MKV или AVI).',
      ffmpegLoadFailed: 'Не удалось загрузить FFmpeg в браузере. Обновите страницу и повторите попытку.',
      encodeFailed: 'Ошибка обработки с текущими параметрами. Попробуйте другой пресет.',
      cancelled: 'Обработка отменена.',
    },
    breadcrumbs: {
      home: 'Главная',
      tools: 'Инструменты видео',
      current: 'Бесплатный Онлайн Ресайзер Видео',
    },
    explain: {
      sectionTitle: 'Движок умного масштабирования, заполнения и обрезки',
      sectionSubtitle: 'Быстрый онлайн-редактор видео без серверных очередей и с полной приватностью.',
      cropCardTitle: 'Умная обрезка (Crop)',
      cropCardText: 'Автоматически масштабирует и обрезает видео под 9:16 TikTok, 1:1 Instagram или 4:5 Facebook без рамок.',
      padCardTitle: 'Масштабирование с полями (Scale & Pad)',
      padCardText: 'Сохраняет 100% оригинального изображения без обрезки краёв, добавляя размытый фон или чёрные полосы.',
      privacyCardTitle: 'Бесплатный видеокомпрессор и MP4-ресайзер',
      privacyCardText: 'Уменьшает размер видео в МБ локально в ОЗУ браузера через FFmpeg WebAssembly. Без лимитов и водяных знаков.',
    },
    howTo: {
      title: 'Как бесплатно изменить размер и обрезать видео онлайн',
      subtitle: 'Подготовьте ролики для YouTube, Instagram, TikTok и Facebook за три шага.',
      steps: [
        'Перетащите файл MP4, MOV или WebM в рабочую область VideoResizer (или нажмите «Выбрать видео»).',
        'Выберите нужное соотношение сторон (например, 9:16 для TikTok/Reels) и режим «Обрезать» или «Поля».',
        'Нажмите «Изменить размер» для мгновенной обработки в браузере и скачайте готовый MP4.',
      ],
    },
    comparison: {
      title: 'Лучшая альтернатива Kapwing, Canva и Clideo',
      subtitle: 'Почему авторы выбирают локальный браузерный ресайзер вместо облачных сервисов.',
      colFeature: 'Параметр',
      colVideoResizer: 'VideoResizer (100% Браузер)',
      colOthers: 'Kapwing / Canva / Adobe Express / Clideo',
      rows: [
        { feature: 'Водяной знак бесплатно', videoResizer: 'Никогда — 100% Без знака', cloudEditors: 'Часто ставится без подписки' },
        { feature: 'Загрузка на сервер', videoResizer: 'Ноль загрузок (в ОЗУ)', cloudEditors: 'Долгая загрузка и очереди' },
        { feature: 'Регистрация аккаунта', videoResizer: 'Не нужна — Сразу готово', cloudEditors: 'Нужен вход для экспорта' },
        { feature: 'Лимиты размера файла', videoResizer: 'Ограничено лишь ОЗУ устройства', cloudEditors: 'Лимит 250–500 МБ на бесплатном тарифе' },
        { feature: 'Пресеты для соцсетей', videoResizer: '9:16, 1:1, 16:9, 4:5, 21:9 + Свой', cloudEditors: 'Часть пресетов платная' },
      ],
    },
    formatsGuide: {
      title: 'Справочник форматов и сжатия MP4',
      subtitle: 'Точные размеры для каждой площадки без установки тяжёлых программ.',
      cards: [
        {
          title: 'Ресайзер видео для YouTube (16:9)',
          text: 'Преобразуйте вертикальные или квадратные клипы в чёткий HD 1920×1080 с размытием или чёрными полями.',
        },
        {
          title: 'Для Instagram и TikTok (9:16 и 1:1)',
          text: 'Превращайте горизонтальные ролики в 1080×1920 Reels/Shorts или 1080×1080 для ленты с выбором фокуса.',
        },
        {
          title: 'Бесплатный компрессор видео в МБ',
          text: 'Уменьшайте вес MOV, WebM и MP4 с помощью настройки CRF и масштабирования до 720p или 480p.',
        },
      ],
    },
    faq: {
      title: 'Частые вопросы',
      items: [
        {
          q: 'Как изменить размер видео для Instagram, TikTok или YouTube без водяного знака?',
          a: 'Загрузите ролик в VideoResizer, выберите «9:16 Instagram/TikTok» или «16:9 YouTube», отметьте обрезку или поля и запустите конвертацию. Это 100% бесплатно и без водяных знаков.',
        },
        {
          q: 'В чём разница между обрезкой (Crop) и полями (Pad) при изменении размера?',
          a: 'Обрезка увеличивает видео на весь кадр, отрезая лишние края. Поля сохраняют видео целиком и добавляют чёрные полосы или размытый фон.',
        },
        {
          q: 'Загружаются ли мои видео на облачный сервер?',
          a: 'Нет. VideoResizer работает на 100% локально в вашем браузере через FFmpeg WebAssembly, экономя трафик и гарантируя полную конфиденциальность.',
        },
        {
          q: 'Можно ли установить приложение и обрабатывать файлы пакетом?',
          a: 'Да, перетащите сразу несколько видео для пакетной обработки и нажмите «На экран «Домой»» для установки PWA.',
        },
      ],
    },
    footer: {
      tagline: '100% клиентский ресайзер и кроппер видео на базе FFmpeg WebAssembly.',
      privacyNote: 'Ноль загрузок на сервер. Без водяных знаков. Open Source.',
    },
  },
};

export function getTranslation(locale: Locale): TranslationSchema {
  return ui[locale] ?? ui[DEFAULT_LOCALE];
}

export function getLocalePath(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  if (locale === DEFAULT_LOCALE) {
    return clean ? `/${clean}` : '/';
  }
  return clean ? `/${locale}/${clean}` : `/${locale}/`;
}
