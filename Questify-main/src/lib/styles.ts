// Diese Datei enthält gemeinsam genutzte CSS-Klassen für Formulare und Buttons.
// Weil mehrere Formulare in der App gleich aussehen sollen, stehen die Stile hier zentral.
// So reicht eine Änderung hier, damit alle Formulare sofort gleich aussehen.

// Stil für alle Text-Eingabefelder (einfaches Textfeld, Auswahl-Liste, etc.)
export const inputClass =
  'mt-1.5 w-full bg-[rgba(7,8,15,0.8)] border border-[rgba(96,232,255,0.12)] text-white text-sm px-3 py-2.5 rounded-sm ' +
  'focus:border-[rgba(96,232,255,0.5)] focus:ring-1 focus:ring-[rgba(96,232,255,0.15)] focus:outline-none ' +
  'transition-all duration-200 placeholder:text-[rgba(255,255,255,0.2)]';

// Stil für die Beschriftungen (Labels) über Eingabefeldern
export const labelClass =
  'block font-display text-[10px] font-semibold tracking-[0.18em] uppercase text-[rgba(96,232,255,0.6)]';

// Stil für sekundäre Buttons (transparenter Hintergrund, leuchtender Rand)
export const secondaryBtnClass =
  'w-full font-display text-[9px] tracking-[0.18em] uppercase border border-[rgba(96,232,255,0.3)] text-[#60e8ff] ' +
  'px-4 py-2.5 rounded-sm hover:border-[#60e8ff] hover:bg-[rgba(96,232,255,0.07)] hover:shadow-[0_0_14px_rgba(96,232,255,0.2)] ' +
  'active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed';
