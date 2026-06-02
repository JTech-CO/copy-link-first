// Copy Link First
// ---------------------------------------------------------------------------
// X(트위터) 게시물의 공유 버튼을 누르면 뜨는 드롭다운 메뉴에서
// '링크 복사하기'(Copy link)를 'Chat으로 전송하기'(Send via Chat) 위로
// 다시 올려주는 콘텐츠 스크립트.
//
// 동작 방식
//   1. 공유 버튼을 누르면 X 가 #layers 영역 안에 role="menu" 드롭다운을 만든다.
//   2. MutationObserver 로 이 메뉴가 새로 생기는 순간을 감지한다.
//   3. 메뉴 안에서 '링크 복사하기' 와 'Chat으로 전송하기' 항목을 찾아,
//      DOM 상에서 '링크 복사하기' 가 먼저 오도록 자리만 바꾼다.
//   4. CSS 가 아니라 노드(클릭 핸들러가 붙어있는 그 노드) 자체를 옮기므로
//      각 버튼의 기능은 절대 섞이지 않는다. 위치만 원래대로 되돌아갈 뿐이다.
// ---------------------------------------------------------------------------

(() => {
  "use strict";

  // --- 항목 식별 (한국어 + 영어) -------------------------------------------
  // 해외 사용자도 많으므로 두 언어를 모두 인식한다. 다른 언어가 필요하면
  // 아래 정규식에 해당 번역을 OR( || )로 추가하면 된다.
  const isCopyLink = (text) => /링크\s*복사/.test(text) || /copy link/i.test(text);
  const isSendChat = (text) => /chat으로\s*전송/i.test(text) || /send via chat/i.test(text);

  // 두 노드의 최소 공통 조상(LCA)을 찾는다.
  function lowestCommonAncestor(a, b) {
    const seen = new Set();
    for (let n = a; n; n = n.parentElement) seen.add(n);
    for (let n = b; n; n = n.parentElement) if (seen.has(n)) return n;
    return null;
  }

  // parent 의 직계 자식들 중 node 를 품고 있는 자식을 돌려준다.
  function childContaining(parent, node) {
    let n = node;
    while (n && n.parentElement !== parent) n = n.parentElement;
    return n;
  }

  // 메뉴 하나를 검사해, 필요하면 순서를 바로잡는다.
  // 이미 올바른 순서이면 DOM 을 전혀 건드리지 않는다 (idempotent).
  function tryReorder(menu) {
    const items = menu.querySelectorAll('[role="menuitem"]');
    if (!items.length) return;

    let copyLink = null; // 링크 복사하기
    let sendChat = null; // Chat으로 전송하기
    for (const item of items) {
      const text = (item.textContent || "").replace(/\s+/g, " ").trim();
      if (!copyLink && isCopyLink(text)) copyLink = item;
      if (!sendChat && isSendChat(text)) sendChat = item;
    }
    // 둘 중 하나라도 못 찾으면 이 메뉴는 대상이 아니거나 아직 항목이
    // 다 그려지지 않은 것이다. 아무것도 하지 않는다.
    if (!copyLink || !sendChat) return;

    // 두 메뉴 항목이 공통 조상 아래에서 각각 속한 "행(row)"을 구한다.
    // 같은 부모 아래의 형제이므로 이 둘만 맞바꾸면 된다.
    const ancestor = lowestCommonAncestor(copyLink, sendChat);
    if (!ancestor) return;

    const copyRow = childContaining(ancestor, copyLink);
    const sendRow = childContaining(ancestor, sendChat);
    if (!copyRow || !sendRow || copyRow === sendRow) return;

    // sendRow(Chat으로 전송)가 copyRow(링크 복사) 보다 앞에 있을 때만,
    // copyRow 를 sendRow 앞으로 옮긴다.
    //   - 같은 부모 안에서 형제끼리 자리만 바꾸는 것이라 React 가
    //     나중에 메뉴를 제거(removeChild)할 때도 안전하다.
    //   - 이미 올바른 순서면 분기 안으로 들어가지 않으므로 무한 루프가 없다.
    const relation = copyRow.compareDocumentPosition(sendRow);
    if (relation & Node.DOCUMENT_POSITION_PRECEDING) {
      ancestor.insertBefore(copyRow, sendRow);
    }
  }

  // 메뉴가 나타나면 처리한다. 항목이 비동기로 채워지거나 메뉴가 다시
  // 그려지는 경우까지 대비해, 잠시 동안 메뉴 내부 변화를 계속 지켜본다.
  function handleMenu(menu) {
    if (menu.__xbrHandled) return; // 중복 처리 방지
    menu.__xbrHandled = true;

    tryReorder(menu);

    const inner = new MutationObserver(() => tryReorder(menu));
    inner.observe(menu, { childList: true, subtree: true });
    // 메뉴는 보통 수 초 안에 닫힌다. 관찰자를 영구히 남겨두지 않는다.
    setTimeout(() => inner.disconnect(), 5000);
  }

  // 새로 추가된 노드가 메뉴이거나 메뉴를 포함하는지 확인한다.
  function scanAddedNode(node) {
    if (node.nodeType !== 1) return; // 요소 노드만
    if (node.matches && node.matches('[role="menu"]')) handleMenu(node);
    if (node.querySelectorAll) {
      const menus = node.querySelectorAll('[role="menu"]');
      for (const menu of menus) handleMenu(menu);
    }
  }

  // 전역 관찰자: 공유 드롭다운(role="menu") 이 새로 만들어지는 순간을 감지한다.
  const rootObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) scanAddedNode(node);
    }
  });
  rootObserver.observe(document.documentElement, { childList: true, subtree: true });

  // 스크립트가 로드될 때 이미 열려 있는 메뉴가 있으면 즉시 처리한다.
  document.querySelectorAll('[role="menu"]').forEach(handleMenu);
})();
