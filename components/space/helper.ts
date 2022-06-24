import { isVNode, createTextVNode, Fragment, Comment } from 'vue'

import type { VNode, VNodeNormalizedChildren } from 'vue'

export function flatVNodes(children: VNodeNormalizedChildren) {
  const result: VNode[] = []
  const loop = Array.isArray(children) ? [...children] : []

  while (loop.length) {
    const vnode = loop.shift()!

    if (vnode === null) continue

    if (Array.isArray(vnode)) {
      loop.push(...vnode)
    }

    if (!isVNode(vnode) || vnode.type === Comment) continue

    if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      loop.push(vnode.children)
    } else if (typeof vnode === 'string' || typeof vnode === 'number') {
      result.push(createTextVNode(vnode))
    } else {
      result.push(vnode)
    }
  }

  return result
}