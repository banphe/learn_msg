import { marks } from './constants.js'

export class Store extends EventTarget {
    #data
    #sequence
    #selectedIdx = -1
    #onSave

    constructor(techniquesArr, sequence, onSave) {
        super()
        for (const t of techniquesArr) { if (!t.mark) t.mark = marks[0] }
        this.#data     = new Map(techniquesArr.map(t => [t.id, t]))
        this.#sequence = sequence
        this.#onSave   = onSave }

    getTechnique(id) { return this.#data.get(id) }

    select(id) {
        this.#selectedIdx = this.#sequence.indexOf(id)
        this.dispatchEvent(new CustomEvent('select', { detail: id })) }

    selectNext() {
        if (this.#selectedIdx < this.#sequence.length - 1)
            this.select(this.#sequence[this.#selectedIdx + 1]) }

    selectPrev() {
        if (this.#selectedIdx > 0)
            this.select(this.#sequence[this.#selectedIdx - 1]) }

    update(id, patch) {
        Object.assign(this.#data.get(id), patch)
        this.dispatchEvent(new CustomEvent('update', { detail: { id, patch } }))
        this.#onSave?.() }
}
