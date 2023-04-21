let levi = document.querySelector('.levi');

document.querySelector('.lines').addEventListener('click',el=>{

    if(window.screen.width < 450){
        promeni();
        if(levi.style.marginLeft =='0px')
            levi.style.marginLeft ='-100px';
        else
            levi.style.marginLeft  = '0'

    }
    else{
        levi.style.marginLeft  = '0'
        if(levi.className.split(' ')[1] == 'produzen'){
            promeni();
        }
        else{
            levi.className = 'levi produzen'
        }
    }
});


function promeni(){
    levi.className = 'levi skracen';
}

function resize() {

}
if(window.screen.width < 450)
    promeni();

var input = document.querySelector('.search');
input.addEventListener("keypress", el=> {
    if (el.key === "Enter") {
        el.preventDefault();
        alert('Jos je u izradi');
    }
});

let close = document.querySelector('.close');
function out(el){
    if(window.screen.width > 814)
        return;
    document.querySelectorAll('.nav div').forEach(div=>{
        div.style.display = 'flex';
    });
    el.style.display='none';
    el.value='';
    close.style.display = 'none';
}

document.querySelector('.lupa').addEventListener('click',el=>{
    document.querySelector('.search').style.display = 'block';
    document.querySelector('.close').style.display = 'block';
    document.querySelectorAll('.nav > div').forEach(div=>{
        div.style.display = 'none';
    });
});
close.addEventListener('click',el=>{
    out(document.querySelector('.search'));
});

document.querySelector('.nalog').addEventListener('click',el=>{
    let options = document.querySelector('.desni .options');
    if(options.style.marginRight=='20px')
        options.style.marginRight = '-150px';
    else{
        options.style.marginRight = '20px';
    }

});

window.onorientationchange = (event) => {
    promeni();
    if (window.screen.width >= 450) {
        levi.style.display = 'block';
        levi.style.marginLeft ='0px'
    }
};

window.onload = (event) => {
    let os = navigator.userAgent;
    if (os.search('Windows')!==-1){
        document.head.innerHTML+='    <link rel="stylesheet" href="./style/hover.css"> '
    }
    else if (os.search('Mac')!==-1){
    }
    else if (os.search('Linux')!==-1 && os.search('X11')!==-1){
    }
    else if (os.search('Android')!==-1){
    }
}
/*
window.onresize = (event) =>{
    if(window.screen.width <= 815)
        return;
    document.querySelectorAll('.nav div').forEach(div=>{
        div.style.display = 'flex';
    });
    document.querySelector('.search').style.display =  'block';
    document.querySelector('.close').style.display =  'none';
    document.querySelector('.lupa').style.display =  'none';
    
}
*/