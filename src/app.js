import { createGrip }   from './grip.js'
import { createGrid }   from './grid.js'
import { createList }   from './list.js'
import { createMicBtn } from './micBtn.js'
import { createPlayer } from './player.js'
import { createSlider } from './slider.js'
import { createTile }   from './tile.js'
import { createVoice }  from './voice.js'
import { createStore }  from './store.js'
import { styles }       from './styles.js'
import { div, pane, createTabs } from './utils.js'
import { tileGroups, marks }     from './constants.js'

document.documentElement.setAttribute('data-theme', 'business')
document.body.classList.add(...styles.body.split(' '))

const SEQUENCE_FILE   = 'src/sequences/all.json'
const TECHNIQUES_FILE = 'src/techniques.json'

const [techniquesArr, sequence] = await Promise.all([
    fetch(TECHNIQUES_FILE).then(r => r.json()),
    fetch(SEQUENCE_FILE).then(r => r.json()),
])

for (const t of techniquesArr) { if (!t.mark) t.mark = marks[0] }

const saveTechniques = () => fetch('/save', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({
        file:    TECHNIQUES_FILE,
        content: JSON.stringify(techniquesArr, null, 2) + '\n' }) })

const store   = createStore(techniquesArr, sequence, saveTechniques)
const maxDur  = Math.max(...sequence.map(id => {
    const t = store.get(id)
    return t ? t.end - t.start : 0 }))

const player    = createPlayer()
const loopBg    = div(styles.loopBg)
const loopFill  = div(styles.loopFill)
const loopTrack = div(styles.loopTrack)
loopTrack.append(loopBg, loopFill)

player.addEventListener('loopstart', ({ detail: { duration } }) => {
    const pct = `${(duration / maxDur) * 100}%`
    loopBg.style.height      = pct
    loopFill.style.animation = 'none'
    loopFill.offsetHeight
    loopFill.style.animation = `loop-fill ${duration}s linear infinite` })

store.el.addEventListener('select', ({ detail: id }) => {
    const tech = store.get(id)
    if (!tech) return
    player.show(tech)
    techName.innerText   = tech.name
    techName.style.color = tileGroups[tech.group] ?? ''
    loopBg.style.height  = `${((tech.end - tech.start) / maxDur) * 100}%` })

const voice = createVoice({
    'następna':   () => store.selectNext(),
    'poprzednia': () => store.selectPrev(),
    'dalej':      () => store.selectNext(),
    'wstecz':     () => store.selectPrev(),
    'stop':       () => player.pause(),
    'graj':       () => player.play(),
}, (id) => store.select(id))

const tiles  = sequence.map(id => createTile(id, store.get(id)?.group))
const grid   = createGrid(tiles, store)
const list   = createList(store)

const [tabs, tabGrid, tabList] = createTabs(styles.tabs, styles.tab, 'Siatka', 'Lista')
const slider   = createSlider(60, 200, 100, (v) => grid.setSize(v))
const micBtn   = createMicBtn(() => voice.toggle())
const techName = div(styles.techName)
const tb       = pane(styles.tb, micBtn, slider, tabs, techName)
const left     = pane(styles.left, grid.grid, list.list)
const right    = pane(styles.right, player.el)
const grip     = createGrip(left)
const cnt      = pane(styles.cnt, left, grip, right, loopTrack)

const setView = (toGrid) => {
    grid.grid.style.display = toGrid ? '' : 'none'
    list.list.style.display = toGrid ? 'none' : ''
    tabGrid.classList.toggle('tab-active',  toGrid)
    tabList.classList.toggle('tab-active', !toGrid) }

tabGrid.addEventListener('click', () => setView(true))
tabList.addEventListener('click', () => setView(false))
left.style.width = '50%'
setView(false)
document.body.append(tb, cnt)
store.select(sequence[0])
