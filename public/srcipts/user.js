document.querySelectorAll('video').forEach(video=>{
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
const urlparams = this.location.href.split('?')[1].split('&');
const id = urlparams[0].split('=')[1];
let mode = urlparams[1].split('=')[1];
test();
const videos = document.querySelector('.videos');
async function test(){
    fetch(`/chanal?id=${id}&mode=${mode}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
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
      })
      .catch(error => {
        console.error(error);
    });
}