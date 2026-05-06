const post = (file, content) => fetch('/save', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ file, content }) })

export const saveTechniques = (arr) =>
    post('src/techniques.json', JSON.stringify(arr, null, 2) + '\n')

export const saveSequence = (filename, sequence) =>
    post(`src/sequences/${filename}`, JSON.stringify(sequence) + '\n')

export const saveIndex = (index) =>
    post('src/sequences/index.json', JSON.stringify(index, null, 2) + '\n')
