import { getUser } from "../utils/auth.js";

export  async function restrictToLoggedInUserOnly(req, res, next) {
    try {
        const userUid = req.cookies?.uid; 
        if (!userUid) {
            return res.redirect('/login');
        }
        const user = await getUser(userUid);
        if (!user) {
            return res.redirect('/login');
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ error: "An error occurred during authentication." });
    }
}