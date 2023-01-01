//const express = require('express');
//const app = express();
// 
//app.use(express.json());

let levi = document.querySelector('.levi');

document.querySelector('.lines').addEventListener('click',el=>{

    if(window.screen.width < 450){
        //console.log(levi.style.display);
        promeni();
        //alert(levi.style.marginLeft);
        //console.log(levi.style.marginLeft);
        if(levi.style.marginLeft =='0px')
            levi.style.marginLeft ='-100px';
        else
            levi.style.marginLeft  = '0'
        //if (levi.style.display === 'none') {
        //    levi.style.display = 'block';
        //}else {
        //    levi.style.display = 'none';
        //}
    }
    else{
        //console.log(levi.className.split(' ')[1]);
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

var input = document.querySelector('.search');
input.addEventListener("keypress", el=> {
    if (el.key === "Enter") {
        el.preventDefault();
        alert('Jos je u izradi');
    }
});

let close = document.querySelector('.close');
function out(el){
    if(window.screen.width > 815)
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

window.addEventListener("orientationchange", event => {
    if (window.screen.width >= 450) {
        levi.style.display = 'block';
        levi.style.marginLeft ='0px'
    }    
});
document.querySelector('.nalog').addEventListener('click',el=>{
    let options = document.querySelector('.desni .options');
    //options.style.animation="test 1s linear";
    if(options.style.marginRight=='20px')
        options.style.marginRight = '-150px';
    else{
        options.style.marginRight = '20px';
    }
    //if(options.style.display == 'none'){
    //    options.style.display = 'block';
    ////    options.className.split(' ')[1]='opac1'
    //    options.style.animation="test 1s linear";
    //}
    //else{
    //    options.style.animation ="reverse test 1s linear";
    ////    options.className.split(' ')[1]='opac0'
    //    setTimeout(() => {
    //        options.style.display = 'none';
    //    }, "1000");
    //    
    //}
});