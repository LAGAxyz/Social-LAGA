const linkCrearIngresar = document.getElementById("linkCrearIngresar");
const btnIngresarCrear = document.getElementById("btnIngresarCrear");
const txtContrasenia = document.getElementById("txtContrasenia");
const linkContraO = document.getElementById("linkContraO");
const txtUsuario = document.getElementById("txtUsuario");
const btnFB = document.getElementById("btnFB");
const btnGG = document.getElementById("btnGG");

let validacion = false;
let elemento = null;

// btnFB.onclick = ()=>{};
// btnGG.onclick = ()=>{};
txtUsuario.onfocus = ()=>{elemento="usuario"; vozAtexto();};
txtContrasenia.onfocus = ()=>{elemento="contrasenia"; vozAtexto();};
linkContraO.onclick = ()=>{contraOlvidada();};
linkCrearIngresar.onclick = ()=> {irAcrearOingresar();};
// btnIngresarCrear.onclick = ()=>{};

const cancelar = ()=>{txtUsuario.value = ""; txtContrasenia.value = "";};

const mostrarContra = ()=>{txtContrasenia.setAttribute("type", "text");};
const ocultarContra = ()=>{txtContrasenia.setAttribute("type", "password");};

const irAcrearOingresar = ()=>{
    linkCrearIngresar.innerText==="Ingresar" ?
    location.href = "./acceso.html" :
    location.href = "./registro.html"
};

const validarData = ()=>{
    if(txtUsuario.value.trim()==="" || txtContrasenia.value.trim()===""){
        Swal.fire({
            title: "Datos incompletos",
            text: "Debe completar todos los campos para continuar",
            icon: "error",
            timer: 2500,
            confirmButtonText: "Entendido"
        })
        validacion = false;
    } else {validacion = true;}
};

firebase.auth().onAuthStateChanged(user=>{user ? location.href = "./chat.html" : iniciarSesion()});

const iniciarSesion = ()=>{
    btnGG.onclick = async ()=>{
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            await firebase.auth().signInWithPopup(provider)
        } catch (error) {console.log(error);}
    }
    btnFB.onclick = async ()=>{
        try {
            const provider = new firebase.auth.FacebookAuthProvider();
            await firebase.auth().signInWithPopup(provider)
        } catch (error) {console.log(error);}
    }
    btnIngresarCrear.onclick = async ()=>{
        validarData();
        if(btnIngresarCrear.innerText==="Acceder"){
            if(validacion===true){
                const email = txtUsuario.value.trim();
                const password = txtContrasenia.value.trim();
                try {
                    firebase.auth().signInWithEmailAndPassword(email, password).catch((error)=>{
                        if(error.code === 'auth/invalid-email'){
                            Swal.fire({
                                title: "Correo inv??lido",
                                text: "El correo ingresado no es v??lido",
                                icon: "error",
                                timer: 2500,
                                confirmButtonText: "Entendido"
                            });
                        }
                        else if(error.code === 'auth/user-not-found'){
                            Swal.fire({
                                title: "Correo no registrado",
                                text: "El correo ingresado no pertenece a ninguna cuenta",
                                icon: "error",
                                timer: 2500,
                                confirmButtonText: "Entendido"
                            });
                        }
                        else if(error.code === 'auth/wrong-password'){
                            Swal.fire({
                                title: "Contrase??a incorrecta",
                                text: "La contrase??a ingresada no es correcta",
                                icon: "error",
                                timer: 2500,
                                confirmButtonText: "Entendido"
                            });
                        }
                        else{
                            Swal.fire({
                                title: "Ocurri?? un problema",
                                text: "Revise los campos ingresados y vuelva a intentarlo",
                                icon: "error",
                                timer: 2500,
                                confirmButtonText: "Entendido"
                            });
                        }
                    });
                } catch (error) {console.log(error);}
            }
        } else {
            if(validacion===true){
                const email = txtUsuario.value.trim();
                const password = txtContrasenia.value.trim();
                try {
                    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error)=>{
                        if(error.code === 'auth/invalid-email'){
                            Swal.fire({
                                title: "Correo inv??lido",
                                text: "El correo ingresado no es v??lido",
                                icon: "error",
                                timer: 2500,
                                confirmButtonText: "Entendido"
                            });
                        }
                        else if(error.code === 'auth/email-already-in-use'){
                            Swal.fire({
                                title: "Correo ya registrado",
                                text: "El correo ingresado ya est?? en uso",
                                icon: "error",
                                timer: 2500,
                                confirmButtonText: "Entendido"
                            });
                        }
                        else if(error.code === 'auth/weak-password'){
                            Swal.fire({
                                title: "Contrase??a insegura",
                                text: "La contrase??a ingresada no cumple con nuestros par??metros de seguridad",
                                icon: "error",
                                timer: 2500,
                                confirmButtonText: "Entendido"
                            });
                        }
                        else{
                            Swal.fire({
                                title: "Ocurri?? un problema",
                                text: "Revise los campos ingresados y vuelva a intentarlo",
                                icon: "error",
                                timer: 2500,
                                confirmButtonText: "Entendido"
                            });
                        }
                    })
                } catch (error) {console.log(error);}
            }
        }
    }
}

const contraOlvidada = ()=>{
    if(txtUsuario.value.trim()===""){
        Swal.fire({
            title: "Correo inv??lido",
            text: "Debe ingresar un correo v??lido para recuperar su contrase??a",
            icon: "error",
            timer: 2500,
            confirmButtonText: "Entendido"
        });
    } else {
        const emailAddress = txtUsuario.value.trim();
        firebase.auth().sendPasswordResetEmail(emailAddress).then(()=>{
            Swal.fire({
                title: "Listo!",
                text: "Hemos enviado un correo con los pasos para la recuperaci??n de su contrase??a",
                icon: "success",
                timer: 2500,
                confirmButtonText: "Entendido"
            });
        }).catch((error)=>{
            if(error.code==='auth/invalid-email'){
                Swal.fire({
                    title: "Correo inv??lido",
                    text: "El correo ingresado no es v??lido",
                    icon: "error",
                    timer: 2500,
                    confirmButtonText: "Entendido"
                });
            }
            else if (error.code==='auth/user-not-found'){
                Swal.fire({
                    title: "Correo no encontrado",
                    text: "El correo ingresado no exixte en nuestra base de datos",
                    icon: "error",
                    timer: 2500,
                    confirmButtonText: "Entendido"
                });
            }
            else {
                Swal.fire({
                    title: "Ocurri?? un problema",
                    text: "Lo sentimos, ocurri?? un problema inesperado",
                    icon: "error",
                    timer: 2500,
                    confirmButtonText: "Entendido"
                });
            }
        })
    }
}

const vozAtexto = ()=>{
    var sr = new webkitSpeechRecognition();
    sr.continuous = true;
    sr.interimResults = true;
    sr.lang = "es";
    sr.start();
    sr.onresult = function(e){
        for(var i=e.resultIndex; i<e.results.length; ++i){
            if(e.results[i].isFinal){
                var valor = (e.results[i][0].transcript).trim().toLowerCase();
                console.log(valor)
                if(elemento==="usuario"){
                    switch(valor){
                        case "ingresar usuario": txtUsuario.focus(); break;
                        case "ingresar contrase??a": txtContrasenia.focus(); break;
                        case "cancelar": cancelar(); btnIngresarCrear.focus(); break;
                        case "limpiar": txtUsuario.value=""; break;
                        case "presionar": ingresarOcrear(); break;
    
                        case "espacio":txtUsuario.value += " "; break;
                        case "arroba": txtUsuario.value += "@"; break;
                        case "punto": txtUsuario.value += "."; break;
                        case "gui??n": txtUsuario.value += "-"; break;
    
                        case "gui??n bajo": txtUsuario.value += "_"; break;
                        case "sub gui??n": txtUsuario.value += "_"; break;
    
                        case "cero": txtUsuario.value += "0"; break;
                        case "uno": txtUsuario.value += "1"; break;
                        case "dos": txtUsuario.value += "2"; break;
                        case "tres": txtUsuario.value += "3"; break;
                        case "cuatro": txtUsuario.value += "4"; break;
                        case "cinco": txtUsuario.value += "5"; break;
                        case "seis": txtUsuario.value += "6"; break;
                        case "siete": txtUsuario.value += "7"; break;
                        case "ocho": txtUsuario.value += "8"; break;
                        case "nueve": txtUsuario.value += "9"; break;
    
                        case "borrar": txtUsuario.value = txtUsuario.value.substring(0, txtUsuario.value.length-1); break;
    
                        default: txtUsuario.value += valor; break;
                    }
                }
                if(elemento==="contrasenia"){
                    switch(valor){
                        case "ingresar usuario": txtUsuario.focus(); break;
                        case "ingresar contrase??a": txtContrasenia.focus(); break;
                        case "cancelar": cancelar(); btnIngresarCrear.focus(); break;
                        case "limpiar": txtContrasenia.value=""; break;
                        case "presionar": ingresarOcrear(); break;

                        case "espacio":txtContrasenia.value += " "; break;
                        case "arroba": txtContrasenia.value += "@"; break;
                        case "punto": txtContrasenia.value += "."; break;
                        case "gui??n": txtContrasenia.value += "-"; break;
    
                        case "gui??n bajo": txtContrasenia.value += "_"; break;
                        case "sub gui??n": txtContrasenia.value += "_"; break;
    
                        case "cero": txtContrasenia.value += "0"; break;
                        case "uno": txtContrasenia.value += "1"; break;
                        case "dos": txtContrasenia.value += "2"; break;
                        case "tres": txtContrasenia.value += "3"; break;
                        case "cuatro": txtContrasenia.value += "4"; break;
                        case "cinco": txtContrasenia.value += "5"; break;
                        case "seis": txtContrasenia.value += "6"; break;
                        case "siete": txtContrasenia.value += "7"; break;
                        case "ocho": txtContrasenia.value += "8"; break;
                        case "nueve": txtContrasenia.value += "9"; break;

                        case "mostrar contrase??a": mostrarContra(); break;
                        case "ocultar contrase??a": ocultarContra(); break;
    
                        case "borrar": txtContrasenia.value = txtContrasenia.value.substring(0, txtContrasenia.value.length-1); break;
    
                        default: txtContrasenia.value += valor; break;
                    }
                }
            }
        }
    }
}

const init = ()=>{
    var sr = new webkitSpeechRecognition();
    sr.continuous = true;
    sr.interimResults = true;
    sr.lang = "es";
    sr.start();
    sr.onresult = function(e){
        for(var i=e.resultIndex; i<e.results.length; ++i){
            if(e.results[i].isFinal){
                var valor = (e.results[i][0].transcript).trim().toLowerCase();
                console.log(valor)

                if(valor == "cerrar pesta??a"){window.close()}
                if(valor == "recargar p??gina"){location.reload()}
                if(valor == "retornar p??gina"){history.go(-1)}
                if(valor == "ir a la p??gina principal"){location.href = "./index.html"}

                if(valor == "acceder con facebook"){btnFB.onclick()}
                if(valor == "acceder con google"){btnGG.onclick()}

                if(valor == "ingresar usuario"){txtUsuario.focus()}
                if(valor == "ingresar contrase??a"){txtContrasenia.focus()}

                if(valor == "recuperar cuenta"){contraOlvidada()}

                if(valor == "presionar"){btnIngresarCrear.onclick()}

                if(valor == "quiero crear una cuenta"){location.href = "./registro.html"}
                if(valor == "quiero ingresar"){location.href = "./acceso.html"}
            }
        }
    }
};

window.addEventListener("load", init);

$(document).keydown(function(e){
    if(e.altKey && String.fromCharCode(e.keyCode) == 'V'){history.go(-1)}
    if(e.altKey && String.fromCharCode(e.keyCode) == 'P'){location.href = "./index.html"}

    if(e.altKey && String.fromCharCode(e.keyCode) == 'F'){btnFB.onclick()}
    if(e.altKey && String.fromCharCode(e.keyCode) == 'G'){btnGG.onclick()}

    if(e.altKey && String.fromCharCode(e.keyCode) == 'U'){txtUsuario.focus()}
    if(e.altKey && String.fromCharCode(e.keyCode) == 'C'){txtContrasenia.focus()}

    if(e.altKey && String.fromCharCode(e.keyCode) == 'O'){contraOlvidada()}

    if(e.altKey && e.which == 13){btnIngresarCrear.onclick()}

    if(e.altKey && String.fromCharCode(e.keyCode) == 'A'){location.href = "./acceso.html"}
    if(e.altKey && String.fromCharCode(e.keyCode) == 'R'){location.href = "./registro.html"}

    if(e.altKey && String.fromCharCode(e.keyCode) == 'H'){init()}
})
