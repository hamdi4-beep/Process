(global => {
    const Process = global._ = (selector, context) => {
        context = {
            selector: true // looks for a selector by default
        }

        return new Process.init(selector, context)
    }

    Process.prototype = {
        invoke(callback) {
            const arg = this.element || this.state
            return callback.call(this, arg)
        },

        addCSS(props) {
            if (typeof props !== 'object') return

            for (const key in props) {
                const element = this.element
                const value = element.style[key] // css property's value


                // handles toggle functionality otherwise only add properties once

                if (props.toggle) element.style[key] = value === '' ? props[key] : ''
                else element.style[key] = props[key]
            }

            return this
        },

        getCSS(props) {
            const element = this.element
            const styles = getComputedStyle(element)
            const results = []

            
            // handles a single property case

            if (typeof props === 'string') {
                const prop = styles.getPropertyValue(props)
                return prop
            }


            // expects an array if it's more than a single property

            if (!Array.isArray(props)) {
                throw Error('expected an array of values')
            }


            // stores a list of CSS values in the results array

            for (const prop of props) {
                const value = styles.getPropertyValue(prop)
                results.push(value)
            }

            return results
        },


        // a method that logs the current element or state property to the console

        log() {
            console.log(this.element || this.state)
        }
    }

    Process.init = function(value, context) {
        const _self = this

        _self.element = (() => {


            // checks to see if the string value can be used as a valid selector
            // otherwise assign value to the state property

            if (typeof value === 'string' && context.selector) {
                const selector = document.querySelector(value)
                if (!selector) throw Error('No such element exists in the DOM tree')
                return selector
            }


            // returns the HTML object instead if it's passed as an argument

            if (value instanceof HTMLElement) return value
        })()


        // assigns any value that's not a DOM element to the state property

        if (!_self.element) _self.state = value

        Object.freeze(this)
    }

    Process.init.prototype = Process.prototype
})(window)

export default _