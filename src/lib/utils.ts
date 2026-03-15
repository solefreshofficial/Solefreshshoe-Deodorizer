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

export function getMeeshoLink() {
  if (typeof window === 'undefined') return "https://www.meesho.com/solefresh-shoe-deodorizer-pouch-shoe-smell-remover-moisture-absorber-for-shoes-keeps-shoes-fresh/p/dhl9a7";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return isMobile 
    ? "https://ltl.sh/share/bniwxmaaaa?external_product_id=dhl9a7&product_name=product&shared_by=NDg5ODMzOTc1"
    : "https://www.meesho.com/solefresh-shoe-deodorizer-pouch-shoe-smell-remover-moisture-absorber-for-shoes-keeps-shoes-fresh/p/dhl9a7";
}
