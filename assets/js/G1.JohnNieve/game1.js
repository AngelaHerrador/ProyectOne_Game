// 1. Colisión sword con Khal Drogo (desaparece sin tocarlo)
// 2. Colision sword con finalEnemie (resta puntos sin tocarlo)
// 3. Swords (no desaparecen al chocar con enemigos) 
// 4. No desaparecen las bullets de finalEnemie

class Game1 {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 800
    this.canvas.height = 450
    this.ctx = this.canvas.getContext('2d')

    this.fps = 1000 / 60
    this.drawInterval = undefined
    this.drawInterval2 = undefined

    this.background = new BackgroundG1(this.ctx)
    this.player = new PlayerG1(this.ctx, 10, this.canvas.height - 165)
    this.enemieKhaleesi = new EnemieKhaleesi(this.ctx, this.canvas.width, 25)
    this.finalEnemie = new finalEnemie(this.ctx, this.canvas.width / 2, 25)
    
    const theme = new Audio('assets/sounds/theme.mp3')
    
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
    
    this.enemiesKhal = []
    this.enemiesKhalDrawCount = 0

    setInterval(() => {
      this.obstacles.push(new ObstaclesG1(this.ctx))
    }, 1000)

    this.lives = []
    this.livesDrawCount = 0

    setInterval(() => {
      this.lives.push(new LivesG1(this.ctx))
    }, 1000)

    this.points = 0
    this.pointsSword = new Score(this.ctx, 5, 10)
    this.pointsLives = new LivesPoints(this.ctx, this.ctx.canvas.width - 165, 9)
    
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
    }, 2000);

    setTimeout(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.ctx.save()
      this.ctx.fillStyle = 'rgba(2, 45, 105, 0.4)'
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.ctx.font = '200px GameOfThrones'
      this.ctx.fillStyle = 'rgba(2, 45, 105, 1)'
      this.ctx.fillText(`1`, this.canvas.width / 2 - 50, this.canvas.height / 2 + 50)
  
      this.ctx.restore()  
    }, 3000);

    setTimeout(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.ctx.save()
      this.ctx.fillStyle = 'rgba(2, 45, 105, 0.4)'
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      this.ctx.font = '100px GameOfThrones'
      this.ctx.fillStyle = 'rgba(2, 45, 105, 1)'
      this.ctx.fillText(`GO!`, this.canvas.width / 3, this.canvas.height / 2 + 50)
  
      this.ctx.restore()  
    }, 4000);
    this.sounds.start.play()
      setTimeout(() => {
        this.sounds.theme.play() 
        this.start()
      }, 5000);
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
        this.enemiesKhalDrawCount++

        if (this.obstacleDrawCount % FRAMES_OBSTACLES === 0) {
          this.addObstacles()
          this.obstacleDrawCount = 0
        }
        if (this.livesDrawCount % FRAMES_LIVES === 0) {
          this.addLives()
          this.livesDrawCount = 0
        }
        if (this.enemiesKhalDrawCount % FRAMES_KHAL_WW === 0) {
          this.addEnemiesKhal()
          this.enemiesKhalDrawCount = 0
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
    this.pointsSword.draw()
    this.pointsLives.draw()
    this.enemiesKhal.forEach(Khal => Khal.draw())
    this.enemieKhaleesi.draw()
    

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
    this.enemiesKhal.forEach(Khal => Khal.move())
    this.enemieKhaleesi.move()
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
    this.ctx.fillText(`Lives Jon: ${this.pointLives}`, 30, 33)
    this.ctx.restore()
        
    this.ctx.save()
    this.ctx.font = '18px GameOfThrones'
    this.ctx.fillText(`Score: ${this.pointScore}`, this.canvas.width / 3 + 50, 33)
    this.ctx.restore()

    this.ctx.save()
    this.ctx.font = '18px GameOfThrones'
    this.ctx.fillText(`Lives Daenerys: ${this.finalEnemie.livesDT}`, this.canvas.width - 220, 33)
    this.ctx.restore()
  }

  youPass() {
    clearInterval(this.drawInterval)
    this.sounds.theme.pause()
    this.sounds.finalFigth.play()

    this.ctx.save()

    this.ctx.fillStyle = 'rgba(243, 155, 104, 0.5)'
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    this.ctx.font = '30px GameOfThrones'
    this.ctx.fillStyle = 'rgba(160, 13, 60, 1)'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      "It's the time...",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 - 50,
    )

    this.ctx.font = '30px GameOfThrones'
    this.ctx.fillStyle = 'rgba(160, 13, 60, 1)'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(
      'ARE YOU READY FOR THE FINAL BATTLE?',
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 + 20,
    )

    this.ctx.font = '15px GameOfThrones'
    this.ctx.fillStyle = 'rgba(160, 13, 60, 1)'
    this.ctx.fillText(
      `Your score is now: ${this.pointScore}`,
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2 + 200
    )
    this.ctx.restore()
  }

  congrats() {
    clearInterval(this.drawInterval2)
    this.sounds.finalFigth.pause()
    this.sounds.youWin.play()

    this.ctx.save()

    this.img = new Image()
    this.img.src = 'assets/img/final/jonSnow.jpg'
    this.img.onload = () => this.ctx.drawImage(this.img, 40, 25, 300, 400) 
    

    this.ctx.fillStyle = 'black'
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

      this.ctx.font = '30px GameOfThrones'
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
      new ObstaclesG1(
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
      new LivesG1(
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

    //JS with EnemieKhalesi (*) - Sin colisionar me baja 1pto -

    // if (this.player.collidesWith(this.enemieKhaleesi)) {
    //   this.pointLives -=1
    // }

    //JS with Obstacles

    if (this.obstacles.some(obstacle => this.player.collidesWith(obstacle))) {
      this.pointLives -= 1
    }

    //JS with fireball

    this.enemiesKhal.forEach(Khal => {
      if (Khal.bullets.some(bullet => this.player.collidesWith(bullet))) {
        this.pointLives -= 1
      }
    })

    //JS with Khals 

    // - Crashes but doesn't go away

    if (this.enemiesKhal.some(Khal => this.player.collidesWith(Khal))) {
      this.pointLives -= 1
    }

    // - Crash and disappear

    // const restEnemies = this.enemiesKhal.filter(Khal => !this.player.collidesWith(Khal))
    // const newEnemies = this.enemiesKhal.length - restEnemies.length
    // this.pointLives -= newEnemies
    
    // this.enemiesKhal = restEnemies

    //JS Sword with Khal (*) - Antes de tocar al Khal desaparece -

    this.player.swords.forEach(sword => {
      if (this.enemiesKhal.some(Khal => Khal.collidesWith(sword))) {
        this.enemiesKhal = this.enemiesKhal.filter(Khal => !sword.collidesWith(Khal))
        this.player.swords = this.player.swords.filter(sword => !this.enemiesKhal.forEach(Khal => Khal.collidesWith(sword)))
        this.pointScore +=5
      }
    })
    
    // Case GameOver 
    
    if (this.pointLives < 1) {
      this.gameOver()
    }

    //JS with lives
    
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

    //Bullets with JS

    if (this.finalEnemie.bullets.some(bullet => this.player.collidesWith(bullet))) {
      this.pointLives -= 1
    }

    //Swords with finalEnemie 

    const restSwords = this.player.swords.filter(sword => !this.finalEnemie.collidesWith(sword))
    const newSwords = this.player.swords.length - restSwords.length
    this.pointScore += newSwords * 5
    this.finalEnemie.livesDT -= newSwords
    
    this.player.swords = restSwords

    //finalEnemie bullets with Khalesi

    const restBullets = this.finalEnemie.bullets.filter(bullet => !this.player.collidesWith(bullet))
    const newBullets = this.finalEnemie.bullets.length - restBullets.length
    
    this.pointLives -= newBullets
    
    this.finalEnemie.bullets = restBullets

    //JS with finalEnemie

    if (this.finalEnemie.collidesWith(this.player)) {
      console.log ('hola')
      this.gameOver()
    }

    //Case GameOver

    if (this.pointLives < 1) {
      this.gameOver()
    }

    //Case youWin

    if (this.finalEnemie.livesDT < 1) {
      this.congrats()
    }
  }
}