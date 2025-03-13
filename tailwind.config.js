/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/flyonui/flyonui.js',
    './src/**/*.{vue,js,ts}',
    '*.html',
    './node_modules/datatables.net/js/dataTables.min.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
      iconify: {
        // Konfiguration für Iconify
        collections: [
          'material-design',
          'huge',
          'myna-ui',
          'proicons',
          'prime-icons',
          'circum-icons',
          'bitcoin-icons'
        ],
      },
    },
  },
  plugins: [
    require('flyonui'),
    require('flyonui/plugin'),
    require('@iconify/tailwind')  // Füge das Iconify Plugin hinzu
  ],
  flyonui: {
    vendors: true, // Enable vendor-specific CSS generation
    utils: true, // adds responsive and modifier utility classes
    themes: [{
                dark: {
                  "primary": "#856ac1",
                  "primary-content": "#06040e",
                  "secondary": "#a49db4",
                  "secondary-content": "#140d0c",
                  "accent": "#9d54bb",
                  "accent-content": "#ecddf3",
                  "neutral": "#a8a7a9",
                  "neutral-content": "#0a090a",
                  "base-100": "#1a161d",
                  "base-200": "#302d34",
                  "base-300": "#4f4c52",
                  "base-content": "#bdbcbd",
                  "info": "#1cadca",
                  "info-content": "#000b0f",
                  "success": "#76b279",
                  "success-content": "#050c05",
                  "warning": "#f1c40f",
                  "warning-content": "#140e00",
                  "error": "#cf5151",
                  "error-content": "#100202",

                  "--rounded-box": "8px", // border-radius für größere Boxen
                  "--rounded-btn": "8px", // border-radius für Buttons
                  "--rounded-tooltip": "1.9rem", // border-radius für Tooltips
                  "--animation-btn": "0.25s", // Animationsdauer für Button-Klicks
                  "--animation-input": "0.2s", // Animationsdauer für Eingaben (z. B. Checkboxen, Schalter)
                  "--btn-focus-scale": "0.95", // Skalierung der Buttons beim Fokussieren
                  "--border-btn": "1px", // Button-Rahmenbreite
                  "--tab-border": "1px", // Tab-Rahmenbreite
                  "--tab-radius": "8px",  // Tab-Eckenradius
                  "--rounded-checkbox": "4px" // Eckenradius für Checkboxen
                }
              },
              {
                light: {
                  "primary": "#856ac1",
                  "primary-content": "#06040e",
                  "secondary": "#a49db4",
                  "secondary-content": "#140d0c",
                  "accent": "#9d54bb",
                  "accent-content": "#ecddf3",
                  "neutral": "#a39fa8",
                  "neutral-content": "#0a090a",
                  "base-100": "#f0edf2",
                  "base-200": "#d1ced2",
                  "base-300": "#b2b0b4",
                  "base-content": "#141414",
                  "info": "#1cadca",
                  "info-content": "#000b0f",
                  "success": "#529455",
                  "success-content": "#050c05",
                  "warning": "#f1c40f",
                  "warning-content": "#140e00",
                  "error": "#cf5151",
                  "error-content": "#100202",

                  "--rounded-box": "8px", // border-radius für größere Boxen
                  "--rounded-btn": "8px", // border-radius für Buttons
                  "--rounded-tooltip": "1.9rem", // border-radius für Tooltips
                  "--animation-btn": "0.25s", // Animationsdauer für Button-Klicks
                  "--animation-input": "0.2s", // Animationsdauer für Eingaben (z. B. Checkboxen, Schalter)
                  "--btn-focus-scale": "0.95", // Skalierung der Buttons beim Fokussieren
                  "--border-btn": "1px", // Button-Rahmenbreite
                  "--tab-border": "1px", // Tab-Rahmenbreite
                  "--tab-radius": "0.5rem", // Tab-Eckenradius
                  "--rounded-checkbox": "4px"  // Eckenradius für Checkboxen
                }
              }],
  },
};
