const PL_NUMBERS = {
    'jeden': 1, 'jedna': 1, 'dwa': 2, 'dwie': 2, 'trzy': 3, 'cztery': 4,
    'pięć': 5, 'sześć': 6, 'siedem': 7, 'osiem': 8, 'dziewięć': 9,
    'dziesięć': 10, 'jedenaście': 11, 'dwanaście': 12, 'trzynaście': 13,
    'czternaście': 14, 'piętnaście': 15, 'szesnaście': 16, 'siedemnaście': 17,
    'osiemnaście': 18, 'dziewiętnaście': 19, 'dwadzieścia': 20,
    'trzydzieści': 30, 'czterdzieści': 40, 'pięćdziesiąt': 50,
    'sześćdziesiąt': 60, 'siedemdziesiąt': 70, 'osiemdziesiąt': 80,
    'dziewięćdziesiąt': 90,
}

const parseNumber = (text) => {
    if (PL_NUMBERS[text] !== undefined) return PL_NUMBERS[text]
    const n = parseInt(text)
    return isNaN(n) ? null : n
}

export const createVoice = (commands, onNumber) => {
    // Web Speech API - wbudowane w przeglądarkę, webkit dla starszych wersji Chrome
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    // jeśli przeglądarka nie obsługuje, zwracamy puste funkcje
    if (!SR) return { toggle: () => {} }

    let active = false
    let recognition = null

    const create = () => {
        const r = new SR()
        r.lang = 'pl-PL'
        r.continuous = false      // zatrzymuje się po każdym słowie - unika zawieszania
        r.interimResults = false  // czeka na pewny wynik, ignoruje tymczasowe
        r.maxAlternatives = 3     // sprawdza 3 warianty rozpoznania

        r.onresult = (e) => {
            const result = e.results[e.results.length - 1]
            // sprawdza wszystkie alternatywy - pierwsza pasująca wygrywa
            for (let i = 0; i < result.length; i++) {
                const word = result[i].transcript.trim().toLowerCase()
                if (commands[word]) { commands[word](); r.stop(); return; }
                const n = parseNumber(word)
                if (n !== null && onNumber) { onNumber(n); r.stop(); return; }
            }
            r.stop()
        }

        r.onerror = (e) => { if (e.error === 'not-allowed') active = false }
        // po zatrzymaniu auto-restart jeśli nadal aktywny
        r.onend = () => { if (active) setTimeout(() => { recognition = create(); recognition.start() }, 150) }

        return r
    }

    return {
        toggle: () => {
            if (active) { active = false; recognition?.stop() }
            else        { active = true; recognition = create(); recognition.start() }
        }
    }
}
