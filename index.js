const express = require('express');
const session = require('express-session');
const path = require('path');

const { v4: uuidv4 } = require('uuid');


const fs = require('fs');
const { readFileSync } = require('fs');
const { writeFileSync } = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.enable('trust proxy',1)
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.set('view engine', 'ejs');



app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({ extended: true ,limit:"100mb"}));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.static(__dirname+'/public'));
app.listen(port,()=>console.log(`App listen to ${port}`));
app.use(bodyParser.urlencoded({extended:true}));



function getVN(index){
    const videoList = JSON.parse(readFileSync('./baza/videoList.json'))
    const kanalList = JSON.parse(readFileSync('./baza/kanalList.json'))
    let k = videoList.find((g) => g.id === index);
    const kanal = kanalList.find((g)=>g.id===k.id_kanala);
    //console.log(name);
    let data={
        'id':index,
        'ime': k.ime,
        'name':kanal.name,
        'id_kanala':kanal.id
    }
    return data;
}
//https://www.youtube.com/watch?v=ZjBLbXUuyWg&t=331s&ab_channel=AbdisalanCodes

function getChunks(index,req,res){
    let range = req.headers.range;
    if (!range) {
        range = 'bytes=0-'
    }
    const videoPath = `videi/${index}.mp4`;
    const videoSize = fs.statSync(videoPath).size;

    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    // HTTP Status 206 for Partial Content
    res.writeHead(206, headers);
    // create video read stream for this particular chunk
    const videoStream = fs.createReadStream(videoPath, { start, end });
    // Stream the video chunk to the client
    videoStream.pipe(res);
}
function getV(){
    const temp = [];
    const kanalList = JSON.parse(readFileSync('./baza/kanalList.json'))
    const videoList = JSON.parse(readFileSync('./baza/videoList.json'));
    for(let i=0;i<videoList.length;i++){
        const id_kanala  = videoList[i].id_kanala;
        let name = kanalList.find((g) => g.id == id_kanala).name;
        let data = 
        {
            'id': videoList[i].id, 
            'ime':videoList[i].ime,
            'name': name,
            'id_kanala':id_kanala
        };
        temp.push(data);
    }
    return temp;
}

app.get('/register',(req,res)=>{
    if(req.session.loggedin && req.session.username !=''){
        res.redirect('/');
    }
    else{
        res.render('register');
        //res.sendFile(path.join(__dirname,'public','login.html'));
    }
});
app.post('/create',(req,res)=>{
    let username = req.body.username;
	let password = req.body.password;
    const id = uuidv4();
    let newData = 
        {
            'name':username,
            'password':password,
            'id':id
        };

    var data = readFileSync("./baza/kanalList.json");
    var myObject = JSON.parse(data);
    myObject.push(newData);
    var newData2 = JSON.stringify(myObject);
    writeFileSync("./baza/kanalList.json", newData2);
    req.session.loggedin = true;
	req.session.username = username;
    req.session.id_kanala = id;
    res.render('index',{
        sesia:req.session,
        videi: getV()
    });
})

app.post('/auth', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;
	if (username && password) {
        const kanalList = JSON.parse(readFileSync('./baza/kanalList.json'))
		const user = kanalList.find((g) => g.name === username);
        if(typeof(user) == 'undefined')
        {
            response.status(202)
            response.end();
        }
        else if(user.password===password)
        {
            request.session.loggedin = true;
			request.session.username = username;
            request.session.id_kanala = user.id;
            response.redirect('/');
        }
        else{
            response.status(202)
            response.end(); 
        }
	}
});
app.post('/android_auth', function(request, response) {
    //console.log("dadasd");
	let username = request.body.username;
	let password = request.body.password;
    //console.log(username);
	if (username && password) {
        const kanalList = JSON.parse(readFileSync('./baza/kanalList.json'))
		const user = kanalList.find((g) => g.name === username);
        let data = {};
        if(typeof(user) == 'undefined')
        {
            data = {
                "id":"-1"
            }
        }
        else if(user.password===password)
        {
            request.session.loggedin = true;
			request.session.username = username;
            request.session.id_kanala = user.id;
            //console.log(typeof(user.id));
            data = {
                "id":(user.id).toString()
            }
        }
        else{
            data = {
                "id":"-1"
            }
        }
        //console.log(data);
        response.send(data);
        response.end(); 
	}
});

app.post('/upload',(req, res) => {
    const id = uuidv4();
    var bitmap = new Buffer.from(Object.values(req.body.meme),'base64');
    const filepath = "memes/"+id+".jpg";
    fs.appendFileSync(filepath,bitmap);
    const date = new Date();
    var data = readFileSync("./baza/meme.json");
    var myObject = JSON.parse(data);
    let newData = { 
        "id":id,
        "date":date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear(),
        "id_kanala":req.session.id_kanala
    }
    myObject.push(newData);
    var newData2 = JSON.stringify(myObject);
    writeFileSync("./baza/meme.json", newData2);
    res.status(200).send('Picture has been receved!!');
});

app.get('/login',(req,res)=>{
    if(req.session.loggedin && req.session.username !=''){
        res.redirect('/');
    }
    else{
        res.render('login');
        //res.sendFile(path.join(__dirname,'public','login.html'));
    }
});
app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

app.get('/memes',(req,res)=>{
    //console.log(getMemes());
    res.send(getMemes());
});

app.get('/videos',(req,res)=>{
    //console.log("test");
    res.send(getV());
});

app.get('/',(req,res)=>{
    console.log(req);
    res.render('index',{
        sesia: req.session,
        videi: getV()
    });
});

app.post('/',(req,res)=>{
    res.send(true);
})


function getUser(index){
    const kanalList = JSON.parse(readFileSync('./baza/kanalList.json'))
    const name = kanalList.find((g)=>g.id===index);
    return name;
}
function getVbyUser(index){
    let k = [];
    const kanalList = JSON.parse(readFileSync('./baza/kanalList.json'))
    const videoList = JSON.parse(readFileSync('./baza/videoList.json'))
    videoList.forEach(vid=>{
        if(index == vid.id_kanala){
            k.push(vid)
        }
    });
    return k;
}
function getMbyUser(index){
    let k = [];
    const kanalList = JSON.parse(readFileSync('./baza/kanalList.json'))
    const MemesList = JSON.parse(readFileSync('./baza/meme.json'))
    MemesList.forEach(vid=>{
        if(index == vid.id_kanala){
            k.push(vid)
        }
    });
    //console.log(k);
    return k;
}

app.post('/myAcc',(req,res)=>{
    const id = req.session.id_kanala;
    const mode = req.query.mode;
    if(mode == 'video')
        res.send(getVbyUser(id))
    else
        res.send(getMbyUser(id))
})

app.post('/chanel',(req,res)=>{
    const id = req.query.id;
    const mode = req.query.mode;
    if(mode == 'video')
        res.send(getVbyUser(id))
    else
        res.send(getMbyUser(id))
});

app.get('/chanel',(req,res)=>{
    const id = req.query.id;
    const mode = req.query.mode;
    if(id === req.session.id_kanala)
        res.redirect('/myAcc?mode=' + mode);
    else{
        res.render('user',{
            sesia:req.session,
            data: getUser(id),
            myAcc:false
        });
    }
});

app.get('/myAcc',(req,res)=>{
    if(typeof req.session.loggedin =='undefined'){
        res.redirect('login');
    }
    else{
        res.render('user',{
            sesia:req.session,
            data: getUser(req.session.id_kanala),
            myAcc:true
        });
    }
});

app.get('/upload',(req,res)=>{
    if(typeof req.session.loggedin =='undefined'){
        res.redirect('login');
    }
    else{
        res.render('upload',{
            sesia:req.session
        });
    }
});

app.get('/memes',(req,res)=>{
    const date = new Date();
    const day = date.getDate();
    res.redirect(`/newest-memes`);
});

function getMemes(){
    const temp = [];
    const MemesList = JSON.parse(readFileSync('./baza/meme.json'));
    const kanalList = JSON.parse(readFileSync('./baza/kanalList.json'))
    for(let i=0;i<MemesList.length;i++){
        const id_kanala = MemesList[i].id_kanala;
        let name = kanalList.find((g) => g.id == id_kanala).name;
        let data = 
        {
            'id': MemesList[i].id, 
            'id_kanala':id_kanala,
            'name':name
        };
        temp.push(data);
    }
    return temp.reverse();
    //return MemesList;
}


function sendImg(imgPath,res,extension){
    fs.readFile(imgPath+extension, function(err, data) {
        if(err){
            if(extension == 'png')
                res.end();
            else
                sendImg(imgPath,res,'png');
        }
        else{
            // Set the content type to image/png
            res.writeHead(200, {'Content-Type': 'image/' + extension});
            // Send the image data in the response
            res.end(data);
        }
    });
}


function getMeme(index){
    const MemesList = JSON.parse(readFileSync('./baza/meme.json'));
    const kanalList = JSON.parse(readFileSync('./baza/kanalList.json'))
    let k = MemesList.find((g) => g.id == index);
    //console.log(k);
    
    const kanal = kanalList.find((g)=>g.id == k.id_kanala);
    //console.log(kanal.name);
    let data={
        'id':index,
        'name':kanal.name,
        'id_kanala':kanal.id
    }
    
    return data;
    
}
app.get('/see',(req,res)=>{
    const id = req.query.meme;
    res.render('meme',{
        sesia:req.session,
        meme: getMeme(id)
    });
})

app.get('/id_memea=:id',(req,res)=>{
    const id = req.params.id;
    const imgPath = `memes/${id}.`;
    sendImg(imgPath,res,'jpg');
})

app.get('/newest-memes',(req,res)=>{
    res.render('memes',{
        sesia:req.session,
        memes: getMemes(),
    });
});

app.get('/video',(req,res)=>{
    const id = req.query.id;
    res.render('video',{
        sesia:req.session,
        videi: getV(),
        video: getVN(id)
    });
});

app.get('/id_videa=:id',(req,res)=>{
    //console.log('test');
    const id = req.params.id;
    getChunks(id,req,res);
});
app.get('/android_id_videa=:id',(req,res)=>{
    //console.log(req.params.id);
    const id = req.params.id;
    getChunks2(id,req,res);
});
function getChunks2(index,req,res){
    const videoPath = `videi/${index}.mp4`;
    const videoStat = fs.statSync(videoPath);

    const fileSize = videoStat.size;

    const videoRange = req.headers.range;

    if (videoRange) {

    const parts = videoRange.replace(/bytes=/, "").split("-");

    const start = parseInt(parts[0], 10);

    const end = parts[1]

    ? parseInt(parts[1], 10)

    : fileSize-1;

    const chunksize = (end-start) + 1;

    const file = fs.createReadStream(videoPath, {start, end});

    const head = {

    'Content-Range': `bytes ${start}-${end}/${fileSize}`,

    'Accept-Ranges': 'bytes',

    'Content-Length': chunksize,

    'Content-Type': 'video/mp4',

    };

    res.writeHead(206, head);

    file.pipe(res);

    } else {

    const head = {

    'Content-Length': fileSize,

    'Content-Type': 'video/mp4',

    };

    res.writeHead(200, head);

    fs.createReadStream(videoPath).pipe(res);

    }
}


/*
function getMore(){
    const videoList = require('./baza/videoList.json');
    return videoList[5];
}

app.post('/video',(req,res)=>{
    //console.log(req.body);
    const videoList = require('./baza/videoList.json');

    videoList.push(req.body);
    res.send(201);
});
*/