import observer from "./observer.js";
import compile from "./compile.js";

class Vue {
    constructor(options) {
        this._init(options)
    }
    _init(options) {
        this.$el = document.querySelector(options.el)
        this.$data = options.data
        this.$methods = options.methods
        this.dep = {};//依赖收集 收集模板内绑定了指令的节点（node），即一个变量对应哪些节点，通常是一对多，因此采用数组存放
        observer(this, this.$data)
        compile(this, this.$el)
    }
}
export default Vue