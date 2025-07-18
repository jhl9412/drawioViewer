import React from 'react';

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>도형</h3>
        <div className="shape-list">
          <div className="shape-item">사각형</div>
          <div className="shape-item">원</div>
          <div className="shape-item">선</div>
          <div className="shape-item">화살표</div>
        </div>
      </div>
      
      <div className="sidebar-section">
        <h3>템플릿</h3>
        <div className="template-list">
          <div className="template-item">플로우차트</div>
          <div className="template-item">UML 다이어그램</div>
          <div className="template-item">네트워크 다이어그램</div>
        </div>
      </div>
    </div>
  );
};
```

```typescript:src/renderer/components/Canvas.tsx
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
```

```typescript:src/renderer/components/PropertyPanel.tsx
import React from 'react';

export const PropertyPanel: React.FC = () => {
  return (
    <div className="property-panel">
      <h3>속성</h3>
      <div className="property-group">
        <label>선 색상</label>
        <input type="color" defaultValue="#000000" />
      </div>
      <div className="property-group">
        <label>선 두께</label>
        <input type="range" min="1" max="10" defaultValue="1" />
      </div>
      <div className="property-group">
        <label>채우기 색상</label>
        <input type="color" defaultValue="#ffffff" />
      </div>
    </div>
  );
};
```

이제 서비스 레이어를 생성하겠습니다:

```typescript:src/renderer/services/drawio-service.ts
export class DrawioService {
  private static isInitialized = false;

  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Load draw.io library
    await this.loadDrawioLibrary();
    this.isInitialized = true;
  }

  private static async loadDrawioLibrary(): Promise<void> {
    // This would load the draw.io JavaScript library
    // For now, we'll create a mock implementation
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  static loadDocument(xml: string): void {
    if (!this.isInitialized) {
      throw new Error('DrawioService not initialized');
    }

    // This would load the XML into draw.io
    console.log('Loading document:', xml);
  }

  static saveDocument(): string {
    if (!this.isInitialized) {
      throw new Error('DrawioService not initialized');
    }

    // This would get the current document XML from draw.io
    return '<mxfile><diagram>...</diagram></mxfile>';
  }

  static async exportToFormat(format: string): Promise<Blob> {
    if (!this.isInitialized) {
      throw new Error('DrawioService not initialized');
    }

    // This would export the current document to the specified format
    return new Blob(['exported content'], { type: 'image/png' });
  }
}
```

```typescript:src/renderer/services/file-service.ts
export class FileService {
  static async readFile(filePath: string): Promise<string> {
    // This would read a file from the filesystem
    return new Promise((resolve) => {
      setTimeout(() => resolve('file content'), 1000);
    });
  }

  static async writeFile(filePath: string, content: string): Promise<void> {
    // This would write content to a file
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }

  static async exportFile(content: string, format: string): Promise<Blob> {
    // This would export the content to the specified format
    return new Blob([content], { type: 'application/octet-stream' });
  }
}
```

```typescript:src/renderer/services/storage-service.ts
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
```

이제 스타일 파일들을 생성하겠습니다:

```css:src/renderer/styles/main.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
}

.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  height: 60px;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  gap: 8px;
}

.toolbar-center {
  flex: 1;
  text-align: center;
}

.app-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.toolbar-button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #ffffff;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar-button:hover {
  background-color: #f0f0f0;
}

.toolbar-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sidebar {
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  padding: 16px;
  overflow-y: auto;
}

.sidebar-section {
  margin-bottom: 24px;
}

.sidebar-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.shape-item,
.template-item {
  padding: 8px 12px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.shape-item:hover,
.template-item:hover {
  background-color: #f0f0f0;
}

.canvas {
  flex: 1;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
}

.canvas.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  font-size: 16px;
  color: #666;
}

.property-panel {
  width: 250px;
  background-color: #ffffff;
  border-left: 1px solid #e0e0e0;
  padding: 16px;
  overflow-y: auto;
}

.property-panel h3 {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.property-group {
  margin-bottom: 16px;
}

.property-group label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.property-group input {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 12px;
}

.property-group input[type="color"] {
  height: 32px;
  padding: 2px;
}

.property-group input[type="range"] {
  height: 20px;
}
```

```css:src/renderer/styles/components.css
/* Additional component-specific styles can be added here */
```

이제 공유 타입과 상수를 정의하겠습니다:

```typescript:src/shared/types/file-types.ts
export interface FileInfo {
  path: string;
  name: string;
  size: number;
  modified: Date;
  created: Date;
}

export interface FileOperation {
  type: 'open' | 'save' | 'export';
  filePath?: string;
  format?: string;
  content?: any;
}

export interface FileOperationResult {
  success: boolean;
  data?: any;
  error?: string;
}
```

```typescript:src/shared/types/drawio-types.ts
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
```

```typescript:src/shared/constants/app-constants.ts
export const APP_NAME = 'DrawIO Viewer';
export const APP_VERSION = '1.0.0';

export const SUPPORTED_FORMATS = {
  INPUT: ['.drawio', '.xml'],
  OUTPUT: ['png', 'jpg', 'svg', 'pdf']
} as const;

export const DEFAULT_SETTINGS = {
  theme: 'light',
  language: 'ko',
  autoSave: true,
  autoSaveInterval: 30000, // 30 seconds
  defaultFormat: 'drawio'
} as const;

export const FILE_SIZE_LIMITS = {
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_IMAGE_SIZE: 10 * 1024 * 1024 // 10MB
} as const;
```

마지막으로 빌드 스크립트들을 생성하겠습니다:

```bash:scripts/build.sh
#!/bin/bash

echo "Building DrawIO Viewer..."

# Clean previous build
npm run clean

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the application
echo "Building application..."
npm run build

echo "Build completed successfully!"
```

```bash:scripts/package.sh
#!/bin/bash

echo "Packaging DrawIO Viewer for Linux..."

# Build the application first
./scripts/build.sh

# Package for different Linux formats
echo "Creating AppImage..."
npm run package:appimage

echo "Creating Snap package..."
npm run package:snap

echo "Packaging completed!"
```

```bash:scripts/install-drawio.sh
#!/bin/bash

echo "Installing draw.io source..."

# Create public/drawio directory if it doesn't exist
mkdir -p public/drawio

# Clone draw.io repository (you would need to replace with actual draw.io source)
# For now, we'll create a placeholder
echo "Creating draw.io placeholder..."
cat > public/drawio/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Draw.IO Integration</title>
</head>
<body>
    <div id="drawio-container">
        <p>Draw.IO will be integrated here</p>
    </div>
</body>
</html>
EOF

echo "Draw.IO installation completed!"
```

마지막으로 설정 파일들을 생성하겠습니다:

```json:electron-builder.json
{
  "appId": "com.drawioviewer.app",
  "productName": "DrawIO Viewer",
  "directories": {
    "output": "dist-build"
  },
  "files": [
    "dist/**/*",
    "public/**/*",
    "node_modules/**/*"
  ],
  "linux": {
    "target": [
      "AppImage",
      "snap",
      "deb"
    ],
    "category": "Graphics",
    "icon": "public/assets/icons/icon.png"
  },
  "snap": {
    "summary": "Draw.IO Viewer for Linux",
    "description": "A native Linux desktop application for viewing and editing draw.io diagrams"
  }
}
```

```gitignore:.gitignore
# Dependencies
node_modules/

# Build outputs
dist/
dist-build/

# Development
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

```markdown:README.md
# DrawIO Viewer

리눅스 데스크톱용 draw.io 뷰어 애플리케이션입니다.

## 기능

- draw.io 파일 열기 및 편집
- 다양한 형식으로 내보내기 (PNG, JPG, SVG, PDF)
- 네이티브 리눅스 데스크톱 통합
- 다크 모드 지원
- 자동 저장 기능

## 설치

### 개발 환경

```bash
# 의존성 설치
npm install

# draw.io 소스 설치
./scripts/install-drawio.sh

# 개발 서버 실행
npm run dev
```

### 빌드

```bash
# 애플리케이션 빌드
./scripts/build.sh

# 패키지 생성
./scripts/package.sh
```

## 사용법

1. 애플리케이션을 실행합니다
2. "열기" 버튼을 클릭하여 draw.io 파일을 선택합니다
3. 파일을 편집합니다
4. "저장" 버튼을 클릭하여 변경사항을 저장합니다

## 라이선스

MIT License
```

이제 프로젝트 구조가 완성되었습니다! 이 구조를 기반으로 하면:

1. **Electron**을 사용한 크로스 플랫폼 데스크톱 애플리케이션
2. **TypeScript**로 타입 안전성 확보
3. **React**로 모던한 UI 구성
4. **draw.io** 통합을 위한 서비스 레이어
5. **IPC 통신**을 통한 메인/렌더러 프로세스 분리
6. **설정 관리** 및 파일 처리 기능

모든 파일이 생성되었습니다. 이제 다음 단계로 진행할 수 있습니다:

1. `npm install`로 의존성 설치
2. `npm run dev`로 개발 서버 실행
3. draw.io 실제 소스 통합
4. 기능 구현 및 테스트

특정 부분에 대해 더 자세한 설명이나 수정이 필요하시면 말씀해 주세요! 