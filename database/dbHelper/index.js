import mssql from "mssql";
import { sqlConfig } from "../../config/db.js";
class DB {
  static async executeProcedure(procedureName, data = {}) {
    const request = (await mssql.connect(sqlConfig)).request();
    for (let key in data) {
      request.input(key, data[key]);
    }
    const result = await request.execute(procedureName);
    return result;
  }
}
export default DB;
