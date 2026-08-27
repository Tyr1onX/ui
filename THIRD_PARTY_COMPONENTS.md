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

Where an upstream implementation requires extra framework dependencies (Motion, next-themes, Radix, CVA) or external runtime assets, this repository uses dependency-light React/CSS/Canvas/WebGL adaptations for the gallery while preserving the defining visual interaction.
