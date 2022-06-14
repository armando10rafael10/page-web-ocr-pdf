var nombreUsuario = document.getElementById('nombreUsuario').value.toLocaleUpperCase();
var emailUsuario = document.getElementById('emailUsuario').value.toLocaleUpperCase();
var asuntoUsuario = document.getElementById('asuntoUsuario').value.toLocaleUpperCase();
var mensajeUsuario = document.getElementById('mensajeUsuario').value.toLocaleUpperCase();

document.getElementById('sendMensaje').addEventListener('click', function(){
    alert('se ha enviado el mensaje al contacto....');
});

document.getElementById('facebook').addEventListener('click', function(){
    alert('se direccionara a facebook');
});
document.getElementById('instagram').addEventListener('click', function(){
    alert('se direccionara a instagram');
});
document.getElementById('twitter').addEventListener('click', function(){
    alert('se direccionara a twitter');
});
document.getElementById('whatsapp').addEventListener('click', function(){
    alert('se direccionara a whatsapp');
});
document.getElementById('youtube').addEventListener('click', function(){
    alert('se direccionara a youtube');
});