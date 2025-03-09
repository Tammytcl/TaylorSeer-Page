document.addEventListener('DOMContentLoaded', () => {
  const folders = [/* 原有文件夹配置保持不变 */];
  let currentFolderIndex = 0;
  const largeVideo = document.getElementById('large-video');
  const gridVideos = document.querySelectorAll('.grid-video');

  // 视频结束监听器
  const handleVideoEnd = () => {
    currentFolderIndex = (currentFolderIndex + 1) % folders.length;
    updateVideos();
  };

  // 添加视频结束监听
  const addEndListener = (video) => {
    video.addEventListener('ended', handleVideoEnd);
  };

  const updateVideos = () => {
    const folder = folders[currentFolderIndex];

    // 移除旧的事件监听
    largeVideo.removeEventListener('ended', handleVideoEnd);
    gridVideos.forEach(video => video.removeEventListener('ended', handleVideoEnd));

    // 更新视频源
    const largeSource = largeVideo.querySelector('source');
    largeSource.src = `static/videos/Video/${folder}/${largeSource.dataset.filename}`;
    largeVideo.load().then(() => {
      largeVideo.play().catch(e => console.log('Autoplay blocked:', e));
      addEndListener(largeVideo); // 添加新的事件监听
    });

    gridVideos.forEach(video => {
      const source = video.querySelector('source');
      source.src = `static/videos/Video/${folder}/${source.dataset.filename}`;
      video.load().then(() => {
        video.play().catch(e => console.log('Autoplay blocked:', e));
        addEndListener(video); // 添加新的事件监听
      });
    });

    // 更新场景显示
    document.getElementById('folder-name').textContent =
      `当前场景: ${displayNames[folder] || folder}`;
  };

  // 初始化
  updateVideos();
});