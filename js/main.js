$(document).ready(function () {
    "use strict";

    var contents = {};
    var dt = {};
    var errors = [];
    var nm,
        em,
        sb,
        ms,
        url,
        collect,
        i;

    $(".box").load("./partials/home.html", function (pageRsp) {
      contents["./partials/home.html"] = pageRsp;
    });
  

    function handleResponse(rsp) {
        $(".feedback").html(rsp).hide().fadeIn(500);  
        $("#name").val("");
        $("#email").val("");
        $("#subject").val("");
        $("#message").val("");
    }


    function handleErrors(jqXHR, textStatus, errorThrown) {
        console.log("textStatus: " + textStatus + "\n" +
                    "errorThrown: " + errorThrown);
    }

    function validateForm(ev) {
        ev.preventDefault();

        nm = $("#name").val();
        nm = $.trim(nm);
        em = $("#email").val();
        em = $.trim(em);
        sb = $("#subject").val();
        sb = $.trim(sb);
        ms = $("#message").val();
        ms = $.trim(ms);

        // VALIDATE NAME FIELD:
        if (nm === "") {
            errors.push("<p>Name?</p>");
        } else {
            dt.name = nm;
        }

        // VALIDATE EMAIL FIELD:
        if (em === "") {
            errors.push("<p>Email?</p>");
        } else {
            dt.email = em;
        }

        // VALIDATE SUBJECT FIELD:
        if (sb === "") {
            errors.push("<p>Subject?</p>");
        } else {
            dt.subject = sb;
        }

        // VALIDATE MESSAGE FIELD:
        if (ms === "") {
            errors.push("<p>Message?</p>");
        } else {
            dt.message = ms;
        }

        // PRINT ERRORS
        if (errors.length === 0) {
            $.ajax({
                type: "post",
                url: "./server-side-script/web-service.php",
                data: dt,
                dataType: "text"
            }).done(handleResponse).fail(handleErrors);
        } else {
              collect = "<p>Please fix the following errors:</p>";
              collect += "<ul>";

              for (i = 0; i < errors.length; i++) {
                  collect += "<li>" + errors[i] + "</li>";
              }

              collect += "</ul>";
              $(".feedback").append(collect);

              errors = [];
              collect = "";
        }
    }
    
  
    function storeContents(container) {
        if (!contents[container]) {
            $(".box").load(container, function(pageRsp) {
            contents[url] = pageRsp;
            });
        } else {
            $(".box").html(contents[url]);
        }
    }

    $(".nav-bar a").on("click", function(ev) {
        ev.preventDefault();
        url = $(this).attr("href");
        storeContents(url);
        $("body").on("submit", "form", validateForm);
    });
});
