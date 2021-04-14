import { connectDb } from "../../../helper/db";
import { hashPassword } from "../../../helper/hash";
import User from "../../../model/user";

const handler = async (req, res) => {
  const { email, password } = req.body;
  try {
    await connectDb();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }

  if (req.method == "POST") {
    try {
      const pw = await hashPassword(password);
      const userModel = await User.create({email, password:pw})
      console.log(userModel);
      return res.status(201).send({ msg: "Successfully sign in" });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
};

export default handler;
