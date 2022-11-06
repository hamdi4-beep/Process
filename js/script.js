const btn = document.querySelector('button')
const input = document.querySelector('input')
const section = document.querySelector('section')
const imgs = document.querySelectorAll('.img')

let currentElem

btn.addEventListener('pointerdown', e => section.classList.toggle('align'))

input.addEventListener('change', ({ currentTarget }) => {
    const value = currentTarget.value

    if (currentElem && value) {
        currentElem.style.backgroundImage = `url(${value})`
        currentTarget.value = ''
    }
})

for (const img of imgs) {
    img.addEventListener('pointerdown', ({ currentTarget }) => {
        currentTarget.classList.add('target')
        selectImg(currentTarget, target => currentElem = target)
    })
}

function selectImg(elem, callback) {
    imgs.forEach(img => {
        if (elem == img) {
            callback(elem)
        } else {
            img.classList.remove('target')
        }
    })
}