import mssql from "mssql";
import dotenv from "dotenv";
import path from "path";
import { sqlConfig } from "../config";
import { sendMail } from "../helpers";
import ejs from "ejs";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface IUser {
  ID: string;
  UNAME: string;
  EMAIL: string;
  UPASSWORD: string;
  isDeleted: number;
  ROLE: string;
  isEmailSent: number;
}

export async function sendUserEmail() {
  try {
    let pool = await mssql.connect(sqlConfig);
    let users = (
      await pool.request().query("SELECT * FROM Users WHERE isEmailSent=0")
    ).recordset as IUser[];
    users.forEach((user) => {
      ejs.renderFile(
        "Templates/register.ejs",
        { name: user.UNAME },
        async (error, data) => {
          let messageOptions={
              to:user.EMAIL,
              from:process.env.EMAIL_ADDRESS,
              subject:"Welcome to KIKWETU",
              html:data
          }
        //   console.log(error);

          await sendMail(messageOptions)
        //   console.log(data);
          await pool
            .request()
            .query(`UPDATE Users SET isEmailSent=1 WHERE ID='${user.ID}'`);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
}
