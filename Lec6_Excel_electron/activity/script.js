let $ = require("jquery");
let fs = require("fs");
let dialog = require("electron").remote.dialog;


// jquery is used for dom manipulation
$("document").ready(function () {
  let db;
  let lsc;

  // new // open // save
  $(".new").on("click" , function(){
    db = [];
    let allRows = $(".cells .row");
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
          parents :[],
          childrens :[]
        };
        row.push(cellObject);
        // i => j =>
        $(allColsInARow[j]).html("");
      }
      db.push(row);
    }
    $(".address , .cell-formula").val("");
  })

  $(".open").on("click" , function(){
    console.log("open clicked");
    // db update and ui update 
    let paths = dialog.showOpenDialogSync();
    let path = paths[0];

    let data = fs.readFileSync(path);
    data = JSON.parse(data);
    db = data;

    let allRows = $(".cells .row");
    for(let i=0 ; i<allRows.length ; i++){
      let allCellsInARow = $(allRows[i]).find(".cell");
      for(let j=0 ; j<allCellsInARow.length ; j++){
        let value = db[i][j].value;
        $(allCellsInARow[j]).html(value);
      }
    }
  })

  $(".save").on("click" , function(){
      console.log("save clicked");
      let path = dialog.showSaveDialogSync();
      console.log(path);
      let data = JSON.stringify(db);
      fs.writeFileSync(path , data);
      alert("File Saved !!");
  })



  $(".cell").on("click", function () {
    $(this).addClass("active");
    let rowId = Number($(this).attr("r-id"));
    let colId = Number($(this).attr("c-id"));
    let address = String.fromCharCode(65 + colId) + (rowId + 1);
    $(".address").val(address);
    let cellObject = getCellObject(this);
    $(".cell-formula").val(cellObject.formula);
  });
  $(".cell").on("blur", function () {
    $(this).removeClass("active");
    lsc = this;
    let value = Number($(this).text());
    let cellObject = getCellObject(this);
    if (value != cellObject.value) {
      cellObject.value = value;
      // cell out of focus and value is changed on the cell from the ui
      if(cellObject.formula){
          removeFormula(cellObject);
          $(".cell-formula").val("");
      }
      updateChildrens(cellObject);
    }
  });
  $(".cell-formula").on("blur", function () {
    let formula = $(this).val();
    // falsy values => undefined , false , 0 , "",null
        let cellObject = getCellObject(lsc);
        if(cellObject.formula != formula){
            removeFormula(cellObject);
            if(formula == ""){
                $(lsc).text("");
                return;
            }
        }
        addFormula(formula); // => add formula to self => calculate value => update db value => update ui
        updateChildrens(cellObject);
    });


    // scrolling
    $(".content").on("scroll" , function(){
      let topOffset = $(this).scrollTop();
      let leftOffset = $(this).scrollLeft();
      // console.log("top" , topOffset)
      // console.log("left" , leftOffset);

      $(".top-left-cell , .top-row").css("top" , topOffset+"px");
      $(".top-left-cell , .left-col").css("left" , leftOffset+"px");


    })



  // formula 
  // removeFormula => cellObject.formula ="" => remove self from childrens of parents => clear parents 
  function removeFormula(cellObject){
      cellObject.formula=""; 
      for(let i=0 ; i<cellObject.parents.length ; i++){
          let parentName = cellObject.parents[i];
          let {rowId , colId } = getRowIdColIdFromAddress(parentName);
          let parentCellObject = db[rowId][colId];
          let newChildrensOfParent = parentCellObject.childrens.filter( function(child){
              return child != cellObject.name;
          })
          parentCellObject.childrens = newChildrensOfParent;
      }
      cellObject.parents = [];
  }

  function addFormula(formula) {
    let cellObject = getCellObject(lsc);
    cellObject.formula = formula;
    solveFormula(cellObject);
  }

  function solveFormula(cellObject) {
    let formula = cellObject.formula;
    // "( A1 + A2 )"
    // "( 10 + "
    let fComps = formula.split(" ");
    // [  "(" , "A1" , "+" , "A2" , ")"  ];
    for (let i = 0; i < fComps.length; i++) {
      let fComp = fComps[i];
      
      let cellName = fComp[0];
      if (cellName >= "A" && cellName <= "Z") {
        //A1
        let {rowId , colId } = getRowIdColIdFromAddress(fComp);
        let parentCellObject = db[rowId][colId];
        parentCellObject.childrens.push(cellObject.name);
        cellObject.parents.push(fComp);
        let value = parentCellObject.value;
        formula = formula.replace( fComp , value  );
      }
    }
    let value = eval(formula);
    cellObject.value = value;
    $(lsc).text(value);
  }
  function reCalculate(cellObject){
    let formula = cellObject.formula;
    // ( A1 + A2 )
    let fComps = formula.split(" ");
    for (let i = 0; i < fComps.length; i++) {
      let fComp = fComps[i];
      
      let cellName = fComp[0];
      if (cellName >= "A" && cellName <= "Z") {
        
        let {rowId , colId } = getRowIdColIdFromAddress(fComp);
        let parentCellObject = db[rowId][colId];
        let value = parentCellObject.value;
        formula = formula.replace( fComp , value  );
      }
    }
    // ( 10 + 20 )
    let value = eval(formula);
    cellObject.value = value;
    let {rowId , colId } = getRowIdColIdFromAddress(cellObject.name);
    $(`.cell[r-id=${rowId}][c-id=${colId}]`).text(value);
  }

  function updateChildrens(cellObject){
    let childrens = cellObject.childrens;
    for(let i=0 ; i<childrens.length ; i++){
      let childName = childrens[i];
      //B1
      let {rowId , colId} = getRowIdColIdFromAddress(childName);
      let childObject = db[rowId][colId];
      reCalculate(childObject); // formula fetch => ( A1 + A2 ) => formula evaluation => db update => ui update
      updateChildrens(childObject);
    }
  }

  function init() {
   $(".new").trigger("click");
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
