const userCover = document.querySelector('.user__cover')
const userImg = document.querySelector('.user__img')
const input = document.querySelector('input')

const body = document.body

const btn = document.querySelector('button')

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