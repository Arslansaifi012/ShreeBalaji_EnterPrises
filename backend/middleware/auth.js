import jwt from 'jsonwebtoken'
const authUser = async (req, res, next) => {
  try {
    let token = req.headers.authorization || req.headers.token;

    if (!token) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    // Remove Bearer
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded.id;
    // console.log(req.body.userId)
    next();
  } catch (error) {
    console.log("AUTH ERROR:", error.message);
    res.json({ success: false, message: "Invalid Token" });
  }
};

export default authUser ;