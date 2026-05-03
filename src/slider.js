import { styles } from './styles.js'
import { range } from './utils.js'

export const createSlider = (min, max, value, onChange) => {
    const r = range(styles.slider)
    r.min = min
    r.max = max
    r.value = value
    r.addEventListener('input', () => onChange(r.value))
    return r
}
