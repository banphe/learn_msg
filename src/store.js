import { marks } from './constants.js'

export class Store extends EventTarget {
    #data
    #sequence
    #sequenceFile
    #sequenceName
    #selectedIdx = -1
    #onSave
    #onSaveSeq

    constructor(techniquesArr, seqData, onSave, onSaveSeq) {
        super()
        for (const t of techniquesArr) { if (!t.mark) t.mark = marks[0] }
        this.#data         = new Map(techniquesArr.map(t => [t.id, t]))
        this.#sequence     = seqData.sequence
        this.#sequenceFile = seqData.file
        this.#sequenceName = seqData.name
        this.#onSave       = onSave
        this.#onSaveSeq    = onSaveSeq }

    get sequence()     { return this.#sequence }
    get sequenceFile() { return this.#sequenceFile }
    get sequenceName() { return this.#sequenceName }

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

    setSequence(sequence, file, name) {
        this.#sequence     = sequence
        this.#sequenceFile = file
        this.#sequenceName = name
        this.#selectedIdx  = -1
        this.dispatchEvent(new CustomEvent('sequenceChange', {
            detail: { sequence, file, name } })) }

    removeFromSequence(id) {
        this.#sequence    = this.#sequence.filter(i => i !== id)
        this.#selectedIdx = Math.min(this.#selectedIdx, this.#sequence.length - 1)
        this.#onSaveSeq?.(this.#sequenceFile, this.#sequence)
        this.dispatchEvent(new CustomEvent('sequenceChange', {
            detail: {
                sequence: this.#sequence,
                file:     this.#sequenceFile,
                name:     this.#sequenceName } })) }
}
