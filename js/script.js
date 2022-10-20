const userCover = document.querySelector('.user__cover')
const userImg = document.querySelector('.user__img')
const input = document.querySelector('input')

const body = document.body

const btn = document.querySelector('button')

userCover.addEventListener('pointerdown', e => uploadImg(URL => {
    const img = userCover.querySelector('img')
    img.src = URL
}))

btn.addEventListener('pointerdown', e => {
    body.classList.toggle('toggle-theme')

    if (body.classList.contains('toggle-theme')) {
        btn.textContent = 'Turn Off Dark Mode'
    } else {
        btn.textContent = 'Turn On Dark Mode'
    }
})

userImg.addEventListener('pointerdown', e => userImg.classList.toggle('pause'))

input.addEventListener('change', ({ target }) => {
    const img = userCover.querySelector('img')
    const value = target.value

    if (!value) return

    img.src = value
    img.onerror = e => alert('The link is broken!')

    input.value = ''
})

function uploadImg(addImg) {
    const input = document.createElement('input')

    input.type = 'file'
    input.click()

    console.log('Did I miss something?')

    input.onchange = function(e) {
        if (this.files[0]) {
            const file = this.files[0]
            const type = file.type

            if (type.split('/')[0] !== 'image') return

            addImg(URL.createObjectURL(file))
        }
    }

    input.remove()
}