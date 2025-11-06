import { h } from '../core/vnode.js';

export interface ColumnProps {
    spacing?: number;
    x?: number;
    y?: number;
    align?: 'left' | 'center' | 'right';
}

export const Column = (props: ColumnProps, ...children: any[]) =>
    h('Column', props, ...children);
