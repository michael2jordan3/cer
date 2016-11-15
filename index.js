'use strict'

module.exports = createCustomError

function createCustomError(name, init) {
    const ctor = function () {
        if (!(this instanceof ctor)) {
            const inst = Object.create(ctor.prototype)
            ctor.apply(inst, arguments)
            return inst
        }

        const err = Error.apply(this, arguments)
        Error.captureStackTrace(err, ctor)

        this.name = err.name = name
        this.message = err.message

        // stack is not always relevant, and is expensive to generate
        Object.defineProperty(this, 'stack', {
            get: function () {
                return err.stack
            }
        })

        if (init)
            init.apply(this, arguments)
    }

    Object.defineProperty(ctor, 'name', {
        value: name,
        configurable: true
    })

    ctor.prototype = Object.create(Error.prototype)
    ctor.prototype.constructor = ctor
    ctor.prototype.inspect = inspect

    return ctor
}

function inspect() {
    return this.stack
}
