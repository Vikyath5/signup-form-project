const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Signup API
app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    // Required fields
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email, and password are required."
        });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    // Name validation
    if (trimmedName.length < 2) {
        return res.status(400).json({
            success: false,
            message: "Full Name must be at least 2 characters."
        });
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address."
        });
    }

    // Password validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 8 characters."
        });
    }

    if (!hasUppercase) {
        return res.status(400).json({
            success: false,
            message: "Password must contain at least one uppercase letter."
        });
    }

    if (!hasLowercase) {
        return res.status(400).json({
            success: false,
            message: "Password must contain at least one lowercase letter."
        });
    }

    if (!hasNumber) {
        return res.status(400).json({
            success: false,
            message: "Password must contain at least one number."
        });
    }

    if (!hasSpecial) {
        return res.status(400).json({
            success: false,
            message: "Password must contain at least one special character."
        });
    }

    // For this assignment, we're only demonstrating signup flow.
    // Never log or store the password.
    console.log("Signup request received:", {
        name: trimmedName,
        email: trimmedEmail
    });

    res.status(201).json({
        success: true,
        message: "Account created successfully!"
    });
});
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;