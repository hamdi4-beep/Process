const mirrored = document.querySelector('.lower')
const imgs = document.querySelectorAll('.img')
const form = document.forms[0]

let currentElem, currentMatched

form.addEventListener('submit', e => {
    const input = form['image-url']
    const value = input.value

    if (currentElem && value) addImg(value)

    input.value = ''

    e.preventDefault()
})

for (let i=0, n=0; i<imgs.length; i++) {
    const section = imgs[i].parentElement

    imgs[i].addEventListener('click', ({ target, currentTarget }) => {
        const fas = currentTarget.querySelector('.fas')

        if (fas && target == fas) uploadImg(addImg)

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
            upperImg.click()
        }
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

function uploadImg(addImg) {
    const input = document.createElement('input')

    input.type = 'file'
    input.click()

    input.onchange = e => {
        if (input.files[0]) {
            const file = input.files[0]
            const type = file.type

            if (type.split('/')[0] !== 'image') return

            addImg(URL.createObjectURL(file))
        }
    }

    input.remove()
}

function addImg(url) {
    const img = currentElem.querySelector('img')
    const matchedImg = currentMatched.querySelector('img')

    img.src = url
    matchedImg.src = img.src
}