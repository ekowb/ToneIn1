// Variables
const bodyTag = document.querySelector('body');
const divTag = document.createElement('div');
const ulTag = document.createElement('ul');
const liTag = document.createElement('li');
divTag.className = "grid-container"
divTag.id = "album-hold"
console.log(divTag)
const selectTag = document.createElement('select')
selectTag.className = 'custom-select'
const select2 = document.createElement('select')
// Arrays
const genres = ["Choose a Genre", "Alternative", "Blues", "Christian", "Country", "Dance", "Electronic", "Hip-Hop/Rap", "Jazz", "Latin", "Pop", "R&B/Soul", "Rock"]
const colorWheel = ["red", "orange", "gold", "green", "teal", "blue", 
"purple", "pink", "brown", "peachpuff", "gray", "white", "black"]
// const colorPicker = document.createElement('input')
// colorPicker.type = 'color'
// console.log(colorPicker)

// Page Setup

bodyTag.appendChild(divTag)

genres.forEach(function(e){
    selectTag.innerHTML += `<option value=${e}>${e}</option>`
})

colorWheel.forEach(function(e){
    select2.innerHTML += `<option value=${e}>${e}</option>`
})

daColors = document.getElementById('colorwheel1')


// JSON Fetch
daColors.addEventListener('click', function(f){
       f.preventDefault()
       console.log(f.target)
    let divOn = document.getElementById('album-hold')
    divOn.innerHTML = ""
   //console.log(f.target.value)

    fetch("http://localhost:3000/albums")
    .then(resp => resp.json())
    .then(data => {
    data.forEach(function(e){
        if (e.color_category === f.target.className) {

            // window.getComputedStyle(bodyTag).backgroundColor = window.getComputedStyle(f.target).backgroundColor
            var gridTag = document.createElement('span');
            gridTag.className = "grid-item"
            gridTag.innerHTML = `<img src= ${e.image_url}>`
            // gridTag.style.backgroundColor = e.color_category
            bodyTag.style.backgroundColor = window.getComputedStyle(f.target).backgroundColor
            //"rgb(" + JSON.parse(e.rgb) + ")"

           
            
        
            str1 = `${gridTag.style.backgroundColor}`.slice(4)
            str2 = str1.substring(0, str1.length - 1);
            var rgbArray = str2.split(", ")
            
            divOn.appendChild(gridTag)
            let grid2 = document.createElement('div')
            grid2.className = 'text-block'
            grid2.id = "text1"
            gridTag.appendChild(grid2)

            gridTag.addEventListener('mouseover', function(g) {
                gridP = document.getElementById('text1')
                console.log(gridP)
                gridP.innerHTML = `<h4>${e.title}</h4> <p>${e.artist}</p>`
                
            })
  
            
            }
   // })
})
})})

    
//})
    

    

