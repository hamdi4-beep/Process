_('main')
.invoke(function(main) {
    const _events = _(['pointerover', 'pointerout'])

    _events.invoke(([enter, leave]) => {
        main.addEventListener(enter, e => {
            this.addCSS({
                color: 'purple'
            })
        })

        main.addEventListener(leave, e => {
            this.addCSS({
                color: 'black'
            })
        })
    })
})