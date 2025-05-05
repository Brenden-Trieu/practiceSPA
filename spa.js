const pageContent = document.querySelector("#pageContent");
const views = {
    "#home": "views/home.html",
    "#changeTitle": "views/changeTitle.html",
};

async function render(path) {
    const route = views[path] || null;
    if (!route) {
        pageContent.innerHTML = `<p>Unable to confirm route</p>`;
    }
    try {
        const response = await fetch(route);
        if (!response.ok) {
            throw new Error("error at fetch");
        }
        pageContent.innerHTML = await response.text();
    } catch (e) {
        pageContent.innerHTML = `<p>error: ${e}</p>`;
    }

    let buttonFunction = document.querySelector("#confirmChange");
    if (buttonFunction) {
        buttonFunction.addEventListener("click", () => {
            let input = document.querySelector("#titleChanged");
            if (input) {
                document.querySelector("#textToBeChanged").innerHTML = input.value;
            }
        });
    }
}

window.addEventListener("load", () => {
    render(window.location.hash || "#home");
});

window.addEventListener("hashchange", () => {
    render(window.location.hash);
});
