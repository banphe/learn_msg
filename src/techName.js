import { styles }     from './styles.js'
import { div }        from './utils.js'
import { tileGroups } from './constants.js'

export const createTechName = (store) => {
    const el = div(styles.techName)
    let currentId = null

    const refresh = (id) => {
        const tech = store.getTechnique(id)
        if (!tech) return
        el.innerText   = tech.name
        el.style.color = tileGroups[tech.group] ?? '' }

    store.addEventListener('select', ({ detail: id }) => {
        currentId = id
        refresh(id) })

    store.addEventListener('update', ({ detail: { id } }) => {
        if (id === currentId) refresh(id) })

    return el
}
