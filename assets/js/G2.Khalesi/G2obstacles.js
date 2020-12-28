class ObstaclesG2 {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.sprite = new Image()
        this.sprite.src = './assets/img/ice.png'
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    move() {
        this.x += this.vx
    }
}