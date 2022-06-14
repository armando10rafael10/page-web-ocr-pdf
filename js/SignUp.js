var emailUser = document.getElementById("emailUser");
var passUser = document.getElementById("passUser");
var confirmPassUser = document.getElementById("confirmPassUser");
var arregloUsuarios = [];
var usuarios = "";
var idUser = "";

window.onload = function() {
    usuarios = JSON.parse(localStorage.getItem('usersData'));
    if(usuarios != null){
        console.log(usuarios);
    }else{
        console.log('No hay usuarios registrados aun!!!');
    }
};

function signUp(){
    if(passUser.value === confirmPassUser.value){ //verifica si la contraseñas coinciden
        if(usuarios == null){ //se agrega el primer usuario, siempre y cuando este vacio el arreglo
            idUser = uuid.v4();
            arregloUsuarios.push({ 
                "email" : emailUser.value, 
                "password" : sjcl.encrypt(idUser, passUser.value),
                "uid" : idUser,
            });
            localStorage.setItem("usersData", JSON.stringify(arregloUsuarios) );
            console.log("-> se ha creado el nuevo usuario '", emailUser.value ,"' ..!!!");
            alert("Se ha creado el nuevo usuario '"+ `${emailUser.value}` +"' ..!!!");
        }
        if(usuarios){ //si ya hay elementos en el arreglo
            let existeEmailRepetido = usuarios.find(element => element.email == emailUser.value);
            if (!existeEmailRepetido) { //se puede agregar mientras el email no este repetido
                idUser = uuid.v4();
                usuarios.push({ 
                    "email" : emailUser.value, 
                    "password" : sjcl.encrypt(idUser, passUser.value),
                    "uid" : idUser
                });
                arregloUsuarios = usuarios;
                localStorage.setItem("usersData", JSON.stringify(arregloUsuarios) );
                console.log("->-> se ha creado el nuevo usuario '", emailUser.value ,"' ..!!!");
                alert("Se ha creado el nuevo usuario '"+ `${emailUser.value}` +"' ..!!!");
                window.location.href = "Home.html";
            }else{
                console.log("->-> no se logro agregar el usuario, email '", emailUser.value ,"' ya existente..!!");
                alert("No se logro agregar el usuario, email '"+ `${emailUser.value}` +"' ya existente..!!");
            }
        }
    }else{
        console.log("Usuario '",emailUser.value ,"' no creado, la contraseñas no coinciden...!!");
        alert("Usuario '"+ `${emailUser.value}` +"' no creado, la contraseñas no coinciden...!!");
        
    }    
}

document.getElementById('key-password').addEventListener('click', function mostrarPassword(){
    if(passUser.type == "password"){
        passUser.type = "text";
    }else{
        passUser.type = "password";
    }
});

document.getElementById('key-confirmPassword').addEventListener('click', function mostrarConfirmPassword(){
    if(confirmPassUser.type == "password"){
        confirmPassUser.type = "text";
    }else{
        confirmPassUser.type = "password";
    }
});