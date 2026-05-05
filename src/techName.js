import { styles }     from './styles.js'
import { div }        from './utils.js'
import { tileGroups } from './constants.js'

export const createTechName = (store) => {
    const el = div(styles.techName)

    store.addEventListener('select', ({ detail: id }) => {
        const tech = store.getTechnique(id)
        if (!tech) return
        el.innerText   = tech.name
        el.style.color = tileGroups[tech.group] ?? '' })

    return el
}
