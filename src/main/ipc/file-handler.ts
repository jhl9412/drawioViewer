import * as fs from 'fs/promises';
import * as path from 'path';

export interface DrawioDocument {
  xml: string;
  metadata?: {
    title?: string;
    author?: string;
    created?: Date;
    modified?: Date;
  };
}

export type ExportFormat = 'png' | 'jpg' | 'svg' | 'pdf';

export class FileHandler {
  async openFile(filePath: string): Promise<DrawioDocument> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const stats = await fs.stat(filePath);
      
      return {
        xml: content,
        metadata: {
          title: path.basename(filePath, path.extname(filePath)),
          modified: stats.mtime
        }
      };
    } catch (error) {
      throw new Error(`Failed to open file: ${error}`);
    }
  }

  async saveFile(filePath: string, content: DrawioDocument): Promise<void> {
    try {
      await fs.writeFile(filePath, content.xml, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to save file: ${error}`);
    }
  }

  async exportToFormat(format: ExportFormat): Promise<void> {
    // This will be implemented to work with draw.io export functionality
    throw new Error(`Export to ${format} not yet implemented`);
  }
} 