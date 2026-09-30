# Scrollerfir 🌀 (3D Perspective Scroll Pattern)

> **Proprietary 3D Tilt Scroll Pattern** extracted from **Qurabic-Indo** and **ZAFIR; Portfolio**.

---

## 📸 Preview & Behavior
- **Entrance**: When scrolling into the viewport from the bottom, the container leans backward in 3D (`rotateX: 20deg`), creating a physical tablet/paper perspective.
- **Apex Focus**: As the card reaches viewport focus, it smoothly levels out to `rotateX: 0deg` and scales to full 1.0.
- **Exit**: Continues with a smooth exit tilt (`rotateX: -16deg`).
- **Shadow**: Features the signature 6-tier atmospheric elevation shadow.

---

## 📦 Quick Installation / Copy-Paste

Dependencies:
```bash
npm install framer-motion
# or
pnpm add framer-motion
```

Simply copy `Scrollerfir.jsx` into your project's `components/ui/` directory:

```jsx
import React from 'react';
import { Scrollerfir } from '@/components/ui/scrollerfir';

export default function MyShowcase() {
  return (
    <Scrollerfir
      titleComponent={
        <div className="text-center space-y-2 mb-6">
          <span className="text-xs font-mono font-bold text-orange-500 uppercase">
            Featured Engine
          </span>
          <h2 className="text-4xl font-bold">
            Interactive System Showcase
          </h2>
        </div>
      }
    >
      <div className="w-full h-[600px] p-6 bg-neutral-900 rounded-2xl">
        <iframe
          src="https://your-live-app.vercel.app"
          className="w-full h-full border-0 rounded-xl"
        />
      </div>
    </Scrollerfir>
  );
}
```

---

## ⚙️ Props & Customization

| Prop | Type | Default | Description |
|---|---|---|---|
| `titleComponent` | `React.ReactNode` | `undefined` | Header element that parallaxes alongside the scroll. |
| `children` | `React.ReactNode` | `undefined` | Card body, iframe, image, or viewport container. |
| `perspective` | `number` | `1000` | Perspective depth in pixels (`800` ~ `1400`). |
| `rotateRange` | `[number, number]` | `[20, 0]` | Starting tilt and resting flat angle in degrees. |
| `className` | `string` | `""` | Additional CSS classes for outer container. |
| `cardClassName` | `string` | `""` | Additional CSS classes for the 3D card. |

---

## 🎨 Signature Multi-Tier Shadow
```css
box-shadow: 0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003;
```
