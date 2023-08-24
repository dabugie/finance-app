export interface SidebarItem {
    label: string;
    icon: string;
    route: string;
    children?: SidebarItem[];
}

export interface SidebarToggle {
    screenWidth: number;
    collapsed: boolean;
}