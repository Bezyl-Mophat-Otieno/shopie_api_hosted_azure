import DB from "../../database/dbHelper/index.js";
import { StatusCodes } from "http-status-codes";
import { v4 } from "uuid";
const createOrder = async (req, res) => {
  try {
    const id = v4();
    const { user_id, name, price, quantity, total } = req.body;
    console.log({ ...req.body, id });
    if (!user_id || !name || !price || !quantity || !total) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Please fill all fields" });
    }
    const result = await DB.executeProcedure("createOrder", {
      ...req.body,
      id,
    });
    if (result.rowsAffected[0] === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Something went wrong,The Order was not created",
        status: "failed",
      });
    } else {
      return res
        .status(StatusCodes.OK)
        .json({ message: "Order created successfully", status: "success" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
export default createOrder;
