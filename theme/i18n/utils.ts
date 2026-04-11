import { defaultLocale, locales, localeCodes, getLocale } from './locales';
import type { LocaleDef } from './locales';

// All translation imports
import en from './translations/en.json';
import hi from './translations/hi.json';
import es from './translations/es.json';
import ru from './translations/ru.json';
import fr from './translations/fr.json';
import de from './translations/de.json';
import it from './translations/it.json';
import pt from './translations/pt.json';
import bn from './translations/bn.json';
import ja from './translations/ja.json';
import ko from './translations/ko.json';
import ms from './translations/ms.json';
import pl from './translations/pl.json';
import id from './translations/id.json';
import ar from './translations/ar.json';
import bg from './translations/bg.json';
import tr from './translations/tr.json';
import sv from './translations/sv.json';

const translations: Record<string, Record<string, string>> = {
  en, hi, es, ru, fr, de, it, pt, bn, ja, ko, ms, pl, id, ar, bg, tr, sv,
};

/**
 * Get a translation string by key, falling back to English.
 */
export function t(locale: string, key: string): string {
  return translations[locale]?.[key] || translations[defaultLocale]?.[key] || key;
}

/**
 * Extract the locale code from a URL pathname.
 */
export function extractLocale(pathname: string): string {
  const segments = pathname.replace(/^\/|\/$/g, '').split('/');
  const first = segments[0];
  if (first && localeCodes.includes(first) && first !== defaultLocale) {
    return first;
  }
  return defaultLocale;
}

/**
 * Generate a localized URL path.
 * English (default) gets no prefix; others get /{locale}/path/
 */
export function getLocalizedUrl(locale: string, path: string = '/'): string {
  const cleanPath = path.replace(/^\/|\/$/g, '');
  if (locale === defaultLocale) {
    return cleanPath ? `/${cleanPath}/` : '/';
  }
  return cleanPath ? `/${locale}/${cleanPath}/` : `/${locale}/`;
}

/**
 * Generate static paths for all non-default locales (for [...locale] routes).
 */
export function getStaticLocalePaths() {
  return locales
    .filter(l => l.code !== defaultLocale)
    .map(l => ({ params: { locale: l.code } }));
}

/**
 * Get locale info (name, dir, etc.)
 */
export function getLocaleInfo(code: string): LocaleDef {
  return getLocale(code);
}

export { defaultLocale, locales, localeCodes };
