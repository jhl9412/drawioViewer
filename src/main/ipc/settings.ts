import * as fs from 'fs/promises';
import * as path from 'path';
import { app } from 'electron';

export interface AppSettings {
  theme: 'light' | 'dark';
  language: string;
  autoSave: boolean;
  defaultFormat: string;
  windowBounds?: {
    width: number;
    height: number;
    x?: number;
    y?: number;
  };
}

export class SettingsManager {
  private settingsPath: string;
  private settings: AppSettings;

  constructor() {
    this.settingsPath = path.join(app.getPath('userData'), 'settings.json');
    this.settings = this.getDefaultSettings();
    this.loadSettings();
  }

  private getDefaultSettings(): AppSettings {
    return {
      theme: 'light',
      language: 'ko',
      autoSave: true,
      defaultFormat: 'drawio'
    };
  }

  private async loadSettings(): Promise<void> {
    try {
      const data = await fs.readFile(this.settingsPath, 'utf-8');
      this.settings = { ...this.getDefaultSettings(), ...JSON.parse(data) };
    } catch (error) {
      // Use default settings if file doesn't exist or is invalid
      this.settings = this.getDefaultSettings();
    }
  }

  private async saveSettings(): Promise<void> {
    try {
      await fs.writeFile(this.settingsPath, JSON.stringify(this.settings, null, 2));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  async get(key: keyof AppSettings): Promise<any> {
    return this.settings[key];
  }

  async set(key: keyof AppSettings, value: any): Promise<void> {
    this.settings[key] = value;
    await this.saveSettings();
  }

  async getAll(): Promise<AppSettings> {
    return { ...this.settings };
  }
} 