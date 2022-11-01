const main = document.querySelector('main')
const userImg = document.querySelector('.user-img')
const input = document.querySelector('input')
const btn = document.querySelector('button')

userImg.addEventListener('click', e => {
    const img = userImg.querySelector('img')
    showFullScreen(img)
})

input.addEventListener('change', ({ currentTarget }) => addImg(currentTarget.value))
input.addEventListener('blur', ({ currentTarget }) => currentTarget.value = '')
btn.addEventListener('click', e => uploadImg(addImg))

function uploadImg(callback) {
    const input = document.createElement('input')

    input.type = 'file'
    input.click()

    input.onchange = ({ currentTarget: { files } }) => {
        if (files[0]) {
            const file = files[0]
            const type = file.type

            if (type.split('/')[0] !== 'image') return

            callback && callback(URL.createObjectURL(file))
        }
    }

    input.remove()
}

function addImg(url) {
    const imgsContainer = document.querySelector('.imgs-container')
    const div = document.createElement('div')
    const img = new Image

    div.onclick = e => showFullScreen(img)

    div.className = 'img-wrapper'
    img.src = url

    div.append(img)
    imgsContainer.append(div)
}

function showFullScreen(img) {
    const layer = document.createElement('div')
    const cloneImg = img.cloneNode()

    layer.onclick = e => layer.remove()
    layer.className = 'layer'

    main.append(layer)
    layer.append(cloneImg)
}