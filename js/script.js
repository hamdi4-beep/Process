_('h2')
.invoke(h2 => {
    const _h2 = _(h2)

    setInterval(() => {
        _h2.addCSS({
            'background-color': 'black',
            color: 'white',
            toggle: true
        })
    }, 1000)
})

_('.theme-list')
.invoke(main => {
    main.addEventListener('pointerdown', e => {
        const _h1 = _('h1')
        const _child = _(e.target)

        _child.invoke(function() {
            const color = _child.getCSS('background-color')
            
            _h1.addCSS({
                color
            })
        })
    })
})