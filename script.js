// Redirect users to login page if not logged in
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // Redirect to login.html if not logged in and not on login/signup pages
    if (
        !isLoggedIn &&
        !window.location.pathname.includes("login.html") &&
        !window.location.pathname.includes("signup.html")
    ) {
        window.location.href = "login.html";
    }
});

// Handle Login Form Submission
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        // Fetch stored credentials
        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem("password");

        // Validate credentials
        if (username === storedUsername && password === storedPassword) {
            localStorage.setItem("isLoggedIn", true); // Set logged-in flag
            alert("Login successful!");
            window.location.href = "index.html"; // Redirect to home
        } else {
            alert("Invalid login credentials. Please try again.");
        }
    });
}

// Handle Signup Form Submission
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const signupUsername = document.getElementById("signupUsername").value;
        const signupPassword = document.getElementById("signupPassword").value;

        // Save user credentials in localStorage
        localStorage.setItem("username", signupUsername);
        localStorage.setItem("password", signupPassword);

        alert("Signup successful! You can now log in.");
        window.location.href = "login.html"; // Redirect to login
    });
}

// Handle Logout
const logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn"); // Clear login flag
        alert("You have been logged out.");
        window.location.href = "login.html"; // Redirect to login
    });
}

// Initialize EmailJS with the private API key
emailjs.init("TNA6kzrMLfGHTHRoY");

document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const serviceID = "service_l74ylup";
    const templateID = "template_am28ran";

    // Collect form data
    const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    // Send the email
    emailjs.send(serviceID, templateID, {name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,})

    .then((response) => {alert("Email sent successfully!");
        console.log("SUCCESS:", response);

            // Clear the form after success
            document.getElementById("contactForm").reset();
        })
        .catch((error) => {
            alert("Failed to send email. Please try again.");
            console.error("ERROR:", error);
        });
});
