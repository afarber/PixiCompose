import { h } from '../core/vnode';

export interface VerticalListProps {
    spacing?: number;
    x?: number;
    y?: number;
    align?: 'left' | 'center' | 'right';
}

export const VerticalList = (props: VerticalListProps, ...children: any[]) =>
    h('VerticalList', props, ...children);
