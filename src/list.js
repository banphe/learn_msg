import { styles } from './styles.js'
import { div } from './utils.js'
import { createSelector } from './selector.js'
import { tileGroups } from './tileGroups.js'

export const createList = (sequence, techniques) => {
    const list = div(styles.list)

    const makeNum = (tech, id, color) => {
        const el = div(styles.listNum)
        el.innerText = tech?.label ?? id
        if (color) el.style.color = color
        return el }

    const makeName = (tech) => {
        const el = div(styles.listName)
        el.innerText = tech?.name ?? ''
        return el }

    const makeRow = ({id, group}) => {
        const tech  = techniques[id]
        const color = tileGroups[group]
        const row   = div(styles.listRow)
        row.dataset.id = id
        if (color) row.style.setProperty('--tc', color)
        row.append(makeNum(tech, id, color), makeName(tech))
        return row }

    const rows = sequence.map(makeRow)
    rows.forEach(r => list.append(r))

    const { select, selectNext: listNext, selectPrev: listPrev, selectById: listById } = createSelector(rows, list, styles.listRowSelected)
    rows.forEach((row, i) => row.addEventListener('click', () => select(i)))

    return { list, listNext, listPrev, listById }
}
