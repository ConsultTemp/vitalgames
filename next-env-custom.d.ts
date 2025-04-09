// next-env-custom.d.ts
import { Locale } from './i18n-config';

declare module 'next' {
  export interface PageProps {
    params: { lang: Locale };
    searchParams?: Record<string, string | string[] | undefined>;
  }
}