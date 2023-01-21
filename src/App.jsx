import React, { useState } from "react";
import { read, utils } from "xlsx";
import "./App.css";

export default function App() {
  const [filesExcel, setFilesExcel] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [fileName, setFileName] = useState(null);

  const handleFile = async (e) => {
    const myFile = e.target.files[0];
    const f = await myFile.arrayBuffer();
    const wb = read(f);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = utils.sheet_to_json(ws);
    setFilesExcel(data);
    setFileName(myFile.name);
    console.log(wb);
  };

  const filteredExcel = filesExcel.filter((file) => {
    return searchValue.length < 3
      ? filesExcel
      : file.Name.toUpperCase().includes(searchValue.toUpperCase());
  });

  return (
    <div className="container">
      {fileName ? (
        <div className="wrapper">
          <div className="search">
            <h2>Имя файла: {fileName}</h2>
            <input
              type="text"
              placeholder="Поиск..."
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          {filteredExcel.length > 0 ? (
            <div className="files">
              <h3>Name</h3>
              <ul>
                {filteredExcel.map((filesExcel) => (
                  <li key={filesExcel.Name} className="files">
                    {filesExcel.Name}
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h3>Файлы не найдены</h3>
          )}
        </div>
      ) : (
        <div className="input-file">
          <label className="label">
            <input
              className="file"
              type="file"
              onChange={(e) => handleFile(e)}
            />
            <span for="file">Выберите файл</span>
          </label>
        </div>
      )}
    </div>
  );
}
