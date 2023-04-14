const dropzone = document.getElementById("dropzone");
const preview = document.getElementById("preview");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");

dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
});
let files = [];
dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    var dFiles = event.dataTransfer.files;

    let k = files.length;
    for (let i = 0; i < dFiles.length; i++) {
      const file = dFiles[i];
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        // Determine if file is an image
        const extension = file.name.split('.')
        const n = extension.length;
        if (file.type.match(/image.*/) && (extension[n-1]=='jpg' || extension[n-1]=='png')) {
          const div = document.createElement('div');
          div.id = 'spoj';
          const img = document.createElement("input");
          const btn = document.createElement('button');
          btn.className = 'btn';
          const close = document.createElement('img');
          close.className='close2';
          close.src = './ico/close.png';
          btn.appendChild(close);
          img.className = 'imgpre';
          img.id = 'slika ' + (k + i);
          img.src = event.target.result;
          img.setAttribute('type','image');
          img.setAttribute('name','meme');
          div.appendChild(btn);
          div.appendChild(img);
          btn.addEventListener('click',el=>{
            let removeEl = btn.nextElementSibling.id.split(' ')[1];
            const indexToDelete = files.findIndex(obj => obj.id == removeEl);
            files.splice(indexToDelete, 1);
            btn.parentElement.remove();
          });
          preview.appendChild(div);
          files.push(
            {
              "id"    :(k + i),
              "Slika" :dFiles[i]
            }
            );
        }else {
          alert('Samo slike u jpg ili png formatu')
        }
      });
      reader.readAsDataURL(file);
    }
    console.log(files);
  });
const imgInp = document.getElementById('imgInp');
dropzone.addEventListener(
  "click",
    (e) => {
      if (imgInp) {
        imgInp.click();
      }
    },
    false
  );

  imgInp.onchange = evt => {
    const [file] = imgInp.files
    //console.log(file);
    if (file) {
      const div = document.createElement('div');
      div.id = 'spoj';
      const img = document.createElement("input");
      const btn = document.createElement('button');
      btn.className = 'btn';
      const close = document.createElement('img');
      close.className='close2';
      close.src = './ico/close.png';
      btn.appendChild(close);
      img.className = 'imgpre';
      img.id = 'slika ' + (files.length);
      img.src = URL.createObjectURL(file);
      img.setAttribute('type','image');
      img.setAttribute('name','meme');
      div.appendChild(btn);
      div.appendChild(img);
      btn.addEventListener('click',el=>{
        let removeEl = btn.nextElementSibling.id.split(' ')[1];
        const indexToDelete = files.findIndex(obj => obj.id == removeEl);
        files.splice(indexToDelete, 1);
        btn.parentElement.remove();
      });
      preview.appendChild(div);
      files.push(
        {
          "id"    :(files.length),
          "Slika" :file
        }
      );
    }
  }

function imageToByteArray(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const buffer = reader.result;
        const byteArray = new Uint8Array(buffer);
        resolve(byteArray);
      };
    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
        };
  });
}
  

function  Upload(){
  let n = 0;
  console.log(files);
    for (let i = 0; i < files.length; i++) {
        const img = files[i].Slika;
        const id = files[i].id;
        //console.log(document.getElementById('slika ' + id).parentElement);
        //console.log(id);
        
        imageToByteArray(img).then(byteArray => {
          var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
          var theUrl = "/upload";
          xmlhttp.open("POST", theUrl);
          xmlhttp.setRequestHeader("Content-Type", "application/json");
          xmlhttp.send(JSON.stringify({
             "meme": byteArray 
          }));
          //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
        }).catch(error => {
          alert(error);
        }).finally(el=>{
            const indexToDelete = files.findIndex(obj => obj.id == id);
            files.splice(indexToDelete, 1);
            document.getElementById('slika ' + id).parentElement.remove();
        });
        
  }
  //this.location.href = '/';
}