//window.alert('Jos nije gotov sajt')
/*
const imageArray = [
	"https://images.unsplash.com/photo-1508185159346-bb1c5e93ebb4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=55cf14db6ed80a0410e229368963e9d8&auto=format&fit=crop&w=1900&q=80",
	"https://images.unsplash.com/photo-1495480393121-409eb65c7fbe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=05ea43dbe96aba57d48b792c93752068&auto=format&fit=crop&w=1351&q=80",
	"https://images.unsplash.com/photo-1501611724492-c09bebdba1ac?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ebdb0480ffed49bd075fd85c54dd3317&auto=format&fit=crop&w=1491&q=80",
	"https://images.unsplash.com/photo-1417106338293-88a3c25ea0be?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1565ecb73a2b38784db60c3b68ab3b8&auto=format&fit=crop&w=1352&q=80",
	"https://images.unsplash.com/photo-1500520198921-6d4704f98092?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ac4bc726064d0be43ba92476ccae1a75&auto=format&fit=crop&w=1225&q=80",
	"https://images.unsplash.com/photo-1504966981333-1ac8809be1ca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9a1325446cbf9b56f6ee549623a50696&auto=format&fit=crop&w=1350&q=80",
	"https://images.unsplash.com/photo-1437075130536-230e17c888b5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ff573beba18e5bf45eb0cccaa2c862b3&auto=format&fit=crop&w=1350&q=80",
	"https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1eac0f70640261e09152340f13b79144&auto=format&fit=crop&w=1350&q=80",
	"https://images.unsplash.com/photo-1506057278219-795838d4c2dd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f68d8d7b0223cd906ea8cac13421881d&auto=format&fit=crop&w=1350&q=80",
	"https://images.unsplash.com/photo-1488402410361-05152fa654d3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5266aadc96d5b5b23996e7120d3190a8&auto=format&fit=crop&w=1350&q=80",
	"https://images.unsplash.com/photo-1475598322381-f1b499717dda?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cb49f991ce8dd947b45ccd1bd905ec8c&auto=format&fit=crop&w=1355&q=80",
	"https://images.unsplash.com/photo-1501949997128-2fdb9f6428f1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=951ee200e732c9b8c4ea0a7372ca9d27&auto=format&fit=crop&w=1350&q=80",
	"https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a98c0f9a6c602e964e6533de413d59ba&auto=format&fit=crop&w=1350&q=80",
	"https://images.unsplash.com/photo-1476547362848-ed2a9f99cd29?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5b4647c9e25267c25866936c916e4aa8&auto=format&fit=crop&w=1350&q=80",
	"https://images.unsplash.com/photo-1506017669510-0bcbe8003d70?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9403f5d4ac23a5726bfc3c8308b31c01&auto=format&fit=crop&w=1350&q=80",
	"https://images.unsplash.com/photo-1489447068241-b3490214e879?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a85cb0d68de38ae2aa00d8a9663a320a&auto=format&fit=crop&w=1350&q=80"
];

//let desni = document.querySelector('.desni');
//let max = 5;
//let n = 0;

fetch(`https://63a7011359fd83b1bb3c3cf9.mockapi.io/video`)
.then(res=> res.json())
.then(data=>{
    data.forEach(d => {
        //if(n>=max)
        //    return;
        let ime = d.ime;
        let id = d.id;
        let id_kanala = d.id_kanala;

        let div = document.createElement('div');
        div.className='video';

        let divslike = document.createElement('div');
        divslike.className = 'divslike';
        
        let video = document.createElement('video');
        video.setAttribute("id",id);
        video.setAttribute("src",`./videi/${id}.mp4`);
        let randomNum = Math.floor(Math.random() * imageArray.length); 
        video.setAttribute("poster",imageArray[randomNum])
        //
        divslike.appendChild(video);
        div.appendChild(divslike);
        //
        let logo = document.createElement('img');
        logo.className='logo';
        logo.setAttribute("src","./images/profile.png");
        logo.setAttribute("id",id_kanala);
        //
        let opis = document.createElement('div');
        opis.className='opis';
        opis.appendChild(logo);
        
        let divopis = document.createElement('div');
        divopis.className = 'opis2';
        
        let naziv = document.createElement('h3');
        naziv.className='naziv';
        
        let kanal = document.createElement('p');
        kanal.className = 'kanal';
        fetch(`https://63a7011359fd83b1bb3c3cf9.mockapi.io/covek/${id_kanala}`)
        .then(res=> res.json())
        .then(d=>{
            kanal.textContent = d.name;
        });
        //kanal.textContent = 'kanal';
        
        divopis.appendChild(kanal);
        
        naziv.textContent=`${ime}`;
        
        divopis.appendChild(naziv);
        divopis.appendChild(kanal);
        //divopis.appendChild(pregledi);

        opis.appendChild(divopis)
        
        div.appendChild(opis);
        
        desni.appendChild(div);

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
        //n++;
    });
});
rows.forEach(d => {
    console.log(d);
        let ime = d.ime;
        let id = d.id;

        let div = document.createElement('div');
        div.className='video';

        let divslike = document.createElement('div');
        divslike.className = 'divslike';
        
        let video = document.createElement('video');
        video.setAttribute("id",id);
        video.setAttribute("src",`./videi/${id}.mp4`);
        //let randomNum = Math.floor(Math.random() * imageArray.length); 
        //video.setAttribute("poster",imageArray[randomNum])
        //
        divslike.appendChild(video);
        div.appendChild(divslike);
        //
        let logo = document.createElement('img');
        logo.className='logo';
        logo.setAttribute("src","./images/profile.png");
        //
        let opis = document.createElement('div');
        opis.className='opis';
        opis.appendChild(logo);
        
        let divopis = document.createElement('div');
        divopis.className = 'opis2';
        
        let naziv = document.createElement('h3');
        naziv.className='naziv';
        
        let kanal = document.createElement('p');
        kanal.className = 'kanal';
        kanal.textContent = d.name;
        
        divopis.appendChild(kanal);
        
        naziv.textContent=`${ime}`;
        
        divopis.appendChild(naziv);
        divopis.appendChild(kanal);

        opis.appendChild(divopis)
        
        div.appendChild(opis);
        
        desni.appendChild(div);

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


let list=[];
document.querySelectorAll('video').forEach(video=>{
    //video.setAttribute("src",`./videi/${video.id}.mp4`);
    list.push(video.id);
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

document.addEventListener("DOMContentLoaded", () => {
    //set up the IntersectionObserver to load more images if the footer is visible.
    //URL - https://gist.githubusercontent.com/prof3ssorSt3v3/1944e7ba7ffb62fe771c51764f7977a4/raw/c58a342ab149fbbb9bb19c94e278d64702833270/infinite.json
    let options = {
    root: null,
    rootMargins: "0px",
    threshold: 0.5
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(document.querySelector(".linija"));
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
}/*
async function getData(){
    const url = '/Load';
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify([
            {
              "id": "1",
              "name": "Nikola 24",
              "ime": "imendasuudhasy dasydgasdi dsakdasd dsuhsaidu asdasdhasdiasd dsadhisadu 1"
            },
            {
              "id": "2",
              "name": "name 2",
              "ime": "ime 2"
            },
            {
              "id": "3",
              "name": "name 3",
              "ime": "ime 3"
            },
            {
              "id": "4",
              "name": "Nikola 24",
              "ime": "ime dsadasdsd asdsadasd ds aasd asda sd asd asdsad sd adsa dsadsa dsa d asd sad asdsda d saasd sd sd asd 4"
            }
          ]),
    });
}
function getData2(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
            //document.querySelector('.desni').appendChild();
            //console.log('dasdads');
        }
    };
    xhttp.open("POST", '/Load', true);
    xhttp.send({
        "id": "1",
        "name": "Nikola 24",
        "ime": "imendasuudhasy dasydgasdi dsakdasd dsuhsaidu asdasdhasdiasd dsadhisadu 1"
      },
      {
        "id": "2",
        "name": "name 2",
        "ime": "ime 2"
      },
      {
        "id": "3",
        "name": "name 3",
        "ime": "ime 3"
      },
      {
        "id": "4",
        "name": "Nikola 24",
        "ime": "ime dsadasdsd asdsadasd ds aasd asda sd asd asdsad sd adsa dsadsa dsa d asd sad asdsda d saasd sd sd asd 4"
      });
}
*/
function test(){
    //this.location.href='/Load';
}