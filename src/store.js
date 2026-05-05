export const createStore = (techniquesArr, sequence, onSave) => {
    const data        = new Map(techniquesArr.map(t => [t.id, t]))
    const bus         = new EventTarget()
    let   selectedIdx = -1

    const emit = (name, detail) =>
        bus.dispatchEvent(new CustomEvent(name, { detail }))

    const select = (id) => {
        selectedIdx = sequence.indexOf(id)
        emit('select', id) }

    const selectNext = () => {
        if (selectedIdx < sequence.length - 1)
            select(sequence[selectedIdx + 1]) }

    const selectPrev = () => {
        if (selectedIdx > 0)
            select(sequence[selectedIdx - 1]) }

    const update = (id, patch) => {
        Object.assign(data.get(id), patch)
        onSave?.() }

    return {
        el: bus,
        get:        (id) => data.get(id),
        sequence,
        select,
        selectNext,
        selectPrev,
        update,
    }
}
