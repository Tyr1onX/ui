# Third-party component notes

This repository contains adapted visual components inspired by or derived from public upstream implementations.

- Theme Toggle: inspired by Ayushmaan Singh / Serenity UI (MIT).
- Sky Toggle: adapted from Ravi Katiyar's publicly mirrored 21st.dev implementation.
- Cinematic Theme Switcher: adapted from Om Rohilla's public Theme-switcher repository.
- Liquid Glass Button: adapted from the public Designali liquid glass button implementation.
- Button 1 / Button 7: adapted from UI Layout / ui-layouts public implementations.
- Tactile Button: adapted from Meng To / threeui's public Nexus Tactile WebGL source.
- Particle Drift: adapted from Meng To / threeui's public Particle Drift source; the gallery version removes its Tailwind CDN, GSAP, Iconify and Google Fonts runtime dependencies.
- Mac OS Dock: adapted from dhmnpunit's publicly mirrored 21st.dev registry implementation, preserving the cosine magnification model and open-app indicators.
- Spotlight: based directly on ibelick / Motion Primitives' public Spotlight implementation and the current blue grid-pattern usage shown on 21st.dev; upstream is MIT licensed.
- Flipping Card: based on Erik / aghasisahakyan1's 21st.dev implementation; the 3D perspective and hover flip structure are retained.
- Dynamic Island: adapted from Erik / aghasisahakyan1's 21st.dev implementation; spring-layout morphing and blur/scale transitions are retained while demo-specific phone content is generalized into reusable slots.
- Card Stack: adapted from Ruixen UI's public implementation; the fan geometry, drag behavior and spring motion are retained, with Next.js `Link` replaced by a normal anchor for Vite compatibility.
- Gooey Dock: based directly on Ruixen UI's public source, preserving the cosine proximity magnification, lift, labels and optional generated tick sound.
- Animated Gradient Border: based on EaseMize's public 21st.dev implementation with the same conic-gradient animation model and self-contained animation CSS.
- Animated Glow Card: adapted from EaseMize's public 21st.dev glow-card treatment into a self-contained card that does not require the upstream page stylesheet.
- Playing Card: lightweight Vite-friendly reproduction of Maxim Bortnikov's 21st.dev Playing Card. The original depends on Next.js, `@react-three/fiber` and `three`; this gallery variant preserves the layered card/inscription/reveal idea without importing that runtime stack.
- Liquid Glass Card: lightweight reproduction of Ali Imam's 21st.dev liquid-glass card treatment, implemented as a reusable self-contained glass panel for this gallery.

For components whose public upstream source is available, this repository prefers the original implementation and its required dependencies over dependency-reduced visual rewrites. Runtime-only adaptations are limited to fitting components inside isolated gallery tiles, replacing framework-only primitives, or removing unrelated page-level external assets. Components that intentionally use a lightweight reproduction are marked as such in the gallery.
