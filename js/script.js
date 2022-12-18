import _ from './process.js'


// looks up DOM child with that string

_('.theme-list')


// the invoke method "invokes" a callback with its argument set in the _ function
// parameter refers to the element in the DOM (theme-list)

.invoke(container => {
    container.addEventListener('pointerdown', ({ target }) => {
        const _h2 = _('h2') // methods called through this variable will reflect on the first argument (h2 element)
        const _child = _(target)

        _h2.invoke(function(element) {


            // fetches CSS properties of the element that was passed to child variable

            const color = _child.getCSS('background-color')


            // the this keyword here refers to the object that owns "utility methods"
            // methods reflect changes on the element that was passed to the _ function

            this
            .addCSS({
                position: 'relative',
                left: '-50%',
                transform: 'rotate(360deg) scale(.5)',
                toggle: true // property that "toggles" the CSS properties if present on the object
            })
            .addCSS({
                'background-color': color,
                color: 'white'
            })

            element.onclick = e => {
                this.addCSS({
                    opacity: 0,
                    toggle: true
                })
            }
        })
    })
})