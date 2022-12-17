_('body')
.invoke(function(body) {
    const _event = _('pointerdown', {
        string: true
    })

    _event.invoke(event => {
        body.addEventListener(event, e => {
            this.addCSS({
                'background-color': 'black',
                color: 'white',
                toggle: true
            }).log()
        })
    })
})