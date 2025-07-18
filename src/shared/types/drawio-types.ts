export interface DrawioDocument {
  xml: string;
  metadata?: DrawioMetadata;
}

export interface DrawioMetadata {
  title?: string;
  author?: string;
  created?: Date;
  modified?: Date;
  version?: string;
}

export interface DrawioShape {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style?: Record<string, any>;
}

export interface DrawioConnection {
  id: string;
  source: string;
  target: string;
  style?: Record<string, any>;
} 