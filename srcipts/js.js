let levi = document.querySelector('.levi');

document.querySelector('.lines').addEventListener('click',el=>{

    if(window.screen.width < 450){
        //console.log(levi.style.display);
        promeni();
        if (levi.style.display === 'none') {
            levi.style.display = 'block';
        }else {
            levi.style.display = 'none';
        }
    }
    else{
        //console.log(levi.className.split(' ')[1]);
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
if(window.screen.width < 450)
    promeni();

function search(input) {
    //let input = document.querySelector('.search').value
    input = input.toLowerCase();
    let x = document.querySelectorAll('.video');
    let y = document.querySelectorAll('.video h3');
    for (i = 0; i < x.length; i++) { 
        if (y[i].textContent.toLowerCase().includes(input)) {
            x[i].style.display="block";
        }
        else {
            x[i].style.display="none";
        }
    }
}
let close = document.querySelector('.close');
function out(el){
    if(window.screen.width > 815)
        return;
    document.querySelectorAll('.nav div').forEach(div=>{
        div.style.display = 'flex';
    });
    el.style.display='none';
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

window.addEventListener("orientationchange", event => {
    if (window.screen.width >= 450) {
        levi.style.display = 'block';
    }    
});