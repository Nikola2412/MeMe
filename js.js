//window.alert('Jos nije gotov sajt')
let desni = document.querySelector('.desni');
for(let i = 0;i<0;i++){
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.setAttribute("src","./icons/history.png");
    desni.appendChild(img);
}



const min = 734;
let levi = document.querySelector('.levi');

document.querySelector('.lines').addEventListener('click',el=>{

    if(window.screen.width < min){
        return;
    }
    //console.log(levi.className.split(' ')[1]);
    if(levi.className.split(' ')[1] == 'produzen'){
        promeni();
    }
    else{
        levi.className = 'levi produzen'
    }
});

function promeni(){
    levi.className = 'levi skracen';
}

function resize() {
    //if(window.screen.width >= min)
    //    return;
    //promeni();
    //console.log(levi.getBoundingClientRect().bottom);
    //console.log(levi.offsetHeight);
    //console.log(window.screen.height);
    //levi.addEventListener('scroll',el=>{
    //    console.log('da');
    //});
}
if(window.screen.width < min)
    promeni();
window.onresize = resize;