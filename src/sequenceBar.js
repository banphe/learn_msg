import { styles }   from './styles.js'
import { div, btn } from './utils.js'

export const createSequenceBar = (sequences, store, onSaveIndex, onSaveSeq) => {
    const bar        = div(styles.seqBar)
    const dropdown   = div(styles.seqDropdown)
    const dropBtn    = div(styles.seqDropdownBtn)
    const menu       = document.createElement('ul')

    dropBtn.setAttribute('tabindex', '0')
    dropBtn.setAttribute('role', 'button')
    menu.className = styles.seqDropdownMenu
    menu.setAttribute('tabindex', '0')
    dropdown.append(dropBtn, menu)

    const renameBtn = btn(styles.seqBtn)
    const dupBtn    = btn(styles.seqBtn)
    const delBtn    = btn(styles.seqBtn)

    renameBtn.title     = 'Zmień nazwę'
    dupBtn.title        = 'Duplikuj sekwencję'
    delBtn.title        = 'Usuń sekwencję'
    renameBtn.innerHTML = `<i class="${styles.seqIconRename}"></i>`
    dupBtn.innerHTML    = `<i class="${styles.seqIconDuplicate}"></i>`
    delBtn.innerHTML    = `<i class="${styles.seqIconDelete}"></i>`

    const refresh = () => {
        menu.innerHTML = ''
        dropBtn.innerHTML = `<span>${store.sequenceName ?? ''}</span><i class="${styles.seqIconChevron}"></i>`
        sequences.forEach(s => {
            const li = document.createElement('li')
            const a  = document.createElement('a')
            a.textContent = s.name
            if (s.file === store.sequenceFile)
                a.className = styles.seqDropdownActive
            a.addEventListener('click', () => {
                if (s.file === store.sequenceFile) return
                dropBtn.blur()
                fetch(`src/sequences/${s.file}`)
                    .then(r => r.json())
                    .then(seq => store.setSequence(seq, s.file, s.name)) })
            li.append(a)
            menu.append(li) })
        delBtn.disabled = sequences.length <= 1 }

    refresh()
    store.addEventListener('sequenceChange', refresh)

    const startRename = () => {
        const input = document.createElement('input')
        input.className = styles.seqNameInput
        input.value = store.sequenceName

        let done = false
        const finish = (save) => {
            if (done) return
            done = true
            if (save && input.value.trim()) {
                const entry = sequences.find(s => s.file === store.sequenceFile)
                if (entry) {
                    entry.name = input.value.trim()
                    onSaveIndex(sequences)
                    store.setSequence(store.sequence, store.sequenceFile, entry.name) } }
            input.replaceWith(dropdown)
            refresh() }

        input.addEventListener('blur',    () => finish(true))
        input.addEventListener('keydown', (e) => {
            e.stopPropagation()
            if (e.key === 'Enter')  { input.blur() }
            if (e.key === 'Escape') { finish(false) } })

        dropdown.replaceWith(input)
        input.focus()
        input.select() }

    renameBtn.addEventListener('click', startRename)

    dupBtn.addEventListener('click', () => {
        const newFile = `seq_${Date.now()}.json`
        const newName = `Kopia – ${store.sequenceName}`
        const newSeq  = [...store.sequence]
        sequences.push({ file: newFile, name: newName })
        Promise.all([
            onSaveSeq(newFile, newSeq),
            onSaveIndex(sequences),
        ]).then(() => {
            store.setSequence(newSeq, newFile, newName)
            startRename() }) })

    delBtn.addEventListener('click', () => {
        if (sequences.length <= 1) return
        const idx  = sequences.findIndex(s => s.file === store.sequenceFile)
        sequences.splice(idx, 1)
        const next = sequences[Math.max(0, idx - 1)]
        onSaveIndex(sequences)
        fetch(`src/sequences/${next.file}`)
            .then(r => r.json())
            .then(seq => store.setSequence(seq, next.file, next.name)) })

    bar.append(dropdown, renameBtn, dupBtn, delBtn)
    return bar
}
