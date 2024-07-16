import type { IUser } from "@/types";
import exportFromJSON from "export-from-json";

export default function ExportUserTable(users: IUser[]) {
  const fileName = "Users";
  const exportType = exportFromJSON.types.csv;
  const data = users.map(
    ({ email_verified_at, updated_at, ...rest }: any) => rest
  );
  exportFromJSON({ data, fileName, exportType });
}
