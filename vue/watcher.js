//对dom节点进行更新
class Watcher {
    constructor(name, el, vm, exp, attr) {
        this.name = name;         //指令名称，例如文本节点，该值设为 "text"
        this.el = el;             //指令对应的 DOM 元素
        this.vm = vm;             //指令所属 myVue 实例
        this.exp = exp;           //指令对应的 data 内的 key，本例如"number"
        this.attr = attr;         //绑定的属性值，普通文本为"innerHTML"，input为 value
        this.update();
    }
    update() {
        this.el[this.attr] = this.vm.$data[this.exp]
    }
}
export default Watcher