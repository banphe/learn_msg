const TECHNIQUES_FILE = 'src/techniques.json'

export const saveTechniques = (techniquesArr) => fetch('/save', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({
        file:    TECHNIQUES_FILE,
        content: JSON.stringify(techniquesArr, null, 2) + '\n' }) })
