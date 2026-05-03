const el = (tag, classes) => {
    const e = document.createElement(tag)
    e.classList.add(...classes.split(' '))
    return e
}

export const div     = (classes) => el('div', classes)
export const btn     = (classes) => el('button', classes)
export const i       = (classes) => el('i', classes)
export const range   = (classes) => { const e = el('input', classes); e.type = 'range'; return e }
export const pane    = (classes, ...items) => { const p = div(classes); p.append(...items); return p }
export const on      = (event, handler, ...els) => els.forEach(e => e.addEventListener(event, handler))

export const createTabs = (containerClass, tabClass, ...labels) => {
    const container = div(containerClass)
    container.role  = 'tablist'
    const tabs = labels.map(text => { const t = btn(tabClass); t.role = 'tab'; t.innerText = text; return t })
    container.append(...tabs)
    return [container, ...tabs] }

export const input = (classes) => {
    const e = el('input', classes)
    e.type = 'checkbox'
    return e
}

export const label = (classes, text, control) => {
    const e = el('label', classes)
    e.append(text, control)
    return e
}
