document.querySelectorAll('video').forEach(video=>{
    //video.setAttribute("src",`./videi/${video.id}.mp4`);
    video.addEventListener("mouseover", function (e) {
        video.play();
    });
    video.addEventListener("mouseout", function (e) {
        video.load();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    //set up the IntersectionObserver to load more images if the footer is visible.
    //URL - https://gist.githubusercontent.com/prof3ssorSt3v3/1944e7ba7ffb62fe771c51764f7977a4/raw/c58a342ab149fbbb9bb19c94e278d64702833270/infinite.json
    /*
    let options = {
    root: null,
    rootMargins: "0px",
    threshold: 0.5
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(document.querySelector(".linija"));
    */
    //an initial load of some data
    //getData();
});
function handleIntersect(entries) {
    if (entries[0].isIntersecting) {
        //console.log(list);
        test();
        //getData().then(data => {
            //console.log(data);
        //});
    }
}
function test(){
    //this.location.href='/Load';
}