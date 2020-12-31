class PlayerG1 {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.minX = 0
        this.maxX = this.ctx.canvas.width
        this.vx = 0

        this.y = y
        this.maxY = y
        this.vy = 0

        this.width = 0
        this.height = 0

        this.sprite = new Image()
        this.sprite.src = './assets/img/PlayerG1(JonSnow).png'
        this.sprite.isReady = false
        this.sprite.horizontalFrames = 2
        this.sprite.verticalFrames = 2
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 1
        this.sprite.drawCount = 0
        this.sprite.onload = () => {
            this.sprite.isReady = true
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
            this.width = this.sprite.frameWidth
            this.height = this.sprite.frameHeight
        }

        this.movements = {
        up: false,
        right: false,
        left: false
        }

        this.isJumping = false
        this.canFigth = true

        this.swords = []

        this.sounds = {
          figth: new Audio('./assets/sounds/sword.mp3')
        }
    }

    isReady() {
        return this.sprite.isReady
    }

    clear() {
        this.swords = this.swords.filter(sword => sword.x <= this.ctx.canvas.width)
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
        this.swords.forEach(sword => sword.draw())
        this.animate()
        }
    }

    onKeyEvent(event) {
        const status = event.type === 'keydown'
        switch (event.keyCode) {
            case KEY_UP:
                this.movements.up = status
            break;
            case KEY_RIGHT:
                this.movements.right = status
            break;
            case KEY_LEFT:
                this.movements.left = status
            break;
            case KEY_FIGTH:
                if (this.canFigth) {
                this.animateJump()
                this.swords.push(new SwordJN(this.ctx, this.x + this.width, this.y, this.maxY + this.height))
                this.sounds.figth.currentTime = 0
                this.sounds.figth.play()
                this.canFigth = false
                setTimeout(() => {
                    this.canFigth = true
                }, 500);
                }
                break;
            
            default:
            break;
        }
    }

    move() {
        this.swords.forEach(sword => sword.move())
        
        if (this.movements.up && !this.isJumping) {
            this.isJumping = true
            this.vy = -10
        } else if (this.isJumping) {
            this.vy += GRAVITY
        }
        
        if (this.movements.right) {
            this.vx = SPEED
        } else if (this.movements.left) {
            this.vx = -SPEED
        } else {
            this.vx = 0
        }
        
        this.x += this.vx
        this.y += this.vy
        
        if (this.x + this.width >= this.maxX) {
            this.x = this.maxX - this.width
            this.vx = 0
        } else if (this.x <= this.minX) {
            this.x = this.minX
        }
        
        if (this.x <= this.maxX) {
            this.vx = -8
            this.x -= DIRECTION
        }
        
        if (this.y >= this.maxY) {
            this.isJumping = false
            this.y = this.maxY
            this.vy = 0
        }
    }

    move2() {
        this.swords.forEach(sword => sword.move())
        
        if (this.movements.up && !this.isJumping) {
            this.isJumping = true
            this.vy = -10
        } else if (this.isJumping) {
            this.vy += GRAVITY
        }
        
        if (this.movements.right) {
            this.vx = SPEED
        } else if (this.movements.left) {
            this.vx = -SPEED
        } else {
            this.vx = 0
        }
        
        this.x += this.vx
        this.y += this.vy
        
        if (this.x + this.width >= this.maxX) {
            this.x = this.maxX - this.width
            this.vx = 0
        } else if (this.x <= this.minX) {
            this.x = this.minX
        }
        
        // if (this.x <= this.maxX) {
        //     this.vx = -8
        //     this.x -= DIRECTION
        // }
        
        if (this.y >= this.maxY) {
            this.isJumping = false
            this.y = this.maxY
            this.vy = 0
        }
    }
    
    animate() {
        if (this.isJumping) {
            this.animateJump()
        } else if (this.movements.right || this.movements.left) {
            this.animateSprite()
        } else {
            this.resetAnimation()  
        }
    }

    resetAnimation() {
        this.sprite.horizontalFrameIndex = 0
        this.sprite.verticalFrameIndex = 1
    }

    animateJump() {
        this.sprite.verticalFrameIndex = 0
        this.sprite.horizontalFrameIndex = 0
    }

    animateSprite() {
        if (this.sprite.verticalFrameIndex !== 1) {
        this.sprite.verticalFrameIndex = 1
        this.sprite.horizontalFrameIndex = 0
        } else if (this.sprite.drawCount % 10 === 0) {
        if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames - 1) {
            this.sprite.horizontalFrameIndex = 0
        } else {
            this.sprite.horizontalFrameIndex++
        }
        this.sprite.drawCount = 0
        }
    }

    collidesWith(element) {
        return this.x < element.x + element.width &&
        this.x + this.width > element.x &&
        this.y < element.y + element.height &&
        this.y + this.height > element.y
    }
}