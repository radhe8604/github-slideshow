/**
 * OTT News Streaming Platform - JavaScript
 * Handles video playback, channel switching, and stream management
 */

(function() {
  'use strict';

  // Global variables
  let player = null;
  let currentChannel = null;
  let hls = null;

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initializePlayer();
    setupChannelCards();
    setupCustomStreamForm();
    setupFilterButtons();
  });

  /**
   * Initialize Video.js player
   */
  function initializePlayer() {
    const videoElement = document.getElementById('news-player');
    
    if (!videoElement) {
      console.error('Video player element not found');
      return;
    }

    player = videojs('news-player', {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true,
      responsive: true,
      aspectRatio: '16:9',
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      controlBar: {
        volumePanel: {
          inline: false
        }
      }
    });

    // Player event listeners
    player.on('error', function() {
      const error = player.error();
      console.error('Player error:', error);
      showNotification('Error loading stream. Please try another channel.', 'error');
    });

    player.on('loadedmetadata', function() {
      console.log('Stream loaded successfully');
      showNotification('Stream loaded successfully', 'success');
    });

    player.on('playing', function() {
      console.log('Stream is playing');
    });

    console.log('Video.js player initialized');
  }

  /**
   * Setup click handlers for channel cards
   */
  function setupChannelCards() {
    const channelCards = document.querySelectorAll('.channel-card');
    
    channelCards.forEach(card => {
      card.addEventListener('click', function() {
        const channelData = {
          id: this.dataset.channelId,
          name: this.dataset.channelName,
          description: this.dataset.channelDescription,
          streamUrl: this.dataset.streamUrl,
          streamType: this.dataset.streamType
        };
        
        playChannel(channelData, this);
      });
    });

    console.log(`Setup ${channelCards.length} channel cards`);
  }

  /**
   * Play a channel stream
   */
  function playChannel(channelData, cardElement) {
    if (!player) {
      console.error('Player not initialized');
      return;
    }

    // Update UI
    updateChannelInfo(channelData);
    updateActiveCard(cardElement);

    // Store current channel
    currentChannel = channelData;

    // Load stream based on type
    loadStream(channelData.streamUrl, channelData.streamType);
  }

  /**
   * Load stream based on type (HLS, RTMP, SRT, etc.)
   */
  function loadStream(streamUrl, streamType) {
    if (!player || !streamUrl) {
      console.error('Invalid player or stream URL');
      return;
    }

    console.log(`Loading ${streamType} stream:`, streamUrl);

    // Clean up existing HLS instance
    if (hls) {
      hls.destroy();
      hls = null;
    }

    // Stop current playback
    player.pause();

    try {
      if (streamType === 'hls' || streamUrl.includes('.m3u8')) {
        loadHLSStream(streamUrl);
      } else if (streamType === 'dash' || streamUrl.includes('.mpd')) {
        loadDASHStream(streamUrl);
      } else if (streamType === 'rtmp') {
        loadRTMPStream(streamUrl);
      } else if (streamType === 'srt') {
        loadSRTStream(streamUrl);
      } else {
        // Try direct playback
        loadDirectStream(streamUrl);
      }
    } catch (error) {
      console.error('Error loading stream:', error);
      showNotification('Failed to load stream. Please check the URL.', 'error');
    }
  }

  /**
   * Load HLS stream using HLS.js
   */
  function loadHLSStream(streamUrl) {
    const videoElement = document.getElementById('news-player');

    // Check if HLS is natively supported (Safari)
    if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      console.log('Using native HLS support');
      player.src({
        src: streamUrl,
        type: 'application/x-mpegURL'
      });
      player.play();
    } 
    // Use HLS.js for other browsers
    else if (Hls.isSupported()) {
      console.log('Using HLS.js');
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      });

      hls.loadSource(streamUrl);
      hls.attachMedia(videoElement);

      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        console.log('HLS manifest parsed');
        player.play().catch(e => {
          console.log('Autoplay prevented:', e);
          showNotification('Click play to start the stream', 'info');
        });
      });

      hls.on(Hls.Events.ERROR, function(event, data) {
        console.error('HLS error:', data);
        if (data.fatal) {
          switch(data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.log('Network error, trying to recover...');
              hls.startLoad();
              showNotification('Network error. Attempting to reconnect...', 'warning');
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.log('Media error, trying to recover...');
              hls.recoverMediaError();
              showNotification('Media error. Attempting to recover...', 'warning');
              break;
            default:
              console.log('Fatal error, cannot recover');
              hls.destroy();
              showNotification('Fatal error loading stream', 'error');
              break;
          }
        }
      });
    } else {
      console.error('HLS not supported in this browser');
      showNotification('HLS streams are not supported in this browser', 'error');
    }
  }

  /**
   * Load DASH stream
   */
  function loadDASHStream(streamUrl) {
    console.log('Loading DASH stream');
    player.src({
      src: streamUrl,
      type: 'application/dash+xml'
    });
    player.play();
  }

  /**
   * Load RTMP stream
   */
  function loadRTMPStream(streamUrl) {
    console.warn('RTMP streams require Flash or special server-side conversion');
    showNotification('RTMP streams require special handling. Consider converting to HLS.', 'warning');
    
    // RTMP typically requires Flash or server-side conversion to HLS
    // For modern browsers, you'd need to convert RTMP to HLS on the server
    player.src({
      src: streamUrl,
      type: 'rtmp/mp4'
    });
  }

  /**
   * Load SRT stream
   */
  function loadSRTStream(streamUrl) {
    console.warn('SRT streams require server-side conversion to HLS/DASH');
    showNotification('SRT streams require server-side conversion to HLS/DASH', 'warning');
    
    // SRT is typically used for contribution/distribution
    // For playback, it needs to be converted to HLS/DASH on the server
    // This is a placeholder - actual implementation requires backend support
  }

  /**
   * Load direct stream (MP4, WebM, etc.)
   */
  function loadDirectStream(streamUrl) {
    console.log('Loading direct stream');
    player.src({
      src: streamUrl,
      type: 'video/mp4' // Will auto-detect
    });
    player.play();
  }

  /**
   * Update channel information display
   */
  function updateChannelInfo(channelData) {
    const nameElement = document.getElementById('current-channel-name');
    const descElement = document.getElementById('current-channel-description');

    if (nameElement) {
      nameElement.textContent = channelData.name;
    }

    if (descElement) {
      descElement.textContent = channelData.description;
    }
  }

  /**
   * Update active channel card styling
   */
  function updateActiveCard(activeCard) {
    // Remove active class from all cards
    document.querySelectorAll('.channel-card').forEach(card => {
      card.classList.remove('active');
    });

    // Add active class to clicked card
    if (activeCard) {
      activeCard.classList.add('active');
    }
  }

  /**
   * Setup custom stream form
   */
  function setupCustomStreamForm() {
    const form = document.getElementById('custom-stream-form');
    
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const streamUrl = document.getElementById('custom-stream-url').value.trim();
      const streamType = document.getElementById('custom-stream-type').value;

      if (!streamUrl) {
        showNotification('Please enter a stream URL', 'warning');
        return;
      }

      const customChannelData = {
        id: 'custom',
        name: 'Custom Stream',
        description: 'User-provided stream',
        streamUrl: streamUrl,
        streamType: streamType
      };

      // Clear active cards
      updateActiveCard(null);

      // Play custom stream
      updateChannelInfo(customChannelData);
      loadStream(streamUrl, streamType);

      showNotification('Loading custom stream...', 'info');
    });
  }

  /**
   * Setup filter buttons
   */
  function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const channelCards = document.querySelectorAll('.channel-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const category = this.dataset.category;

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter channels
        channelCards.forEach(card => {
          const cardCategory = card.dataset.category;
          
          if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  /**
   * Show notification to user
   */
  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: '10000',
      maxWidth: '400px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      animation: 'slideIn 0.3s ease',
      backgroundColor: type === 'error' ? '#e94560' : 
                       type === 'success' ? '#00d9ff' : 
                       type === 'warning' ? '#ff9800' : '#0f3460'
    });

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Expose functions globally for debugging
  window.streamingPlatform = {
    player: () => player,
    currentChannel: () => currentChannel,
    playChannel: playChannel,
    loadStream: loadStream
  };

  console.log('Streaming platform initialized');
})();
