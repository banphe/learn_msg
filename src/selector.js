export const createSelector = (items, container, selectedClass) => {
    const cls = selectedClass.split(' ')
    let selectedIndex = -1

    const deselect  = (i) => { if (i !== -1) items[i].classList.remove(...cls) }
    const highlight = (i) => items[i].classList.add(...cls)
    const detail    = (i) => Number(items[i].dataset.id)
    const dispatch  = (i) => container.dispatchEvent(new CustomEvent('change', { detail: detail(i) }))
    const indexOf   = (id) => items.findIndex(t => Number(t.dataset.id) === id)

    const select     = (i) => { deselect(selectedIndex); selectedIndex = i; highlight(i); dispatch(i) }
    const selectNext = () => { if (selectedIndex < items.length - 1) select(selectedIndex + 1) }
    const selectPrev = () => { if (selectedIndex > 0) select(selectedIndex - 1) }
    const selectById = (id) => { const i = indexOf(id); if (i !== -1) select(i) }

    return { select, selectNext, selectPrev, selectById }
}
