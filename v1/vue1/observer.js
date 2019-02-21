const observer = (vm, obj) => {
    let arr = Object.keys(obj)
    for (const key of arr) {
        vm.dep[key] = []
        let value = obj[key]
        // 先只考虑object 不考虑数组
        typeof value === 'object' ? observer(vm, value) : ''
        let binding = vm.dep[key];
        Object.defineProperty(vm.$data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                return value
            },
            set: function (newValue) {
                if (newValue !== value) {
                    value = newValue
                    binding.forEach(function (item) {
                        console.log('binding 的值是：', binding);
                        item.update();
                    })
                }
            }
        })
    }
}

export default observer