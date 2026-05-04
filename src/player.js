export const createPlayer = () => {
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(script)

    const el = document.createElement('div')
    el.style.cssText = 'width:100%;height:100%;min-height:300px'

    let player        = null
    let loopTimeout   = null
    let pendingShow   = null
    let currentTech   = null
    let loopFromStart = false

    const scheduleLoop = () => {
        clearTimeout(loopTimeout)
        const duration = currentTech.end - currentTech.start
        el.dispatchEvent(new CustomEvent('loopstart', { detail: { duration } }))
        const pos       = loopFromStart ? currentTech.start : player.getCurrentTime()
        loopFromStart   = false
        const remaining = (currentTech.end - pos) * 1000
        loopTimeout = setTimeout(() => {
            loopFromStart = true
            player.seekTo(currentTech.start, true)
            scheduleLoop()
        }, Math.max(0, remaining - 500)) }

    const doShow = (tech) => {
        clearTimeout(loopTimeout)
        loopFromStart       = true
        const sameVideo     = currentTech?.videoId === tech.videoId
        currentTech         = tech
        if (sameVideo) { player.seekTo(tech.start, true); player.playVideo(); return }
        player.loadVideoById({ videoId: tech.videoId, startSeconds: tech.start }) }

    window.onYouTubeIframeAPIReady = () => {
        player = new YT.Player(el, {
            playerVars: { autoplay: 0, mute: 1, controls: 0, rel: 0 },
            events: {
                onReady:      () => { if (pendingShow) { doShow(pendingShow); pendingShow = null } },
                onStateChange: (e) => {
                    if (!currentTech) return
                    if (e.data === YT.PlayerState.PLAYING) scheduleLoop() }
            }
        }) }

    const show  = (tech) => { if (!player) { pendingShow = tech; return } doShow(tech) }
    const play  = () => player?.playVideo()
    const pause = () => player?.pauseVideo()
    return { el, show, play, pause }
}
