import DB from "../../database/dbHelper/index.js";
import { StatusCodes } from "http-status-codes";
const fetchUsers = async (req, res) => {
  try {
    const result = await DB.executeProcedure("fetchUsers");
    const users = result?.recordset;
    if (users.length > 0) {
      res.status(StatusCodes.OK).json({ users: users, status: "success" });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Users Not Found", status: "failed" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something Went Wrong.Server Error", status: "failed" });
  }
};
export default fetchUsers;
