(function (b, c) {
    var e = document.createElement("link");
    (e.rel = "stylesheet"), (e.type = "text/css"), (e.href = "https://chatboxlive.blahbox.net/static/css/main.css"), document.getElementsByTagName("head")[0].appendChild(e);
    var f = document.createElement("script");
    (f.onload = function () {
        var g;
        if (c) g = "previewInit";
        else {
            var h = document.createElement("div");
            (g = "cbinit"), (h.id = "cbinit"), document.body.append(h);
        }
        console.log(document.querySelector("#" + g)), chatbox.initChat(document.querySelector("#" + g), b, c);
    }),
        (f.src = "https://chatboxlive.blahbox.net/static/js/chat-lib.js"),
        document.getElementsByTagName("head")[0].appendChild(f);
})("d57294eba113c9dbb530406dc418869a", 0);
