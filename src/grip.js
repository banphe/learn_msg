import { styles } from './styles.js'
import { div, i } from './utils.js'

export const createGrip = (left) => {
    const grip   = div(styles.grip)
    const handle = i(styles.iconGrip)
    grip.appendChild(handle)

    let isDragging = false
    let startX = 0
    let startWidth = 0

    grip.addEventListener('pointerdown', (e) => {
        isDragging = true
        startX = e.clientX
        startWidth = left.getBoundingClientRect().width
        grip.setPointerCapture(e.pointerId)
        document.body.style.userSelect = 'none'
    })

    grip.addEventListener('pointermove', (e) => {
        if (!isDragging) return
        const delta = e.clientX - startX
        const newWidth = Math.max(50, startWidth + delta)
        left.style.width = newWidth + 'px'
    })

    grip.addEventListener('lostpointercapture', () => {
        isDragging = false
        document.body.style.userSelect = ''
    })

    return grip
}
