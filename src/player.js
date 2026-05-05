const SEEK_BUFFER_MS = 500

export class YouTubePlayer extends EventTarget {
    #yt      = null
    #tech    = null
    #timer   = null
    #pending = null
    el       = Object.assign(document.createElement('div'), {
        style: 'width:100%;height:100%;min-height:300px' })

    constructor() {
        super()
        const s = document.createElement('script')
        s.src   = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(s)

        window.onYouTubeIframeAPIReady = () => {
            this.#yt = new YT.Player(this.el, {
                playerVars: { autoplay: 0, mute: 1, controls: 0, rel: 0 },
                events: {
                    onReady:       () => { if (this.#pending) { this.#doShow(this.#pending); this.#pending = null } },
                    onStateChange: (e) => {
                        if (e.data === YT.PlayerState.PLAYING && this.#tech)
                            this.#scheduleLoop() } } }) } }

    #scheduleLoop() {
        clearTimeout(this.#timer)
        const duration = this.#tech.end - this.#tech.start
        this.dispatchEvent(new CustomEvent('loopstart', { detail: { duration } }))
        this.#timer = setTimeout(() => {
            this.#yt.seekTo(this.#tech.start, true)
            this.#scheduleLoop()
        }, Math.max(0, duration * 1000 - SEEK_BUFFER_MS)) }

    #doShow(tech) {
        clearTimeout(this.#timer)
        const sameVideo = this.#tech?.videoId === tech.videoId
        this.#tech = tech
        if (sameVideo) {
            this.#yt.seekTo(tech.start, true)
            this.#yt.playVideo()
            return }
        this.#yt.loadVideoById({ videoId: tech.videoId, startSeconds: tech.start }) }

    show(tech)  { if (!this.#yt) { this.#pending = tech; return } this.#doShow(tech) }
    play()      { this.#yt?.playVideo() }
    pause()     { this.#yt?.pauseVideo() }
}

export const createPlayer = () => new YouTubePlayer()
