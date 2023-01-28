document.querySelectorAll('video').forEach(video=>{
    //video.setAttribute("src",`./videi/${video.id}.mp4`);
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