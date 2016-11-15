'use strict'

module.exports = createCustomError

function createCustomError(name, init, parent) {
    parent = parent || Error

    const ctor = function () {
        if (this instanceof ctor)
            var inst = this
        else
            inst = Object.create(ctor.prototype)

        const err = parent.apply(inst, arguments)
        Error.captureStackTrace(err, ctor)

        inst.name = err.name = name
        inst.message = err.message

        // stack is not always relevant, and is expensive to generate
        Object.defineProperty(inst, 'stack', {
            get: () => err.stack,
            configurable: true
        })

        if (init)
            init.apply(inst, arguments)

        return inst
    }

    Object.defineProperty(ctor, 'name', {
        value: name,
        configurable: true
    })

    ctor.prototype = Object.create(parent.prototype)
    ctor.prototype.inspect = inspect
    ctor.prototype.constructor = ctor

    return ctor
}

function inspect() {
    return this.stack
}
