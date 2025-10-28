# 🚀 Quick Start Guide - OTT News Streaming Platform

## Get Started in 3 Steps

### Step 1: Build the Jekyll Site

```bash
# Navigate to project directory
cd /vercel/sandbox

# Install dependencies (if not already installed)
bundle install

# Build the site
bundle exec jekyll build

# Or serve locally for development
bundle exec jekyll serve
```

### Step 2: Access the Platform

Open your browser and navigate to:
- **Local**: `http://localhost:4000/streaming.html`
- **Production**: `https://yourdomain.com/streaming.html`

### Step 3: Start Streaming!

1. **Click any channel card** to start watching
2. **Use the filter buttons** to browse by category
3. **Add custom streams** using the form at the bottom

---

## 📺 Adding Your Own Stream URLs

### Quick Add via UI

1. Scroll to "Add Custom Stream" section
2. Paste your stream URL
3. Select stream type (HLS/RTMP/SRT/DASH)
4. Click "Play Stream"

### Permanent Add via Configuration

Edit `_data/channels.yml`:

```yaml
channels:
  - id: 99
    name: "My News Channel"
    description: "My custom news stream"
    logo: "https://example.com/logo.png"
    stream_url: "https://example.com/live/stream.m3u8"
    stream_type: "hls"
    category: "news"
```

Then rebuild Jekyll:
```bash
bundle exec jekyll build
```

---

## 🎯 Common Stream URL Examples

### HLS Stream
```
https://example.com/live/stream/playlist.m3u8
```

### RTMP Stream
```
rtmp://example.com:1935/live/stream
```

### SRT Stream
```
srt://example.com:9000?streamid=live/stream
```

### DASH Stream
```
https://example.com/live/stream/manifest.mpd
```

---

## 🔍 Testing Your Setup

### 1. Check Files Exist

```bash
ls -la _data/channels.yml
ls -la _layouts/streaming.html
ls -la assets/css/streaming.css
ls -la assets/js/streaming.js
ls -la streaming.html
```

### 2. Validate YAML

```bash
# Check channels.yml syntax
ruby -ryaml -e "YAML.load_file('_data/channels.yml')"
```

### 3. Test Build

```bash
# Build and check for errors
bundle exec jekyll build --verbose
```

---

## 🎨 Quick Customization

### Change Colors

Edit `assets/css/streaming.css`:

```css
:root {
  --primary-color: #1a1a2e;      /* Main background */
  --accent-color: #e94560;        /* Buttons, highlights */
  --live-color: #ff3838;          /* Live badge */
}
```

### Change Platform Title

Edit `streaming.html`:

```html
<h1 class="platform-title">📺 Your Platform Name</h1>
```

---

## 🐛 Quick Troubleshooting

### Stream Won't Play?

1. **Open browser console** (F12)
2. **Look for errors** (red text)
3. **Check stream URL** in a new tab
4. **Try different browser** (Safari for HLS)

### Page Not Loading?

1. **Check Jekyll build** for errors
2. **Verify file paths** are correct
3. **Clear browser cache** (Ctrl+Shift+R)
4. **Check _site/ directory** was created

### Styles Not Applying?

1. **Check CSS file path** in layout
2. **Rebuild Jekyll** site
3. **Hard refresh** browser (Ctrl+F5)

---

## 📱 Mobile Testing

### Test on Mobile Device

1. **Find your local IP**: `ifconfig` or `ipconfig`
2. **Serve Jekyll**: `bundle exec jekyll serve --host=0.0.0.0`
3. **Access from mobile**: `http://YOUR_IP:4000/streaming.html`

---

## 🚀 Deployment Options

### GitHub Pages

```bash
# Push to GitHub
git add .
git commit -m "Add OTT streaming platform"
git push origin main

# Enable GitHub Pages in repository settings
# Access at: https://username.github.io/repo-name/streaming.html
```

### Netlify

```bash
# Create netlify.toml
echo 'build.command = "bundle exec jekyll build"
build.publish = "_site"' > netlify.toml

# Deploy via Netlify CLI or drag & drop
```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 📚 Next Steps

1. ✅ **Add more channels** to `_data/channels.yml`
2. ✅ **Customize colors** in `assets/css/streaming.css`
3. ✅ **Test different streams** with custom URL form
4. ✅ **Deploy to production** using your preferred platform
5. ✅ **Share with users** and gather feedback

---

## 💡 Pro Tips

- **Use HLS streams** for best compatibility
- **Test streams** before adding to channels.yml
- **Optimize logos** to 320px width for faster loading
- **Enable HTTPS** for secure streaming
- **Monitor console** for debugging information

---

## 🎉 You're Ready!

Your OTT news streaming platform is now set up and ready to use. Start streaming live news from around the world!

**Need help?** Check the full documentation in `STREAMING_PLATFORM_README.md`

---

**Happy Streaming! 📺✨**
