import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

// Extend Express Request to include a custom "user" field
declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload;
        }
    }
}

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No token provided or invalid format' });
    } else {

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, config.jwtSecret as string);
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid or expired token' });
        }
    }
};

export default AuthMiddleware;
