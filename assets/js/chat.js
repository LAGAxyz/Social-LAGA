const userPhoto = document.getElementById("userPhoto");
const userName = document.getElementById("userName");
const salir = document.getElementById("salir");

const aside = document.getElementById("aside");
const contactos = document.getElementById("contactos");

const chat = document.getElementById("chat");
const inputChat = document.getElementById("inputChat");
const formulario = document.getElementById("formulario");

const sndOK = document.getElementById("sndOK");

let idUserActual;
let idUserFinal;

firebase.auth().onAuthStateChanged(user=>{
    if(user){
        user.photoURL ? userPhoto.src = user.photoURL : userPhoto.src = "http://placehold.it/50X50";
        user.email ? userName.innerText = user.email : userName.innerText = user.displayName;

        idUserActual = user.uid;

        registrarUsuarioDB(user);
        traerContactos(user);
    } else {location.href = "./index.html";}
});

salir.onclick = ()=>{firebase.auth().signOut();}

const registrarUsuarioDB = async (user)=> {
    const query = await firebase.firestore().collection("usuario").get();
    let usuarioEncontrado = false;
    query.docs.forEach((doc)=>{
        if(doc.data().correo === user.email){
            usuarioEncontrado = true;
            return;
        }
    })
    if(usuarioEncontrado === false){
        firebase.firestore().collection('usuario').add({
            correo: user.email,
            uid: user.uid
        })
    }
}

const traerContactos = async (user)=> {
    const query = await firebase.firestore().collection("usuario").get();
    query.docs.forEach((doc)=>{
        const div = document.createElement("div");
        const span = document.createElement("span");

        div.classList.add("bg-info", "p-1", "m-2", "rounded-pill");
        span.classList.add("ml-3");

        span.innerText = doc.data().correo;

        div.onclick = ()=>{
            document.getElementById("userChat").innerText = doc.data().correo;
            inputChat.removeAttribute("readonly");
            idUserFinal = doc.data().uid;

            traerMensajes(user);
        }

        div.appendChild(span);
        contactos.appendChild(div);
    })
}

const traerMensajes = (user)=> {
    firebase.firestore().collection('chat').orderBy('fecha').onSnapshot(query=>{
        chat.innerHTML = "";
        query.forEach(doc=>{
            if(doc.data().origen === idUserActual && doc.data().receptor === idUserFinal){
                const div = document.createElement("div");
                const p = document.createElement("p");

                div.classList.add("d-flex", "justify-content-end")
                p.classList.add("badge", "badge-pill", "badge-primary", "m-1")

                p.innerText = doc.data().mensaje;

                div.appendChild(p);
                chat.appendChild(div);
            }
            if(doc.data().origen === idUserFinal && doc.data().receptor === idUserActual){
                const div = document.createElement("div");
                const p = document.createElement("p");

                div.classList.add("d-flex", "justify-content-start")
                p.classList.add("badge", "badge-pill", "badge-secondary", "m-1")

                p.innerText = doc.data().mensaje;

                div.appendChild(p);
                chat.appendChild(div);
            }
            chat.scrollTop = chat.scrollHeight;
        })
    })
}

const enviarMensaje = ()=> {
    if(inputChat.value.trim() === ""){return;}
    sndOK.play();
    firebase.firestore().collection('chat').add({
        mensaje: inputChat.value,
        origen: idUserActual,
        receptor: idUserFinal,
        fecha: Date.now()
    })
    traerMensajes();
    inputChat.value = "";
}

formulario.onsubmit = (e)=> {
    e.preventDefault();
    enviarMensaje();
}

const mobileStyle = ()=> {
    if(document.body.clientWidth <= 700){
        userPhoto.onclick = ()=> {
            aside.style.display = "inline-block";
            aside.style.position = "absolute";
            aside.style.zIndex = 10;
            aside.style.width = "100%";
            aside.style.height = "calc(100vh - 66px)";
        }
        aside.onclick = ()=> {
            aside.style.display = "none";
        }
    }
}

inputChat.onfocus = ()=> {vozAtexto()}

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
                switch(valor){
                    case "cancelar": inputChat.value=""; document.getElementById("btnEnviar").focus(); break;
                    case "limpiar": inputChat.value=""; break;

                    case "enviar mensaje": inputChat.focus(); break;
                    case "enviar": enviarMensaje(); break;

                    case "espacio":inputChat.value += " "; break;
                    case "arroba": inputChat.value += "@"; break;
                    case "punto": inputChat.value += "."; break;
                    case "guión": inputChat.value += "-"; break;

                    case "guión bajo": inputChat.value += "_"; break;
                    case "sub guión": inputChat.value += "_"; break;

                    case "cero": inputChat.value += "0"; break;
                    case "uno": inputChat.value += "1"; break;
                    case "dos": inputChat.value += "2"; break;
                    case "tres": inputChat.value += "3"; break;
                    case "cuatro": inputChat.value += "4"; break;
                    case "cinco": inputChat.value += "5"; break;
                    case "seis": inputChat.value += "6"; break;
                    case "siete": inputChat.value += "7"; break;
                    case "ocho": inputChat.value += "8"; break;
                    case "nueve": inputChat.value += "9"; break;

                    case "borrar": inputChat.value = inputChat.value.substring(0, inputChat.value.length-1); break;

                    default: inputChat.value += valor; break;
                }
            }
        }
    }
}

const init = ()=>{
    mobileStyle();

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

                if(valor == "cerrar pestaña"){window.close()}
                if(valor == "recargar página"){location.reload()}
                if(valor == "retornar página"){history.go(-1)}
                if(valor == "ir a la página principal"){location.href = "./index.html"}

                if(valor == "enviar mensaje"){inputChat.focus()}
                if(valor == "enviar"){formulario.onsubmit()}

                if(valor == "salir"){salir.onclick()}
                if(valor == "cerrar sesión"){salir.onclick()}

                if(valor == "leer mensaje" || valor == "leer mensajes"){
                    let mensaje = new SpeechSynthesisUtterance();
                    mensaje.text = "Gracias por probar nuestra aplicación, esta funcionalidad aún está en desarrollo";
                    mensaje.volume = 1;
                    speechSynthesis.speak(mensaje);
                }
            }
        }
    }
};

window.addEventListener("load", init);
window.addEventListener("resize", ()=>{mobileStyle();})

$(document).keydown(function(e){
    if(e.altKey && String.fromCharCode(e.keyCode) == 'V'){history.go(-1)}
    if(e.altKey && String.fromCharCode(e.keyCode) == 'P'){location.href = "./index.html"}

    if(e.altKey && String.fromCharCode(e.keyCode) == 'S'){salir.onclick()}
    
    if(e.altKey && String.fromCharCode(e.keyCode) == 'T'){inputChat.focus()}

    if(e.altKey && String.fromCharCode(e.keyCode) == 'H'){init()}
})
