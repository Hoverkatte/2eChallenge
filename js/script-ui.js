const scrollLimit = 30;
const autoScrollLimit = 30;

$(document).ready(function () {

    $("body").on("click", ".tab-btn:not(.disabled)", function () {

        var t = $(this).attr("data-t");

        $(this).siblings(".tab-btn").removeClass("selected").removeClass("primary-2-background-color").addClass("primary-1-background-color").addClass("accent-background-color-hover");
        $(this).addClass("selected").addClass("primary-2-background-color").removeClass("primary-1-background-color").removeClass("accent-background-color-hover");
        $(this).parents(".tab-ctn").find(".tab-inner-ctn").removeClass("selected").parents(".tab-ctn").find(".tab-inner-ctn[data-t='" + t + "']").addClass("selected");

    });

    $("body").on("click", ".modal-close-btn, .modal-overlay, .modal-close-action", function (e) {

        closeModals();

    });

    $("body").on("click", ".select-ctn .select-title-ctn", function () {

        var top = $(this).position().top + $(this).height();
        var left = $(this).position().left;
        var width = $(this).width() - 4;

        $(this).parents(".select-ctn").toggleClass("open").find(".select-inner-ctn").css("width", width).css("top", top).css("left", left);

    });

    $("body").on("click", ".select-ctn .select-option", function () {

        var val = $(this).attr("data-val");
        var text = $(this).text();
        var func = $(this).parents(".select-ctn").attr("data-function");

        $(this).parents(".select-ctn").removeClass("open").attr("data-val", val).find(".select-title").text(text);

        if (typeof func != "undefined") {

            if (func != "") {

                window[func](val);

            }

        }

    });

    $("body").on("click", function (e) {

        if (!$(e.target).hasClass("select-title-ctn") && $(e.target).parents(".select-title-ctn").length == 0) {

            $(".select-ctn.open").removeClass("open");

        }

    });

    $("body").on("input", ".autocomplete-ctn > input", function () {

        var val = $(this).val().toLowerCase().split(" ");
        var vals = $(this).val().toLowerCase().split(" ");

        $(this).parents(".autocomplete-ctn").attr("data-scroll-index", 1).find(".autocomplete-inner-ctn").html("");

        if (val != "") {

            $(this).parents(".autocomplete-ctn").addClass("open");

            var top = $(this).parents(".autocomplete-ctn.open").offset().top + $(this).parents(".autocomplete-ctn.open").height();
            var right = $(window).width() - ($(this).parents(".autocomplete-ctn.open").offset().left + $(this).parents(".autocomplete-ctn.open").width());
            var width = $(this).parents(".autocomplete-ctn.open").width() - 4;
            var search = $(this).parents(".autocomplete-ctn.open").attr("data-search");
            var extra = $(this).parents(".autocomplete-ctn.open").attr("data-extra");
            var extraVar = $(this).parents(".autocomplete-ctn.open").attr("data-extra-var");
            var extraCheck = $(this).parents(".autocomplete-ctn.open").attr("data-extra-check");
            var tempVar = window[$(this).parents(".autocomplete-ctn.open").attr("data-var")];
            autoTempVariable = [];
            var fixedPositionCheck = false;
            var fixedPositionCtx;

            $(this).parents("*").each(function () {

                if ($(this).css("position") == "fixed") {

                    fixedPositionCheck = true;
                    fixedPositionCtx = this;

                }

            });

            if (fixedPositionCheck) {

                top = $(this).parents(".autocomplete-ctn.open").position().top + $(this).parents(".autocomplete-ctn.open").height();
                right = $(fixedPositionCtx).width() - ($(this).parents(".autocomplete-ctn.open").position().left + $(this).parents(".autocomplete-ctn.open").width());

            }

            var id = $(this).parents(".autocomplete-ctn.open").attr("data-id");

            for (var i = 0; i < tempVar.length; i++) {

                if (search.indexOf(",") >= 0) {

                    var searchArr = search.split(",");

                    if ($(this).parents(".autocomplete-ctn.open").find(".autocomplete-inner-ctn table").length == 0) {

                        $(this).parents(".autocomplete-ctn.open").find(".autocomplete-inner-ctn").html("<table><thead><tr></tr></thead><tbody></tbody></table>");

                        for (var j = 0; j < searchArr.length; j++) {

                            $(this).parents(".autocomplete-ctn.open").find(".autocomplete-inner-ctn table thead tr").append("<th class='primary-1-background-color primary-1-border-color'>" + searchArr[j] + "</th>");

                        }

                    }

                    var check = false;

                    for (var j = 0; j < searchArr.length; j++) {

                        if (tempVar[i][searchArr[j]] != null) {

                            for (var k = 0; k < vals.length; k++) {

                                if (tempVar[i][searchArr[j]].toLowerCase().indexOf(vals[k]) >= 0 && vals[k] != "") {

                                    if (typeof extraCheck != "undefined") {

                                        var result = window[extraCheck](tempVar[i]);

                                        if (result) {

                                            check = true;

                                        }

                                    } else {

                                        check = true;

                                    }

                                }

                            }

                        }

                    }

                    if (check) {

                        autoTempVariable.push(tempVar[i]);

                    }

                } else {

                    if (tempVar[i][search] != null) {

                        for (var k = 0; k < vals.length; k++) {

                            if (tempVar[i][search].toLowerCase().indexOf(vals[k]) >= 0 && vals[k] != "") {

                                if (typeof extraCheck != "undefined") {

                                    var result = window[extraCheck](tempVar[i]);

                                    if (result) {

                                        autoTempVariable.push(tempVar[i]);

                                    }

                                } else {

                                    autoTempVariable.push(tempVar[i]);

                                }

                            }

                        }

                    }

                }

            }

            var limit = autoScrollLimit;

            if (autoTempVariable.length < limit) {

                limit = autoTempVariable.length;

            }

            for (var i = 0; i < limit; i++) {

                if (search.indexOf(",") >= 0) {

                    var searchArr = search.split(",");

                    for (var j = 0; j < searchArr.length; j++) {

                        if (j == 0) {

                            $(this).parents(".autocomplete-ctn.open").find(".autocomplete-inner-ctn table tbody").append("<tr class='autocomplete-item green-background-color-hover' id='" + autoTempVariable[i][id] + "'><td class='primary-1-border-color'>" + autoTempVariable[i][searchArr[j]] + "</td></tr>");

                        } else {

                            $(this).parents(".autocomplete-ctn.open").find(".autocomplete-inner-ctn table tbody tr:last").append("<td class='primary-1-border-color'>" + autoTempVariable[i][searchArr[j]] + "</td>");

                        }

                    }

                } else {

                    if (typeof extra != "undefined") {

                        $(this).parents(".autocomplete-ctn.open").find(".autocomplete-inner-ctn").append("<div id='" + autoTempVariable[i][id] + "' class='autocomplete-item relative blue-background-color-hover'><div class='inner-center-y'>" + autoTempVariable[i][search] + "</div></div>");

                    } else if (autoTempVariable[i][extra] == extraVar) {

                        $(this).parents(".autocomplete-ctn.open").find(".autocomplete-inner-ctn").append("<div id='" + autoTempVariable[i][id] + "' class='autocomplete-item relative blue-background-color-hover'><div class='inner-center-y'>" + autoTempVariable[i][search] + "</div></div>");

                    }

                }

            }

            if ($(this).parents(".autocomplete-ctn.open").find(".autocomplete-inner-ctn > *").width() > width) {

                //oh magic number go away, come again some other day

                width = $(this).parents(".autocomplete-ctn.open").find(".autocomplete-inner-ctn > *").width() + 15;

            }

            $(this).parents(".autocomplete-ctn.open").find(".autocomplete-inner-ctn").css("width", width).css("top", top).css("right", right);
            $(this).parents(".autocomplete-ctn.open").find(".autocomplete-inner-ctn .autocomplete-item:first:not(tr)").addClass("blue-background-color");

            $(this).parents(".full-max-height-scroll").off("scroll").on("scroll", function () {

                if ($(".autocomplete-ctn.open").length != 0) {

                    $(this).find(".autocomplete-ctn.open").removeClass("open");

                }

            });

        } else {

            $(this).parents(".autocomplete-ctn").removeClass("open");

        }

    });

    $("body").on("keydown", ".autocomplete-ctn > input", function (e) {

        switch (e.keyCode) {

            case 40:

                e.preventDefault();

                if ($(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn .blue-background-color").next().length != 0) {

                    $(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn .blue-background-color").removeClass("blue-background-color").next().addClass("blue-background-color");

                }

                if (!checkInView($(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn").get()[0], $(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn .blue-background-color").get()[0], true)) {

                    scrollIfNeeded($(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn").get()[0], $(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn .blue-background-color").get()[0]);

                }

                break;

            case 38:

                e.preventDefault();

                if ($(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn .blue-background-color").prev().length != 0) {

                    $(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn .blue-background-color").removeClass("blue-background-color").prev().addClass("blue-background-color");

                }

                if (!checkInView($(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn").get()[0], $(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn .blue-background-color").get()[0], true)) {

                    scrollIfNeeded($(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn").get()[0], $(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn .blue-background-color").get()[0]);

                }

                break;

            case 13:

                e.preventDefault();

                $(this).parents(".autocomplete-ctn").find(".autocomplete-inner-ctn .blue-background-color").trigger("click");

                break;

        }

    });

    $("body").on("click", ".autocomplete-ctn .autocomplete-inner-ctn .autocomplete-item", function () {

        var func = $(this).parents(".autocomplete-ctn").attr("data-function");
        var id = $(this).attr("id");
        var name = $(this).text().trim();
        var n = $(this).parents(".autocomplete-ctn").attr("data-n");

        if ($(this).find("td").length != 0) {

            name = $(this).find("td:first").text().trim();

        }

        if (typeof func != "undefined") {

            if (func != "") {

                window[func](id, name, n);

            }

        }

        $(this).parents(".autocomplete-ctn").removeClass("open").find("input").focus();

    });

});

function openModal(modal, title) {

    $(".modal-overlay, .modal-ctn[data-t='" + modal + "']").addClass("open");
    $(".modal-ctn[data-t='" + modal + "'] .modal-top-bar-title").text(title);
    $(".modal-ctn[data-t='" + modal + "']").addClass("fade-in");

}

function closeModals() {

    $(".modal-overlay, .modal-ctn").removeClass("open");
    $(".modal-ctn.fade-in").removeClass("fade-in");

}

function clearUIElementsModal(modal) {

    $(".modal-ctn[data-t='" + modal + "'] input:first").addClass("ux-focus-first");
    $(".modal-ctn[data-t='" + modal + "'] input, .modal-ctn[data-t='" + modal + "'] textarea").val("");
    $(".modal-ctn[data-t='" + modal + "'] .select-ctn .select-option:first").trigger("click");
    $(".modal-ctn[data-t='" + modal + "'] .checkbox-ctn").attr("data-enabled", "off");

}

function scrollingAddHtml(ctx, currentIndex) {

    var limit = scrollLimit * (currentIndex + 1);
    var start = scrollLimit * currentIndex;
    var search = $(ctx).closest(".autocomplete-ctn.open").attr("data-search");
    var extra = $(ctx).closest(".autocomplete-ctn.open").attr("data-extra");
    var extraVar = $(ctx).closest(".autocomplete-ctn.open").attr("data-extra-var");

    if (autoTempVariable.length < limit) {

        limit = autoTempVariable.length;

    }

    for (var i = start; i < limit; i++) {

        if (search.indexOf(",") >= 0) {

            var searchArr = search.split(",");

            for (var j = 0; j < searchArr.length; j++) {

                if (j == 0) {

                    $(ctx).closest(".autocomplete-ctn.open").find(".autocomplete-inner-ctn table tbody").append("<tr class='autocomplete-item green-background-color-hover' id='" + autoTempVariable[i].id + "'><td class='primary-1-border-color'>" + autoTempVariable[i][searchArr[j]] + "</td></tr>");

                } else {

                    $(ctx).closest(".autocomplete-ctn.open").find(".autocomplete-inner-ctn table tbody tr:last").append("<td class='primary-1-border-color'>" + autoTempVariable[i][searchArr[j]] + "</td>");

                }

            }

        } else {

            if (typeof extra != "undefined") {

                $(ctx).closest(".autocomplete-ctn.open").find(".autocomplete-inner-ctn").append("<div id='" + autoTempVariable[i][id] + "' class='autocomplete-item relative blue-background-color-hover'><div class='inner-center-y'>" + autoTempVariable[i][search] + "</div></div>");

            } else if (autoTempVariable[i][extra] == extraVar) {

                $(ctx).closest(".autocomplete-ctn.open").find(".autocomplete-inner-ctn").append("<div id='" + autoTempVariable[i][id] + "' class='autocomplete-item relative blue-background-color-hover'><div class='inner-center-y'>" + autoTempVariable[i][search] + "</div></div>");

            }

        }

    }

}

function addTag(id, name, n) {

    if ($(".tag-ctn[data-n='" + n + "'] #" + id + ".tag").length == 0) {

        var html = "<div id='" + id + "' class='tag relative blue-background-color'>";
        html += name;
        html += "<div class='tag-remove-btn btn red-background-color-hover'>";
        html += "<div class='inner-center'>";
        html += "<i class='fa fa-times'></i>";
        html += "</div>";
        html += "</div>";
        html += "</div>";

        $(".tag-ctn[data-n='" + n + "']").append(html);

    }

}

function loadLoader() {

    $(".loader-ctn").removeClass("loaded");
    $(".loader-ctn").removeClass("display-none");

    particleground(document.getElementById('loader-particles'), {

        dotColor: 'rgba(255, 255, 255, 1)',
        lineColor: 'rgba(255, 255, 255, 0.05)',
        minSpeedX: 0.3,
        maxSpeedX: 0.6,
        minSpeedY: 0.3,
        maxSpeedY: 0.6,
        density: 50000,
        curvedLines: false,
        proximity: 250,
        parallaxMultiplier: 10,
        particleRadius: 4,

    });

}

function closeLoader() {

    setTimeout(function () {

        $(".loader-ctn").addClass("loaded");

    }, 500);

}

//functions for the particles on canvas for loader/background - full code can be seen at: https://codepen.io/kenchen/pen/tgBiE
!function (a, b) { "use strict"; function c(a) { a = a || {}; for (var b = 1; b < arguments.length; b++) { var c = arguments[b]; if (c) for (var d in c) c.hasOwnProperty(d) && ("object" == typeof c[d] ? deepExtend(a[d], c[d]) : a[d] = c[d]) } return a } function d(d, g) { function h() { if (y) { r = b.createElement("canvas"), r.className = "pg-canvas", r.style.display = "block", d.insertBefore(r, d.firstChild), s = r.getContext("2d"), i(); for (var c = Math.round(r.width * r.height / g.density), e = 0; c > e; e++) { var f = new n; f.setStackPos(e), z.push(f) } a.addEventListener("resize", function () { k() }, !1), D && !C && a.addEventListener("deviceorientation", function () { F = Math.min(Math.max(-event.beta, -30), 30), E = Math.min(Math.max(-event.gamma, -30), 30) }, !0), j(), q("onInit") } } function i() { r.width = d.offsetWidth, r.height = d.offsetHeight, s.fillStyle = g.dotColor, s.strokeStyle = g.lineColor, s.lineWidth = g.lineWidth } function j() { if (y) { u = a.innerWidth, v = a.innerHeight, s.clearRect(0, 0, r.width, r.height); for (var b = 0; b < z.length; b++) z[b].updatePosition(); for (var b = 0; b < z.length; b++) z[b].draw(); G || (t = requestAnimationFrame(j)) } } function k() { i(); for (var a = d.offsetWidth, b = d.offsetHeight, c = z.length - 1; c >= 0; c--) (z[c].position.x > a || z[c].position.y > b) && z.splice(c, 1); var e = Math.round(r.width * r.height / g.density); if (e > z.length) for (; e > z.length;) { var f = new n; z.push(f) } else e < z.length && z.splice(e); for (c = z.length - 1; c >= 0; c--) z[c].setStackPos(c) } function l() { G = !0 } function m() { G = !1, j() } function n() { switch (this.stackPos, this.active = !0, this.layer = Math.ceil(3 * Math.random()), this.parallaxOffsetX = 0, this.parallaxOffsetY = 0, this.position = { x: Math.ceil(Math.random() * r.width), y: Math.ceil(Math.random() * r.height) }, this.speed = {}, g.directionX) { case "left": this.speed.x = +(-g.maxSpeedX + Math.random() * g.maxSpeedX - g.minSpeedX).toFixed(2); break; case "right": this.speed.x = +(Math.random() * g.maxSpeedX + g.minSpeedX).toFixed(2); break; default: this.speed.x = +(-g.maxSpeedX / 2 + Math.random() * g.maxSpeedX).toFixed(2), this.speed.x += this.speed.x > 0 ? g.minSpeedX : -g.minSpeedX } switch (g.directionY) { case "up": this.speed.y = +(-g.maxSpeedY + Math.random() * g.maxSpeedY - g.minSpeedY).toFixed(2); break; case "down": this.speed.y = +(Math.random() * g.maxSpeedY + g.minSpeedY).toFixed(2); break; default: this.speed.y = +(-g.maxSpeedY / 2 + Math.random() * g.maxSpeedY).toFixed(2), this.speed.x += this.speed.y > 0 ? g.minSpeedY : -g.minSpeedY } } function o(a, b) { return b ? void (g[a] = b) : g[a] } function p() { console.log("destroy"), r.parentNode.removeChild(r), q("onDestroy"), f && f(d).removeData("plugin_" + e) } function q(a) { void 0 !== g[a] && g[a].call(d) } var r, s, t, u, v, w, x, y = !!b.createElement("canvas").getContext, z = [], A = 0, B = 0, C = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), D = !!a.DeviceOrientationEvent, E = 0, F = 0, G = !1; return g = c({}, a[e].defaults, g), n.prototype.draw = function () { s.beginPath(), s.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, g.particleRadius / 2, 0, 2 * Math.PI, !0), s.closePath(), s.fill(), s.beginPath(); for (var a = z.length - 1; a > this.stackPos; a--) { var b = z[a], c = this.position.x - b.position.x, d = this.position.y - b.position.y, e = Math.sqrt(c * c + d * d).toFixed(2); e < g.proximity && (s.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY), g.curvedLines ? s.quadraticCurveTo(Math.max(b.position.x, b.position.x), Math.min(b.position.y, b.position.y), b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY) : s.lineTo(b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY)) } s.stroke(), s.closePath() }, n.prototype.updatePosition = function () { if (g.parallax) { if (D && !C) { var a = (u - 0) / 60; w = (E - -30) * a + 0; var b = (v - 0) / 60; x = (F - -30) * b + 0 } else w = A, x = B; this.parallaxTargX = (w - u / 2) / (g.parallaxMultiplier * this.layer), this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10, this.parallaxTargY = (x - v / 2) / (g.parallaxMultiplier * this.layer), this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10 } var c = d.offsetWidth, e = d.offsetHeight; switch (g.directionX) { case "left": this.position.x + this.speed.x + this.parallaxOffsetX < 0 && (this.position.x = c - this.parallaxOffsetX); break; case "right": this.position.x + this.speed.x + this.parallaxOffsetX > c && (this.position.x = 0 - this.parallaxOffsetX); break; default: (this.position.x + this.speed.x + this.parallaxOffsetX > c || this.position.x + this.speed.x + this.parallaxOffsetX < 0) && (this.speed.x = -this.speed.x) } switch (g.directionY) { case "up": this.position.y + this.speed.y + this.parallaxOffsetY < 0 && (this.position.y = e - this.parallaxOffsetY); break; case "down": this.position.y + this.speed.y + this.parallaxOffsetY > e && (this.position.y = 0 - this.parallaxOffsetY); break; default: (this.position.y + this.speed.y + this.parallaxOffsetY > e || this.position.y + this.speed.y + this.parallaxOffsetY < 0) && (this.speed.y = -this.speed.y) } this.position.x += this.speed.x, this.position.y += this.speed.y }, n.prototype.setStackPos = function (a) { this.stackPos = a }, h(), { option: o, destroy: p, start: m, pause: l } } var e = "particleground", f = a.jQuery; a[e] = function (a, b) { return new d(a, b) }, a[e].defaults = { minSpeedX: .1, maxSpeedX: .7, minSpeedY: .1, maxSpeedY: .7, directionX: "center", directionY: "center", density: 1e4, dotColor: "#666666", lineColor: "#666666", particleRadius: 7, lineWidth: 1, curvedLines: !1, proximity: 100, parallax: !0, parallaxMultiplier: 5, onInit: function () { }, onDestroy: function () { } }, f && (f.fn[e] = function (a) { if ("string" == typeof arguments[0]) { var b, c = arguments[0], g = Array.prototype.slice.call(arguments, 1); return this.each(function () { f.data(this, "plugin_" + e) && "function" == typeof f.data(this, "plugin_" + e)[c] && (b = f.data(this, "plugin_" + e)[c].apply(this, g)) }), void 0 !== b ? b : this } return "object" != typeof a && a ? void 0 : this.each(function () { f.data(this, "plugin_" + e) || f.data(this, "plugin_" + e, new d(this, a)) }) }) }(window, document),
function () { for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"]; window.requestAnimationFrame || (window.requestAnimationFrame = function (b) { var c = (new Date).getTime(), d = Math.max(0, 16 - (c - a)), e = window.setTimeout(function () { b(c + d) }, d); return a = c + d, e }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) { clearTimeout(a) }) }();