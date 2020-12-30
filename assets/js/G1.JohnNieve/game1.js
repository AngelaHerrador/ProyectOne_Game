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
      live: new Audio('assets/sounds/live.mp3'),
      gameOver: new Audio('assets/sounds/game-over.mp3'),
      start: new Audio('assets/sounds/start.mp3')
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
    this.pointsLives = new LivesPoints(this.ctx, this.ctx.canvas.width - 165, 9)
    
    this.pointScore = 0
    this.pointLives = 5
  }

  start() {
    if (!this.drawInterval) {
      this.sounds.theme.play()
      //this.sounds.start.play()

      this.drawInterval = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
        this.obstacleDrawCount++
        this.livesDrawCount++
        this.enemiesKhalDrawCount++

        if (this.obstacleDrawCount % FRAMES_OBSTACLES === 0) {
          this.addObstacles()
          this.obstacleDrawCount = 0
        }
        if (this.livesDrawCount % FRAMES_LIVES === 0) {
          this.addLives()
          this.livesDrawCount = 0
        }
        if (this.livesDrawCount % FRAMES_KHAL === 0) {
          this.addEnemiesKhal()
          this.enemiesKhalDrawCount = 0
        }
        if (this.background.stop()) {
          cclearInterval(this.drawInterval)
        }
        this.checkCollisions()
      }, this.fps)
    }
    if (this.background.stop()) {
          this.finalFigth()
        }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.obstacles = this.obstacles.filter(obstacle => obstacle.y <= this.canvas.height)
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
  
  finalFigth() {
    this.clear()
    clearInterval(this.drawInterval)

  }
  
  gameOver() {
    clearInterval(this.drawInterval)
    this.sounds.gameOver.play()

    this.ctx.save()

    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    this.ctx.font = '30px Arial'
    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      'GAME OVER!',
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 - 100,
    )
    this.ctx.font = '25px Arial'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(
      `Your final score ${this.pointScore}`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 
    )
    
    this.ctx.restore()
  }
   
  addObstacles() { 
    this.obstacles.push(
      new ObstaclesG1 (
        this.ctx,
        this.canvas.width,
        0
      )
    )
    this.pointScore++
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
    this.pointScore++
  }
  
  checkCollisions() {
    // if (this.obstacles.some(obstacle => this.player.collidesWith(obstacle))) {
    //   this.pointLives -= 1
    //   // if (this.pointLives < 1) {
    //   //   this.gameOver()
    //   // }
    //   console.log(this.pointLives)
    // }

    const restEnemies = this.enemiesKhal.filter(Khal => !this.player.collidesWith(Khal))
    const newEnemies = this.enemiesKhal.length - restEnemies.length
    this.pointLives -= newEnemies

     
    this.enemiesKhal = restEnemies
  
      if (this.pointLives < 1) {
        this.gameOver()
      } 
    



    const restLives = this.lives.filter(live => !this.player.collidesWith(live))
    const newLives = this.lives.length - restLives.length
    this.pointLives += newLives

    if (newLives) {
      this.sounds.live.currentTime = 0
      this.sounds.live.play()
    }

    this.lives = restLives
  }
  
}