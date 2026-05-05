export const createSelector = (items, selectedClass) => {
    const cls = selectedClass.split(' ')
    let selectedIndex = -1

    const deselect  = (i) => { if (i !== -1) items[i].classList.remove(...cls) }
    const highlight = (i) => items[i].classList.add(...cls)
    const indexOf   = (id) => items.findIndex(t => Number(t.dataset.id) === id)

    const select     = (i) => { deselect(selectedIndex); selectedIndex = i; highlight(i) }
    const selectById = (id) => { const i = indexOf(id); if (i !== -1) select(i) }

    return { select, selectById }
}
