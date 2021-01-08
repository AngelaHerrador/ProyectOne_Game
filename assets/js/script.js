window.onload = () => {
  const game1 = new Game1('game')
  const game2 = new Game2('game2')

document.addEventListener('keydown', (event) => {
  game1.onKeyEvent(event)
  game2.onKeyEvent(event)
  })

document.addEventListener('keyup', (event) => {
  game1.onKeyEvent(event)
  game2.onKeyEvent(event)
})
  const player1 = document.getElementById('player1')
  const player2 = document.getElementById('player2')
  const startButton = document.getElementById('start-button')
  const playAgainButton = document.getElementById('playAgain-button')

  if (player1.className != 'hover'){
    player1.onclick = () => {
      player2.classList.remove('hover')
      player1.classList.add('hover')

      startButton.onclick = () => {
        const canvasGame = document.getElementById('game')
        canvasGame.classList.remove('hidden')
        game1.countDown()
        playAgainButton.classList.remove('hidden')
        const text = document.getElementById('extra')
        text.classList.remove('hidden')
      }
    }
  }
  if (player2.className != 'hover'){
    player2.onclick = () => {
      player1.classList.remove('hover')
      player2.classList.add('hover')
      
      startButton.onclick = () => {
        const canvasGame = document.getElementById('game2')
        canvasGame.classList.remove('hidden')
        game2.countDown()
        playAgainButton.classList.remove('hidden')
        const text = document.getElementById('extra')
        text.classList.remove('hidden')
      }
    }
  }
  playAgainButton.onclick = () => {
    window.location.reload()
  }
}