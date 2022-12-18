import _ from './process.js'

_('main')
.invoke(element => {
    element.addEventListener('pointerdown', ({ target }) => {
        const _child = _(target)

        _child.addCSS({
            'background-color': 'black',
            color: 'white',
            toggle: true
        })
    })
})