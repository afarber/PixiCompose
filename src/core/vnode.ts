export type VNode = {
    type: string | Function;
    props?: Record<string, any>;
    children?: VNode[];
};

export function h(type: VNode['type'], props?: any, ...children: any[]): VNode {
    return { type, props, children };
}
