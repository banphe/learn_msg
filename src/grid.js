import { styles }          from './styles.js'
import { div }             from './utils.js'
import { createSelector }  from './selector.js'

export const createGrid = (tiles, store) => {
    const grid = div(styles.tiles)
    const cols = (v) => `repeat(auto-fill, minmax(${v}px, ${v}px))`
    grid.style.gridTemplateColumns = cols(100)

    const { select, selectById } = createSelector(tiles, styles.tileSelected)
    const setSize = (v) => { grid.style.gridTemplateColumns = cols(v) }

    tiles.forEach((tile, i) => {
        tile.addEventListener('click', () => {
            select(i)
            store.select(Number(tile.dataset.id)) })
        grid.append(tile) })

    store.addEventListener('select', ({ detail: id }) => selectById(id))

    return { grid, setSize }
}
