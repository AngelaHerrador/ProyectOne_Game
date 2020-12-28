class Game1 {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 800
    this.canvas.height = 450
    this.ctx = this.canvas.getContext('2d')

    this.fps = 1000 / 60
    this.drawInterval = undefined

    this.background = new BackgroundG1 (this.ctx)
    this.player = new PlayerG1(this.ctx, 10, this.canvas.height - 165)
    this.enemieKhaleesi = new EnemieKhaleesi (this.ctx, this.canvas.width, 25)
    
    const theme = new Audio('assets/sounds/theme.mp3')
    theme.volume = 0.5
    
    this.sounds = {
      theme,
    }
    this.obstacles = []
    this.obstacleDrawCount = 0
    
    this.enemiesKhal = []
    this.enemiesKhalDrawCount = 0

    setInterval(() => {
      this.obstacles.push(new ObstaclesG1 (this.ctx))
    }, 1000)

    this.lives = []
    this.livesDrawCount = 0

    setInterval(() => {
      this.lives.push(new LivesG1 (this.ctx))
    }, 1000)

    this.points = 0
    this.pointsSword = new Score (this.ctx, 5, 10)
    this.pointsLives = new LivesPoints(this.ctx, this.canvas.width - 165, 9)
    
    this.pointScore = 0
    this.pointLives = 5
  }

  start() {
    if (!this.drawInterval) {
      //this.sounds.theme.play()
      this.drawInterval = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
        this.obstacleDrawCount++
        this.livesDrawCount++
        this.enemiesKhalDrawCount++

        if (this.obstacleDrawCount % PIPE_FRAMES_OBSTACLES === 0) {
          this.addObstacles()
          this.obstacleDrawCount = 0
        }
        if (this.livesDrawCount % PIPE_FRAMES_LIVES === 0) {
          this.addLives()
          this.livesDrawCount = 0
        }
        if (this.livesDrawCount % PIPE_FRAMES_KHAL === 0) {
          this.addEnemiesKhal()
          this.enemiesKhalDrawCount = 0
        }
      }, this.fps)

        this.checkCollisions()
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw() {
    this.background.draw()
    this.player.draw()
    this.obstacles.forEach(obs => obs.draw())
    this.lives.forEach(live => live.draw())
    this.pointsSword.draw()
    this.pointsLives.draw()
    this.enemiesKhal.forEach(Khal => Khal.draw())
    this.enemieKhaleesi.draw()
    

    this.ctx.save()
    this.ctx.font = '18px Arial'
    this.ctx.fillText(`Score: ${this.pointScore}`, 30, 30)
    this.ctx.restore()
  
    this.ctx.save()
    this.ctx.font = '18px Arial'
    this.ctx.fillText(`Lives: ${this.pointLives}`, this.canvas.width - 100, 30)
    this.ctx.restore()
   }
  
  // generateObstacles() {
  //   if (this.fps % 90 === 0) {
  //     this.obstacles.push(new Obstacle(this.ctx, this.width, this.player.posY0, this.player.height));
  //   }
  // }

  move() {
    this.background.move()
    this.player.move()
    this.obstacles.forEach(obs => obs.move())
    this.lives.forEach(live => live.move())
    this.enemiesKhal.forEach(Khal => Khal.move())
    this.enemieKhaleesi.move()
   }

   onKeyEvent(event) {
    this.player.onKeyEvent(event)
//     this.background.onKeyEvent(event)
//     this.coins.forEach(coin => coin.onKeyEvent(event))
  }
   
  addObstacles() { 
    this.obstacles.push(
      new ObstaclesG1 (
        this.ctx,
        this.canvas.width,
        this.canvas.height - 180
      )
    )
  }

  addLives() { 
  this.lives.push(
    new LivesG1 (
      this.ctx,
      this.canvas.width,
      this.canvas.height - 300
    )
  )
  }

  addEnemiesKhal() { 
  this.enemiesKhal.push(
    new EnemieKhal(
      this.ctx,
      this.canvas.width,
      this.canvas.height - 185)
  )
  }
  
  

  checkCollisions() {
    const restCoins = this.coins.filter(coin => !this.mario.collidesWith(coin))
    const newPoints = this.coins.length - restCoins.length
    this.points += newPoints

    if (newPoints) {
      this.sounds.coin.currentTime = 0
      this.sounds.coin.play()
    }

    
   }
}