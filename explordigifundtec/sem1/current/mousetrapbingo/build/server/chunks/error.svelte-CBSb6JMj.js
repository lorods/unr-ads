import { e as escape_html, g as getContext, n as noop } from './index.js-D5mbQJ5k.js';

const is_legacy = noop.toString().includes("$$") || /function \w+\(\) \{\}/.test(noop.toString());
const placeholder_url = "a:";
if (is_legacy) {
  ({
    url: new URL(placeholder_url)
  });
} else {
  new class Page {
    data = {};
    form = null;
    error = null;
    params = {};
    route = { id: null };
    state = {};
    status = -1;
    url = new URL(placeholder_url);
  }();
}
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function Error$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`);
  });
}

export { Error$1 as default };
//# sourceMappingURL=error.svelte-CBSb6JMj.js.map
