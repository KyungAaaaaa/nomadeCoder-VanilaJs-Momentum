const nameForm = document.querySelector(".jsName"),
    nameInput = nameForm.querySelector("input"),
    nameGreetings = document.querySelector(".jsGreetings"),
    nameReset = document.querySelector(".jsReset");


const NAME_KEY = "name";

function loadName() {
    const loadedName = localStorage.getItem(NAME_KEY);
    if (loadedName === null) {
        nameForm.classList.add("showing");
        nameGreetings.classList.remove("showing");
    } else {
        nameForm.classList.remove("showing");
        nameGreetings.classList.add("showing");
        nameGreetings.innerText = `Hello! ${loadedName}`;
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const name = nameInput.value;
    localStorage.setItem(NAME_KEY, name);
    nameInput.value = "";
    loadName();
}


function handleNameResetClick() {
    localStorage.removeItem(NAME_KEY);
    location.reload(true);
}


function init() {
    loadName();
    nameForm.addEventListener("submit", handleSubmit)
    nameReset.addEventListener("click", handleNameResetClick)

}

init();