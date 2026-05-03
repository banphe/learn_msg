import { styles } from './styles.js'
import { div } from './utils.js'
import { createSelector } from './selector.js'

export const createGrid = (tiles) => {
    const grid = div(styles.tiles)
    const cols = (v) => `repeat(auto-fill, minmax(${v}px, ${v}px))`
    grid.style.gridTemplateColumns = cols(100)

    const { select, selectNext: gridNext, selectPrev: gridPrev, selectById: gridById } = createSelector(tiles, grid, styles.tileSelected)
    const setSize = (v) => { grid.style.gridTemplateColumns = cols(v) }

    tiles.forEach((tile, i) => { tile.addEventListener('click', () => select(i)); grid.append(tile) })

    return { grid, setSize, gridNext, gridPrev, gridById }
}
