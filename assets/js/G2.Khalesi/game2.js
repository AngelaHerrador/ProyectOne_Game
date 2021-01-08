class Game2 {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 800
    this.canvas.height = 450
    this.ctx = this.canvas.getContext('2d')

    this.fps = 1000 / 60
    this.drawInterval = undefined
    this.drawInterval2 = undefined

    this.background = new BackgroundG2 (this.ctx)
    this.player = new PlayerG2 (this.ctx, 10, this.canvas.height - 155)
    this.enemieKing = new EnemieKing(this.ctx, this.canvas.width, 25)
    this.finalEnemie = new finalEnemie2 (this.ctx, this.canvas.width/2, 25)

    const theme = new Audio('assets/sounds/theme.mp3')
    theme.volume = 0.5
      
    this.sounds = {
      theme,
      live: new Audio('assets/sounds/live.mp3'),
      gameOver: new Audio('assets/sounds/game-over.mp3'),
      start: new Audio('assets/sounds/start.mp3'),
      finalFigth: new Audio('assets/sounds/finalFigth.mp3'),
      youWin: new Audio('assets/sounds/you-win.mp3')
    }
    
    this.obstacles = []
    this.obstacleDrawCount = 0

    this.enemiesWhiteWalker = []
    this.enemiesWhiteWalkerDrawCount = 0

    setInterval(() => {
      this.obstacles.push(new ObstaclesG2 (this.ctx))
    }, 1000)

    this.lives = []
    this.livesDrawCount = 0

    setInterval(() => {
      this.lives.push(new LivesG1 (this.ctx))
    }, 1000)
    
    this.points = 0
    this.pointsFireball = new Fireball (this.ctx, 3, 10, 3)
    this.pointsLives = new LivesPoints(this.ctx, this.canvas.width - 165, 9)
    
    this.pointScore = 0
    this.pointLives = 5

    this.isStart = false
    this.isFinished = false
  }

 countDown() {

    if (!this.isStart) {
    this.ctx.save()
  
    this.ctx.fillStyle = 'rgba(2, 45, 105, 0.4)'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.font = '200px GameOfThrones'
    this.ctx.fillStyle = 'rgba(2, 45, 105, 1)'
    this.ctx.fillText(`3`, this.canvas.width / 2 - 50, this.canvas.height / 2 + 50)
  
    this.ctx.restore()  
    
    setTimeout(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      
      this.ctx.save()
      this.ctx.fillStyle = 'rgba(2, 45, 105, 0.4)'
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.ctx.font = '200px GameOfThrones'
      this.ctx.fillStyle = 'rgba(2, 45, 105, 1)'
      this.ctx.fillText(`2`, this.canvas.width / 2 - 50, this.canvas.height / 2 + 50)
  
      this.ctx.restore()  
    }, 1000);

    setTimeout(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.ctx.save()
      this.ctx.fillStyle = 'rgba(2, 45, 105, 0.4)'
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.ctx.font = '200px GameOfThrones'
      this.ctx.fillStyle = 'rgba(2, 45, 105, 1)'
      this.ctx.fillText(`1`, this.canvas.width / 2 - 50, this.canvas.height / 2 + 50)
  
      this.ctx.restore()  
    }, 2000);

    setTimeout(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.ctx.save()
      this.ctx.fillStyle = 'rgba(2, 45, 105, 0.4)'
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.ctx.font = '100px GameOfThrones'
      this.ctx.fillStyle = 'rgba(2, 45, 105, 1)'
      this.ctx.fillText(`GO!`, this.canvas.width / 3, this.canvas.height / 2 + 50)
  
      this.ctx.restore()  
    }, 3000);
    this.sounds.start.play()
      setTimeout(() => {
        this.sounds.theme.play() 
        this.start()
      }, 4000);
  }
  }

  start() {
    if (!this.drawInterval) {
      this.sounds.theme.play()
      this.drawInterval = setInterval(() => {
        this.isStart = true
        this.clear()
        this.move()
        this.draw()
        this.obstacleDrawCount++
        this.livesDrawCount++
        this.enemiesWhiteWalkerDrawCount++

        if (this.obstacleDrawCount % FRAMES_OBSTACLES === 0) {
          this.addObstacles()
          this.obstacleDrawCount = 0
        }
        if (this.livesDrawCount % FRAMES_LIVES === 0) {
          this.addLives()
          this.livesDrawCount = 0
        }
        if (this.enemiesWhiteWalkerDrawCount % FRAMES_KHAL_WW === 0) {
          this.addEnemiesWhiteWalker()
          this.enemiesWhiteWalkerDrawCount = 0
        }
        this.checkCollisions()   
      }, this.fps)

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
    this.pointsFireball.draw()
    this.pointsLives.draw()
    this.enemiesWhiteWalker.forEach(whiteWalker => whiteWalker.draw())
    this.enemieKing.draw()
    

    this.ctx.save()
    this.ctx.font = '18px GameOfThrones'
    this.ctx.fillText(`Score: ${this.pointScore}`, 30, 33)
    this.ctx.restore()
  
    this.ctx.save()
    this.ctx.font = '18px GameOfThrones'
    this.ctx.fillText(`Lives: ${this.pointLives}`, this.canvas.width - 100, 33)
    this.ctx.restore()
   }

  move() {
    this.background.move()
    this.player.move()
    this.obstacles.forEach(obs => obs.move())
    this.lives.forEach(live => live.move())
    this.enemiesWhiteWalker.forEach(whiteWalker => whiteWalker.move())
    this.enemieKing.move()
   }

  onKeyEvent(event) {
     this.player.onKeyEvent(event)
  }
   
  finalFigth() {
    clearInterval(this.drawInterval)
      this.sounds.theme.pause()
      this.sounds.finalFigth.play()
      this.drawInterval2 = setInterval(() => {
        this.background.draw()
        this.addMenu()
        this.player.draw()
        this.player.move2()
        this.finalEnemie.draw()
        this.finalEnemie.move()
        this.checkCollisions2()
      }, this.fps) 
  }

  addMenu() {
    this.ctx.save()
    this.ctx.font = '18px GameOfThrones'
    this.ctx.fillText(`Lives Daenerys: ${this.pointLives}`, 30, 33)
    this.ctx.restore()
        
    this.ctx.save()
    this.ctx.font = '18px GameOfThrones'
    this.ctx.fillText(`Score: ${this.pointScore}`, this.canvas.width / 3 + 50, 33)
    this.ctx.restore()

    this.ctx.save()
    this.ctx.font = '18px GameOfThrones'
    this.ctx.fillText(`Lives Night King: ${this.finalEnemie.livesKN}`, this.canvas.width - 230, 33)
    this.ctx.restore()
  }


  youPass() {
    clearInterval(this.drawInterval)
    this.sounds.theme.pause()
    this.sounds.finalFigth.play()

    this.ctx.save()

    this.ctx.fillStyle = 'rgba(139, 187, 253, 0.5)'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    this.ctx.font = '30px GameOfThrones'
    this.ctx.fillStyle = 'rgba(2, 45, 105, 1)'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      "It's the time...",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 - 50,
    )

    this.ctx.font = '30px GameOfThrones'
    this.ctx.fillStyle = 'rgba(2, 45, 105, 1)'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      'ARE YOU READY FOR THE FINAL BATTLE?',
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 + 20,
    )

    this.ctx.font = '15px GameOfThrones'
    this.ctx.fillStyle = 'rgba(2, 45, 105, 1)'
    this.ctx.fillText(
      `Your score is now: ${this.pointScore}`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height/2 + 200 
    )
    this.ctx.restore()
  }

  congrats() {
    clearInterval(this.drawInterval2)
    this.sounds.finalFigth.pause()
    this.sounds.youWin.play()

    this.ctx.save()

    this.img = new Image()
    this.img.src = 'assets/img/final/khalesi.jpg'
    this.img.onload = () => this.ctx.drawImage(this.img, 40, 25, 280, 400) 
    

    this.ctx.fillStyle = 'rgba(197, 184, 32, 1)'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    this.ctx.font = '30px GameOfThrones'
    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      'YOU WIN!',
      this.ctx.canvas.width / 2 + 150,
      this.ctx.canvas.height / 2 - 100,
    )

    this.ctx.font = '25px GameOfThrones'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(
      `Your final score is`,
      this.ctx.canvas.width / 2 + 150,
      this.ctx.canvas.height / 2
    )

    this.ctx.font = '30px GameOfThrones'
    this.ctx.fillStyle = 'white'
    this.ctx.fillText(
      `${this.pointScore}`,
      this.ctx.canvas.width / 2 + 150,
      this.ctx.canvas.height / 2 + 100
    )
    
    this.ctx.restore()

    this.isFinished = true
  }
  
  
  gameOver() {
    if (!this.isFinished) {

    clearInterval(this.drawInterval)
    clearInterval(this.drawInterval2)
    this.sounds.theme.pause()
    this.sounds.gameOver.play()

    this.ctx.save()

    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    this.ctx.font = '30px GameOfThrones'
    this.ctx.fillStyle = 'white'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      'GAME OVER',
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 - 100,
    )
      
    this.ctx.font = '25px GameOfThrones'
      this.ctx.fillStyle = 'white'
      this.ctx.fillText(
        `Your final score is`,
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2
      )

      this.ctx.font = '50px GameOfThrones'
      this.ctx.fillStyle = 'white'
      this.ctx.fillText(
        `${this.pointScore}`,
        this.ctx.canvas.width / 2,
        this.ctx.canvas.height / 2 + 120
      )
    
     this.ctx.restore()
      return false
    }
    this.isFinished === true
    return true
  }
   
  addObstacles() { 
    this.obstacles.push(
      new ObstaclesG2 (
        this.ctx,
        this.canvas.width,
        0
      )
    )
    this.pointScore++
    if (this.pointScore > 30) {
    this.youPass()
    setTimeout(() => {
      this.finalFigth()
    }, 5000);
      
    }
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

  addEnemiesWhiteWalker() { 
  this.enemiesWhiteWalker.push(
      new EnemieWhiteWalker(
      this.ctx,
      this.canvas.width,
      this.canvas.height - 175)
    )
    this.pointScore++

  }
  
  checkCollisions() {

    //Khalesi with EnemieKing (*) - Sin colisionar me baja 1pto -

    // if (this.player.collidesWith(this.enemieKing)) {
    //   this.pointLives -=1
    // }

    //Khalesi with Obstacles

    if (this.obstacles.some(obstacle => this.player.collidesWith(obstacle))) {
      this.pointLives -= 1
    }

    //Khalesi with fireball

    this.enemiesWhiteWalker.forEach(whiteWalker => {
      if (whiteWalker.bullets.some(bullet => this.player.collidesWith(bullet))) {
        this.pointLives -= 1
      }
    })

    //Khalesi with whiteWalkers

    // - Crashes but doesn't go away

    if (this.enemiesWhiteWalker.some(whiteWalker => this.player.collidesWith(whiteWalker))) {
      this.pointLives -= 1
    }

    // - Crash and disappear

    // const restEnemies = this.enemiesWhiteWalker.filter(whiteWalker => !this.player.collidesWith(whiteWalker))
    // const newEnemies = this.enemiesWhiteWalker.length - restEnemies.length
    // this.pointLives -= newEnemies
    
    // this.enemiesWhiteWalker = restEnemies

    //Khalesi Fireballs with whiteWalkers

    this.player.fireballs.forEach(fireball => {
      if (this.enemiesWhiteWalker.some(whiteWalker => whiteWalker.collidesWith(fireball))) {
        this.enemiesWhiteWalker = this.enemiesWhiteWalker.filter(whiteWalker => !fireball.collidesWith(whiteWalker))
        this.player.fireballs = this.player.fireballs.filter(fireball => !this.enemiesWhiteWalker.forEach(whiteWalker => whiteWalker.collidesWith(fireball)))
        this.pointScore +=5
      }
    })
    
    // Case GameOver 
    
    if (this.pointLives < 1) {
      this.gameOver()
    }

    //Khalesi with lives
    
    const restLives = this.lives.filter(live => !this.player.collidesWith(live))
    const newLives = this.lives.length - restLives.length
    this.pointLives += newLives

    if (newLives) {
      this.sounds.live.currentTime = 0
      this.sounds.live.play()
    }

    this.lives = restLives
  }


  checkCollisions2() {

    //Bullets with Khalesi

    if (this.finalEnemie.bullets.some(bullet => this.player.collidesWith(bullet))) {
      this.pointLives -= 1
    }

    //Khalesi Fireballs with finalEnemie 

    const restFireballs = this.player.fireballs.filter(fireball => !this.finalEnemie.collidesWith(fireball))
    const newFireballs = this.player.fireballs.length - restFireballs.length
    this.pointScore += newFireballs * 5
    this.finalEnemie.livesKN -= newFireballs
    
    this.player.fireballs = restFireballs

    //finalEnemie bullets with Khalesi

    const restBullets = this.finalEnemie.bullets.filter(bullet => !this.player.collidesWith(bullet))
    const newBullets = this.finalEnemie.bullets.length - restBullets.length
    
    this.pointLives -= newBullets
    
    this.finalEnemie.bullets = restBullets


    //Khalesi with finalEnemie

    if (this.player.collidesWith(this.finalEnemie)) {
      console.log ('hola')
      this.gameOver()
    }

    //Case GameOver

    if (this.pointLives < 1) {
      this.gameOver()
    }

    //Case youWin

    if (this.finalEnemie.livesKN < 1) {
      this.congrats()
    }
  }
  
}