new Vue({
    el: '#vueapp',
    mounted() {
        /**
         * 
         * 
         */
        this._previewContext2d = this.$refs.preview.getContext('2d')
        /**
         * 
         * 
         */
        this._resultContext2d = this.$refs.result.getContext('2d')
        this._video = document.createElement("video")
        this._video.src = "3.webm"

        this._previewCanvasWidth = this.$refs.preview.width
        this._previewCanvasHeight = this.$refs.preview.height

        requestAnimationFrame(this.animationFrameHandler.bind(this))
    },
    methods: {

        btnPlayClick() {
            this._video.play()
        },

        btnStopClick() {
            this._video.pause()
        },

        animationFrameHandler() {
            this._previewContext2d.drawImage(this._video, 0, 0, this._previewCanvasWidth, this._previewCanvasHeight)
            let srcImageData = this._previewContext2d.getImageData(0, 0, this._previewCanvasWidth, this._previewCanvasHeight)
            let destImageData = this._resultContext2d.createImageData(srcImageData.width, srcImageData.height)

            let length = srcImageData.data.byteLength
            let rawData = srcImageData.data
            for (let i=0; i < length; i += 4) {
                let c = Math.floor((rawData[i] + rawData[i+1] + rawData[i+2]) / 3)
                destImageData.data[i] = c
                destImageData.data[i + 1] = c
                destImageData.data[i + 2] = c
                destImageData.data[i + 3] = 255
            }

            this._resultContext2d.putImageData(destImageData, 0, 0)
            requestAnimationFrame(this.animationFrameHandler.bind(this))
        }
    }
})