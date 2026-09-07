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

    const windowBox = document.getElementById(id);

    windowBox.style.display = "block";

    bringToFront(windowBox);

    // Start Skills boot sequence
    if (id === "skills_window") {
        bootSkills();
    }
}


/* =========================
   CLOSE WINDOW
   ========================= */

function closeWindow(id) {

    const windowBox = document.getElementById(id);

    windowBox.style.display = "none";
}


/* =========================
   MINIMIZE WINDOW
   ========================= */

function minimizeWindow(element) {

    const windowBox = element.closest(".window");

    windowBox.style.display = "none";
}


/* =========================
   BRING WINDOW TO FRONT
   ========================= */

function bringToFront(windowBox) {

    highestZIndex++;

    windowBox.style.zIndex = highestZIndex;
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
                    event.target.closest(".window_buttons")
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


/* ===================================================
   SKILLS BOOT SEQUENCE
   =================================================== */

let skillsBooted = false;


const fakeCode = [

    "import system.core",
    "initializing modules...",
    "loading skill_database.json",
    "checking dependencies...",
    "dependency check: OK",
    "loading python.interface",
    "loading javascript.interface",
    "loading html_renderer",
    "loading css_engine",
    "loading algorithms.module",
    "loading ai.module",
    "connecting to local database...",
    "database connection: OK",
    "scanning installed skills...",
    "analyzing experience vectors...",
    "calculating proficiency matrix...",
    "building interface...",
    "rendering skill cards...",
    "system integrity: 100%",
    "all modules operational",
    "FINALIZING..."

];


function bootSkills() {

    /*
     * Don't run the animation again
     * every time the window is opened.
     */

    if (skillsBooted) {
        return;
    }


    skillsBooted = true;


    const bootScreen =
        document.getElementById("skills_boot");

    const codeScreen =
        document.getElementById("skills_code");

    const skillsMain =
        document.getElementById("skills_main");

    const progress =
        document.getElementById("boot_progress");

    const message =
        document.getElementById("boot_message");

    const output =
        document.getElementById("code_output");


    /* =========================
       BOOT PROGRESS
       ========================= */

    let progressValue = 0;


    const bootMessages = [

        "Starting system...",
        "Loading kernel...",
        "Checking modules...",
        "Loading skill database...",
        "Initializing interface..."

    ];


    let messageIndex = 0;


    const bootInterval = setInterval(() => {

        progressValue += 2;


        progress.style.width =
            `${progressValue}%`;


        if (
            progressValue % 20 === 0 &&
            messageIndex < bootMessages.length
        ) {

            message.textContent =
                bootMessages[messageIndex];

            messageIndex++;

        }


        if (progressValue >= 100) {

            clearInterval(bootInterval);

            startCodeStream();

        }

    }, 25);


    /* =========================
       CODE STREAM
       ========================= */

    function startCodeStream() {

        bootScreen.style.display = "none";

        codeScreen.style.display = "block";


        let lineCount = 0;


        const codeInterval = setInterval(() => {

            const line =
                fakeCode[
                    Math.floor(
                        Math.random() *
                        fakeCode.length
                    )
                ];


            const randomNumber =
                Math.floor(
                    Math.random() * 99999
                );


            const codeLine =
                `[${randomNumber}] ${line}`;


            const lineElement =
                document.createElement("div");


            lineElement.textContent =
                codeLine;


            output.appendChild(lineElement);


            lineCount++;


            /*
             * Keep only the latest
             * 35 lines on screen.
             */

            if (output.children.length > 35) {

                output.removeChild(
                    output.
                );

            }


            if (lineCount >= 80) {

                clearInterval(codeInterval);

                showSkills();

            }

        }, 12);

    }


    /* =========================
       SHOW SKILLS
       ========================= */

    function showSkills() {

        codeScreen.style.display = "none";

        skillsMain.style.display = "block";

    }

}