import FileSaver from "file-saver";
import XLSX from "xlsx";

const Heading = [
  {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    address: "Address",
    postcode: "Postcode",
  },
];

type ExportCSVProps = {
  csvData: any[];
  fileName: string;
  wscols: any[];
};

const ExportXLSX = ({ csvData, fileName, wscols }: ExportCSVProps) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const ws = XLSX.utils.json_to_sheet(Heading, {
    header: ["firstName", "lastName", "email", "address", "postcode"],
    skipHeader: true,
    // origin: 0, //ok
  });
  ws["!cols"] = wscols;
  XLSX.utils.sheet_add_json(ws, csvData, {
    header: ["firstName", "lastName", "email", "address", "postcode"],
    skipHeader: true,
    origin: -1, //ok
  });
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

export default ExportXLSX;
