/**
 * Spread onto any element inside <Reveal> to make it a staggered reveal child.
 * Lives outside the "use client" reveal module so Server Components get the real object
 * (values exported from a client module become client references and the animation never runs).
 */
export const reveal = { "data-reveal": "" } as const;
