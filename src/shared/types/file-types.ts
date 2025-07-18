export interface FileInfo {
  path: string;
  name: string;
  size: number;
  modified: Date;
  created: Date;
}

export interface FileOperation {
  type: 'open' | 'save' | 'export';
  filePath?: string;
  format?: string;
  content?: any;
}

export interface FileOperationResult {
  success: boolean;
  data?: any;
  error?: string;
} 