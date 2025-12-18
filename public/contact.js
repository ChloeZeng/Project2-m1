// get DOM
const contactMethod = document.getElementById("contactMethod");
const emailField = document.getElementById("emailField");
const phoneField = document.getElementById("phoneField");

// slider menu
contactMethod.addEventListener("change", function() {
    if (this.value === "email") {
        emailField.style.display = "block";
        phoneField.style.display = "none";
    } else if (this.value === "phone") {
        phoneField.style.display = "block";
        emailField.style.display = "none";
    } else {
        // hide
        emailField.style.display = "none";
        phoneField.style.display = "none";
    }
});
