# Copy Link First

**English** | [한국어](<https://github.com/JTech-CO/copy-link-first/blob/main/README-KR.md>)

> **A Chrome extension that moves "Copy link" back above "Send via Chat" in the X (Twitter) share menu.**

## 1. Introduction

This project is a Chrome extension built to restore the **share menu order** that an X (Twitter) update swapped around.
When you tap the share button at the bottom-right of a post (⬆️), it puts "Copy link" back on top — preventing accidental taps on "Send via Chat" and bringing back the familiar experience users are used to.

**Features**
- **Menu order restore**: Automatically places "Copy link" (링크 복사하기) above "Send via Chat" (Chat으로 전송하기) in the share menu
- **Behavior preserved**: Moves the actual DOM node instead of using CSS, so each button's action is never mixed up when clicked
- **Multilingual detection**: Recognizes both Korean and English menus, covering overseas users

## 2. Tech Stack

- **Platform**: Chrome Extension (Manifest V3)
- **Language**: Vanilla JavaScript (ES6+)
- **Core API**: MutationObserver, DOM API
- **Dependencies**: None (no build step or external libraries)

## 3. Quick Start

**Requirements**: Chrome (or any Chromium-based browser)

A Chrome extension runs by loading the folder directly — no build step needed.

1. **Download**
   Save this folder (`copy-link-first`) to your PC.

2. **Developer Mode**
   Go to `chrome://extensions` in the address bar → turn on **Developer mode** (top-right).

3. **Load**
   Click **Load unpacked** → select the `copy-link-first` folder.
   Then open `x.com` and tap a post's share button (⬆️) to verify.

> x.com tabs that were already open need a **refresh** after installation.

## 4. Structure

```text
copy-link-first/
├── manifest.json          # Extension config (MV3, targets x.com)
├── content.js             # Share-menu detection + reordering logic
├── privacy-policy.html    # Privacy policy (for the Web Store listing)
├── icon/                  # Extension icons — PNG used by manifest, SVG = source
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── build_icons.py         # Dev-only helper that regenerates the PNGs
├── README.md              # Project docs (English)
├── README-KR.md           # Project docs (Korean)
├── button.png             # (ref) post share button
└── when-button-click.png  # (ref) the share menu, expanded
```

## 5. Info

- **License**: MIT
- **Privacy Policy**: [privacy-policy.html](privacy-policy.html)
