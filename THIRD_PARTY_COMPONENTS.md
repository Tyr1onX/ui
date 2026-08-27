# Third-party component notes

This repository contains visual components sourced from or adapted from public upstream implementations. The gallery fidelity badge is intentionally conservative:

- **原版源码 / source**: public upstream source is available and the component implementation is preserved; gallery wrappers or local demo data may differ.
- **最小适配 / adapted**: public upstream source is available, but a small runtime/environment change is required to keep previews isolated or self-contained.
- **复刻待核对 / reproduction**: the 21st visual is known, but a complete trustworthy public upstream source has not been verified.

## Verified source-based components

- Liquid Glass: public source by suraj-xd.
- Aurora Background: public source by Manu Arora / Aceternity UI.
- Spotlight: public Motion Primitives implementation by ibelick (MIT).
- Sky Toggle: public mirror of Ravi Katiyar's 21st component.
- Liquid Glass Button: public Designali implementation.
- Button 7 / Expand Arrow: public UI Layout implementation.
- Mac OS Dock: public mirrors reproduce the 21st component implementation, including responsive sizing, cosine magnification, RAF interpolation, optional GSAP click bounce, and open-app indicators. The gallery only substitutes local self-contained demo icons.
- Progressive Flux Loader: Ruixen UI public registry implementation (MIT).
- Morphing Square: molecule-ui public registry implementation (MIT).

## Source-based with gallery isolation/runtime adaptation

- Theme Toggle: the public Ayushmaan/21st-style implementation uses `next-themes` and changes the document theme. The gallery preserves the moving-knob/icon behavior but keeps theme state local so one tile cannot recolor the whole component browser.
- Curtain Theme Toggle: the public Fatih implementation is restored, including `default` / `appbar` / `icon` variants, design tokens, and the falling/rising curtain timing. Two optional isolation hooks contain the curtain inside a preview tile and prevent global `document.documentElement` dark-class mutation.
- Cinematic Theme Switcher: based on the public Om Rohilla implementation. Visuals, spring motion, and particle burst are preserved while theme state is isolated for the gallery.
- Button 1 / Github Liquid: based on UI Layout's public registry implementation. The 17-color Motion radial-gradient system and seven Liquid layers are preserved; the local component split and gallery wrapper are runtime adaptations.
- Spark Badge: based on Meng To / ThreeUI's public iframe wrapper and local Canvas renderer. The gallery adds sizing/containment around the original isolation model.
- Particle Drift: based on Meng To / ThreeUI's public Particle Drift source. The gallery removes unrelated external runtime resources and keeps the effect self-contained.
- Tactile Button: based on Meng To / ThreeUI's public Nexus Tactile source. The original source relies on a larger isolated HTML/runtime environment, so the gallery implementation remains explicitly marked adapted.

## Reproduction pending verification

- Oceanic Currents: the 21st shader preview is the visual reference, but no complete trustworthy public upstream source matching that specific preset has been verified. The current implementation is an independent zero-dependency WebGL reproduction and must remain marked `reproduction` until a source is found.

For source-available components, this repository prefers the upstream implementation over dependency-reduced visual rewrites. Adaptations should be limited to gallery containment, build-environment compatibility, removal of unrelated external page assets, and other changes required to prevent one demo from affecting the rest of the preview site.
