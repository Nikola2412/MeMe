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
let k = window.location.href.split('?')[1];
ucitaj(k);
function ucitaj(id_videa){
    fetch(`https://63a7011359fd83b1bb3c3cf9.mockapi.io/video/${id_videa}`)
        .then(res=> res.json())
        .then(d=>{
            let ime = d.ime;
            let id = d.id;
            let id_kanala = d.id_kanala;
            let v = document.querySelector('.desni video');
            v.setAttribute("id",id);
            v.setAttribute("src",`./videi/${id}.mp4`);
            document.querySelector('.desni .naziv').textContent = ime;
            document.querySelector('.desni .logo').setAttribute('id',id_kanala);
        });
    let next = document.querySelector('.next');
    var child = next.firstChild; 
    while (child) {
        next.removeChild(child);
        child = next.firstChild;
    }
    fetch(`https://63a7011359fd83b1bb3c3cf9.mockapi.io/video`)
    .then(res=> res.json())
    .then(data=>{
        data.forEach(d => {
            let ime = d.ime;
            let id = d.id;
            let id_kanala = d.id_kanala;
            if(id != id_videa)
            {
                let div = document.createElement('div');
                div.className='nextvideo';

                let divslike = document.createElement('div');
                divslike.className = 'nextdivslike';

                let video = document.createElement('video');
                video.setAttribute("id",id);
                video.setAttribute("src",`./videi/${id}.mp4`);

                let randomNum = Math.floor(Math.random() * imageArray.length); 
                video.setAttribute("poster",imageArray[randomNum])


                divslike.appendChild(video);
                div.appendChild(divslike);

                let logo = document.createElement('img');
                logo.className='nextlogo';
                logo.setAttribute("src","./images/profile.png");

                let opis = document.createElement('div');
                opis.className='nextopis';
                opis.appendChild(logo);

                let divopis = document.createElement('div');
                divopis.className = 'nextopis2';

                let naziv = document.createElement('h3');
                naziv.className='nextnaziv';

                let kanal = document.createElement('p');
                kanal.className = 'kanal';
                kanal.textContent = 'kanal';

                //divopis.appendChild(kanal);

                naziv.textContent=`${ime}`;
                
                divopis.appendChild(naziv);
                divopis.appendChild(kanal);
                //divopis.appendChild(pregledi);

                opis.appendChild(divopis)

                div.appendChild(opis);
                
                next.appendChild(div); 

                video.addEventListener("mouseover", function (e) {
                    video.play();
                    video.muted = true;
                });
                video.addEventListener("mouseout", function (e) {
                    video.pause();
                    video.currentTime=0;
                });
                video.addEventListener("click",e=>{
                    let n = video.id;
                    window.location.href = `./video.html?${n}`;
                    //console.log(k);
                    //var favoritemovie = k;
                    //sessionStorage.setItem("id_videa", favoritemovie);
                    //fetch(`https://63a7011359fd83b1bb3c3cf9.mockapi.io/video/${k}`)
                    //.then(res=> res.json())
                    //.then(data=>{
                    //    console.log(data);
                    //});
                });
            }
        });
    });
};


//for(let i = 1;i<=30;i++){
//    let div = document.createElement('div');
//    div.className='nextvideo';
//
//    let divslike = document.createElement('div');
//    divslike.className = 'nextdivslike';
//
//    let img = document.createElement('img');
//    //img.setAttribute("src","./images/Beerus.png");
//
//    let randomNum = Math.floor(Math.random() * imageArray.length); 
//	img.setAttribute("src", imageArray[randomNum]);
//
//    divslike.appendChild(img);
//    div.appendChild(divslike);
//
//    let logo = document.createElement('img');
//    logo.className='nextlogo';
//    logo.setAttribute("src","./images/profile.png");
//
//    let opis = document.createElement('div');
//    opis.className='nextopis';
//    opis.appendChild(logo);
//
//    let divopis = document.createElement('div');
//    divopis.className = 'nextopis2';
//
//    let naziv = document.createElement('h3');
//    naziv.className='nextnaziv';
//
//    let kanal = document.createElement('p');
//    kanal.className = 'kanal';
//    kanal.textContent = 'kanal';
//
//    let pregledi = document.createElement('p');
//    pregledi.className = 'pregledi';
//    pregledi.textContent = '8k views'
//    //divopis.appendChild(kanal);
//
//    naziv.textContent=`video: ${i}`;
//    
//    divopis.appendChild(naziv);
//    divopis.appendChild(kanal);
//    divopis.appendChild(pregledi);
//
//    opis.appendChild(divopis)
//
//    div.appendChild(opis);
//     
//    next.appendChild(div); 
//}