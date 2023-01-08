const express = require('express');
const session = require('express-session');
const path = require('path');
//const cookieSession = require('cookie-session');
const videoList = require('./videoList.json');
const kanalList = require('./kanalList.json');


const app = express();
const port = 3001;

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.set('view engine', 'ejs');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.listen(port,()=>console.log(`App listen to ${port}`));




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
            response.redirect('/');
        }
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
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
    let user = 'User';
    if(req.session.loggedin)
        user = req.session.username;
    res.render('index',{
        username:user,
        logged: req.session.loggedin,
        videi: getV()
    });
    //res.sendFile(path.join(__dirname,'public','index.ejs'));
    //console.log(path.join(__dirname,'public/login.html'));
});
function getVN(index){
    let k =videoList.find((g) => g.id === index);
    let data={
        'id':index,
        'ime': k.ime,
        'name':kanalList.find((g)=>g.id===k.id_kanala)
    }
    return data;
}
function getV(){
    const temp = [];
    videoList.forEach(el=>{
        const id_kanala  = el.id_kanala;
        //console.log(id_kanala);
        let name = kanalList.find((g) => g.id == id_kanala).name;
        //console.log(name);
        let data = 
        {
            'id': el.id, 
            'name': name,
            'ime':el.ime
        };
        temp.push(data);
    });
    return temp;
}

app.get('/video',(req,res)=>{
    //res.sendFile(path.join(__dirname,'public','video.html'));
    res.send(getV());
});

app.get('/memes',(req,res)=>{
    let user = 'User';
    if(req.session.loggedin)
        user = req.session.username;
    res.render('memes',{
        username:user,
        logged: req.session.loggedin,
        videi: getV()
    });
})

app.get('/video:id',(req,res)=>{
    const { id } = req.params;
    //console.log(id);
    //const video  = videoList.find((g) => g.id === id);
    res.render('video',{
        video:getVN(id)
    });
});

app.post('/video',(req,res)=>{
    console.log(req.body);
    videoList.push(req.body);
    res.send(201);
});