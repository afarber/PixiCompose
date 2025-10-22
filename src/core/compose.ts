import { VNode } from './vnode';
import { render } from './reconciler';

export function compose(root: () => VNode, app: any) {
    const tree = root();
    const node = render(tree);
    app.stage.addChild(node);
}
