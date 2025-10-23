import { h } from '../core/vnode.js';

export const Button = (props: any, ...children: any[]) =>
    h('Button', props, ...children);
