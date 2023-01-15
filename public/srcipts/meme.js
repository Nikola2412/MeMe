let sad = 0;
var desni = document.querySelector('.desni');
desni.addEventListener('scroll',el=>{
    //console.log(el.deltaY);
    var scrollTop = desni.scrollTop;
    //function nastavi(a,b){
    //  if(Math.abs(a,b)>100)
    //    return true;
    //  return false;
    //}
    console.log('sad: '+sad + ' top: '+scrollTop);
    if (sad <= scrollTop)
    {
      
      let sl = document.getElementById("sl");
      let sd = document.getElementById("sd");
      
      console.log('dole');
      sl.scrollIntoView();
      console.log(document.querySelector('.meme img').id);
      this.location.href='/memes'+(document.querySelectorAll('.meme img')[1].id);
    }
    else{
      console.log('gore');
    }
    sad = scrollTop;
    console.log('sad: '+sad + ' top: '+scrollTop);
});
//input.addEventListener('wheel',el=>{
//  //console.log(el.deltaY);
//  if(el.deltaY>0){
//    console.log('Dole');
//  }
//  else{
//    console.log('Gore');
//  }
//});

//input.addEventListener("keypress", el=> {
//  console.log(el.keyCode);
//    switch (el.key) {
//        case "ArrowDown":
//            console.log("ArrowDown");
//          break;
//        case "ArrowUp":
//          console.log("ArrowUp");
//          break;
//        case "ArrowLeft":
//          console.log("ArrowLeft");
//          break;
//        case "ArrowRight":
//          console.log("ArrowRight");
//          break;
//        default:
//          console.log(el.key, el.keyCode);
//          return; 
//      }
//    
//      el.preventDefault();
//});