var menuDisplay = false;
var submenus = document.getElementById('submenus');

document.getElementById('iconMenu').addEventListener('click', function(){
    menuDisplay = !menuDisplay;
    menuDisplay? submenus.style.display = "flex" : submenus.style.display = "none" ;
});