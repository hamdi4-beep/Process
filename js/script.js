import $ from './process.js'

$('passing an argument to the callback method!').invoke(function(arg) {
    this.log(arg)
})