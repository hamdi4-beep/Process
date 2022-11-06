const mirrored = document.querySelector('.mirror')
const imgs = document.querySelectorAll('.img')
const input = document.querySelector('input')

let currentElem, currentMatched

input.addEventListener('change', ({ currentTarget }) => {
    const value = currentTarget.value

    if (currentElem && value) {
        const img = currentElem.querySelector('img')
        const matchedImg = currentMatched.querySelector('img')

        img.src = value
        matchedImg.src = img.src
        currentTarget.value = ''
    }
})

for (const img of imgs) {
    img.addEventListener('pointerdown', ({ currentTarget }) => {
        selectImg(currentTarget, (elem, i) => {
            if (elem.classList.contains('target')) currentElem = elem
        })
    })
}

function selectImg(elem, callback) {
    imgs.forEach((img, i) => {
        const matched = mirrored.querySelectorAll('.img')[i]

        if (elem == img) {
            elem.classList.toggle('target')
            matched && matched.classList.toggle('matched')

            currentMatched = matched

            callback(elem, i)
        } else {
            matched && matched.classList.remove('matched')
            img.classList.remove('target')
        }
    })
}