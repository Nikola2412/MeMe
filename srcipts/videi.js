let clips = document.querySelectorAll('video').forEach(clip=>{
    clip.addEventListener("mouseover", function (e) {
        clip.play();
    })
    clip.addEventListener("mouseout", function (e) {
        clip.pause();
        clip.currentTime=0;
    })
});