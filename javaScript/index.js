const dropdwn = document.querySelector('.dropdwn')
const dropdwn1 = document.querySelector('.dropdwn1')
const main = document.querySelector('.main')
let dropMode = 0

//opens and closes the dropdown elements in the header
function openClose(ele){
  if (dropMode == 0){
    ele.children[1].style.display = 'block'
    dropMode = 1
  }else{
    ele.children[1].style.display = 'none'
    dropMode = 0
  }
}

//listens to know which element is clicked
function oc(){
  openClose(dropdwn)
}
function oc1(){
  openClose(dropdwn1)
}

dropdwn.addEventListener('click', oc)
dropdwn1.addEventListener('click', oc1)

//changes h2's color on hover
dropdwn.addEventListener('mouseenter', function (){ dropdwn.children[0].style.color = '#F8E8AB' })
dropdwn1.addEventListener('mouseenter', function (){ dropdwn1.children[0].style.color = '#F8E8AB' })
dropdwn.addEventListener('mouseleave', function(){ dropdwn.children[0].style.color = '#E1F2E7'})
dropdwn1.addEventListener('mouseleave', function(){ dropdwn1.children[0].style.color = '#E1F2E7'})
