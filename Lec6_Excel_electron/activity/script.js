let $ = require("jquery");

// jquery is used for dom manipulation
$("document").ready(function () {
  let db;
  let lsc;

  // console.log("jquery loaded !!!");
  $(".cell").on("click", function () {
    console.log("clicked on cell");
    let rowId = Number($(this).attr("r-id"));
    let colId = Number($(this).attr("c-id"));
    let address = String.fromCharCode(65 + colId) + (rowId + 1);
    $(".address").val(address);
    let cellObject = getCellObject(this);
    $(".cell-formula").val(cellObject.formula);
  });

  $(".cell").on("blur", function () {
    lsc = this;
    let value = Number($(this).text());
    // console.log(value);
    let cellObject = getCellObject(this);
    if (value != cellObject.value) {
      cellObject.value = value;
    //   console.log(db);
    }
  });

  // formula
  $(".cell-formula").on("blur", function () {
    let formula = $(this).val();
    // console.log(formula);
    // falsy values => undefined , false , 0 , "",null
    // if(formula){
    addFormula(formula);
    // }
  });

  function addFormula(formula) {
    let cellObject = getCellObject(lsc);
    cellObject.formula = formula;
    // console.log(db);
    solveFormula(cellObject);
  }

  function solveFormula(cellObject) {
    let formula = cellObject.formula;
    console.log(formula);
    // "( A1 + A2 )"
    // "( 10 + "
    let fComps = formula.split(" ");
    // [  "(" , "A1" , "+" , "A2" , ")"  ];
    for (let i = 0; i < fComps.length; i++) {
      let fComp = fComps[i];
      
      let cellName = fComp[0];
      if (cellName >= "A" && cellName <= "Z") {
        //A1
        console.log("Inside if" + fComp);
        let {rowId , colId } = getRowIdColIdFromAddress(fComp);
        let parentCellObject = db[rowId][colId];
        let value = parentCellObject.value;
        formula = formula.replace( fComp , value  );
      }
    }
    let value = eval(formula);
    cellObject.value = value;
    $(lsc).text(value);
  }

  function init() {
    db = [];
    let allRows = $(".cells .row");
    // console.log(allRows.length);
    for (let i = 0; i < allRows.length; i++) {
      let row = [];
      let allColsInARow = $(allRows[i]).find(".cell");
      for (let j = 0; j < allColsInARow.length; j++) {
        // i=0 , j= 0
        let address = getAddressFromRowIdColId(i, j);
        let cellObject = {
          name: address,
          value: "",
          formula: "",
        };
        row.push(cellObject);
      }
      db.push(row);
    }

    console.log(db);
  }
  init();

  //utility function
  function getAddressFromRowIdColId(i, j) {
    // i=0 , j=0;
    let row = i + 1;
    let col = String.fromCharCode(65 + j);
    let address = `${col}${row}`;
    return address;
  }
  function getRowIdColIdFromAddress(address) {
    let row = Number(address.substring(1)) - 1;
    let col = address.charCodeAt(0) - 65;

    return {
        rowId : row,
        colId : col
    };
  }
  function getCellObject(elem) {
    let rowId = Number($(elem).attr("r-id"));
    let colId = Number($(elem).attr("c-id"));
    let cellObject = db[rowId][colId];
    return cellObject;
  }
});
