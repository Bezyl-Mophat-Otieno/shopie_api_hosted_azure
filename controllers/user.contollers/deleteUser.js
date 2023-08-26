import DB from "../../database/dbHelper/index.js";
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ message: "No id provided", status: "failed" });
    const result = await DB.executeProcedure("deleteUser", { id });
    if (result.rowsAffected[0] === 0)
      return res
        .status(404)
        .json({ message: "User not found", status: "failed" });
    return res
      .status(200)
      .json({ message: "User Deactivated successfully", status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "failed" });
  }
};
export default deleteUser;
