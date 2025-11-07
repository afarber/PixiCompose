/*
 * Copyright (c) 2025 Alexander Farber
 * SPDX-License-Identifier: MIT
 *
 * This file is part of the PixiCompose project (https://github.com/afarber/PixiCompose)
 */

import { VNode } from './vnode.js';
import { render } from './reconciler.js';

export function compose(root: () => VNode, app: any) {
    const tree = root();
    const node = render(tree);
    app.stage.addChild(node);
}
