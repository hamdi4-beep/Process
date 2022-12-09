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

const _ = init({
    invoke(callback) {
        let args = Array(...arguments).slice(1)
        args = args.filter(arg => typeof arg !== 'undefined')
        
        return callback.apply(this, args)
    },

    log(arg) {
        console.log(arg)
    },

    random(max) {
        return Math.floor(Math.random() * max)
    }
})

function process(callback) {
    return object => callback.bind(object)
}

export default _