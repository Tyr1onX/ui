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

For components whose public upstream source is available, this repository now prefers the original implementation and its required dependencies over dependency-reduced visual rewrites. Runtime-only adaptations are limited to fitting components inside isolated gallery tiles or removing unrelated page-level external assets.
