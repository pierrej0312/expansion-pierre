
export interface NavItem {
    href: string;
    label: string;
    subNavItem?: SubNavItem[];
}
export interface SubNavItem {
    href: string;
    label: string;
    svg?: React.ReactNode;
}
