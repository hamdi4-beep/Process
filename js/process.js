const init = process(function(type, ...rest) {
    if ('invoke' in this) {
        const key = 'invoke'

        this[key] = (fn => {
            return function() {


                // merge the arguments with the type argument

                const args = Array(...arguments).concat(type, rest)
                return fn.apply(this, args)
            }
        })(this[key])
    }


    // returning the this keyword makes the object chainable

    return this
})

const $ = init({
    extend(source) {
        if (arguments.length < 2 || source === null) return source

        for (let i=1; i<arguments.length; i++) {
            const object = arguments[i]
            const keys = Object.keys(object)

            for (const key of keys) {
                source[key] = object[key]
            }
        }
    },

    log(arg) {
        console.log(arg)
    },

    invoke(callback) {
        const args = Array.prototype.slice.call(arguments, 1)
        return callback.apply(this, args)
    },

    random(max) {
        return Math.floor(Math.random() * max)
    },

    grab(selector, all) {
        if (!selector) {
            throw Error('Unvalid selector.')
        }

        return (selector = all && document.querySelectorAll(selector) || document.querySelector(selector))
    }
})

function process(callback) {
    return object => callback.bind(object)
}

export default $