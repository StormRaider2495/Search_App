$(document).ready(function(){
      init();
      eventBinding();
});

  function init(){
    document.onkeydown = function (e) {
    /// check ctrl + f key
      if (e.ctrlKey === true && e.keyCode === 70) {
        e.preventDefault();
        console.log('Ctrl + f was hit...');
        console.log(this);
        $("#search-box").css("display")=='none' ?
                            ( $("#search-box").css("display","inline-block"), $("#searchFor").focus() )
                            :
                            $("#search-box").css("display","none");
      }
    }
  }

  function eventBinding(){

    var searchStr, origStr, searchFor, replaceStr, strArr;

    origStr = $("p").text();
    searchStr = $("p").text();
    strArr = searchStr.split("");
    strArrOrig = searchStr.split("");


    $("#searchFor").on("keyup",function(event){
        // if(event.keyCode == 13){
          searchFor = $("#searchFor").val();
          if(searchFor == ""){
            render(strArrOrig);
          }
          else{
            render(strArrOrig);
            strArr = searchStr.split("");
            strMatch(searchFor,strArr);
          }
        // }
    });

  }

/* ------------This Function returns the first position of every matched string as an array-----------*/
/* ------------This Function accepts the string to be searched, the array of characters---------------*/
  function strMatch(searchFor,strArr){

    var i,j=0,origLen,matchLoc=[],pos;

    origLen = strArr.length;
    pos = 0;

    for(i=0;i<origLen;i++){
      var matchFor="";
        for(j=0; j< searchFor.length;j++){
          matchFor+= strArr[i+j]
        }
// ------------------------------- Checking if case sensitive option is checked or not ------------------------------
        if( $("#caseSensitive").prop("checked") ){
            if(matchFor=== searchFor){
                matchLoc[pos]=i;
                pos++;
            }
        }
        else {
          if(matchFor.toLowerCase() === searchFor.toLowerCase()){
              matchLoc[pos]=i;
              pos++;
          }
        }
    }//end of outer loop
    if(matchLoc.length === 0){
      console.log("Not Found");
    }
    else {
      strHighlight(searchFor,strArr,matchLoc);
    }
  }

  /* ------------This Function returns an array of all character with the searched string marked---------*/
  /* ------------This Function accepts an array with first position of every matched string-------------*/
  function strHighlight(searchFor,strArr,matchLoc){

        var i,origLen,startPos=0,endPos=0;
        origLen = searchFor.length;

        for(i in matchLoc){

            startPos = matchLoc[i];
            endPos = matchLoc[i] + origLen - 1;

            strArr[startPos] = "<mark>" + strArr[startPos];
            strArr[endPos] = strArr[endPos] + "</mark>";
        }
        render(strArr)
  }

/* ------------This Function accepts an array of all character with the searched string marked--------*/
  function render(strArr){
    var stringAppend = "";
    stringAppend = strArr.join("");
    $("p").eq(0).empty().html(stringAppend);
  }
