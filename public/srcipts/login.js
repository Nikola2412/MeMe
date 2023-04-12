document.forms["loginForm"].addEventListener("submit", async (event) => {
    event.preventDefault();
    const resp = await fetch(event.target.action, {
      method: "POST",
      body: new URLSearchParams(new FormData(event.target)),
    }).catch(error => {
        alert(error);
    });
    const body = await resp;
    if(body.redirected){
        this.location.href = './'
    }
    else{
        alert('Username or password is incorect')
    }
  });