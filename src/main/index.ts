import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { FileHandler } from './ipc/file-handler';
import { WindowManager } from './ipc/window-manager';
import { SettingsManager } from './ipc/settings';

class DrawIOViewer {
  private mainWindow: BrowserWindow | null = null;
  private fileHandler: FileHandler;
  private windowManager: WindowManager;
  private settingsManager: SettingsManager;

  constructor() {
    this.fileHandler = new FileHandler();
    this.windowManager = new WindowManager();
    this.settingsManager = new SettingsManager();
    
    this.initializeApp();
  }

  private initializeApp(): void {
    app.whenReady().then(() => {
      this.createMainWindow();
      this.setupIPC();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createMainWindow();
      }
    });
  }

  private createMainWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      },
      icon: path.join(__dirname, '../public/assets/icons/icon.png'),
      titleBarStyle: 'default'
    });

    const startUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : `file://${path.join(__dirname, '../renderer/index.html')}`;
    
    this.mainWindow.loadURL(startUrl);

    if (process.env.NODE_ENV === 'development') {
      this.mainWindow.webContents.openDevTools();
    }
  }

  private setupIPC(): void {
    // File handling
    ipcMain.handle('file:open', async (event, filePath: string) => {
      return await this.fileHandler.openFile(filePath);
    });

    ipcMain.handle('file:save', async (event, filePath: string, content: any) => {
      return await this.fileHandler.saveFile(filePath, content);
    });

    ipcMain.handle('file:export', async (event, format: string) => {
      return await this.fileHandler.exportToFormat(format);
    });

    // Window management
    ipcMain.handle('window:minimize', () => {
      this.mainWindow?.minimize();
    });

    ipcMain.handle('window:maximize', () => {
      if (this.mainWindow?.isMaximized()) {
        this.mainWindow.unmaximize();
      } else {
        this.mainWindow?.maximize();
      }
    });

    // Settings
    ipcMain.handle('settings:get', async (event, key: string) => {
      return await this.settingsManager.get(key);
    });

    ipcMain.handle('settings:set', async (event, key: string, value: any) => {
      return await this.settingsManager.set(key, value);
    });
  }
}

new DrawIOViewer(); 