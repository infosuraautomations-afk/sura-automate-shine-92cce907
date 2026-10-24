# Project rules
- Keep the interactive project spotlight in its own component using existing portfolio assets, so the first-screen showcase stays lightweight and truthful.
- Drive decorative 3D scroll transforms through a single demand-rendered R3F frame callback without React scroll state, so scrolling does not rerender components and the scene rests when scrolling stops.
- Load the chat widget on first interaction, so its client code is not needed for the initial page.
- Use the shared IntersectionObserver scroll-reveal hook for one-time section entrances, keeping opening content visible and respecting reduced motion; this avoids scroll-triggered React renders and hidden-content failures.
- Lazy-load the 3D studio near the viewport, derive its material palette from CSS tokens, and use locally generated UI textures with local environment lights, so it needs no external model, font, or HDR requests.