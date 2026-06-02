# Copy Link First

[English](<https://github.com/JTech-CO/copy-link-first/blob/main/README.md>) | **한국어**

> **X(트위터) 공유 메뉴에서 '링크 복사하기'를 'Chat으로 전송하기' 위로 되돌리는 크롬 확장 프로그램**

<img src="https://raw.githubusercontent.com/JTech-CO/copy-link-first/refs/heads/main/images/pt%205.png" width="100%">

## 1. 소개 (Introduction)

이 프로젝트는 X(트위터) 업데이트로 뒤바뀐 **공유 메뉴 항목 순서**를 되돌리기 위해 개발된 크롬 확장 프로그램입니다.
게시물 공유 버튼(우측 하단 ⬆️)을 눌렀을 때 '링크 복사하기'를 다시 맨 위로 올려, 실수로 'Chat으로 전송하기'를 누르는 일을 막아 사용자에게 예전과 같은 익숙한 사용 경험을 제공합니다.

**주요 기능**
- **메뉴 순서 복원**: 공유 메뉴에서 '링크 복사하기'를 'Chat으로 전송하기' 위로 자동 정렬
- **기능 보존**: CSS가 아닌 DOM 노드 자체를 이동시켜, 클릭 시 각 버튼의 기능이 절대 섞이지 않음
- **다국어 인식**: 한국어·영어 메뉴를 모두 지원하여 해외 사용자까지 대응

## 2. 기술 스택 (Tech Stack)

- **Platform**: Chrome Extension (Manifest V3)
- **Language**: Vanilla JavaScript (ES6+)
- **Core API**: MutationObserver, DOM API
- **Dependencies**: 없음 (빌드 과정·외부 라이브러리 불필요)

## 3. 설치 및 실행 (Quick Start)

**요구 사항**: Chrome (또는 Chromium 기반 브라우저)

크롬 확장 프로그램은 빌드 없이 폴더를 그대로 불러와 사용합니다.

1. **다운로드 (Download)**
   이 폴더(`copy-link-first`)를 PC에 저장합니다.

2. **개발자 모드 (Developer Mode)**
   주소창에 `chrome://extensions` 입력 → 우측 상단 **개발자 모드** 켜기

3. **로드 (Load)**
   **압축해제된 확장 프로그램을 로드** 클릭 → `copy-link-first` 폴더 선택
   이후 `x.com`에서 게시물 공유 버튼(⬆️)을 눌러 동작을 확인합니다.

> 이미 열려 있던 x.com 탭은 설치 후 **새로고침** 해야 적용됩니다.

## 4. 폴더 구조 (Structure)

```text
copy-link-first/
├── manifest.json          # 확장 프로그램 설정 (MV3, x.com 대상)
├── content.js             # 공유 메뉴 감지 + 순서 복원 로직
├── privacy-policy.html    # 개인정보처리방침 (웹 스토어 등록용)
├── icon/                  # 확장 아이콘 — 매니페스트는 PNG 사용, SVG는 원본
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── build_icons.py         # (개발용) 디자인으로부터 PNG 재생성 스크립트
├── README.md              # 프로젝트 문서 (영문)
├── README-KR.md           # 프로젝트 문서 (한글)
├── button.png             # (참고) 게시물 공유 버튼
└── when-button-click.png  # (참고) 공유 메뉴를 펼친 모습
```

## 5. 정보 (Info)

- **License**: MIT
- **Privacy Policy**: [privacy-policy.html](<https://jtech-co.github.io/copy-link-first/privacy-policy.html>)
