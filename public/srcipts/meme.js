async function load_pic() {
    const memeDiv = document.querySelector('.meme');
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:3001/sendmeme'; 
    const options = {
        method: "GET"
    }

  let response = await fetch(url, options)

  if (response.status === 200) {
      
      const imageBlob = await response.blob()
      const imageObjectURL = URL.createObjectURL(imageBlob);

      const image = document.createElement('img')
      image.src = imageObjectURL

      memeDiv.append(image)
  }
  else {
      console.log("HTTP-Error: " + response.status)
  }
}
let canvas = document.querySelector('.canvas').style;
let slike = document.querySelectorAll('.canvas a');



function phone(){
    canvas.display = 'flex';
    canvas.flex_direction='row';
    canvas.flex_wrap='wrap';
    slike.forEach(slika => {
        slika.style.width='50%';
    });
}

function computer(){
    canvas.columns = '4 12rem';
    canvas.gap='5px';
    
}

window.onload = (event) => {
    let os = navigator.userAgent;
    //let finalOs="";
    if (os.search('Windows')!==-1){
        //finalOs="Windows";
        //computer();
    }
    else if (os.search('Mac')!==-1){
        //finalOs="MacOS";
    }
    else if (os.search('Linux')!==-1 && os.search('X11')!==-1){
        //finalOs="Linux"
    }
    else if (os.search('Android')!==-1){
        //finalOs="Android";
        //phone();
    }
    
    //window.alert(finalOs)

}
/*
var slider = document.getElementById("slider");
slider.oninput = function() {
    let br = parseInt(this.value) +  20;
    document.querySelectorAll('.meme').forEach(slika=>{
        slika.style.borderRadius = (br * 20 /100)+'px';
    })
}
*/