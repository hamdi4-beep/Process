const mirrored = document.querySelector('.lower')
const imgs = document.querySelectorAll('.img')
const form = document.forms[0]

let currentElem, currentMatched

form.addEventListener('submit', e => {
    const input = form['image-url']
    const value = input.value

    if (currentElem && value) {
        const img = currentElem.querySelector('img')
        const matchedImg = currentMatched.querySelector('img')

        img.src = value
        matchedImg.src = img.src
    }

    input.value = ''

    e.preventDefault()
})

for (let i=0; i<imgs.length; i++) {
    const section = imgs[i].parentElement

    imgs[i].addEventListener('click', ({ currentTarget }) => {
        if (section != mirrored) {
            selectImg(currentTarget, (target, i) => {
                const matchedTarget = mirrored.querySelectorAll('.img')[i]
    
                currentElem = target
                currentMatched = matchedTarget
    
                currentElem.classList.toggle('target')
                currentMatched.classList.toggle('matched')
            })
        } else {
            const upperImg = document.querySelectorAll('.upper .img')[i-3]
        }

        console.log(currentElem)
    })
}

function selectImg(elem, callback) {
    imgs.forEach((img, i) => {
        const matched = mirrored.querySelectorAll('.img')[i]

        if (elem == img) {
            callback(elem, i)
        } else {
            matched && matched.classList.remove('matched')
            img.classList.remove('target')
        }
    })
}