let activeWindow = null
let offsetX = 0
let offsetY = 0

let highestZIndex = 1

function openWindow(id) {
    const windowBox = document.getElementById(id)

    windowBox.style.display = "block"
    bringToFront(windowBox)

    // skills gets its little boot sequence when you open it
    if (id === "skills_window") {
        bootSkills()
    }   
}

function closeWindow(id) {
    const windowBox = document.getElementById(id)
    windowBox.style.display = "none"
}

function minimizeWindow(element) {
    const windowBox = element.closest(".window")
    windowBox.style.display = "none"
}

function bringToFront(windowBox) {
    highestZIndex++
    windowBox.style.zIndex = highestZIndex
}

// make the windows draggable
document.querySelectorAll(".top_bar")
    .forEach(titleBar => {
        titleBar.addEventListener("mousedown", event => {
            const windowBox = titleBar.parentElement

            // don't drag the window if i'm clicking one of the buttons
            if (event.target.closest(".window_buttons")) {
                return
            }

            bringToFront(windowBox)
            activeWindow = windowBox

            const rect = windowBox.getBoundingClientRect()

            offsetX = event.clientX - rect.left
            offsetY = event.clientY - rect.top

            // removes the translate that was centering it
            windowBox.style.transform = "none"
        })
    })

document.addEventListener("mousemove", event => {
    if (!activeWindow) {
        return
    }

    activeWindow.style.left = `${event.clientX - offsetX}px`
    activeWindow.style.top = `${event.clientY - offsetY}px`
})

document.addEventListener("mouseup", () => {
    activeWindow = null
})

let skillsBooted = false

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
]

function bootSkills() {
    // only run this once so reopening the window doesn't restart everything
    if (skillsBooted) {
        return
    }

    skillsBooted = true

    const bootScreen = document.getElementById("skills_boot")
    const codeScreen = document.getElementById("skills_code")
    const skillsMain = document.getElementById("skills_main")
    const progress = document.getElementById("boot_progress")
    const message = document.getElementById("boot_message")
    const output = document.getElementById("code_output")

    let progressValue = 0

    const bootMessages = [
        "Starting system...",
        "Loading kernel...",
        "Checking modules...",
        "Loading skill database...",
        "Initializing interface..."
    ]

    let messageIndex = 0

    const bootInterval = setInterval(() => {
        progressValue += 2
        progress.style.width = `${progressValue}%`

        if (
            progressValue % 20 === 0 &&
            messageIndex < bootMessages.length
        ) {
            message.textContent = bootMessages[messageIndex]
            messageIndex++
        }

        if (progressValue >= 100) {
            clearInterval(bootInterval)
            startCodeStream()
        }
    }, 25)

    function startCodeStream() {
        bootScreen.style.display = "none"
        codeScreen.style.display = "block"

        let lineCount = 0

        const codeInterval = setInterval(() => {
            const line =
                fakeCode[
                    Math.floor(Math.random() * fakeCode.length)
                ]

            const randomNumber = Math.floor(Math.random() * 99999)
            const codeLine = `[${randomNumber}] ${line}`

            const lineElement = document.createElement("div")
            lineElement.textContent = codeLine

            output.appendChild(lineElement)

            lineCount++

            // keeps the output from getting stupidly long
            if (output.children.length > 35) {
                output.removeChild(output.firstChild)
            }

            if (lineCount >= 80) {
                clearInterval(codeInterval)
                showSkills()
            }
        }, 12)
    }

    function showSkills() {
        codeScreen.style.display = "none"
        skillsMain.style.display = "block"
    }
}