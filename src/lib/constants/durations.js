export const ANIMATION_DURATION_FILTER_MENU = 150;
export const MODAL_FOCUS_DURATION = 20;

// We use a 10px "buffer distance" instead of checking for exact 0 (< 1).
// This accounts for floating-point sub-pixel rendering variations across
// different operating systems, High-DPI (Retina) displays, and browser zoom levels.
// On zoomed or high-density screens, scrollTop + clientHeight might equal
// 1199.4px instead of 1200px, causing exact equality checks (=== 0) to fail even
// when the user has scrolled all the way to the bottom.
export const BUFFER_DISTANCE = 10;
