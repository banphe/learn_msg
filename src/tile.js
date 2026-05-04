import { styles } from './styles.js'
import { div } from './utils.js'
import { tileGroups } from './tileGroups.js'

export const createTile = (id, group) => {
    const tile = div(styles.tile)
    tile.dataset.id = id
    tile.style.containerType = 'inline-size'

    const color = tileGroups[group]
    if (color) {
        tile.style.setProperty('--tc', color)
        tile.style.borderWidth = '2px'
        tile.style.borderStyle = 'solid'
        tile.style.borderColor = color }

    const num = div(styles.tileNum)
    num.innerText = id
    num.style.fontSize = '75cqw'
    if (color) num.style.color = color

    tile.append(num)
    return tile
}
