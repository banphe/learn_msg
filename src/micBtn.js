import { styles } from './styles.js'
import { div } from './utils.js'

export const createMicBtn = (onToggle) => {
    const btn  = div(styles.micBtn)
    const icon = div(styles.micIcon)
    const ping = div(styles.micPing)

    btn.append(icon, ping)
    btn.addEventListener('click', () => { ping.classList.toggle('hidden'); onToggle() })

    return btn
}
