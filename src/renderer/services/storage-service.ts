export class StorageService {
  static async get(key: string): Promise<any> {
    return window.electronAPI.getSetting(key);
  }

  static async set(key: string, value: any): Promise<void> {
    return window.electronAPI.setSetting(key, value);
  }

  static async remove(key: string): Promise<void> {
    // This would remove a setting
    return Promise.resolve();
  }

  static async clear(): Promise<void> {
    // This would clear all settings
    return Promise.resolve();
  }
}