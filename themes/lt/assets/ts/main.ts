function toggleScheme(): void {
    console.log(localStorage.getItem("nasin-lukin"))
    switch (localStorage.getItem("nasin-lukin")) {
    case "walo":
        localStorage.setItem("nasin-lukin", "pimeja")
        break

    case "pimeja":
        localStorage.setItem("nasin-lukin", "walo")
        break

    default:
        localStorage.setItem("nasin-lukin", "walo")
        break
    }

    applyScheme()
}

const matches = window.matchMedia("(prefers-color-scheme: dark)")
let listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any

function setTelegramCommentsColor(mode: "walo" | "pimeja" | null): void {
    const apply = (dark: boolean) => {
        const frame = document.querySelector("iframe")
        if (frame != null) {
            frame.remove()
        }

        const it = document.querySelector("#comments-slot script")
        if (it != null) {
            it.remove()
        }

        const elm = document.querySelector("#comments-slot")
        if (elm == null) {
            return
        }

        let script = document.createElement("script") as HTMLScriptElement
        script.src = "https://comments.app/js/widget.js?3"
        script.dataset["dark"] = dark ? "1" : "0"
        script.setAttribute("data-comments-app-website", "MRjDiWij")
        script.dataset["limit"] = "10"
        script.dataset["dislikes"] = "1"
        script.dataset["outlined"] = "1"
        script.dataset["colorful"] = "1"
        elm.appendChild(script)
    }

    if (listener != null) {
        matches.removeListener(listener)
        listener = null
    }

    switch (mode) {
    case "walo":
    case "pimeja":
        apply(mode == "pimeja")
        break
    case null:
        const lis = (ev: MediaQueryListEvent): any => {
            apply(ev.matches)
        }
        matches.addListener(lis)
        apply(matches.matches)
        break
    }
}

function applyScheme(): void {
    switch (localStorage.getItem("nasin-lukin")) {
    case "walo":
        (document.querySelector(":root") as HTMLElement).setAttribute("data-nasin-lukin", "walo");
        setTelegramCommentsColor("walo")
        break;
    case "pimeja":
        (document.querySelector(":root") as HTMLElement).setAttribute("data-nasin-lukin", "pimeja");
        setTelegramCommentsColor("pimeja")
        break;
    default:
        (document.querySelector(":root") as HTMLElement).setAttribute("data-nasin-lukin", "ala");
        setTelegramCommentsColor(null)
        break;
    }
}

function addlen(len: string): void {
    let mu = (JSON.parse(localStorage.getItem("lens")) || []) as string[]
    mu.push(len)
    localStorage.setItem("lens", JSON.stringify(mu))
    applylens()
}

function removelen(len: string): void {
    let mu = (JSON.parse(localStorage.getItem("lens")) || []) as string[]
    mu = mu.filter(item => item != len)
    localStorage.setItem("lens", JSON.stringify(mu))
    applylens()
}

function applylens(): void {
    let items = (JSON.parse(localStorage.getItem("lens")) || []) as string[]

    document.querySelectorAll(`.lt-card.lt-article-card`).forEach(item => {
        let a: string[] = []
        item.querySelectorAll(`.lt-article-card-chip`).forEach(item => {
            a.push(item.textContent)
        })
        if (a.some(item => items.includes(item))) {
            item.classList.add("lipu-len")
        } else {
            item.classList.remove("lipu-len")
        }
    })
}

applyScheme()
applylens()
