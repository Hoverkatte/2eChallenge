$(document).ready(function () {

    $("body").on("keyup", ".ux-hook input:not(.escape-hook)", function (e) {

        if (e.key === "Enter") {

            var checker = hookChecker();

            if (checker) {

                if (typeof window[$(this).parents(".ux-hook").attr("data-anchor")] === "function") {

                    window[$(this).parents(".ux-hook").attr("data-anchor")](this);

                }

            }

        }

    });

    $("body").on("click", ".ux-hook .ux-anchor", function () {

        var checker = hookChecker();

        if (checker) {

            if (typeof window[$(this).parents(".ux-hook").attr("data-anchor")] === "function") {

                window[$(this).parents(".ux-hook").attr("data-anchor")](this);

            }

        }

    });

    $("body").on("input", ".ux-hook input[data-auto-fill='out']", function (e) {

        var text = $(this).val();
        var group = $(this).attr("data-auto-fill-group");

        $(this).parents(".ux-hook").find("input[data-auto-fill='in'][data-auto-fill-group='" + group + "']").val(text);

    });

});

function focusFirst() {

    $(".ux-focus-first:first").focus();
    $(".ux-focus-first").removeClass("ux-focus-first");

};

function hookChecker() {

    var checker = true;

    $(this).parents(".ux-hook").find("input[required]:visible").each(function () {

        if ($(this).val() == "") {

            $(this).addClass("red-background-color");

        } else {

            $(this).removeClass("red-background-color");

        }

    });

    $(this).parents(".ux-hook").find("input[required]:visible").each(function () {

        if ($(this).val() == "") {

            $(this).focus();
            checker = false;

            return false;

        }

    });

    return checker;

};