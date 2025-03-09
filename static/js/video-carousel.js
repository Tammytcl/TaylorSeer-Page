document.addEventListener('DOMContentLoaded', () => {
  // 视频文件夹配置
  const folders = [
    'a car stuck in traffic during rush hour',
    'a donut and a suitcase',
  ];

  let currentFolderIndex = 0;

  // 获取所有视频元素
  const largeVideo = document.getElementById('large-video');
  const gridVideos = document.querySelectorAll('.grid-video');

  // 更新视频源函数
  const updateVideos = () => {
    const folder = folders[currentFolderIndex];
    
    // 更新大视频
    const largeSource = largeVideo.querySelector('source');
    largeSource.src = `static/videos/Video/${folder}/${largeSource.dataset.filename}`;
    largeVideo.load();

    // 更新小视频
    gridVideos.forEach(video => {
      const source = video.querySelector('source');
      source.src = `static/videos/Video/${folder}/${source.dataset.filename}`;
      video.load();
      video.play().catch(e => console.log('Autoplay blocked:', e));
    });

    // 更新文件夹显示
    document.getElementById('folder-name').textContent = 
      `Current Scene: ${folder.replace(/-/g, ' ')}`;
  };

  // 按钮事件监听
  document.getElementById('next-folder').addEventListener('click', () => {
    currentFolderIndex = (currentFolderIndex + 1) % folders.length;
    updateVideos();
  });

  document.getElementById('prev-folder').addEventListener('click', () => {
    currentFolderIndex = (currentFolderIndex - 1 + folders.length) % folders.length;
    updateVideos();
  });

  // 初始化
  updateVideos();
});