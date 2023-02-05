let btn = document.getElementById('submit');
function text1(s){
    if(s==document.getElementById('password-reg2').value){
        odobri();
    }
}
function text2(s){
    if(s==document.getElementById('password-reg').value){
        odobri();
    }
}
function odobri(){
    btn.disabled = false;
}