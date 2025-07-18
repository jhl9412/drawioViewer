import React, { useState, useEffect } from 'react';
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';
import { Canvas } from './Canvas';
import { PropertyPanel } from './PropertyPanel';
import { DrawioService } from '../services/drawio-service';
import { FileService } from '../services/file-service';
import { StorageService } from '../services/storage-service';

export const App: React.FC = () => {
  const [currentDocument, setCurrentDocument] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize services
    DrawioService.initialize();
  }, []);

  const handleFileOpen = async (filePath: string) => {
    setIsLoading(true);
    try {
      const document = await window.electronAPI.openFile(filePath);
      setCurrentDocument(document);
    } catch (error) {
      console.error('Failed to open file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSave = async (filePath: string) => {
    if (!currentDocument) return;
    
    try {
      await window.electronAPI.saveFile(filePath, currentDocument);
    } catch (error) {
      console.error('Failed to save file:', error);
    }
  };

  return (
    <div className="app">
      <Toolbar 
        onFileOpen={handleFileOpen}
        onFileSave={handleFileSave}
        isLoading={isLoading}
      />
      <div className="main-content">
        <Sidebar />
        <Canvas 
          document={currentDocument}
          isLoading={isLoading}
        />
        <PropertyPanel />
      </div>
    </div>
  );
}; 