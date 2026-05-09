import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import {setUser} from "../utils/auth.js";

export async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;
        await User.create({ name, email, password });
        return res.render('home', { id: null });
    } catch (error) {
        console.error("Signup error:", error);

        if (error?.code === 11000) {
            return res.status(400).json({ error: "Email already registered. Please use a different email." });
        }

        if (error?.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }

        return res.status(500).json({ error: "An error occurred while registering the user." });
    }
}

export async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.render('login', {
                error: "Invalid email or password"
            });
        }
        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie('uid', sessionId);
        
        return res.redirect('/');
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "An error occurred while logging in." });
    }
}