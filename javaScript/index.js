const dropdwn = document.querySelector('.dropdwn')
const dropdwn1 = document.querySelector('.dropdwn1')
const main = document.querySelector('.main')
const mainH1 = main.querySelector('h1')
const canvas = main.querySelector('.canvas')
const crust = document.querySelector('.crust')
const butt = document.querySelector('.butt')
const spots = document.querySelector('.spots')
const resetButton = document.querySelector('.resetButton')
const canvasWidth = canvas.clientWidth
const canvasHeight = canvas.clientHeight
let dropMode = 0
let lock = 0

//opens and closes the dropdown elements in the header
function openClose (ele){
  if (dropMode == 0){
    ele.children[1].style.display = 'block'
    ele.children[1].style.zIndex =  '3'
    dropMode = 1
  }else{
    ele.children[1].style.display = 'none'
    ele.children[1].style.zIndex =  'auto'
    dropMode = 0
  }
}

//listens to know which element is clicked
function oc (){
  openClose(dropdwn)
}
function oc1 (){
  openClose(dropdwn1)
}

dropdwn.addEventListener('click', oc)
dropdwn1.addEventListener('click', oc1)

//changes h2's color on hover
dropdwn.addEventListener('mouseenter', function (){ dropdwn.children[0].style.color = '#F8E8AB' })
dropdwn1.addEventListener('mouseenter', function (){ dropdwn1.children[0].style.color = '#F8E8AB' })
dropdwn.addEventListener('mouseleave', function(){ dropdwn.children[0].style.color = '#E1F2E7'})
dropdwn1.addEventListener('mouseleave', function(){ dropdwn1.children[0].style.color = '#E1F2E7'})

//draws leopard spots
function leopardSpot (x, y){
  //draws the dark spots/light border
  const darkSpot = document.createElement('div')
  const dSize = (Math.random() * 100) + 20
  const borderWidth = (Math.random() * 10) + 20
  const dx = x - ((dSize / 2) + (borderWidth / 2))
  const dy = y - ((dSize / 2) + (borderWidth / 2))
  darkSpot.className = 'spot'
  darkSpot.style.position = 'absolute'
  darkSpot.style.left = `${dx}px`
  darkSpot.style.top = `${dy}px`
  darkSpot.style.width = `${dSize}px`
  darkSpot.style.height = `${dSize}px`
  darkSpot.style.border = `${borderWidth}px #E7CCA0`
  darkSpot.style.borderStyle = 'solid'
  darkSpot.style.borderRadius = '50%'
  darkSpot.style.backgroundColor = '#734729'

  //makes the light spot within the dark spot
  const lightSpot = document.createElement('div')
  const lSize = dSize / 2
  const lpos = (dSize / 2) - (lSize / 2)
  lightSpot.style.position = 'absolute'
  lightSpot.style.top = `${lpos}px`
  lightSpot.style.left = `${lpos}px`
  lightSpot.style.width = `${lSize}px`
  lightSpot.style.height = `${lSize}px`
  lightSpot.style.border = '#E7CCA0'
  lightSpot.style.borderRadius = '50%'
  lightSpot.style.backgroundColor = '#B88E5F'

  spots.appendChild(darkSpot)
  darkSpot.appendChild(lightSpot)
  console.log(dSize)
  console.log(lSize)
}

function aimer (){
  const baseX = canvasWidth / 2
  const baseY = canvasHeight / 2
  //fills the background with the beige
  const bigCircle = document.createElement('div')
  bigCircle.className = 'bigSpot'
  bigCircle.style.position = 'absolute'
  bigCircle.style.top = `${baseY - canvasHeight/2}px`
  bigCircle.style.left = `${baseX - canvasHeight/2}px`
  bigCircle.style.width = `${canvasHeight}px`
  bigCircle.style.height = `${canvasHeight}px`
  bigCircle.style.backgroundColor = '#E7CCA0'
  spots.appendChild(bigCircle)
  //places leopard spots
  for (let i = 0; i < 10; i++){
    let newX = baseX + (Math.floor(Math.random() * ((canvasHeight/2-100) + (canvasHeight/2-100) + 1) ) -(canvasHeight/2-100))
    let newY = baseY + (Math.floor(Math.random() * ((canvasHeight/2-100) + (canvasHeight/2-100) + 1) ) -(canvasHeight/2-100))
    leopardSpot(newX, newY)
  }
}

//making the images
const crustIMG = document.createElement('img')
crustIMG.src = 'images/crust.png'
crustIMG.alt = 'Crust'
crustIMG.width = `${canvasHeight}`
crustIMG.height = `${canvasHeight}`
crust.style.left = `${(canvasWidth/2)-(canvasHeight/2)}px`
crust.appendChild(crustIMG)

const buttIMG = document.createElement('img')
let origin = (canvasWidth/2)-(canvasHeight/2)
buttIMG.src = 'images/butt.png'
buttIMG.alt = 'Bread but'
buttIMG.width = `${canvasHeight}`
buttIMG.height = `${canvasHeight}`
butt.style.left = `${origin}px`
butt.appendChild(buttIMG)

//moves the butt of bread
function buttMover (){
  let newX = origin
  const moving = setInterval(move,25)
  function move(){
    butt.style.left = `${newX}px`
    newX = newX + 10
    if (newX >= (canvasWidth/2)+(canvasHeight/2)){
      clearInterval(moving)
    }
  }
/* the orignal idea for buttMover, didn't work
  for (
    let newX = origin;
    newX <= (canvasWidth/2)+(canvasHeight/2);
    newX = newX+1
  ){
    let fps = 1000/24
    function move(){butt.style.left = `${newX}px`}
    setTimeout(move, fps)
  }
  */
}
//creates the reset button and prevents repeat clicks
function lockUp() {
  if (lock == 0) {
    resetButton.style.display = 'block'
    const resetIMG = document.createElement('img')
    resetIMG.src = 'images/reset.png'
    resetIMG.alt = 'reset button'
    resetIMG.width = resetButton.clientWidth
    resetIMG.height = resetButton.clientHeight
    resetButton.appendChild(resetIMG)
    lock = 1
  }
}
//deletes spots, moves bread butt to og position, and unlocks
//the main space
function reset() {
  if (lock == 1){
    spots.replaceChildren()
    butt.style.left = `${origin}px`
    resetButton.style.display = 'none'
    mainH1.textContent = 'Click To Slice The Bread'
    lock = 0
  }
}

main.addEventListener('click', ()=>{
  if (lock == 0) {
    aimer()
    buttMover()
    lockUp()
    mainH1.textContent = 'Look At Those Spots!'
  }
})
main.addEventListener('mouseenter', function (){ mainH1.style.color = '#F8E8AB' })
main.addEventListener('mouseleave', function(){ mainH1.style.color = '#E1F2E7'})

resetButton.addEventListener('click', (e) => {
  reset()
  e.stopPropagation()
})
resetButton.addEventListener('mouseenter', function (){ resetButton.style.backgroundColor = '#F8E8AB' })
resetButton.addEventListener('mouseleave', function (){ resetButton.style.backgroundColor = '#E1F2E7' })
