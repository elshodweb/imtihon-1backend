import { read } from "../lib/models.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import SECRET_KEY from "../../keys.js";

const LOGIN_ADMIN = (req, res) => {
  try {
    let { username, password } = req.body;
    let admins = read("admins");
    function hash(parol){
      return crypto.createHash("sha256", "olma").update(parol).digest("hex");
    }

    let admin = admins.find(
      (a) => (a.username == username && a.password == hash(password))
    );

    if (!admin) {
      throw new Error("wrong username or password");
    }
    let agent = req.headers["user-headers"];

    let token = jwt.sign({ admin: admin.adminId, agent }, SECRET_KEY);

    res.status(200).json({ status: 200, message: "success", token });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

export { LOGIN_ADMIN };
