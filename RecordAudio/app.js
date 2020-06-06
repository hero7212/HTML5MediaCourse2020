new Vue({
    el: "#vueapp",

    data: {
        currentWebmData: null,
        recording: false,
        paused: false
    },

    mounted() { 
        this._initApp()
    },

    methods: {

        async _initApp() {
            this._stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
            this._recorder = new MediaRecorder(this._stream, {mimeType: 'video/webm;codecs=h264'})
            this._recorder.ondataavailable = this.recorder_dataAvailableHandler.bind(this)
        },

        recorder_dataAvailableHandler(e) {
            console.log(e)
        },

        btnRecrodClicked() {
            this.recording = true
            this._recorder.start()
        },

        btnPauseClicked() {
            this.paused = true
            this._recorder.pause()
        },
        
        btnResumeClicked() {
            this.paused = false
            this._recorder.resume()
        },

        btnStopClicked() {
            this.recording = false
            this._recorder.stop()
        },

        btnPlayClicked() {
            this.$refs.player.src = URL.createObjectURL(this.currentWebmData)
        }
    }
})






