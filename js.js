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
    div.appendChild(divslike);

    let logo = document.createElement('img');
    logo.className='logo';
    logo.setAttribute("src","./images/profile.png");

    let opis = document.createElement('div');
    opis.className='opis';
    opis.appendChild(logo);

    let divopis = document.createElement('div');
    divopis.className = 'opis2';

    let naziv = document.createElement('h3');
    naziv.className='naziv';

    let kanal = document.createElement('p');
    kanal.className = 'kanal';
    kanal.textContent = 'kanal';

    let pregledi = document.createElement('p');
    pregledi.className = 'pregledi';
    pregledi.textContent = '8k views'
    //divopis.appendChild(kanal);

    naziv.textContent=`video: ${i}`;
    
    divopis.appendChild(naziv);
    divopis.appendChild(kanal);
    divopis.appendChild(pregledi);

    opis.appendChild(divopis)

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

function search() {
    let input = document.querySelector('.search').value
    input = input.toLowerCase();
    let x = document.querySelectorAll('.video');
    for (i = 0; i < x.length; i++) { 
        if (x[i].textContent.toLowerCase().includes(input)) {
            x[i].style.display="block";
        }
        else {
            x[i].style.display="none";
        }
    }
}