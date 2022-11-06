const mirrored = document.querySelector('.lower')
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

        console.log('Run')
    }
})

for (let i=0; i<imgs.length; i++) {
    const section = imgs[i].parentElement

    imgs[i].onclick = ({ currentTarget }) => {
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
    }
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