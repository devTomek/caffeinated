import jwt from "jsonwebtoken";

const authMiddleware = (req: any, res: any, next: any) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }

    const token: string = authHeader.split(" ")[1];
    if (!token) {
        req.isAuth = false;
        return next();
    }

    let decodedToken: any;
    try {
        const secret: any = process.env.JWT_SECRET;
        decodedToken = jwt.verify(token, secret);
    } catch (e) {
        req.isAuth = false;
        return next();
    }

    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    req.isAuth = true;
    req.userId = decodedToken._id;
    req.userEmail = decodedToken.email;
    next();
};

export default authMiddleware;
