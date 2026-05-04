import { createGrip } from './grip.js'
import { createGrid } from './grid.js'
import { createList } from './list.js'
import { createMicBtn } from './micBtn.js'
import { createPlayer } from './player.js'
import { createSlider } from './slider.js'
import { createTile } from './tile.js'
import { createVoice } from './voice.js'
import { TECHNIQUES } from './techniques.js'
import { sequence, sequenceFile } from './sequences/all.js'
import { styles } from './styles.js'
import { div, pane, createTabs } from './utils.js'
import { tileGroups } from './tileGroups.js'

document.documentElement.setAttribute('data-theme', 'business')
document.body.classList.add(...styles.body.split(' '))

const player = createPlayer()

const selectNext = () => { isGridView() ? gridNext() : listNext() }
const selectPrev = () => { isGridView() ? gridPrev() : listPrev() }
const selectById = (id) => { gridById(id); listById(id) }

const cmds = {}
cmds['następna']   = selectNext
cmds['poprzednia'] = selectPrev
cmds['dalej']      = selectNext
cmds['wstecz']     = selectPrev
cmds['stop']       = () => player.pause()
cmds['graj']       = () => player.play()
const voice = createVoice(cmds, selectById)

const { grid, setSize, gridNext, gridPrev, gridById } = createGrid(sequence.map(({id, group}) => createTile(id, group)))
const serializeSequence = () => {
    const lines = []
    let i = 0
    while (i < sequence.length) {
        const group = sequence[i].group
        const ids   = []
        while (i < sequence.length && sequence[i].group === group) { ids.push(sequence[i].id); i++ }
        lines.push(`    ...g('${group}', ${ids.join(', ')}),`) }
    return `export const sequenceFile = '${sequenceFile}'\nconst g = (group, ...ids) => ids.map(id => ({ id, group }))\n\nexport const sequence = [\n${lines.join('\n')}\n]\n` }

const saveSequence = () => fetch('/save', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ file: sequenceFile, content: serializeSequence() }) })

const { list, listNext, listPrev, listById } = createList(sequence, TECHNIQUES, saveSequence)
const [tabs, tabGrid, tabList] = createTabs(styles.tabs, styles.tab, 'Siatka', 'Lista')
const slider = createSlider(60, 200, 100, setSize)
const micBtn = createMicBtn(() => voice.toggle())
const techName = div(styles.techName)
const tb = pane(styles.tb, micBtn, slider, tabs, techName)
const left = pane(styles.left,  grid, list)
const right = pane(styles.right, player.el)
const grip = createGrip(left)
const cnt = pane(styles.cnt, left, grip, right)


const onTechChange = (e) => {
    const tech = TECHNIQUES[e.detail]
    if (!tech) return
    player.show(tech)
    techName.innerText = tech.name
    const item  = sequence.find(t => t.id === e.detail)
    const color = item ? tileGroups[item.group] : null
    if (color) techName.style.color = color }
grid.addEventListener('change', onTechChange)
list.addEventListener('change', onTechChange)

const isGridView = () => tabGrid.classList.contains('tab-active')
const setView = (toGrid) => {
    grid.style.display = toGrid ? '' : 'none'
    list.style.display = toGrid ? 'none' : ''
    tabGrid.classList.toggle('tab-active',  toGrid)
    tabList.classList.toggle('tab-active', !toGrid) }

tabGrid.addEventListener('click', () => setView(true))
tabList.addEventListener('click', () => setView(false))
left.style.width = '50%'
setView(false)
document.body.append(tb, cnt)
selectById(sequence[0].id)
