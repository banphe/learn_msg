import { createGrip }   from './grip.js'
import { createGrid }   from './grid.js'
import { createList }   from './list.js'
import { createMicBtn } from './micBtn.js'
import { createPlayer } from './player.js'
import { createSlider } from './slider.js'
import { createTile }   from './tile.js'
import { createVoice }  from './voice.js'
import { styles }       from './styles.js'
import { div, pane, createTabs } from './utils.js'
import { tileGroups }   from './tileGroups.js'

document.documentElement.setAttribute('data-theme', 'business')
document.body.classList.add(...styles.body.split(' '))

const SEQUENCE_FILE   = 'src/sequences/1.json'
const TECHNIQUES_FILE = 'src/techniques.json'

const [techniquesArr, sequence] = await Promise.all([
    fetch(TECHNIQUES_FILE).then(r => r.json()),
    fetch(SEQUENCE_FILE).then(r => r.json()),
])

const TECHNIQUES = new Map(techniquesArr.map(t => [t.id, t]))

const saveTechniques = () => fetch('/save', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ file: TECHNIQUES_FILE, content: JSON.stringify(techniquesArr, null, 2) + '\n' }) })

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

const { grid, setSize, gridNext, gridPrev, gridById } = createGrid(
    sequence.map(id => createTile(id, TECHNIQUES.get(id)?.group)))

const { list, listNext, listPrev, listById } = createList(sequence, TECHNIQUES, saveTechniques)

const [tabs, tabGrid, tabList] = createTabs(styles.tabs, styles.tab, 'Siatka', 'Lista')
const slider  = createSlider(60, 200, 100, setSize)
const micBtn  = createMicBtn(() => voice.toggle())
const techName = div(styles.techName)
const tb   = pane(styles.tb, micBtn, slider, tabs, techName)
const left  = pane(styles.left,  grid, list)
const right = pane(styles.right, player.el)
const grip  = createGrip(left)
const cnt   = pane(styles.cnt, left, grip, right)

const onTechChange = (e) => {
    const tech = TECHNIQUES.get(e.detail)
    if (!tech) return
    player.show(tech)
    techName.innerText   = tech.name
    techName.style.color = tileGroups[tech.group] ?? '' }
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
selectById(sequence[0])
