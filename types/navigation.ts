// types/navigation.ts
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  type?: 'link' | 'dropdown' | 'button';
}

