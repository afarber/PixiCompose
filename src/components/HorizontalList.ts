import { h } from '../core/vnode.js';

export interface HorizontalListProps {
    spacing?: number;
    x?: number;
    y?: number;
    align?: 'top' | 'center' | 'bottom';
}

export const HorizontalList = (
    props: HorizontalListProps,
    ...children: any[]
) => h('HorizontalList', props, ...children);
