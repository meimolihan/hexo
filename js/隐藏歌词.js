document.addEventListener("DOMContentLoaded", function() {
  // 双重保险：DOM加载完成 + 延迟检测
  function toggleLyric() {
    var lrcButton = document.querySelector(".aplayer-icon-lrc");
    if (lrcButton && !lrcButton.classList.contains('aplayer-icon-lrc-inactivity')) {
      lrcButton.click();
    } else if (!lrcButton) {
      setTimeout(toggleLyric, 200); // 每隔200ms重试
    }
  }
  
  // 首次执行
  toggleLyric();
  
  // 监听播放器创建（适配动态加载场景）
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length) {
        toggleLyric();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});