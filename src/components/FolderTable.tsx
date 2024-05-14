import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

interface FileData {
  key: string;
  size: number;
  lastModified: string;
}

interface FolderData {
  name: string;
  contents: (FileData | FolderData)[];
}

interface FolderTableProps {
  data: FolderData;
}

const FolderTable: React.FC<FolderTableProps> = ({ data }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(),
  );

  const toggleFolder = (folderPath: string) => {
    const newExpandedFolders = new Set(expandedFolders);
    if (newExpandedFolders.has(folderPath)) {
      newExpandedFolders.delete(folderPath);
    } else {
      newExpandedFolders.add(folderPath);
    }
    setExpandedFolders(newExpandedFolders);
  };

  const handleFileClick = (fileUrl: string) => {
    window.location.href = fileUrl;
  };

  const renderFolder = (
    folder: FolderData,
    path: string = "",
    depth: number = 0,
  ): JSX.Element[] => {
    return folder.contents.map((item) => {
      if ("contents" in item) {
        const folderPath = `${path}/${item.name}`;
        return (
          <React.Fragment key={folderPath}>
            <tr
              className="bg-[#272727] cursor-pointer"
              onClick={() => toggleFolder(folderPath)}
            >
              <td
                className="px-6 whitespace-nowrap"
                style={{ paddingLeft: `${(depth * 20) + 12}px`, width: "60%" }}
              >
                <div className="flex items-center">
                  <div
                    className="mr-2"
                    style={{
                      width: "16px",
                      display: "inline-block",
                      textAlign: "center",
                    }}
                  >
                    <span className="px-3 py-2">
                      {expandedFolders.has(folderPath) ? (
                        <MdExpandLess size={20} />
                      ) : (
                        <MdExpandMore size={20} />
                      )}
                    </span>
                  </div>
                  <div className="ml-4">
                    <span className="text-sm font-medium text-[#c5c0b8] ">
                      {item.name}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4" style={{ width: "20%" }}></td>
              <td className="px-6 py-4" style={{ width: "20%" }}></td>
            </tr>
            {expandedFolders.has(folderPath) &&
              renderFolder(item, folderPath, depth + 1)}
          </React.Fragment>
        );
      } else {
        const fileUrl = "https://rcn.ams3.cdn.digitaloceanspaces.com" + item.key;
        return (
          <tr
            key={item.key}
            className="bg-[#373737] cursor-pointer"
            onClick={() => handleFileClick(fileUrl)}
          >
            <td
              className="px-6 py-4 whitespace-nowrap"
              style={{ paddingLeft: `${depth * 20}px` }}
            >
              <div className="flex items-center">
                <div className="ml-4">
                  <span
                    className="text-sm font-medium text-[#c5c0b8] "
                  >
                    {item.key.split("/").pop()}
                  </span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-[#c5c0b8] ">
                {item.size / 1024 / 1024 / 1024 > 1
                  ? (item.size / 1024 / 1024 / 1024).toFixed(2) + " GB"
                  : item.size / 1024 / 1024 > 1
                    ? (item.size / 1024 / 1024).toFixed(2) + " MB"
                    : item.size / 1024 > 1
                      ? (item.size / 1024).toFixed(2) + " KB"
                      : item.size + " bytes"}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-[#c5c0b8] ">
                {new Date(item.lastModified).toLocaleDateString()}
              </div>
            </td>
          </tr>
        );
      }
    });
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-[#c5c0b8] ">
        <thead className="text-xs text-grey-50 uppercase bg-[#353535]">
          <tr>
            <th scope="col" className="px-6 py-3" style={{ width: "60%" }}>
              Name
            </th>
            <th scope="col" className="px-6 py-3" style={{ width: "20%" }}>
              Size
            </th>
            <th scope="col" className="px-6 py-3" style={{ width: "20%" }}>
              Last Modified
            </th>
          </tr>
        </thead>
        <tbody>{data && renderFolder(data)}</tbody>
      </table>
    </div>
  );
};

export default FolderTable;
