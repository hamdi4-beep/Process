import _ from './process.js'


/*
    the _ function either accepts a string that's used to query elements in the DOM or
    keep a reference to any passed object or primitive, and returns an object that owns a list of "utility methods"
*/

// looks up DOM child with that string

_('.theme-list')


// the invoke method "invokes" a callback with its argument set through the _ function
// parameter refers to the element in the DOM (theme-list)

.invoke(container => {
    container.addEventListener('pointerdown', ({ target }) => {
        const _h1 = _('h1')
        const _h2 = _('h2') // methods called through this variable will reflect on the first argument (h2 element)
        const _child = _(target)

        _h2.invoke(function(element) {


            // fetches CSS properties of the element that was passed to child variable

            const width = _h1.getCSS('width')
            const color = _child.getCSS('background-color')


            // the this keyword here refers to the object that owns "utility methods"
            // methods reflect changes on the element that was passed to the _ function

            this
            .addCSS({
                position: 'relative',
                left: '-50%',
                width,
                toggle: true
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