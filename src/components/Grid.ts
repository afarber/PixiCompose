import { h } from '../core/vnode';

export interface GridProps {
    columns: number;
    spacing?: number;
    x?: number;
    y?: number;
}

export const Grid = (props: GridProps, ...children: any[]) =>
    h('Grid', props, ...children);
