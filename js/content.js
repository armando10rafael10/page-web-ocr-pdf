var nombreAlumno = document.getElementById("nombreAlumno");
var matriculaAlumno = document.getElementById("matriculaAlumno");
var nombreMateria = document.getElementById("nombreMateria");
var nombreProfesor = document.getElementById("nombreProfesor");
var nombreTema = document.getElementById("nombreTema");
var fechaEntrega = document.getElementById("fechaEntrega");
var textoConvertido = document.getElementById("textoConvertido");
var select_Color = document.getElementById("_selectColor");
var select_BackgroundColor = document.getElementById('_selectBackgroundColor');
var select_fontSize = document.getElementById('_fontSize');
var select_fontBold = "";
var select_fontItalic = "";
var formato = document.getElementById("formato");
var image = document.getElementById('image');
var textoFile = document.getElementById('textoFile');
var seleccionarImg = document.getElementById('seleccionarImg');
var ProgressConversion = document.getElementById('ProgressConversion');
var ProgressPorcentaje = document.getElementById('ProgressPorcentaje');
var StatusProgress = document.getElementById('StatusProgress');
var loader = document.getElementById('loader');
var fileImg = "";
var fileImgName = "";
var dataImgText = "";
var dataImgLineas = "";
var dataImgParrafos = "";
var BooleanFontBold = true;
var BooleanFontItalic = true;

window.onload = function(){
    //carga estilos al contenido
    initStylesContenido();
};

function initStylesContenido(){
    textoConvertido.style.cssText = "background-color: white; color: black; font-size: 11px;" 
                                + "font-style: normal; text-align: left; font-weight: normal;"
                                + "text-decoration: none";
}

function ComenzarConversion(){
    inicializarOcr();
    alert("comenzando conversion.....");
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL();

    return dataURL;
}
function crearImagen(url, id){
    var imagenCreada = document.createElement("img");
    imagenCreada.src = url;
    imagenCreada.id = id;

    return imagenCreada;
}
var imagenLogo = crearImagen("images/logo-buap.png","imgCanvas");

document.getElementById("seleccionarImg").addEventListener('change', function(){
    fileImg = seleccionarImg.files[0];
    fileImgName = seleccionarImg.files[0].name;
    textoFile.placeholder = fileImgName;
});

function inicializarOcr(){
    loader.style.visibility = "visible";
    Tesseract.recognize(
        fileImg,
        'spa',
        { logger: m => {
                console.log(m);
                var percent = Math.round(m.progress * 100);
                ProgressConversion.value = percent;
                ProgressPorcentaje.innerHTML = percent + "%";
                StatusProgress.innerHTML = m.status;
            }
        }
    )
    .then(result => {
        dataImgLineas = result.data.lines;
        dataImgParrafos = result.data.paragraphs;
        dataImgText = result.data.text;
        console.log({dataImgText});
        console.log({dataImgParrafos});
        console.log({dataImgLineas});
        textoConvertido.value = dataImgText;
        loader.style.visibility = "hidden";
        alert("finalizo el procesamiento de la imagen...!");
    });    
}

function DescargarArchivo(){
    if(formato.value === "Pdf"){
        crearPdf();
    }

    alert("descargando archivo.....");
}

function getPosSepararTexto(palabras, maximo) {
    var numLetras = 0;
    var pos = 0;
    for (let i = 0; i < palabras.length; i++) {
        if(numLetras <= maximo){
            numLetras += palabras[i].length+1;
            pos = i;
        }
    }
    return pos;
}

function agregarSaltoLinea(textoP, numLetrasPorLinea){
    var palabras = textoP.split(" ");
    var pal = 0;
    var nuevasLineas = [];
    var posPalabra, textoENDL;
    
    while(pal <= palabras.length+3){
        posPalabra = getPosSepararTexto(palabras, numLetrasPorLinea);
        textoENDL = palabras.slice(0, posPalabra).join(" ").concat("\n");
        nuevasLineas.push(textoENDL);
        palabras = palabras.slice(posPalabra);
        pal++;
    }

    if(palabras.length != 0){
        nuevasLineas.push(palabras.slice(0, posPalabra).join(" ").concat("\n"));
    }

    return nuevasLineas.join(" ");
}

function proporcion(fontSize, arreglo){
    if(fontSize === 5){
        return arreglo[5];
    }else if (fontSize === 7) {
        return arreglo[7];
    }else if (fontSize === 9) {
        return arreglo[9];
    }else if (fontSize === 11) {
        return arreglo[11];
    }else if (fontSize === 13) {
        return arreglo[13];
    }else if (fontSize === 15) {
        return arreglo[15];
    }else {
        return arreglo;
    }
}

function crearPdf(){
    var spacesLines, numLetters, tamFont, nlines;
    var r = hexToRgb(select_BackgroundColor.value).r;
    var g = hexToRgb(select_BackgroundColor.value).g;
    var b = hexToRgb(select_BackgroundColor.value).b;
    var heightPDfText= 40;
    var widthCenterText = 300;
    var widthLeftText = 40;
    var widthRightText = 590;
    var fontTypeName = "arial";
    var proporcionesCenter = {
        5 : {  nletras : 190, espacioLinea : 10, MAX_SALTO_LINEA : 122 },
        7 : {  nletras : 160, espacioLinea : 15, MAX_SALTO_LINEA : 87 },
        9 : {  nletras : 135, espacioLinea : 16, MAX_SALTO_LINEA : 68 },
        11 : { nletras : 110, espacioLinea : 17, MAX_SALTO_LINEA : 55 },
        13 : { nletras : 90, espacioLinea : 19, MAX_SALTO_LINEA : 47 },
        15 : { nletras : 75, espacioLinea : 21, MAX_SALTO_LINEA : 40 },
    }
    var proporcionesRight = {
        5 : {  nletras : 235, espacioLinea : 8, MAX_SALTO_LINEA : 122 },
        7 : {  nletras : 175, espacioLinea : 10, MAX_SALTO_LINEA : 87 },
        9 : {  nletras : 135, espacioLinea : 16, MAX_SALTO_LINEA : 68 },
        11 : { nletras : 110, espacioLinea : 16,MAX_SALTO_LINEA : 55  },
        13 : { nletras : 90, espacioLinea : 18, MAX_SALTO_LINEA : 47 },
        15 : { nletras : 80, espacioLinea : 20, MAX_SALTO_LINEA : 40 },
    }
    var proporcionesLeft = {
        5 : {  nletras : 225, espacioLinea : 9, MAX_SALTO_LINEA : 122 },
        7 : {  nletras : 165, espacioLinea : 12, MAX_SALTO_LINEA : 87 },
        9 : {  nletras : 125, espacioLinea : 16, MAX_SALTO_LINEA : 68 },
        11 : { nletras : 105, espacioLinea : 17, MAX_SALTO_LINEA : 55 },
        13 : { nletras : 80,  espacioLinea : 19, MAX_SALTO_LINEA : 47 },
        15 : { nletras : 65,  espacioLinea : 21, MAX_SALTO_LINEA : 40 },
    }

    var textoNuevo = "";
    textoNuevo = textoConvertido.value;

    var pdf = new jsPDF('p', 'pt', 'letter');
    crearPortadaPdf(pdf, fontTypeName, r, g, b, widthCenterText);

    if(textoConvertido.style.textAlign === "left"){
        console.log('align left');
        pdf.addPage();
        tamFont = parseInt(select_fontSize.value);
        spacesLines = proporcion(tamFont, proporcionesLeft).espacioLinea;
        numLetters = proporcion(tamFont, proporcionesLeft).nletras;
        maxHeightEndl = proporcion(tamFont, proporcionesLeft).MAX_SALTO_LINEA;

        var parrafoConSaltosLinea = setSaltosLineaParrafo(dataImgParrafos, numLetters);
        textoNuevo = textoConvertido.value;

        if(separarParrafosXPaginas(textoNuevo, maxHeightEndl) != null){
            textoNuevo = separarParrafosXPaginas(textoNuevo, maxHeightEndl);

            for(let i=0; i<textoNuevo.length; i++){
                pdf.setFontSize(tamFont);
                pdf.setFontType(select_fontBold);
                pdf.setFontType(select_fontItalic);
                pdf.setFillColor(r, g, b);
                pdf.rect(0, 0, 620, 800, "F");
                pdf.setTextColor(select_Color.value);
                pdf.text(textoNuevo[i], widthLeftText, heightPDfText, "");

                if(i < textoNuevo.length-1){ //antes de llegar a la ultima pos se agrega cada pagina pdf
                    pdf.addPage();
                }
            }
        }else{ //no necesita ser separado por paginas y se agrega el texto actual
            pdf.setFontSize(tamFont);
            pdf.setFontType(select_fontBold);
            pdf.setFontType(select_fontItalic);
            pdf.setFillColor(r, g, b);
            pdf.rect(0, 0, 620, 800, "F");
            pdf.setTextColor(select_Color.value);
            pdf.text(textoNuevo, widthLeftText, heightPDfText, "");
        }
    }

    if(textoConvertido.style.textAlign === "right"){
        console.log('align right');
        pdf.addPage();
        tamFont = parseInt(select_fontSize.value);
        pdf.setFontSize(tamFont);
        spacesLines = proporcion(tamFont, proporcionesRight).espacioLinea;
        numLetters = proporcion(tamFont, proporcionesRight).nletras;
        maxHeightEndl = proporcion(tamFont, proporcionesRight).MAX_SALTO_LINEA;
        
        var parrafoConSaltosLinea = setSaltosLineaParrafo(dataImgParrafos, numLetters);
        textoNuevo = textoConvertido.value;

        if(separarParrafosXPaginas(textoNuevo, maxHeightEndl) != null){
            textoNuevo = separarParrafosXPaginas(textoNuevo, maxHeightEndl);

            for(let i=0; i<textoNuevo.length; i++){
                pdf.setFontSize(tamFont);
                pdf.setFontType(select_fontBold);
                pdf.setFontType(select_fontItalic);
                pdf.setFillColor(r, g, b);
                pdf.rect(0, 0, 620, 800, "F");
                pdf.setTextColor(select_Color.value);
                pdf.text(textoNuevo[i], widthRightText, 40, "right");

                if(i < textoNuevo.length-1){ //antes de llegar a la ultima pos se agrega cada pagina pdf
                    pdf.addPage();
                }
            }
        }else{ //no necesita ser separado por paginas y se agrega el texto actual
            pdf.setFontSize(tamFont);
            pdf.setFontType(select_fontBold);
            pdf.setFontType(select_fontItalic);
            pdf.setFillColor(r, g, b);
            pdf.rect(0, 0, 620, 800, "F");
            pdf.setTextColor(select_Color.value);
            pdf.text(textoNuevo, widthRightText, 40, "right");
        }
    }

    if(textoConvertido.style.textAlign === "center"){
        console.log('align center');
        pdf.addPage();
        tamFont = parseInt(select_fontSize.value);
        pdf.setFontSize(tamFont);
        spacesLines = proporcion(tamFont, proporcionesCenter).espacioLinea;
        numLetters = proporcion(tamFont, proporcionesCenter).nletras;
        maxHeightEndl = proporcion(tamFont, proporcionesCenter).MAX_SALTO_LINEA;
        
        var parrafoConSaltosLinea = setSaltosLineaParrafo(dataImgParrafos, numLetters);
        textoNuevo = textoConvertido.value;

        if(separarParrafosXPaginas(textoNuevo, maxHeightEndl) != null){
            textoNuevo = separarParrafosXPaginas(textoNuevo, maxHeightEndl);
            
            for(let i=0; i<textoNuevo.length; i++){
                pdf.setFontSize(tamFont);
                pdf.setFontType(select_fontBold);
                pdf.setFontType(select_fontItalic);
                pdf.setFillColor(r, g, b);
                pdf.rect(0, 0, 620, 800, "F");
                pdf.setTextColor(select_Color.value);
                pdf.text(textoNuevo[i], widthCenterText, 40, "center");

                if(i < textoNuevo.length-1){ //antes de llegar a la ultima pos se agrega cada pagina pdf
                    pdf.addPage();
                }
            }
        }else{ //no necesita ser separado por paginas y se agrega el texto actual
            pdf.setFontSize(tamFont);
            pdf.setFontType(select_fontBold);
            pdf.setFontType(select_fontItalic);
            pdf.setFillColor(r, g, b);
            pdf.rect(0, 0, 620, 800, "F");
            pdf.setTextColor(select_Color.value);
            pdf.text(textoNuevo, widthCenterText, 40, "center");
        }
    }

    crearPiePagina(pdf, widthCenterText);

    pdf.save('documento.pdf');
}

function crearPortadaPdf(pdf, fontTypeName, r, g, b, widthCenterText){
    pdf.setFontSize(22);
    pdf.setFont(fontTypeName);
    pdf.setFontType("bold");
    pdf.setTextColor(select_Color.value);
    pdf.setFillColor(r, g, b);
    pdf.rect(0, 0, 620, 800, "F");
    pdf.addImage(getBase64Image(imagenLogo), 'PNG', 50 ,30);
    pdf.text('BENEMÉRITA UNIVERSIDAD', widthCenterText+30, 80, 'center');
    pdf.text('AUTONOMA DE PUEBLA', widthCenterText+30, 120, 'center');
    
    pdf.setFontSize(14);
    pdf.setFontType("bold");
    pdf.text('NOMBRE DE LA MATERIA:', widthCenterText, 230, 'center');
    pdf.setFontType("normal");
    pdf.text(nombreMateria.value.toLocaleUpperCase(), widthCenterText, 260, 'center');

    pdf.setFontType("bold");
    pdf.text('TAREA:', widthCenterText, 320, 'center');
    pdf.setFontType("normal");
    pdf.text(nombreTema.value.toLocaleUpperCase(), widthCenterText, 350, 'center');

    pdf.setFontType("bold");
    pdf.text('PROFESOR(A):', widthCenterText, 410, 'center');
    pdf.setFontType("normal");
    pdf.text(nombreProfesor.value.toLocaleUpperCase(), widthCenterText, 440, 'center');

    pdf.setFontType("bold");
    pdf.text('INTEGRANTES:', widthCenterText, 500, 'center');
    pdf.setFontType("normal");
    pdf.text(nombreAlumno.value.toLocaleUpperCase(), widthCenterText, 530, 'center');

    pdf.setFontType("bold");
    pdf.text('MATRICULA:', widthCenterText, 590, 'center');
    pdf.setFontType("normal");
    pdf.text(matriculaAlumno.value.toLocaleUpperCase(), widthCenterText, 620, 'center');

    pdf.setFontType("bold");
    pdf.text('FECHA:', widthCenterText, 680, 'center');
    pdf.setFontType("normal");
    pdf.text(fechaEntrega.value.toLocaleUpperCase(), widthCenterText, 700, 'center');
}

function crearPiePagina(pdf, widthCenterText){
    // pie de pagina del pdf
    const pageCount = pdf.internal.getNumberOfPages();
    for(var i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(12);
        pdf.setTextColor(select_Color.value);
        pdf.text('Pagina '+i+' de '+pageCount, widthCenterText, 760, null,null,"center");
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function changeStateVar(stateVar, value1, value2) {
    if (stateVar) {
        return value1;
    }else{
        return value2;
    }
}

function ApplyFontBold(){
    toggleFontBold();
    select_fontBold = changeStateVar(BooleanFontBold, "normal", "bold");
    textoConvertido.style.fontWeight = changeStateVar(BooleanFontBold, "normal", "bold");
    console.log("aplicando negrita");
}
function ApplyFontItalic(){
    toggleFontItalic();
    select_fontItalic = changeStateVar(BooleanFontItalic, "normal", "italic");
    textoConvertido.style.fontStyle = changeStateVar(BooleanFontItalic, "normal", "italic");
    console.log("aplicando italic");
}
function ApplyFontSize(){
    textoConvertido.style.fontSize = select_fontSize.value+"px";
    console.log("aplicando tamaño de fuente ",select_fontSize.value);
}
function ApplyFontColor(){
    textoConvertido.style.color = select_Color.value;
    console.log("aplicando color al texto ", select_Color.value);
}
function ApplyFontAlignIzq(){
    textoConvertido.style.textAlign = "left";
    console.log("aplicando alineacion izquierda");
}
function ApplyFontAlignCenter(){
    textoConvertido.style.textAlign = "center";
    console.log("aplicandoo alineacion central");
}
function ApplyFontAlignDer(){
    textoConvertido.style.textAlign = "right";
    console.log("aplicandoo alineacion der");
}
function ApplyFontBackground(){
    textoConvertido.style.backgroundColor = select_BackgroundColor.value;
    console.log("aplicando fondo ", select_BackgroundColor.value);
}
function toggleFontBold() {
    BooleanFontBold = !BooleanFontBold;
}
function toggleFontItalic() {
    BooleanFontItalic = !BooleanFontItalic;
}

//separara palabras del parrafo
function setSaltosLineaParrafo(arregloParrafos, maxLetras){
    var arregloParrafo = []; //guardara cada parrafo con sus nuevos saltos de linea
    var linea = "";//guardar la cadena

    for (let i = 0; i < arregloParrafos.length; i++){ //recorremos cada parrafo
        linea = arregloParrafos[i].text; //obtenemos el parrafo        
        linea = linea.replace("\'","");//quita una posinble diagonal iniciales
        linea = linea.replace(/\n\n/g,"");//quita todos los 2 saltos linea iniciales
        linea = linea.concat("#dl#");//agrega al final de cada parrafo 2 saltos de linea
        linea = linea.replace(/\n/g," ");//quita todos los saltos linea iniciales

        //compara si el tamaño del parrafo excede al numero max de letras
        if(linea.length > maxLetras){ //es mayor entonces separa el parrafo
            linea = separarTexto(linea, maxLetras);
        }//si no se cumple , entonces se queda igual   

        linea = linea.replace(/#dl#/g,"\n\n");//remplaza el simbolo aux "#dl#" por su valor original
        arregloParrafo.push(linea);//se agrega cada cadena al arreglo
    }
    arregloParrafo = arregloParrafo.join("");//se une el arreglo y se convierte en una cadena

    return arregloParrafo; 
}
function separarTexto(cadena, maxLetras){
    //recorre el parrafo iniciando desde maxLetras hasta el final de la cadena y se incrementa el doble sucesivamente
    for(let i = maxLetras; i <= cadena.length; i+=maxLetras){ 
        var nuevaPos = verifyEspacioAntSig(cadena, i); //obtiene en que pos debe ir el \n
        cadena = replaceChar(cadena, nuevaPos, "\n "); //agregar salto en esa posicion
    }

    return cadena;
}
function verifyEspacioAntSig(cadena, pos){
    var posSpace = 0;
    if(cadena[pos] == " " || cadena[pos+1] == " "){ //hay una palabra sig proxima, poner salto de linea
        posSpace = buscarSigEspacio(cadena, pos);
    }else{ //retroceder una palabra menos y dar salto de linea (sobrepasa el tam restringido)
        posSpace = buscarAntEspacio(cadena, pos);
    }
    return posSpace;
}
function replaceChar(cadena, pos, nuevoCaracter){ //sustituye una cadena en determinada posicion
    return cadena.substring(0, pos).trim() + nuevoCaracter + cadena.substring(pos, cadena.length).trim();;
}
function buscarAntEspacio(cadena, pos){
    var encontro = false
    var posAgregarLinea = 0; 
    for(let i = pos; i >= 0; i--){ //recorre el parrafo desde la posicion, hasta el inicio del parrafo
        if(cadena[i] == " " && encontro == false){ //cuando la pos que este la cadena tenga un espacio
            posAgregarLinea = i;//me obtiene esa posicion 
            encontro = true; //y se sale de la funcion 
        }
    }
    return posAgregarLinea;
}
function buscarSigEspacio(cadena, pos){
    var encontro = false
    var posAgregarLinea = 0;
    for(let i = pos; i <= cadena.length; i++){ //recorre el parrafo desde la posicion hasta el final
        if(cadena[i] == " " && encontro == false){ //cuando la pos que este la cadena tenga un espacio
            posAgregarLinea = i; //me obtiene esa posicion 
            encontro = true; //y se sale de la funcion 
        }
    }
    return posAgregarLinea;
}

//FUNCION PARA SEPARAR PARRAFOS POR PAGINA
function separarParrafosXPaginas(textoNuevo, maxENDLPagina){ //height
    let nlines = (textoNuevo.match(/\n/g) || []).length;

    if (nlines > maxENDLPagina) {
        textoNuevo = textoNuevo.split("\n"); //separamos la cadena por cada salto de linea
        textoNuevo = separarArreglo(textoNuevo, maxENDLPagina);// separo el arreglo hasta el lim de pagina
        
        let aux;
        for (let x in textoNuevo) { //recorremos el arreglo para juntar cada cadena por el salto de linea
            aux = textoNuevo[x].join("\n");
            textoNuevo[x] = aux;
        }

        return textoNuevo;
    } else {
        return null;
    }
}
function separarArreglo(arreglo, longitudPedazos) {
    var nuevoArreglo = [];
    for (let i = 0; i < arreglo.length; i += longitudPedazos) {
        let pedazo = arreglo.slice(i, i + longitudPedazos);
        nuevoArreglo.push(pedazo);
    }
    return nuevoArreglo;
}