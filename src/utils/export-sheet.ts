import XLSX from "xlsx";

type ExportSheetProps = {
  data: any[];
  fileName?: string;
  fileType?: "csv" | "xlsx";
};

const ExportSheet = ({
  data,
  fileName = "DataSheet",
  fileType = "csv",
}: ExportSheetProps) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const fileExtension = fileType === "csv" ? ".csv" : ".xlsx";
  const fileNameWithExtension = `${fileName}${fileExtension}`;
  XLSX.writeFile(workbook, fileNameWithExtension);
};

export default ExportSheet;
