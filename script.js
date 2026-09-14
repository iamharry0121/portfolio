var activeWindow = null;
var offsetX = 0;
var offsetY = 0;
var topZ = 1;

function openWindow(id) {
    document.getElementById(id).style.display = "block";
    bringToFront(document.getElementById(id));
}

function closeWindow(id) {
    document.getElementById(id).style.display = "none";
}

function minimizeWindow(btn) {
    var win = btn.closest(".window");
    win.style.display = "none";
}

function maximizeWindow(btn) {
    var win = btn.closest(".window");

    if (win.classList.contains("maximized")) {
        win.classList.remove("maximized");
        win.style.top = win.oldTop;
        win.style.left = win.oldLeft;
        win.style.transform = win.oldTransform;
    } else {
        win.oldTop = win.style.top;
        win.oldLeft = win.style.left;
        win.oldTransform = win.style.transform;

        win.classList.add("maximized");
        win.style.top = "0px";
        win.style.left = "0px";
        win.style.transform = "none";
        bringToFront(win);
    }
}

function bringToFront(win) {
    topZ = topZ + 1;
    win.style.zIndex = topZ;
}

// let people drag windows around by the top bar
var bars = document.querySelectorAll(".top_bar");

for (var i = 0; i < bars.length; i++) {
    bars[i].addEventListener("mousedown", function (e) {
        var win = this.parentElement;

        if (e.target.closest(".window_buttons")) return;
        if (win.classList.contains("maximized")) return;

        bringToFront(win);
        activeWindow = win;

        var rect = win.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        win.style.transform = "none";
    });
}

document.addEventListener("mousemove", function (e) {
    if (!activeWindow) return;
    activeWindow.style.left = (e.clientX - offsetX) + "px";
    activeWindow.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", function () {
    activeWindow = null;
});
