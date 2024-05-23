import { useState, Fragment } from "react";
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

const getBackgroundColor = (depth: number) => {
  const baseColor = 39; // Corresponds to #272727
  const maxDepth = 10;
  const maxColor = 230;

  const clampedDepth = Math.min(depth, maxDepth);

  const colorValue =
    baseColor + (maxColor - baseColor) * (clampedDepth / maxDepth);

  const colorHex = Math.round(colorValue).toString(16).padStart(2, "0");

  return `#${colorHex}${colorHex}${colorHex}`;
};

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

  const handleFileClick = async (fileKey: string) => {
    try {
      const response = await fetch(`/api/getPresignedUrl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileKey }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch signed URL");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error generating signed URL:", error);
    }
  };


  const renderFolder = (
    folder: FolderData,
    path: string = "",
    depth: number = 0,
  ): JSX.Element[] => {
    const sortedContents = [...folder.contents].sort((a, b) => {
      if ("contents" in a && !("contents" in b)) {
        return -1; // a is a folder, b is a file
      } else if (!("contents" in a) && "contents" in b) {
        return 1; // a is a file, b is a folder
      } else if ("contents" in a && "contents" in b) {
        return a.name.localeCompare(b.name); // both are folders
      } else if (!("contents" in a) && !("contents" in b)) {
        return a.key.localeCompare(b.key); // both are files
      } else {
        return 0;
      }
    });

    return sortedContents.map((item) => {
      if ("contents" in item) {
        const folderPath = `${path}/${item.name}`;
        return (
          <Fragment key={folderPath}>
            <tr
              className="cursor-pointer"
              onClick={() => toggleFolder(folderPath)}
              style={{ backgroundColor: getBackgroundColor(depth / 3) }}
            >
              <td
                className="px-6 whitespace-nowrap"
                style={{ paddingLeft: `${depth * 20 + 12}px`, width: "60%" }}
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
                  <div className="ml-4 truncate">
                    <span className="text-sm font-medium text-[#c5c0b8] select-none">
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
          </Fragment>
        );
      } else {
        return (
          <tr key={item.key} className="bg-[#373737] cursor-pointer" onClick={() => handleFileClick(item.key)}>
            <td
              className="px-6 py-4 whitespace-nowrap truncate"
              style={{ paddingLeft: `${depth * 20}px` }}
            >
              <div className="flex items-center">
                <div className="ml-4">
                  <span className="text-sm font-medium text-[#c5c0b8] select-none">
                    {item.key.split("/").pop()}
                  </span>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-[#c5c0b8] select-none">
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
              <div className="text-sm text-[#c5c0b8] select-none">
                {new Date(item.lastModified).toLocaleDateString()}
              </div>
            </td>
          </tr>
        );
      }
    });
  };

  return (
    <div className="h-[70dvh] overflow-auto">
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
