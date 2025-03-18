// lib/utils.ts
export function cn(...classes: (string | undefined | boolean | null)[]): string {
  return classes.filter(Boolean).join(' ');
}