import './App.css';
import * as XLSX from 'xlsx';
import BasicTable from './table';
import { useEffect, useRef, useState } from 'react';
var debounce = require('lodash.debounce');

function App() {
  const [rows, setRows] = useState([])

  const [data, setData] = useState([])



  useEffect(() => {
    if (localStorage.getItem("ROWS")) {
      let excelRows = JSON.parse(localStorage.getItem("ROWS"))
      if (excelRows.length !== 0) {
        setRows(excelRows)
    setData(excelRows)

      }
    }
  }, [])
  function Upload() {
    const fileUpload = (document.getElementById('fileUpload'));
    const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      // let fileName = fileUpload.files[0].name;
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        if (reader.readAsBinaryString) {
          reader.onload = (e) => {
            processExcel(reader.result);
          };
          reader.readAsBinaryString(fileUpload.files[0]);
        }
      } else {
        console.log("This browser does not support HTML5.");
      }
    } else {
      console.log("Please upload a valid Excel file.");
    }
  }

  function processExcel(data) {
    const workbook = XLSX.read(data, { type: 'binary' });
    const firstSheet = workbook.SheetNames[0];
    const excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    console.log(excelRows);
    localStorage.setItem("ROWS", JSON.stringify(excelRows))
    setRows(excelRows)
    setData(rows)
  }

  const handleChange = debounce(e => {

    let searchText = e.target.value;
    if (searchText.length > 0) {
      var searchKeys = searchText.split(",")
      let tempRows= rows
      let excelRows = tempRows.map(item => {
        var bstart = new RegExp("<b>","g");
        var bend = new RegExp("</b>","g");

        item.Ingredients = item.Ingredients.replaceAll(bstart,'');
        item.Ingredients = item.Ingredients.replaceAll(bend,'');

        searchKeys.forEach(keyword => {
          let boldText = `<b>${keyword}</b>`
          var regEx = new RegExp(keyword.trim(), "ig");
          let ingredients = item.Ingredients.replaceAll(regEx, boldText)
          item.Ingredients = ingredients
        })
        return item;
      })
      setData(excelRows)
    } else {
      let excelRows = rows.map(item => {
        var bstart = new RegExp("<b>","g");
        var bend = new RegExp("</b>","g");

        item.Ingredients = item.Ingredients.replaceAll(bstart,'');
        item.Ingredients = item.Ingredients.replaceAll(bend,'');

        return item;
      })
      setData(excelRows)
    }
  }, 1000)
  return (
    <>
    <div className="fix-top">
      <input className="upload-excel" type="file" id="fileUpload" onChange={Upload} />
      <input className="search" type="search" onChange={handleChange} />
      </div>
      <p className='count'>Count:{data.length}</p>
      {data.length > 0 && <BasicTable rows={data}></BasicTable>}
    </>


  );
}

export default App;
