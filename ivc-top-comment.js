// ==UserScript==
// @name           JVC Comment list
// @match          https://www.jeuxvideo.com/news/*
// @description    ADD COMMENT && TOP COMMENT (Jquery)
// @author         David ROMERA <d.romera.11@gmail.com> | Camillz
// @license        MIT
// @version        1.0.1
// @date           24-11-2021
// @icon           https://www.jeuxvideo.com/favicon.png
// @require        https://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

// AUTOINSTALLER
const script = document.createElement('script')
script.src = "https://code.jquery.com/jquery-3.5.1.min.js"
document.getElementsByTagName('head')[0].appendChild(script)

// INIT JQUERY
let $ = window.$

// FUNCTION SET TOP COMMENTS
function setTopComments() {
    // INIT VAR
    let comments = [],
        html

    $(".bloc-message-forum").each(function() {
        let plus = parseInt($(".plus-commentaire", this).text()),
            moins = parseInt($(".moins-commentaire", this).text()),
            score = plus - moins

        comments.push({
            plus: plus,
            moins: moins,
            score: score,
            html: $(this)[0].outerHTML
        })

        if (score <= -5) {
            $(this).css("background-color", "rgba(255, 175, 153, .2)").css("border-color", "red")
        }

        if (score >= 10) {
            $(this).css("background-color", "rgba(182, 255, 158, .2)").css("border-color", "green")
        }
    })

    comments = comments.sort(function(a, b) {
        return b.score - a.score;
    });

    html = "<hr><h2 class=\"titre-bloc\" style=\"margin-top: 1em;margin-bottom: 1em\">TOP COMMENTAIRES</h3>"
    html += comments[0].html + comments[1].html

    // element.prepend(html)
    $(".titre-head-bloc").before(html)
}

// APP
$(document).ready(function() {
    // INIT VAR
    let whileBool = true,
        html, data

    // SHOW ALL COMMENTS
    let interval = setInterval(function() {
        let btnGetMoreComments = $(".link-plus-de-comm")

        if (btnGetMoreComments.length > 0) {
            btnGetMoreComments.trigger("click")
        } else {
            clearInterval(interval)

            // SET TOP COMMENTS
            setTopComments()
        }
    }, 250)

    // STYLE
    $(".commentaire-liste").before("<style>#bloc-commentaires #tous-les-commentaires .only-one-comment>.bloc-message-forum { position: relative !important; left: 0 !important }</style>")
  
})

