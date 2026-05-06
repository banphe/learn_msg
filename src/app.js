import { createGrip }        from './grip.js'
import { createGrid }        from './grid.js'
import { createList }        from './list.js'
import { createMicBtn }      from './micBtn.js'
import { createPlayer }      from './player.js'
import { createSlider }      from './slider.js'
import { createVoice }       from './voice.js'
import { createTechName }    from './techName.js'
import { createSequenceBar } from './sequenceBar.js'
import { Store }             from './store.js'
import { saveTechniques, saveSequence, saveIndex, deleteSequence } from './api.js'
import { styles }            from './styles.js'
import { pane, createTabs }  from './utils.js'

document.documentElement.setAttribute('data-theme', 'business')
document.body.classList.add(...styles.body.split(' '))

const [techniquesArr, sequences] = await Promise.all([
    fetch('src/techniques.json').then(r => r.json()),
    fetch('src/sequences/index.json').then(r => r.json()),
])

const firstEntry = sequences[0]
const initialSeq = await fetch(`src/sequences/${firstEntry.file}`).then(r => r.json())

const store = new Store(
    techniquesArr,
    { sequence: initialSeq, file: firstEntry.file, name: firstEntry.name },
    () => saveTechniques(techniquesArr),
    (file, seq) => saveSequence(file, seq))

const player = createPlayer()

store.addEventListener('select', ({ detail: id }) => {
    const tech = store.getTechnique(id)
    if (tech) player.show(tech) })

const voice = createVoice({
    'następna':   () => store.selectNext(),
    'poprzednia': () => store.selectPrev(),
    'dalej':      () => store.selectNext(),
    'wstecz':     () => store.selectPrev(),
    'stop':       () => player.pause(),
    'graj':       () => player.play(),
}, (id) => store.select(id))

const grid     = createGrid(initialSeq, store)
const list     = createList(store)
const seqBar   = createSequenceBar(sequences, store, saveIndex, saveSequence, deleteSequence)
const techName = createTechName(store)

store.addEventListener('sequenceChange', ({ detail: { sequence } }) => {
    grid.setSequence(sequence) })

const [tabs, tabGrid, tabList] = createTabs(styles.tabs, styles.tab, 'Siatka', 'Lista')
const slider = createSlider(60, 200, 100, (v) => grid.setSize(v))
const micBtn = createMicBtn(() => voice.toggle())
const tb     = pane(styles.tb, micBtn, slider, tabs, techName)
const left   = pane(styles.left, grid.grid, seqBar, list.list)
const right  = pane(styles.right, player.el)
const grip   = createGrip(left)
const cnt    = pane(styles.cnt, left, grip, right)

const setView = (toGrid) => {
    grid.grid.style.display = toGrid ? '' : 'none'
    seqBar.style.display    = toGrid ? 'none' : ''
    list.list.style.display = toGrid ? 'none' : ''
    tabGrid.classList.toggle(styles.tabActive,  toGrid)
    tabList.classList.toggle(styles.tabActive, !toGrid) }

tabGrid.addEventListener('click', () => setView(true))
tabList.addEventListener('click', () => setView(false))
left.style.width = '450px'
setView(false)
document.body.append(tb, cnt)
store.select(initialSeq[0])
