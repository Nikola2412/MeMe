let memeDiv = document.querySelector('.desni .memes');
let lastMeme = memeDiv.lastElementChild;


function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
}

var call_api = false;
document.querySelector('.desni').addEventListener('scroll', function (el) {
    if(isInViewport(lastMeme) && !call_api)
    {
        call_api = true
        load_pic();
    }

}, {
    passive: true
});

async function load_pic() {
    memeDiv = document.querySelector('.desni .memes');
    //console.log(memeDiv);
    const url = '/more_memes?n='+ memeDiv.childElementCount; 
    const options = {
        method: "GET"
    }

  let response = await fetch(url, options)

  if (response.status === 200) {
    response.json().then(elements=>{
        elements.forEach(item => {
            console.log(item);
            let a = document.createElement('a');
            a.className = 'link'
            a.href = './meme=' + item.id;
            let img = document.createElement('img');
            img.className = 'meme'
            img.src='./id_memea=' + item.id;
            //img.draggable = false;
            a.appendChild(img)
            memeDiv.appendChild(a);
        });
    })
    memeDiv = document.querySelector('.desni .memes');
    lastMeme = memeDiv.lastElementChild;
    call_api = false;
  }
  else {
    alert("Somthing went wrong")
  }
}