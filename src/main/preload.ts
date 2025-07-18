import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  openFile: (filePath: string) => ipcRenderer.invoke('file:open', filePath),
  saveFile: (filePath: string, content: any) => ipcRenderer.invoke('file:save', filePath, content),
  exportFile: (format: string) => ipcRenderer.invoke('file:export', format),
  
  // Window operations
  minimizeWindow: () => ipcRenderer.invoke('window:minimize'),
  maximizeWindow: () => ipcRenderer.invoke('window:maximize'),
  
  // Settings
  getSetting: (key: string) => ipcRenderer.invoke('settings:get', key),
  setSetting: (key: string, value: any) => ipcRenderer.invoke('settings:set', key, value)
});

declare global {
  interface Window {
    electronAPI: {
      openFile: (filePath: string) => Promise<any>;
      saveFile: (filePath: string, content: any) => Promise<void>;
      exportFile: (format: string) => Promise<void>;
      minimizeWindow: () => Promise<void>;
      maximizeWindow: () => Promise<void>;
      getSetting: (key: string) => Promise<any>;
      setSetting: (key: string, value: any) => Promise<void>;
    };
  }
} 