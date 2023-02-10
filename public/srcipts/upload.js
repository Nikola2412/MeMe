const dropzone = document.getElementById("dropzone");
const preview = document.getElementById("preview");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");

dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        // Determine if file is an image
        if (file.type.match(/image.*/)) {
          const img = document.createElement("img");
          img.src = event.target.result;
          preview.appendChild(img);
        } else {
          const para = document.createElement("p");
          para.textContent = "File preview not available.";
          preview.appendChild(para);
        }
      });

      reader.readAsDataURL(file);
    }
  });

function Upload(){
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
  
        reader.readAsDataURL(file);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/upload", true);
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            progress.style.width = `${percentComplete}%`;
          }
        });
        xhr.send(file);
    }
}