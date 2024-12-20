import React, { useState, useEffect } from "react";

import * as XLSX from "xlsx";
import { useParams } from "react-router-dom";
import axiosInstance from "../hooks/axios";

export default function Detail() {
  const [dataDetail, setDataDetail] = useState();
  const { id } = useParams();
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepoDetail = async () => {
      try {
        const response = await axiosInstance.get(`/deteksi/${id}`);
        const credentials = response.data.credentials;

        function getPropertyValue(dataString, property) {
          const regex = new RegExp(`"${property}"\\s*:\\s*"([^"]+)"`, "g");
          const values = [];
          let match;

          while ((match = regex.exec(dataString)) !== null) {
            values.push(match[1]);
          }

          return values;
        }

        const allData = credentials.map((item) => {
          const data = {
            id: item.id,
            github: item.repo_url,
            datetime: item.date,
            branch: getPropertyValue(item.credential, "branch"),
            commitHash: getPropertyValue(item.credential, "commitHash"),
            date: getPropertyValue(item.credential, "date"),
            diff: getPropertyValue(item.credential, "diff"),
            path: getPropertyValue(item.credential, "path"),
            reason: getPropertyValue(item.credential, "reason"),
          };
          return data;
        });
        setDataDetail(allData);
      } catch (error) {
        console.error("Error fetching repo detail:", error);
      }
    };

    fetchRepoDetail();
  }, [id]);

  const dataToShow = repos.find((item) => item.id === id);
  if (dataToShow) {
    console.log("Data yang ingin ditampilkan:", dataToShow);
    setDataDetail(dataToShow);
  } else {
    console.log("Tidak ada data dengan ID yang sesuai.");
    // Atau lakukan penanganan lain sesuai kebutuhan Anda, misalnya menampilkan pesan kesalahan
  }

  const handleExportExcel = () => {
    const rowData = [];

    const headerRow = ["Branch", "Commit Hash", "Date", "Credential Found", "Path", "Reason"];
    rowData.push(headerRow);

    if (dataDetail) {
      const dataRow = [dataDetail.branch, dataDetail.commitHash, dataDetail.date, dataDetail.diff, dataDetail.path, dataDetail.reason];
      rowData.push(dataRow);
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(rowData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "data.xlsx");
  };

  return (
    <div className="p-4 mt-24">
      <table className="w-full" id="detailTable">
        <thead className="bg-gray-400 shadow-lg border-b-2 border-gray-300">
          <tr>
            <th className="p-3 text-xs font-semibold tracking-wide whitespace-nowrap">Branch</th>
            <th className="p-3 text-xs font-semibold">Commit Hash</th>
            <th className="p-3 text-xs font-semibold tracking-wide whitespace-nowrap">Date</th>
            <th className="p-3 text-xs font-semibold tracking-wide whitespace-nowrap">Credential Found</th>
            <th className="p-3 text-xs font-semibold tracking-wide whitespace-nowrap">Path</th>
            <th className="p-1 text-xs font-semibold tracking-wide whitespace-nowrap">Reason</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {dataDetail && (
            <>
              <tr>
                <td className="p-3 text-xs py-2 border-r-4 border-blue-500">{dataDetail.branch}</td>
                <td className="p-3 text-xs py-2 border-r-4 border-blue-500">{dataDetail.commitHash}</td>
                <td className="p-3 text-xs py-2 border-r-4 border-blue-500">{dataDetail.date}</td>
                <td className="p-3 text-xs py-2 border-r-4 border-blue-500">{dataDetail.diff}</td>
                <td className="p-3 text-xs py-2 border-r-4 border-blue-500">{dataDetail.path}</td>
                <td className="p-3 text-xs py-2">{dataDetail.reason}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <div className="flex justify-center space-x-4 mt-3 mb-20">
        <button
          onClick={handleExportExcel}
          className="rounded-xl border-2 border-dashed border-green-700 px-6 py-3 font-semibold uppercase text-white bg-green-700 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] text-[11px] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
          id="exportExcelButton"
        >
          Export to Excel
        </button>
      </div>
    </div>
  );
}
