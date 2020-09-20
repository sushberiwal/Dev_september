let $ = require("jquery");

// jquery is used for dom manipulation
$("document").ready(function(){
    
    console.log("jquery loaded !!!");
    
    $(".cell").on("click" , function(){
       console.log("clicked on cell");
       let rowId = Number($(this).attr("r-id"));
       let colId = Number($(this).attr("c-id"));
       let address = String.fromCharCode(65+colId) + (rowId+1);
       $(".address").val(address);
    })


})


