class finalEnemie {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx

        this.x = x
        this.y = y
        //this.maxY = y

        this.vx = 0.5
        this.vy = 2

        this.sprite = new Image()
        this.sprite.src = './assets/img/DragonKhaleesi.png'
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 3
        this.sprite.verticalFrames = 1
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 0
        this.sprite.drawCount = 0
        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            this.width = this.sprite.frameWidth
            this.height = this.sprite.frameHeight
        }

        this.drawInterval = undefined
    }

    isReady() {
        return this.sprite.isReady
    }

    draw() {
        if (this.isReady()) {
        this.ctx.drawImage(
            this.sprite,
            this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
            this.sprite.verticalFrameIndex * this.sprite.frameHeight,
            this.sprite.frameWidth,
            this.sprite.frameHeight,
            this.x,
            this.y,
            250,
            200
        )
            
        this.sprite.drawCount++
        this.animate()
        }
    }

    animate() {
        if (this.sprite.drawCount % 10 === 0) {
        if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames - 1) {
            this.sprite.horizontalFrameIndex = 0
        } else {
            this.sprite.horizontalFrameIndex++
        }
        this.sprite.drawCount = 0
        }
    }

    move() {
        // if (!this.drawInterval) {
        //     this.drawInterval = setInterval(() => {
        //         this.vy += GRAVITY
        //         this.y += this.vy
        //     }, 1000)
        // }

    this.x += this.vx
    this.y += this.vy

    if (this.y + 200 >= this.ctx.canvas.height) {
      this.y = this.ctx.canvas.height - 200
      this.vy *= -0.7
    }
        
    if (this.y <= 0) {
        this.y = 0
        this.vy = 0.7
    }
        
    if (this.x + 250 >= this.ctx.canvas.width) {
        this.x = this.ctx.canvas.width - 250
        this.vx = -0.7
    }
        
    if (this.x <= 100) {
        this.x = 100
        this.vx = 0.7
    }
    }
}