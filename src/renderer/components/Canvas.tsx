import React, { useEffect, useRef } from 'react';
import { DrawioService } from '../services/drawio-service';

interface CanvasProps {
  document: any;
  isLoading: boolean;
}

export const Canvas: React.FC<CanvasProps> = ({ document, isLoading }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document && canvasRef.current) {
      DrawioService.loadDocument(document.xml);
    }
  }, [document]);

  if (isLoading) {
    return (
      <div className="canvas loading">
        <div className="loading-spinner">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="canvas" ref={canvasRef}>
      <div id="drawio-container"></div>
    </div>
  );
};
