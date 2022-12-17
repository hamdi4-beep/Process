_('main')
.invoke(main => {
    main.addEventListener('pointerdown', e => {
        const _child = _(e.target)
        
        _child.invoke(function() {
            this.addCSS({
                color: 'purple',
                toggle: true
            })
        })
    })
})