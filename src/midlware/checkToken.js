import jwt from "jsonwebtoken";
import SECRET_KEY from "../../keys.js";


function checkToken(req, res, next) {
  try {
    let { ["user-agent"]: agent, token } = req.headers;
    let answer = jwt.verify(token, SECRET_KEY);
    if (agent !== answer.agent) {
      throw new Error("wrong token");
    }
    next();
  } catch (err) {
    res.status(400).send({ status: 400, message: err.message });
  }
}

export default checkToken;