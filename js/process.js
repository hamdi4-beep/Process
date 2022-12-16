// Process - JavaScript Library
// version base-level
// experimental prototype
// modified on 12/15/2022


// sets up an init function that accept a list of object's properties

const init = process(function(type, ...rest) {
    if (typeof type === 'string') type = document.querySelector(type) || type


    // modifies the object's behavior for methods that require it

    const factory = this.constructor // a reference to the factory constructor
    const proto = factory.prototype

    
    // merges a list of arguments with the method's

    if ('invoke' in this) {
        const key = 'invoke'

        proto[key] = (fn => {
            return function() {
                const args = Array().slice.apply(arguments)
                return fn.apply(this, args.concat(type, rest))
            }
        })(this[key])
    }

    
    // calls the method with the type argument set as its function context

    if ('addCSS' in this) {
        const key = 'addCSS'

        proto[key] = (fn => {
            return function() {
                return fn.apply(type, arguments)
            }
        })(this[key])
    }

    Object.freeze(this)
})


// populates the prototype object with a list of methods

const _ = init({
    invoke(callback) {


        // filters undefined arguments in case no explicit argument is passed

        const args = Array(...arguments).slice(1).filter(arg => typeof arg !== 'undefined')
        return callback.apply(this, args)
    },

    log(arg) {
        console.log(arg)
    },

    random(max) {
        return Math.floor(Math.random() * max)
    },

    addCSS(cssProps) {
        if (!(this instanceof HTMLElement) && !cssProps) return
        for (const key in cssProps) this.style[key] = cssProps[key]
        return this
    },

    RGB(n = 3) {
        const color = this.random(255)

        if (n > 1) {
            const ret = this.RGB(n - 1) + ', ' + color
            return ret
        }

        return color
    }
})

function process(factory) {
    return object => {
        factory.prototype = object
        factory.prototype.constructor = factory

        return function() {
            const args = [].slice.apply(arguments)
            return new factory(...args)
        }
    }
}

export default _