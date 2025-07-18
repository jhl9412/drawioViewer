import React from 'react';

interface ToolbarProps {
  onFileOpen: (filePath: string) => void;
  onFileSave: (filePath: string) => void;
  isLoading: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onFileOpen, onFileSave, isLoading }) => {
  const handleOpenFile = () => {
    // This would typically open a file dialog
    // For now, we'll use a mock file path
    onFileOpen('/path/to/file.drawio');
  };

  const handleSaveFile = () => {
    onFileSave('/path/to/file.drawio');
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <button 
          className="toolbar-button"
          onClick={handleOpenFile}
          disabled={isLoading}
        >
          열기
        </button>
        <button 
          className="toolbar-button"
          onClick={handleSaveFile}
          disabled={isLoading || !currentDocument}
        >
          저장
        </button>
      </div>
      
      <div className="toolbar-center">
        <h1 className="app-title">DrawIO Viewer</h1>
      </div>
      
      <div className="toolbar-right">
        <button 
          className="toolbar-button"
          onClick={() => window.electronAPI.minimizeWindow()}
        >
          최소화
        </button>
        <button 
          className="toolbar-button"
          onClick={() => window.electronAPI.maximizeWindow()}
        >
          최대화
        </button>
      </div>
    </div>
  );
}; 