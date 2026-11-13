function Layout($$renderer, $$props) {
  let { children } = $$props;
  children($$renderer);
  $$renderer.push(`<!---->`);
}

export { Layout as default };
//# sourceMappingURL=layout.svelte-C8Sadd-p.js.map
