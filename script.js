/* =========================
   WINDOW STATE
   ========================= */

let activeWindow = null;

let offsetX = 0;
let offsetY = 0;


/* =========================
   Z-INDEX
   ========================= */

let highestZIndex = 1;


/* =========================
   OPEN WINDOW
   ========================= */

function openWindow(id) {

    const windowBox =
        document.getElementById(id);

    windowBox.style.display = "block";

    bringToFront(windowBox);
}


/* =========================
   CLOSE WINDOW
   ========================= */

function closeWindow(id) {

    const windowBox =
        document.getElementById(id);

    windowBox.style.display = "none";
}


/* =========================
   MINIMIZE WINDOW
   ========================= */

function minimizeWindow(id) {

    const windowBox =
        document.getElementById(id);

    windowBox.style.display = "none";
}


/* =========================
   BRING WINDOW TO FRONT
   ========================= */

function bringToFront(windowBox) {

    highestZIndex++;

    windowBox.style.zIndex =
        highestZIndex;
}


/* =========================
   MAKE WINDOWS DRAGGABLE
   ========================= */

document
    .querySelectorAll(".top_bar")
    .forEach(titleBar => {

        titleBar.addEventListener(
            "mousedown",
            (event) => {

                const windowBox =
                    titleBar.parentElement;

                /*
                 * Don't start dragging when
                 * clicking a window button.
                 */

                if (
                    event.target.tagName ===
                    "BUTTON"
                ) {
                    return;
                }


                bringToFront(windowBox);

                activeWindow = windowBox;


                const rect =
                    windowBox.getBoundingClientRect();


                offsetX =
                    event.clientX - rect.left;

                offsetY =
                    event.clientY - rect.top;


                /*
                 * Remove the initial
                 * centering transform.
                 */

                windowBox.style.transform =
                    "none";

            }
        );

    });


/* =========================
   DRAGGING
   ========================= */

document.addEventListener(
    "mousemove",
    (event) => {

        if (!activeWindow) {
            return;
        }


        activeWindow.style.left =
            `${event.clientX - offsetX}px`;

        activeWindow.style.top =
            `${event.clientY - offsetY}px`;

    }
);


/* =========================
   STOP DRAGGING
   ========================= */

document.addEventListener(
    "mouseup",
    () => {

        activeWindow = null;

    }
);