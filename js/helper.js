(global => {
    const Process = global._ = function(selector, context) {
        return new Process.init(selector, context)
    }

    Process.prototype = {
        invoke(callback) {
            const arg = this.element || this.prop
            return callback.call(this, arg)
        },

        addCSS(props) {
            if (typeof props !== 'object' && !(this.element instanceof HTMLElement)) return

            for (const key in props) {


                // checks to see if either element or prop is a HTML element

                const element = this.element ||
                                this.prop instanceof HTMLElement &&
                                this.prop

                const value = element.style[key] // css property's value


                // handles toggle functionality otherwise adds properties once

                if (props.toggle) element.style[key] = value === '' ? props[key] : ''
                else element.style[key] = props[key]
            }

            return this
        },

        getCSS(props) {
            const element = this.element || this.prop
            const styles = getComputedStyle(element)
            const results = []

            
            // handles a single property case

            if (typeof props === 'string') {
                const prop = styles.getPropertyValue(props)
                return prop
            }


            // ignores non-arrays and non-HTML elements

            if (Array.isArray(props) || (element instanceof HTMLElement)) {
                throw Error('expected an array of values')
            }


            // stores a list of CSS values in the results array

            for (const prop of props) {
                const value = styles.getPropertyValue(prop)
                results.push(value)
            }

            return results
        },


        // a method that logs the current element to the console

        log() {
            console.log(this.element || this.prop)
        }
    }

    Process.init = function(value, context) {
        const _self = this

        _self.element = (() => {


            // checks to see if the string value can be used as a valid selector
            // otherwise store whatever is passed as value in the data property

            if (typeof value !== 'object' &&
                typeof value !== 'function' &&
                typeof value !== 'number' &&
                typeof value !== 'boolean' &&
                !context?.string) {
                    const selector = document.querySelector(value)
                    if (!selector) throw Error('No such element exists in the DOM')
                    return selector
                }
        })() || (_self.prop = value)


        // resets the element property if the value was not a valid selector

        if (_self.prop) _self.element = null

        Object.freeze(this)
    }

    Process.init.prototype = Process.prototype
})(window)