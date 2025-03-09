document.addEventListener('DOMContentLoaded', () => {
  // 视频文件夹配置
  const folders = [
    'a car stuck in traffic during rush hour',
    'a donut and a suitcase',
      'a horse running to join a herd of its kind',
      'a horse taking a peaceful walk',
      'a knife on the left of a spoon, front view',
      'a motorcycle on the left of a bus, front view',
      'a motorcycle turning a corner',
      'A person is arranging flowers',
      'A person is playing flute',
      'A robot DJ is playing',
      'A tranquil tableau of a dining table',
      'A tranquil tableau of restaurant',
      'a truck and a bicycle',
      'An astronaut flying in space, pan right',
      'Clown fish swimming through the coral reef',
      'tower',
  ];

  // 更友好的显示名称
  const displayNames = {
    'a car stuck in traffic during rush hour': '交通堵塞场景',
    'a donut and a suitcase': '甜甜圈和手提箱'
  };

  let currentFolderIndex = 0;

  // 获取所有视频元素
  const largeVideo = document.getElementById('large-video');
  const gridVideos = document.querySelectorAll('.grid-video');

  // 添加加载指示器
  const addLoadingIndicator = (videoElement) => {
    const parent = videoElement.parentElement;
    const loader = document.createElement('div');
    loader.className = 'video-loading';
    loader.innerHTML = '<div class="loading-spinner"></div>';
    parent.appendChild(loader);

    videoElement.addEventListener('canplay', () => {
      const loaderElement = parent.querySelector('.video-loading');
      if (loaderElement) {
        loaderElement.remove();
      }
    });
  };

  // 初始添加加载指示器
  addLoadingIndicator(largeVideo);
  gridVideos.forEach(video => addLoadingIndicator(video));

  // 更新视频源函数
  const updateVideos = () => {
    const folder = folders[currentFolderIndex];

    // 添加过渡效果
    document.querySelectorAll('.video-group, .large-video').forEach(el => {
      el.style.opacity = '0.5';
      el.style.transition = 'opacity 0.3s ease';
    });

    // 更新大视频
    const largeSource = largeVideo.querySelector('source');
    largeSource.src = `static/videos/Video/${folder}/${largeSource.dataset.filename}`;
    largeVideo.load();

    // 给大视频添加加载指示器
    addLoadingIndicator(largeVideo);

    // 尝试自动播放大视频
    largeVideo.play().catch(e => console.log('Autoplay blocked:', e));

    // 更新小视频
    gridVideos.forEach(video => {
      const source = video.querySelector('source');
      source.src = `static/videos/Video/${folder}/${source.dataset.filename}`;

      // 给每个小视频添加加载指示器
      addLoadingIndicator(video);

      video.load();
      video.play().catch(e => console.log('Autoplay blocked:', e));
    });

    // 更新文件夹显示 - 使用友好名称
    document.getElementById('folder-name').textContent =
      `当前场景: ${displayNames[folder] || folder}`;

    // 恢复透明度
    setTimeout(() => {
      document.querySelectorAll('.video-group, .large-video').forEach(el => {
        el.style.opacity = '1';
      });
    }, 300);
  };

  // 添加切换动画
  const animateButton = (button) => {
    button.classList.add('is-loading');
    setTimeout(() => {
      button.classList.remove('is-loading');
    }, 300);
  };

  // 按钮事件监听
  const nextButton = document.getElementById('next-folder');
  const prevButton = document.getElementById('prev-folder');

  nextButton.addEventListener('click', () => {
    animateButton(nextButton);
    currentFolderIndex = (currentFolderIndex + 1) % folders.length;
    updateVideos();
  });

  prevButton.addEventListener('click', () => {
    animateButton(prevButton);
    currentFolderIndex = (currentFolderIndex - 1 + folders.length) % folders.length;
    updateVideos();
  });

  // 添加加载样式
  const style = document.createElement('style');
  style.textContent = `
    .video-loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0,0,0,0.1);
      z-index: 10;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s ease-in-out infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .video-group, .large-video {
      position: relative;
    }
  `;
  document.head.appendChild(style);

  // 初始化
  updateVideos();
});