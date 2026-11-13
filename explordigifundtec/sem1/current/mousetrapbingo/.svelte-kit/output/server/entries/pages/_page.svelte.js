import { a5 as head } from "../../chunks/index.js";
import { T as TournamentAdmin } from "../../chunks/TournamentAdmin.js";
function _page($$renderer) {
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Mousetrap Bingo — Administração do Torneio</title>`);
    });
  });
  TournamentAdmin($$renderer);
}
export {
  _page as default
};
