(function ($) {
    "use strict";

    var base = "https://github.com/FemCraftClient/FemCraft-Installer/releases/latest/download/";
    var platform = ((navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent || "").toLowerCase();
    var isWindows = platform.indexOf("win") > -1;

    if (!isWindows) {
        var mac = platform.indexOf("mac") > -1;
        $("#dl-btn").attr("href", base + "FemCraftInstaller-Other.zip");
        $("#dl-icon").attr("class", mac ? "fab fa-apple" : "fab fa-linux");
        $("#dl-os").text(mac ? "for macOS" : "for Linux / macOS");
        $("#dl-other").attr("href", base + "FemCraftInstaller-Windows.zip").text("Windows");
    }

    function startSlides(container) {
        var delay = 7000;
        var speed = 1000;
        var itemSlide = container.find(".simpleslide100-item");
        var nowSlide = 0;

        itemSlide.hide();
        $(itemSlide[0]).show();
        if (itemSlide.length < 2) {
            return;
        }
        nowSlide = 1;

        setInterval(function () {
            itemSlide.fadeOut(speed);
            $(itemSlide[nowSlide]).fadeIn(speed);
            nowSlide = (nowSlide + 1) % itemSlide.length;
        }, delay);
    }

    function preload(urls, done) {
        var loaded = [];
        var pending = urls.length;
        urls.forEach(function (url, i) {
            var img = new Image();
            img.onload = function () { loaded[i] = url; if (--pending === 0) { done(loaded.filter(Boolean)); } };
            img.onerror = function () { if (--pending === 0) { done(loaded.filter(Boolean)); } };
            img.src = url;
        });
    }

    var home = "https://femboysarecut3.github.io/";
    var homeIcon = $("#home-icon");

    function setHomeIcon(urls) {
        if (!urls.length) { return; }
        var url = urls.shift();
        var img = new Image();
        img.onload = function () { homeIcon.attr("src", url).addClass("home-icon-on"); };
        img.onerror = function () { setHomeIcon(urls); };
        img.src = url;
    }

    $.ajax({ url: home, dataType: "text", timeout: 6000 })
        .done(function (html) {
            var doc = new DOMParser().parseFromString(html, "text/html");
            var found = [];
            $(doc).find("link[rel]").each(function () {
                var rel = (this.getAttribute("rel") || "").toLowerCase();
                var href = this.getAttribute("href");
                if (href && rel.split(/\s+/).some(function (r) { return r === "icon" || r === "apple-touch-icon"; })) {
                    found.push(new URL(href, home).href);
                }
            });
            found.push(home + "favicon.ico");
            setHomeIcon(found);
        })
        .fail(function () { setHomeIcon([home + "favicon.ico"]); });

    function showDownloads(total) {
        if (typeof total !== "number") { return; }
        var box = $("#dl-count");
        var num = $("#dl-count-num");
        box.addClass("dl-count-on");
        $({ n: 0 }).animate({ n: total }, {
            duration: 1600,
            easing: "swing",
            step: function (now) { num.text(Math.floor(now).toLocaleString("en-US")); },
            complete: function () { num.text(total.toLocaleString("en-US")); }
        });
    }

    var slider = $(".simpleslide100");

    $.ajax({ url: "https://api.modrinth.com/v2/project/pEWDDouk", dataType: "json", timeout: 6000 })
        .done(function (project) {
            showDownloads(project.downloads);
            var gallery = (project.gallery || []).slice().sort(function (a, b) {
                if (a.featured !== b.featured) { return a.featured ? -1 : 1; }
                return (a.ordering || 0) - (b.ordering || 0);
            });
            var urls = gallery.map(function (g) { return g.raw_url || g.url; });
            if (!urls.length) { startSlides(slider); return; }
            preload(urls, function (ok) {
                if (!ok.length) { startSlides(slider); return; }
                slider.empty();
                ok.forEach(function (url) {
                    $("<div>", { "class": "simpleslide100-item bg-img1" })
                        .css("background-image", "url(\"" + url + "\")")
                        .appendTo(slider);
                });
                startSlides(slider);
            });
        })
        .fail(function () { startSlides(slider); });

})(jQuery);


(function () {
    var music = document.getElementById("bg-music");
    if (!music) { return; }
    function startMusic() {
        var p = music.play();
        if (p && p.then) {
            p.then(stop).catch(function () {});
        } else {
            stop();
        }
    }
    function stop() {
        document.removeEventListener("click", startMusic, true);
        document.removeEventListener("touchstart", startMusic, true);
    }
    document.addEventListener("click", startMusic, true);
    document.addEventListener("touchstart", startMusic, true);
})();

document.addEventListener("contextmenu", function(e){
	e.preventDefault();
	}, false);

	document.onkeydown = function(event) {
	var blocked = [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 75, 76, 77, 78, 79, 80, 81, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 96, 97, 98, 99, 100, 101, 102, 103, 14, 105, 106, 107, 109, 110, 111, 112, 113, 114, 115, 117, 118, 119, 120, 121, 123, 144, 145, 189, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222];

	if(blocked.indexOf(event.keyCode) > -1) {
       return false;
	}

	else if (event.ctrlKey && event.shiftKey && (event.keyCode == 73 || event.keyCode == 74)) {
       return false;
	}
	}
