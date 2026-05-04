import { styles } from './styles.js'
import { div } from './utils.js'
import { createSelector } from './selector.js'
import { tileGroups } from './tileGroups.js'

const groupKeys = Object.keys(tileGroups)

export const createList = (sequence, techniques, onGroupChange) => {
    const list = div(styles.list)

    const makeRow = (item) => {
        const tech = techniques[item.id]
        const row  = div(styles.listRow)
        row.dataset.id = item.id

        const num  = div(styles.listNum)
        num.style.userSelect = 'none'
        const name = div(styles.listName)
        name.innerText = tech?.name ?? ''

        const applyColor = () => {
            const color = tileGroups[item.group]
            num.innerText      = tech?.label ?? item.id
            num.style.color    = color ?? ''
            row.style.setProperty('--tc', color ?? '') }

        applyColor()

        num.addEventListener('click', (e) => {
            e.stopPropagation()
            const next = groupKeys[(groupKeys.indexOf(item.group) + 1) % groupKeys.length]
            item.group = next
            applyColor()
            onGroupChange?.() })

        row.append(num, name)
        return row }

    const rows = sequence.map(makeRow)
    rows.forEach(r => list.append(r))

    const { select, selectNext: listNext, selectPrev: listPrev, selectById: listById } = createSelector(rows, list, styles.listRowSelected)
    rows.forEach((row, i) => row.addEventListener('click', () => select(i)))

    return { list, listNext, listPrev, listById }
}
