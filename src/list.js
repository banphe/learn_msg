import { styles } from './styles.js'
import { div } from './utils.js'
import { createSelector } from './selector.js'

export const createList = (sequence, techniques) => {
    const list = div(styles.list)

    const makeNum  = (tech, id) => { const el = div(styles.listNum);  el.innerText = tech?.label ?? id; return el }
    const makeName = (tech)     => { const el = div(styles.listName); el.innerText = tech?.name  ?? ''; return el }
    const makeRow  = (id) => {
        const tech = techniques[id]
        const row  = div(styles.listRow)
        row.dataset.id = id
        row.append(makeNum(tech, id), makeName(tech))
        return row }

    const rows = sequence.map(makeRow)
    rows.forEach(r => list.append(r))

    const { select, selectNext: listNext, selectPrev: listPrev, selectById: listById } = createSelector(rows, list, styles.listRowSelected)
    rows.forEach((row, i) => row.addEventListener('click', () => select(i)))

    return { list, listNext, listPrev, listById }
}
