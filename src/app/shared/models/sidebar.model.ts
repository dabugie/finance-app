export interface SidebarItem {
    label: string;
    icon: string;
    route?: string;
    onClick?: (event: any) => void;
    children?: SidebarItem[];
}

export interface SidebarToggle {
    screenWidth: number;
    collapsed: boolean;
}