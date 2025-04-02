document.getElementById('get-start').addEventListener('click', function (event) {
    event.preventDefault();
    const nameField = document.getElementById('name').value;
    const passwordField = document.getElementById('pass').value;
    const convertedPass = parseInt(passwordField);

    if (nameField) {
        if (convertedPass === 123456) {
            document.getElementById("nav").style.display = "flex";
            showElement("main");
            hideElement("banner");
            Swal.fire({
                title: "অভিনন্দন",
                text: "চলুন আজ নতুন কিছু শেখা যাক",
                icon: "success"
            });
        } else {
            alert("Wrong Password. Contact admin to get your Login Code");
        }
    } else {
        alert("Please tell us your name first");
    }
})

const logout = () => {
    hideElement("nav");
    hideElement("main");
    document.getElementById("banner").style.display = "flex";
}