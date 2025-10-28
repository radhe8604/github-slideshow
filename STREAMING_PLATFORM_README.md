# 📺 Live News Streaming Platform - OTT Platform

A modern, responsive OTT (Over-The-Top) platform for live news streaming built with Jekyll. This platform supports HLS, RTMP, SRT, and DASH streaming protocols.

## 🚀 Features

- **Multi-Protocol Support**: HLS (.m3u8), RTMP, SRT, and DASH streams
- **Pre-configured Channels**: 8 international news channels ready to stream
- **Custom Stream Input**: Add your own stream URLs on the fly
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Channel Filtering**: Filter channels by category (International, Business, News)
- **Live Indicators**: Visual live badges on all channels
- **Video.js Player**: Professional-grade video player with HLS.js support

## 📁 Project Structure

```
/vercel/sandbox/
├── _data/
│   └── channels.yml          # Channel configuration file
├── _layouts/
│   └── streaming.html        # Streaming platform layout
├── assets/
│   ├── css/
│   │   └── streaming.css     # Platform styling
│   └── js/
│       └── streaming.js      # Stream playback logic
└── streaming.html            # Main streaming page
```

## 🎯 How to Use

### 1. Access the Platform

Once Jekyll is built, navigate to `/streaming.html` to access the OTT platform.

### 2. Watch Pre-configured Channels

Click on any channel card to start streaming:
- BBC News
- Al Jazeera English
- France 24
- DW News
- Sky News
- Bloomberg TV
- CGTN News
- Euronews

### 3. Add Custom Streams

Use the "Add Custom Stream" section at the bottom to play your own streams:

1. Enter your stream URL (e.g., `https://example.com/stream/playlist.m3u8`)
2. Select the stream type (HLS, RTMP, SRT, or DASH)
3. Click "Play Stream"

## 🔧 Adding Your Own Channels

Edit `_data/channels.yml` to add more channels:

```yaml
- id: 9
  name: "Your Channel Name"
  description: "Channel description"
  logo: "https://example.com/logo.png"
  stream_url: "https://example.com/stream/playlist.m3u8"
  stream_type: "hls"
  category: "news"
```

### Stream Types Supported

#### HLS (HTTP Live Streaming)
```yaml
stream_url: "https://example.com/stream/playlist.m3u8"
stream_type: "hls"
```

#### RTMP (Real-Time Messaging Protocol)
```yaml
stream_url: "rtmp://example.com/live/stream"
stream_type: "rtmp"
```
**Note**: RTMP requires Flash or server-side conversion to HLS for modern browsers.

#### SRT (Secure Reliable Transport)
```yaml
stream_url: "srt://example.com:port?streamid=stream"
stream_type: "srt"
```
**Note**: SRT requires server-side conversion to HLS/DASH for browser playback.

#### DASH (Dynamic Adaptive Streaming over HTTP)
```yaml
stream_url: "https://example.com/stream/manifest.mpd"
stream_type: "dash"
```

## 🛠️ Technical Details

### Technologies Used

- **Jekyll**: Static site generator
- **Video.js**: HTML5 video player
- **HLS.js**: JavaScript HLS client
- **Vanilla JavaScript**: No framework dependencies
- **CSS3**: Modern styling with animations

### Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest) - Native HLS support
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Video Player Features

- Adaptive bitrate streaming (for HLS)
- Playback speed control (0.5x to 2x)
- Full-screen support
- Volume control
- Progress bar with seeking
- Responsive design

## 📝 Configuration

### Jekyll Configuration

The platform integrates with your existing Jekyll site. Make sure your `_config.yml` includes:

```yaml
# No special configuration needed
# The platform uses Jekyll's data files and layouts
```

### Customizing Styles

Edit `assets/css/streaming.css` to customize:
- Color scheme (CSS variables in `:root`)
- Layout and spacing
- Card designs
- Player styling

### Customizing Behavior

Edit `assets/js/streaming.js` to modify:
- Stream loading logic
- Error handling
- Player configuration
- UI interactions

## 🚀 Building and Deployment

### Local Development

```bash
# Install dependencies
bundle install

# Build the site
bundle exec jekyll build

# Serve locally
bundle exec jekyll serve

# Access at http://localhost:4000/streaming.html
```

### Production Build

```bash
# Build for production
bundle exec jekyll build

# Output will be in _site/ directory
# Deploy _site/ to your web server
```

## 🔒 CORS and Stream Access

**Important**: Some streams may have CORS restrictions or geographic limitations. If a stream doesn't play:

1. Check browser console for CORS errors
2. Verify the stream URL is accessible
3. Check if the stream requires authentication
4. Ensure the stream format is supported

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🎨 Color Scheme

The platform uses a modern dark theme:

- Primary: `#1a1a2e`
- Secondary: `#16213e`
- Accent: `#e94560`
- Card Background: `#0f3460`
- Live Indicator: `#ff3838`
- Success: `#00d9ff`

## 🐛 Troubleshooting

### Stream Won't Play

1. **Check stream URL**: Ensure it's valid and accessible
2. **Check browser console**: Look for error messages
3. **Try different browser**: Some browsers have better codec support
4. **Check network**: Ensure stable internet connection

### HLS Streams Not Working

1. Verify HLS.js is loaded (check browser console)
2. Check if stream uses supported codecs (H.264 video, AAC audio)
3. Try the stream in Safari (native HLS support)

### RTMP/SRT Streams Not Working

These protocols require server-side conversion to HLS/DASH for browser playback. Consider:
- Using a media server (Wowza, Nginx-RTMP)
- Converting streams to HLS format
- Using a CDN that supports protocol conversion

## 📄 License

This project follows the same license as the parent Jekyll project.

## 🤝 Contributing

To add more features:

1. Edit the appropriate files in `_data/`, `_layouts/`, or `assets/`
2. Test locally with Jekyll
3. Build and deploy

## 📞 Support

For issues or questions:
- Check browser console for errors
- Verify stream URLs are valid
- Ensure Jekyll is properly configured
- Check that all asset files are loaded

## 🎉 Credits

- Video.js: https://videojs.com/
- HLS.js: https://github.com/video-dev/hls.js/
- Stream sources: Various international news broadcasters

---

**Enjoy streaming live news from around the world! 📺🌍**
