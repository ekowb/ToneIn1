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
const colorWheel = ["red", "orange", "gold", "yellow", "lime", "green", "cyan", "teal", "blue", "navy",
"purple", "magenta", "pink", "salmon", "lavender", "brown", "white", "gray", "peachpuff", "silver", "black"]
// const colorPicker = document.createElement('input')
// colorPicker.type = 'color'
// console.log(colorPicker)

// Page Setup
bodyTag.appendChild(selectTag)
bodyTag.appendChild(select2)
bodyTag.appendChild(divTag)

genres.forEach(function(e){
    selectTag.innerHTML += `<option value=${e}>${e}</option>`
})

colorWheel.forEach(function(e){
    select2.innerHTML += `<option value=${e}>${e}</option>`
})


// JSON Fetch
select2.addEventListener('change', function(f){
       f.preventDefault()
    let divOn = document.getElementById('album-hold')
    divOn.innerHTML = ""
   console.log(f.target.value)

    fetch("http://localhost:3000/albums")
    .then(resp => resp.json())
    .then(data => {
    data.forEach(function(e){
        if (e.color_category === f.target.value) {
            var gridTag = document.createElement('span');
            gridTag.className = "grid-item"
            gridTag.innerHTML = `<img src= ${e.image_url}>`
            gridTag.style.backgroundColor = e.color_category
            //"rgb(" + JSON.parse(e.rgb) + ")"



            gridTag.addEventListener('mouseover', function(g){
                let grid2 = document.createElement('div')
                console.log('hi')
            })
            
        
            str1 = `${gridTag.style.backgroundColor}`.slice(4)
            str2 = str1.substring(0, str1.length - 1);
            var rgbArray = str2.split(", ")
            
                    divOn.appendChild(gridTag)
  
            
            }
   // })
})
})})

    
//})
    

    

