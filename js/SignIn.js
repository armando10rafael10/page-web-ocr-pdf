var emailUsuario = document.getElementById("emailUsuario");
var passwordUsuario = document.getElementById("passwordUsuario");

function iniciarSesion(){
    let usuarios = JSON.parse(localStorage.getItem('usersData'));
    if(usuarios){ //si ya hay elementos en el arreglo
        var existeEmail = usuarios.find(u => u.email == emailUsuario.value);
        console.log([existeEmail]);
        if (existeEmail) { 
            var password_usuario = sjcl.decrypt(existeEmail.uid, existeEmail.password);
            if (password_usuario == passwordUsuario.value) {
                console.log("Ha iniciado sesion "+ `${emailUsuario.value}` +"..!!");
                alert("Ha iniciado sesion "+ `${emailUsuario.value}` +"..!!");
                window.location.href = "Content.html";
            }else{
                console.log('No es correcta la contraseña..!!');
                alert('No es correcta la contraseña..!!');
                passwordUsuario.value = "";
            }
        }else{
            console.log("No existe el email "+ `${emailUsuario.value}` +"..!!");
            alert("No existe el email "+ `${emailUsuario.value}` +"..!!");
            emailUsuario.value = "";
        }
    }
}

document.getElementById('key-password').addEventListener('click', function mostrarPassword(){
    if(passwordUsuario.type == "password"){
        passwordUsuario.type = "text";
    }else{
        passwordUsuario.type = "password";
    }
});