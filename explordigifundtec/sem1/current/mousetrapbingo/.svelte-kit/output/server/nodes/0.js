

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.qZAhiQ6K.js","_app/immutable/chunks/D-T-BJi9.js","_app/immutable/chunks/DvVQD3gv.js","_app/immutable/chunks/84TZfMDv.js"];
export const stylesheets = [];
export const fonts = [];
