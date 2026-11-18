# A Fairytale Made For Farheena 👑❤️
### An Ultra-Premium Interactive Princess Day Website (November 18, 2026)

Built with **React**, **Vite**, **Tailwind CSS**, **Three.js (WebGL 3D Fairytale World)**, **Framer Motion**, **Canvas Confetti**, and **Lucide React**.

Inspired by Cutiepage's *"Princess Castle in 3D"* experience, customized for **Farheena** with personal photos, emotional storytelling, and interactive memories.

---

## ✨ Features & Interactive Flow

1. **The Magical Entrance (Welcome Cover Screen)**
   - Dreamy twilight sky with animated fairytale castle, floating rose petals, glowing moon, twinkling stars, and fluttering butterflies.
   - Romantic animated story progression:
     > *"Once Upon A Time..."*  
     > *"There was a girl who made my entire world beautiful."*  
     > *"And that girl is YOU, Farheena. ❤️"*
   - Audio controller with built-in romantic fairytale music and custom track selection.
   - Large glowing CTA: **"Enter the castle ✨"**

2. **Loading & Exploration Selection**
   - *"Lowering the drawbridge..."* with a golden animated progress bar.
   - **Mode 1: "Take the royal tour 🏰"** — Guided cinematic camera tour gliding through all 10 fairytale stations.
   - **Mode 2: "Walk around 🌸"** — Free-roam 3D exploration with on-screen virtual joystick or keyboard (WASD / Arrow keys).

3. **3D Interactive Fairytale Island (Three.js WebGL)**
   - Shimmering animated water lake surrounding a lush pastel fairytale island.
   - Grand Fairytale Castle with central keep, 4 spires, golden spires, and glowing windows.
   - 10 Interactive Landmarks & Action Modals:
     1. **Your Castle Gates** (`Open the gates` — golden gates swing open with brass fanfare).
     2. **The Rose Garden** (`Pick a rose for her` — kneeling rose presentation & petal burst).
     3. **A Royal Tea Party** (`Pour the tea` — teapot pours with rising steam and teacup clinks).
     4. **The Baby Dragon** (`Wake the dragon` — cute dragon opens eyes, wiggles, and puffs heart smoke).
     5. **The Wishing Well** (`Toss a coin` — coin arcs and splashes with golden ripples).
     6. **The Swan Boat** (`Board the boat` — swan boat glides across the water).
     7. **Your Royal Portrait** (`Unveil portrait` — velvet drape drops to reveal Farheena's portrait).
     8. **Our Dance** (`Dance with her` — synchronized slow waltz in a fairy-lit gazebo).
     9. **The Castle Tower** (`Look at the doves` — white doves flutter into the sky).
     10. **Your Crown** (`Hold to crown her` — interactive radial hold-to-crown coronation!).

4. **The Love Letter Modal 💌**
   - 3D sealed envelope with a wax heart seal reading *"FARHEENA"*.
   - Break seal animation revealing the full handwritten love letter.

5. **Grand Royal Celebration & Fireworks Outro 🎆**
   - Full-screen fireworks, heart confetti explosions, golden sparkles, and calligraphy lighting up the night sky: *"Long live my princess Farheena ❤️"*.

6. **The Last Page & Extended Fairytale Hub**
   - **Closing Card ("Last Page")**: *"Forever my princess"* with WhatsApp reply integration.
   - **Princess Reveal Portrait**: 3D tilt hover frame with animated crown.
   - **"Our Little Universe" Photo Scrapbook**: Polaroid-style photo album with category filters, fullscreen lightbox zoom, and built-in photo uploader/manager with IndexedDB persistence!
   - **10 Reasons Why You're My Princess**: 3D floating flip cards with heartfelt reasons.
   - **Our Love Story Timeline**: Milestones from November 27, 2024 to today and Princess Day 2026.
   - **11:11 Wish Maker**: Night sky with glowing 11:11 clock, shooting star animation, and revealed promise.
   - **Secret Easter Eggs**: Tap the crown 5 times for a royal surprise; secret heart note at the bottom.

---

## 🚀 Running the Project Locally

```bash
# Navigate to the project directory
cd /Users/faheem/.gemini/antigravity/scratch/farheena-fairytale

# Start development server
npm run dev

# Or build and preview production release
npm run build
npm run preview
```

The website is accessible at `http://localhost:5173/`.

---

## 🎨 Customizing Content & Photos

All texts, dates, captions, and milestones can be edited in:
```
src/data/websiteContent.js
```

### Adding / Replacing Photos:
- **Directly via the Web UI**: Click **"Upload Photos"** in the scrapbook section to upload photos right from your phone or laptop. Photos are compressed and saved directly in your browser's local database (`IndexedDB`).
- **Static Assets**: Default photos are located in `public/photos/`.
