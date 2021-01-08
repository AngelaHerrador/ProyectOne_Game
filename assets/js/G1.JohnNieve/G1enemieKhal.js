class EnemieKhal {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x

        this.y = y
        this.maxY = y

        this.sprite = new Image()
        this.sprite.src = './assets/img/Enemie(KhalDrogo).png'
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 2
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

        this.canFire = true

        this.bullets = []

        this.haveCollide = false
    }

    isReady() {
        return this.sprite.isReady
    }

    clear() {
    this.bullets = this.bullets.filter(bullet => bullet.x <= this.ctx.canvas.x)
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
            this.width,
            this.height
        )
            
        this.sprite.drawCount++
        this.bullets.forEach(bullet => bullet.draw())
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
        if (this.canFire) {
            this.bullets.push(new Fireball(this.ctx, this.x, this.y, this.maxY + this.height))
          this.canFire = false
          setTimeout(() => {
              this.canFire = true
          }, 3000);
        }
    }

    move() {
        this.bullets.forEach(bullet => bullet.move())
        this.x -= SPEED_KHAL
    }

     collidesWith(element) {
        if (this.x < element.x + element.width &&
        this.x + this.width > element.x &&
        this.y < element.y + element.height &&
        this.y + this.height > element.y &&
            !element.haveCollide) {
            debugger
            element.haveCollide = true
            return true
        }
        return false  
    }
}