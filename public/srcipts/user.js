/*document.querySelectorAll('video').forEach(video=>{
    video.addEventListener("mouseover", function (e) {
        video.play();
        video.muted = true;
    });
    video.addEventListener("mouseout", function (e) {
        video.load();
    });
    video.addEventListener("click",e=>{
        let k = video.id;
        window.location.href = `./video${k}`;
    });
});
*/

const videos = document.querySelector('.videos');
const memes = document.querySelector('.desni .memes')
const urlparams = this.location.href.split('?')[1];
let mode = urlparams.split('mode=')[1];
//console.log(mode);
pozovi();


function addVideo(data){
    while (memes.firstChild) {
        memes.removeChild(memes.lastChild);
    }
    data.forEach(el=>{
        let video = document.createElement('div')
        video.className = 'video';
        let divslike = document.createElement('div')
        divslike.className='divslike';
        let link = document.createElement('a')
        link.href = '/video?id='+el.id;
        let img = document.createElement('img')
        img.src='./thubnails/'+el.id+'.jpg';
        link.appendChild(img);
        divslike.appendChild(link);
        video.appendChild(divslike)
        let opis = document.createElement('div')
        opis.className='opis';
        let naziv = document.createElement('h3')
        naziv.className = 'naziv';
        naziv.textContent = el.ime;
        opis.appendChild(naziv)
        divslike.appendChild(opis)
        video.appendChild(opis)
        videos.appendChild(video)
    })
}
function addMeme(data){
    while (videos.firstChild) {
        videos.removeChild(videos.lastChild);
    }
    data.forEach(el=>{
        const id = el.id;
        let link = document.createElement('a')
        link.href = './see?meme='+el.id;
        let img = document.createElement('img')
        img.src='./id_memea='+el.id;
        img.className= 'meme';
        link.appendChild(img)
        memes.appendChild(link)
    })
    //console.log(data);
}
async function pozovi(){
    fetch(this.location.href, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if(mode=='video')
            addVideo(data);
        else
            addMeme(data)
      })
      .catch(error => {
        console.error(error);
    });
}

function change(set){
    if(set == mode)return;

    var url = new URL(window.location.href);
    var params = new window.URLSearchParams(window.location.search);
    params.set('mode', set);
    url.search = params;
    url = url.toString();
    window.history.replaceState({url: url}, null, url);
    mode = set;
    pozovi();
}   