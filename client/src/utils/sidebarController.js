// Módulo simple para conectar el botón ☰ del Header con el Sidebar,
// sin necesidad de pasar props por cada página ni usar Context.

let _openSidebar = () => {};

// App.js llama a esto una sola vez, para "registrar" cómo abrir el sidebar.
export function registerSidebar(openFn) {
  _openSidebar = openFn;
}

// Header.js llama a esto cuando tocan el ☰.
export function openSidebar() {
  _openSidebar();
}