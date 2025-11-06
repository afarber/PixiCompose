import { h } from '../core/vnode.js';

export interface RowProps {
    spacing?: number;
    x?: number;
    y?: number;
    align?: 'top' | 'center' | 'bottom';
}

export const Row = (
    props: RowProps,
    ...children: any[]
) => h('Row', props, ...children);
