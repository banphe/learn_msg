export const sequenceFile = 'src/sequences/1.js'
const g = (group, ...ids) => ids.map(id => ({ id, group }))

export const sequence = [
    ...g('red',       1, 2, 4, 5),
    ...g('orange',    6, 7, 8, 9),
    ...g('yellow',    10, 11, 13, 14),
    ...g('green',     15, 18, 19, 20),
    ...g('lime',      21, 22, 34, 42),
    ...g('teal',      43, 46, 47, 61),
    ...g('lightgray', 63, 64, 65, 67),
    ...g('blue',      68, 71, 72, 73),
    ...g('purple',    75, 76, 78, 82),
    ...g('darkgray',  83, 95, 96, 97, 98),
]
