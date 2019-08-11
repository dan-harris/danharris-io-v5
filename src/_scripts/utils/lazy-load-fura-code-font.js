import { wait } from "./wait";

/**
 * slap the fura code font in via a style tag
 * (we want to lazy load this as it isnt critical & is bigger than we like)
 * TODO: better optimise this process
 */
export async function lazyLoadFuraCodeFont() {
  // delay the instantiation by a tick
  await wait();
  const style = document.createElement("style");
  style.textContent = `
      @font-face {
        font-family: 'FuraCode Nerd Font Mono';
        src: url('/Fura-Code-Retina-Nerd-Font-Complete-Mono.woff') format('woff');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
    `;
  document.head.appendChild(style);
}
