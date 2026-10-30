# Project rules
- Keep the interactive project spotlight in its own component using existing portfolio assets, so the first-screen showcase stays lightweight and truthful.
- Drive decorative 3D scroll transforms through a single demand-rendered R3F frame callback without React scroll state, so scrolling does not rerender components and the scene rests when scrolling stops.
- Load the chat widget on first interaction, so its client code is not needed for the initial page.
- Use the shared IntersectionObserver scroll-reveal hook for one-time section entrances, keeping opening content visible and respecting reduced motion; this avoids scroll-triggered React renders and hidden-content failures.
- Load decorative 3D during idle time, derive its palette from CSS tokens, and use local UI textures and environment lights to avoid external asset requests.
- Use one fixed, pointer-transparent canvas with responsive upper/lower lanes and page-wide horizontal model travel, so decoration does not block controls or require a dedicated scroll section.
- Use CDN pointers for uploaded brand media and a small local favicon derived from the same logo, so website and sharing identity remain consistent.