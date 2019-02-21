import Watcher from "./watcher.js";

const compile = (vm, rootNode) => {
    let nodes = rootNode.children
    for (const node of nodes) {
        if (node.children.length) {
            vm.compile(node)
        }
        else {
            const method = node.getAttribute('v-click')
            const vModel = node.getAttribute('v-model')
            const vBind = node.getAttribute('v-bind')

            const isInput = node.tagName === 'INPUT'
            const isTextarea = node.tagName === 'TEXTAREA'
            const canTwoWayBinding = vModel && (isInput || isTextarea)//是否能实现双向绑定

            if (method) node.onclick = vm.$methods[method].bind(vm.$data)//为了让 method 内的 vm 指向 data
            else if (vBind) vm.dep[vBind].push(new Watcher('text', node, vm, vBind, 'innerHTML'))
            else if (canTwoWayBinding) {
                vm.dep[vModel].push(new Watcher('input', node, vm, vModel, 'value'))
                node.addEventListener('input', () => { vm.$data[vModel] = node.value; })
            }
        }
    }
}
export default compile