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
          childrens :[],
          cellFormatting:{ bold:false , underline:false , italic:false },
          cellAlignment : "center",
          fontSize : "16px",
          textColor : "black",
          background : "white"
        };
        row.push(cellObject);
        // i => j =>
        $(allColsInARow[j]).html("");
        $(allColsInARow[j]).css("font-weight" , "normal");
        $(allColsInARow[j]).css("font-style" , "normal");
        $(allColsInARow[j]).css("text-decoration" ,"none");
        $(allColsInARow[j]).css("text-align" , "center");
        $(allColsInARow[j]).css("font-size" , "16px");
        $(allColsInARow[j]).css("color" , "black");
        $(allColsInARow[j]).css("background" , "white");
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
        $(allCellsInARow[j]).css("font-weight" , db[i][j].cellFormatting.bold ? "bold" : "normal");
        $(allCellsInARow[j]).css("font-style" , db[i][j].cellFormatting.italic ? "italic" : "normal");
        $(allCellsInARow[j]).css("text-decoration" , db[i][j].cellFormatting.underline ? "underline" : "none");
        $(allCellsInARow[j]).css("text-align" , `${db[i][j].cellAlignment}`);
        $(allCellsInARow[j]).css("font-size" , `${db[i][j].font-size}`);
        $(allCellsInARow[j]).css("color" , `${db[i][j].textColor}`);
        $(allCellsInARow[j]).css("background" , `${db[i][j].background}`);
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



  // text color // background color
  $("#cell-text").on("change" , function(){
    
    let color = $(this).val();
    $(lsc).css("color" , `${color}`);
    let cellObject = getCellObject(lsc);
    cellObject.textColor = color;
  })
  $("#cell-background").on("change" , function(){
    let color = $(this).val();
    $(lsc).css("background" , `${color}`);
    let cellObject = getCellObject(lsc);
    cellObject.background = color;
  })
  // bold // underline // italic
  $(".bold").on("click" , function(){
    let cellObject = getCellObject(lsc);
    $(lsc).css("font-weight" , cellObject.cellFormatting.bold ?  "normal"  : "bold" );
    cellObject.cellFormatting.bold = !cellObject.cellFormatting.bold;
  })

  $(".underline").on("click" , function(){
    let cellObject = getCellObject(lsc);
    $(lsc).css("text-decoration" , cellObject.cellFormatting.underline ?  "none"  : "underline" );
    cellObject.cellFormatting.underline = !cellObject.cellFormatting.underline;
  })

  $(".italic").on("click" , function(){
    let cellObject = getCellObject(lsc);
    $(lsc).css("font-style" , cellObject.cellFormatting.italic ?  "normal"  : "italic" );
    cellObject.cellFormatting.italic = !cellObject.cellFormatting.italic;
  })

  //left/center/right
  $(".cell-alignment div").on("click" , function(){
    let alignment = $(this).attr("class");
    // center , left , right
    $(lsc).css("text-align" , `${alignment}`);
    let cellObject = getCellObject(lsc);
    cellObject.cellAlignment = alignment;
  })

  // font size
  $("#font-slider").on("change" , function(){
    let value = $(this).val();
    $(lsc).css("font-size" , `${value}px`);
    let cellObject = getCellObject(lsc);
    cellObject.fontSize = `${value}px`;
  })
  // file // home 
  $("#file").on("click" , function(){
    $("#home").removeClass("menu-active");
    $(".home-menu-options").removeClass("menu-options-active");
    $(this).addClass("menu-active");
    $(".file-menu-options").addClass("menu-options-active");
  })

  $("#home").on("click" , function(){
    $("#file").removeClass("menu-active");
    $(".file-menu-options").removeClass("menu-options-active");
    $(this).addClass("menu-active");
    $(".home-menu-options").addClass("menu-options-active");
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
    let value = $(this).text();
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
    // if( !Number($(lsc).text())){
    //   alert("Cell Value is a string , Can't add formula");
    //   return;
    // }
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
    
    function setHeight(this){
      let height = $(this).height();
      // console.log(height);
      let rowId = $(this).attr("r-id");
      let leftCol = $(".left-col-cell")[rowId];
      $(leftCol).height(height);
    }

    $(".cell").on("keyup" , function(){
      setHeight(this);
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
        let value = Number(parentCellObject.value);
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
        let value = Number(parentCellObject.value);
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
