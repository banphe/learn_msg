import { styles }         from './styles.js'
import { div }            from './utils.js'
import { createSelector } from './selector.js'
import { tileGroups, marks } from './constants.js'

const groupKeys = Object.keys(tileGroups)

export const createList = (store, sequence) => {
    const list = div(styles.list)

    const makeRow = (id) => {
        const tech = store.getTechnique(id)
        const row  = div(styles.listRow)
        row.dataset.id = id

        const num  = div(styles.listNum)
        num.style.userSelect = 'none'
        const name = div(styles.listName)
        name.innerText = tech?.name ?? ''

        const applyColor = () => {
            const color    = tileGroups[tech.group]
            num.innerText  = tech?.label ?? id
            num.style.color = color ?? ''
            row.style.setProperty('--tc', color ?? '') }

        applyColor()

        num.addEventListener('click', (e) => {
            e.stopPropagation()
            const next = groupKeys[(groupKeys.indexOf(tech.group) + 1) % groupKeys.length]
            store.update(id, { group: next })
            applyColor() })

        const markEl = div(styles.listMark)
        markEl.innerText = tech.mark ?? marks[0]
        markEl.addEventListener('click', (e) => {
            e.stopPropagation()
            const next = marks[(marks.indexOf(tech.mark) + 1) % marks.length]
            store.update(id, { mark: next })
            markEl.innerText = next })

        row.append(num, name, markEl)
        return row }

    const rows = sequence.map(makeRow)
    rows.forEach(r => list.append(r))

    const { select, selectById } = createSelector(rows, styles.listRowSelected)
    rows.forEach((row, i) => row.addEventListener('click', () => {
        select(i)
        store.select(Number(row.dataset.id)) }))

    store.addEventListener('select', ({ detail: id }) => selectById(id))

    return { list }
}
