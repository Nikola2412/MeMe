//window.alert('Jos nije gotov sajt')
let desni = document.querySelector('.desni');
for(let i = 0;i<30;i++){
    let div = document.createElement('div');
    div.className='video';

    let divslike = document.createElement('div');
    divslike.className = 'divslike';

    let img = document.createElement('img');
    img.setAttribute("src","./images/Beerus.png");
    divslike.appendChild(img);

    let logo = document.createElement('img');
    logo.className='logo';
    logo.setAttribute("src","./images/profile.png");

    let opis = document.createElement('div');
    opis.className='opis';
    opis.appendChild(logo);

    let p = document.createElement('p');
    p.className='naziv';
    p.textContent='test12213123123123dsasdsadfi';
    opis.appendChild(p);

    div.appendChild(divslike);
    div.appendChild(opis);
     
    desni.appendChild(div); 
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