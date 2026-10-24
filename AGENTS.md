# Project rules
- Keep the interactive project spotlight in its own component using existing portfolio assets, so the first-screen showcase stays lightweight and truthful.
- Drive decorative scroll transforms through a single animation-frame callback without React scroll state, so page scrolling does not trigger component rerenders.
- Load the chat widget on first interaction, so its client code is not needed for the initial page.
- Use the shared IntersectionObserver scroll-reveal hook for one-time section entrances, keeping opening content visible and respecting reduced motion; this avoids scroll-triggered React renders and hidden-content failures.