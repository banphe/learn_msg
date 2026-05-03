import { styles } from './styles.js'
import { div } from './utils.js'

export const createTile = (id) => {
    const tile = div(styles.tile)
    tile.dataset.id = id

    const badge = div(styles.tileBadge)
    badge.innerText = id

    tile.append(badge)

    return tile
}
