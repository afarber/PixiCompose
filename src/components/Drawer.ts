import { h } from '../core/vnode.js';

export interface DrawerProps {
    side?: 'left' | 'right' | 'top' | 'bottom';
    size?: number;
    backdropAlpha?: number;
    isOpen?: boolean;
}

export const Drawer = (props: DrawerProps, ...children: any[]) =>
    h('Drawer', props, ...children);
