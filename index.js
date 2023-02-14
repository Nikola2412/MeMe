//const os = require('os');
const express = require('express');
const session = require('express-session');
const path = require('path');
const fileUpload = require('express-fileupload')
//const cookieSession = require('cookie-session');
const { v4: uuidv4 } = require('uuid');

const videoList = require('./videoList.json');
const kanalList = require('./kanalList.json');


//const multer  = require('multer');
//const upload = multer({ dest: 'public/memes' })

//const upload = multer({ dest: os.tmpdir() });

const fs = require('fs');
const bodyParser = require('body-parser');
//const { stringify } = require('querystring');
//const { append } = require('domutils');
//let user = 'User';

const app = express();
const port = 3001;
//const appip = os.networkInterfaces().en0[2].address;
//const appadress = 'https://['+appip+']:'+port+'/';
//console.log(os.networkInterfaces());
const hostname = '0.0.0.0';
//const port2 = 80;
app.enable('trust proxy',1)
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.set('view engine', 'ejs');
app.use(fileUpload())



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));
app.listen(port,()=>console.log(`App listen to ${port}`));
app.use(bodyParser.urlencoded({extended:true}));

//app.listen(port, hostname, () => {
//    console.log(`Server running at http://${hostname}:80/`);
//});


function getVN(index){
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
function getV(){
    const temp = [];
    for(let i=0;i<Math.min(videoList.length,5);i++){
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
    let id = kanalList.length+1;
    let data = 
        {
            'name':username,
            'password':password,
            'id':id
        };
    kanalList.push(data);
    //console.log(data);
    req.session.loggedin = true;
	req.session.username = username;
    req.session.id_kanala = id;
    res.redirect('/');
})

app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		const user = kanalList.find((g) => g.name === username);
        if(user.password===password)
        {
            request.session.loggedin = true;
			request.session.username = username;
            request.session.id_kanala = user.id;
            response.redirect('/upload');
        }
        else{
            response.redirect('/login');    
        }
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
app.post('/upload', (req, res) => {
    //console.log(req.name);
    //res.send(req.body);
    const meme = req.body.meme;
    //console.log(meme);
    
    //const filePath = path.join(__dirname, 'public', 'images')
    //console.log(filePath);

    const id = uuidv4();
    const date = new Date();

    var data = fs.readFileSync("meme.json");
    var myObject = JSON.parse(data);
    
    let newData = {
        "id":id,
        "date":date
    }
    myObject.push(newData);
    var newData2 = JSON.stringify(myObject);
    console.log(newData);

    fs.writeFileSync("meme.json", newData2);
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


app.get('/',(req,res)=>{
    res.render('index',{
        sesia:req.session,
        videi: getV()
    });
});
function getUser(index){
    const name = kanalList.find((g)=>g.id===index);
    return name;
}
function getVbyUser(index){
    const k = [];
    videoList.forEach(vid=>{
        if(index == vid.id_kanala){
            k.push(vid)
        }
    });
    return k;
}

app.get('/user=:id',(req,res)=>{
    if(req.params.id === req.session.id_kanala)
        res.redirect('/myAcc');
    else{
        res.render('user',{
            sesia:req.session,
            data: getUser(req.params.id),
            videi: getVbyUser(req.params.id),
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
            videi: getVbyUser(req.session.id_kanala),
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
            sesia:req.session,
            nemoj:true
        });
    }
});


app.post('/video',(req,res)=>{
    //res.sendFile(path.join(__dirname,'public','video.html'));
    //console.log(req.session);
    res.send(getV());
});

app.get('/memes',(req,res)=>{
    res.redirect('/memes1');
});

function getMemes(){
    const MemesList = require('./meme.json');
    return MemesList;
}

app.get('/memes:id',(req,res)=>{
    res.render('memes',{
        sesia:req.session,
        memes: getMemes(),
    });
})

app.get('/video:id',(req,res)=>{
    const { id } = req.params;
    //console.log(id);
    //const video  = videoList.find((g) => g.id === id);
    let user = 'User';
    if(req.session.loggedin)
        user = req.session.username;
    //console.log(getV());
    res.render('video',{
        sesia:req.session,
        videi: getV(),
        video: getVN(id)
    });
});

function getMore(){
    return videoList[5];
}
app.get('/video:id',(req,res)=>{
    //https://www.youtube.com/watch?v=ZjBLbXUuyWg&t=331s&ab_channel=AbdisalanCodes
    const videoPath = `./videi/${id}.mp4`;

    const videoSize = fs.statSync(videoPath).size;

    
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(videoPath, { start, end });

    videoStream.pipe(res);
});

app.post('/video',(req,res)=>{
    //console.log(req.body);
    videoList.push(req.body);
    res.send(201);
});
