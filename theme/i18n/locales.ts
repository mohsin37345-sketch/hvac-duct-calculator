export const defaultLocale = 'en';

export interface LocaleDef {
  code: string;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const locales: LocaleDef[] = [
  { code: 'en', name: 'English',    nativeName: 'English',    dir: 'ltr' },
  { code: 'hi', name: 'Hindi',      nativeName: 'हिन्दी',      dir: 'ltr' },
  { code: 'es', name: 'Spanish',    nativeName: 'Español',    dir: 'ltr' },
  { code: 'ru', name: 'Russian',    nativeName: 'Русский',    dir: 'ltr' },
  { code: 'fr', name: 'French',     nativeName: 'Français',   dir: 'ltr' },
  { code: 'de', name: 'German',     nativeName: 'Deutsch',    dir: 'ltr' },
  { code: 'it', name: 'Italian',    nativeName: 'Italiano',   dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português',  dir: 'ltr' },
  { code: 'bn', name: 'Bengali',    nativeName: 'বাংলা',       dir: 'ltr' },
  { code: 'ja', name: 'Japanese',   nativeName: '日本語',      dir: 'ltr' },
  { code: 'ko', name: 'Korean',     nativeName: '한국어',       dir: 'ltr' },
  { code: 'ms', name: 'Malay',      nativeName: 'Bahasa Melayu', dir: 'ltr' },
  { code: 'pl', name: 'Polish',     nativeName: 'Polski',     dir: 'ltr' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'ar', name: 'Arabic',     nativeName: 'العربية',     dir: 'rtl' },
  { code: 'bg', name: 'Bulgarian',  nativeName: 'Български',  dir: 'ltr' },
  { code: 'tr', name: 'Turkish',    nativeName: 'Türkçe',     dir: 'ltr' },
  { code: 'sv', name: 'Swedish',    nativeName: 'Svenska',    dir: 'ltr' },
];

export const localeCodes = locales.map(l => l.code);

export function getLocale(code: string): LocaleDef {
  return locales.find(l => l.code === code) || locales[0];
}
