# Terrain Business Solutions | Interactive 3D Parallax Application

A premium, interactive single-page web application built with **React**, **TypeScript**, **Vite**, **React Three Fiber (R3F)**, **Drei**, **Zustand**, and **Framer Motion**. The application represents the digital ecosystem of **Terrain Business Solutions**, a company that transforms ideas, technology, and strategy into intelligent business solutions.

---

## 🌟 Visual & Interactive Features

### 1. Multi-Stage Scroll Parallax Timeline
The site replaces traditional vertically stacked pages with a unified **scroll-linked 3D parallax slideshow**. As the user scrolls, the 3D logo glides, tilts, rotates, and fades across the screen to match the content of each slide:
*   **Slide 1 (Hero)**: Logo centered at rest; displays the headline *"Building Smarter Business Landscapes."*
*   **Slide 2 (Ideas)**: Logo slides to the right, rotating to highlight its topographical depth.
*   **Slide 3 (Technology)**: Logo slides to the left, rotating to show the opposite side.
*   **Slide 4 (Strategy)**: Logo glides back to the center-right, showing aligned execution details.
*   **Footer**: Logo rises, recedes into the background, and dims to a subtle silhouette as the footer scrolls up naturally.

### 2. 3D Logo Column Cityscape (`InteractiveTerrain.tsx`)
*   **Pixel Scanning**: Scans the pixels of the corporate logo (`logo-header.png`) at runtime using an offscreen HTML5 canvas to dynamically map the coordinates into 3D space.
*   **Tactile Pillars**: Renders active coordinates as tall, shiny metal rectangular columns with rounded geometry, creating a physical "cityscape" relief of the logo.
*   **Anti-gravity Spring Interactions**: Hovering over the logo triggers localized spring physics. The columns under the pointer separate, float upwards/outwards, and turn into the brand's accent gray. They snap back cohesive on pointer out.

### 3. Transparent Header & Fullscreen Drawer
*   **Minimalist Header**: A borderless, transparent navigation header that floats logo branding on the left and a circular hamburger toggle button on the right.
*   **Fullscreen Drawer**: Clicking the hamburger opens a full-screen drawer overlay with a heavy backdrop blur. It reveals navigation links styled with large, bold corporate typography (`ROSTEX`) and skewed slant hover animations.

---

## 🎨 Brand Identity

The styles strictly implement the brand guideline requirements defined in `public/brand/Terrain Business Solutions guideline.pdf`:
*   **Palette**: Primary colors `#000000` (deep contrast text), `#e6e7e8` (light grey background canvas), and `#a7a9ac` (accent gray).
*   **Typography**: Custom headings font `ROSTEX` (loaded via local `@font-face` rules) and geometric body font `Artific` (with Google Fonts' `Outfit` as a high-quality fallback).
*   **Theme**: Clean, reliable, and highly accessible Light Theme.

---

## 🛠️ Technology Stack

*   **Core**: React 19, TypeScript, Vite
*   **3D Scene**: `@react-three/fiber` (R3F Canvas) and `@react-three/drei` (OrbitControls, Center, ShadowMaterial)
*   **Physics Engine**: Custom vector-based spring integration (stiffness & damping forces) running inside the R3F `useFrame` loop.
*   **Global State**: Headless `zustand` store (coordinating hover state and viewport sections).
*   **Animations**: `framer-motion` (for scroll tracking, scroll-linked opacity transforms, and fullscreen menu entrances).
*   **Icons**: `lucide-react`

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd terrain
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Development
Start the local development server with hot module replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
Compile and bundle the project for production:
```bash
npm run build
```
The optimized bundle will be generated under the `dist/` directory. You can preview the production build locally:
```bash
npm run preview
```

---

## 📈 Performance Architecture
*   **No DOM Re-renders**: All 3D rotations, translations, spring-based floating offsets, and color interpolations happen inside R3F `useFrame` hooks. The code directly mutates the matrices (`setMatrixAt`) and colors (`setColorAt`) of the `InstancedMesh` ref, avoiding React lifecycle overhead and keeping frame rates locked at 60fps.
*   **Shadow Catcher**: Instead of solid planes, a transparent ground mesh carrying a `<shadowMaterial>` catches realistic column shadows directly onto the brand background, maintaining high frame rates while projecting real physical depth.
