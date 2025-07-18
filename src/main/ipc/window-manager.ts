import { BrowserWindow } from 'electron';

export class WindowManager {
  private windows: Map<string, BrowserWindow> = new Map();

  createWindow(id: string, options: Electron.BrowserWindowConstructorOptions): BrowserWindow {
    const window = new BrowserWindow(options);
    this.windows.set(id, window);
    
    window.on('closed', () => {
      this.windows.delete(id);
    });
    
    return window;
  }

  getWindow(id: string): BrowserWindow | undefined {
    return this.windows.get(id);
  }

  closeWindow(id: string): void {
    const window = this.windows.get(id);
    if (window) {
      window.close();
      this.windows.delete(id);
    }
  }

  closeAllWindows(): void {
    this.windows.forEach(window => window.close());
    this.windows.clear();
  }
} 