import _ from './process.js'

_('hamdi4-beep').invoke(function(){})

_().invoke(username => {
    const _self = _()

    _self.log({
        username
    })
})