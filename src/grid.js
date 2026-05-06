import { styles }         from './styles.js'
import { div }            from './utils.js'
import { createSelector } from './selector.js'
import { createTile }     from './tile.js'

export const createGrid = (initialSequence, store) => {
    const grid = div(styles.tiles)
    const cols = (v) => `repeat(auto-fill, minmax(${v}px, ${v}px))`
    grid.style.gridTemplateColumns = cols(100)

    let selector = null

    const buildTiles = (sequence) => {
        grid.innerHTML = ''
        const tiles = sequence.map(id => createTile(id, store.getTechnique(id)?.group))
        selector = createSelector(tiles, styles.tileSelected)
        tiles.forEach((tile, i) => {
            tile.addEventListener('click', () => {
                selector.select(i)
                store.select(Number(tile.dataset.id)) })
            grid.append(tile) }) }

    buildTiles(initialSequence)

    store.addEventListener('select', ({ detail: id }) => selector?.selectById(id))

    return {
        grid,
        setSize:     (v) => { grid.style.gridTemplateColumns = cols(v) },
        setSequence: (sequence) => { buildTiles(sequence) },
    }
}
