import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToIdWithOffset(id: string, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return false;
  const nav = document.querySelector('nav');
  const navHeight = nav ? (nav as HTMLElement).offsetHeight : 0;
  const top = el.getBoundingClientRect().top + window.pageYOffset - (offset + navHeight);
  window.scrollTo({ top, behavior: 'smooth' });
  return true;
}
