const dropzone = document.getElementById("dropzone");
const preview = document.getElementById("preview");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");

dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
});
let files;
dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        // Determine if file is an image
        if (file.type.match(/image.*/)) {
          const div = document.createElement('div');
          div.id = 'spoj';
          const img = document.createElement("img");
          const btn = document.createElement('button');
          btn.className = 'btn';
          const close = document.createElement('img');
          close.className='close2';
          close.src = './ico/close.png';
          btn.appendChild(close);
          img.className = 'imgpre'
          img.id = 'slika';
          img.src = event.target.result;
          div.appendChild(btn);
          div.appendChild(img);
          btn.addEventListener('click',el=>{
            btn.parentElement.remove();
          });
          preview.appendChild(div);
        } /*else {
          const para = document.createElement("p");
          para.textContent = "File preview not available.";
          preview.appendChild(para);
        }*/
      });

      reader.readAsDataURL(file);
    }
  });

function Upload(){
    //console.log(imgs);
    for (let i = 0; i < files.length; i++) {
        const img = files[i];
                  
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/upload", true);
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            progress.style.width = `${percentComplete}%`;
          }
        });
        xhr.send(img);
        
    }
}
