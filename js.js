let desni = document.querySelector('.desni');
for(let i = 0;i<10;i++){
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.setAttribute("src","./icons/history.png");
    desni.appendChild(img);
}

document.querySelector('.lines').addEventListener('click',el=>{
    let bar = document.querySelector('.levi');
    //console.log(bar.className.split(' ')[1]);
    if(bar.className.split(' ')[1] == 'produzen'){
        bar.className = 'levi skracen'
    }
    else{
        bar.className = 'levi produzen'
    }
});