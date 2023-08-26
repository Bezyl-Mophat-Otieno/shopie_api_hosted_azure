import DB from "../../database/dbHelper/index.js";
import { StatusCodes } from "http-status-codes";
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Id is required" });
    const result = await DB.executeProcedure("getProduct", { id });
    const product = result.recordset[0];
    if (result.recordset.length === 0)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    return res.status(StatusCodes.OK).json({ product, status: "success" });
  } catch (error) {}
};
export default getProduct;
