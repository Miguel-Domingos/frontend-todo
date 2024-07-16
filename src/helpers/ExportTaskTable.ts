import type { ITask } from "@/types";
import exportFromJSON from "export-from-json";

export default function ExportTaskTable(tasks: ITask[]) {
  const fileName = "Tasks";
  const exportType = exportFromJSON.types.csv;
  const data = tasks.map(({ updated_at, ...rest }: any) => ({
    ...rest,
    users: rest.users.map((item: any) => item.name),
  }));
  exportFromJSON({ data, fileName, exportType });
}
