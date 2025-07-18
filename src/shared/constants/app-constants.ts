export const APP_NAME = 'DrawIO Viewer';
export const APP_VERSION = '1.0.0';

export const SUPPORTED_FORMATS = {
  INPUT: ['.drawio', '.xml'],
  OUTPUT: ['png', 'jpg', 'svg', 'pdf']
} as const;

export const DEFAULT_SETTINGS = {
  theme: 'light',
  language: 'ko',
  autoSave: true,
  autoSaveInterval: 30000, // 30 seconds
  defaultFormat: 'drawio'
} as const;

export const FILE_SIZE_LIMITS = {
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_IMAGE_SIZE: 10 * 1024 * 1024 // 10MB
} as const; 