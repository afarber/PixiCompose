import { VNode } from './vnode.js';
import { render } from './reconciler.js';

export function compose(root: () => VNode, app: any) {
    const tree = root();
    const node = render(tree);
    app.stage.addChild(node);
}
