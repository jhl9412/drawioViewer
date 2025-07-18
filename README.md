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