
(function($){
    $(window).on('load', function () {
        $('#cargando').delay(450).fadeOut('slow');
        $('body').delay(450).css({'overflow': 'visible'});
    });
})(jQuery);

const options = {
    strings: ['diferente', 'inteligente', 'accesible', 'inclusiva'],
    typeSpeed: 60, backSpeed: 45, backDelay: 800, loop: true,
};
const typed = new Typed('.typedJS', options);

const init = ()=>{
    var sr = new webkitSpeechRecognition();
    sr.continuous = true;
    sr.interimResults = true;
    sr.lang = "es";
    sr.start();
    sr.onresult = function(e){
        for(var i=e.resultIndex; i<e.results.length; ++i){
            if(e.results[i].isFinal){
                // var valor = e.results[i][0].transcript.replace(/\s/g,"");
                var valor = (e.results[i][0].transcript).trim().toLowerCase();
                console.log(valor)

                if(valor == "cerrar pestaña"){window.close()}
                if(valor == "recargar página"){location.reload()}
                if(valor == "retornar página"){history.go(-1)}
                if(valor == "ir a la página principal"){location.href = "./index.html"}

                if(valor == "acceder"){location.href = "./acceso.html"}
                if(valor == "registrarme"){location.href = "./registro.html"}
            }
        }
    }
};

window.addEventListener("load", init);

$(document).keydown(function(e){
    if(e.altKey && String.fromCharCode(e.keyCode) == 'V'){history.go(-1)}
    if(e.altKey && String.fromCharCode(e.keyCode) == 'P'){location.href = "./index.html"}

    if(e.altKey && String.fromCharCode(e.keyCode) == 'A'){location.href = "./acceso.html"}
    if(e.altKey && String.fromCharCode(e.keyCode) == 'R'){location.href = "./registro.html"}

    if(e.altKey && String.fromCharCode(e.keyCode) == 'H'){init()}
})
