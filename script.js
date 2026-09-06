const windowBox = document.getElementById("intro");
const titleBar = document.getElementById("top_bar");

let dragging = false;
let offsetX = 0;
let offsetY = 0;


titleBar.addEventListener("mousedown", (event) => {

    dragging = true;

    const rect = windowBox.getBoundingClientRect();

    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

});


document.addEventListener("mousemove", (event) => {

    if (!dragging) return;

    windowBox.style.left = `${event.clientX - offsetX}px`;
    windowBox.style.top = `${event.clientY - offsetY}px`;

    windowBox.style.transform = "none";

});


document.addEventListener("mouseup", () => {

    dragging = false;

});