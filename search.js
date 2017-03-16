$(document).ready(function(){

      eventBinding();
});

  function eventBinding(){

    var searchStr, origStr, searchFor, replaceStr, strArr;

    origStr = $("p").text();
    searchStr = origStr;
    strArr = searchStr.split("");
    strArrOrig = searchStr.split("");


    $("#searchFor").on("keyup",function(event){
        // if(event.keyCode == 13){
          searchFor = $("#searchFor").val();
          if(searchFor == ""){
            console.log("empty");
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

  function strMatch(searchFor,strArr){

    // console.log(searchFor);
    // console.log(strArr);
    var i,j=0,origLen,matchLoc=[],pos;

    origLen = strArr.length;
    pos = 0;

    for(i=0;i<origLen;i++){
      var matchFor="";
        for(j=0; j< searchFor.length;j++){
          matchFor+= strArr[i+j]
        }

        if(matchFor.toLowerCase() === searchFor.toLowerCase()){
          // console.log(i);
          matchLoc[pos]=i;
          pos++;
        }
    }
    console.log(matchLoc);
    strHighlight(searchFor,strArr,matchLoc);
  }

  function strHighlight(searchFor,strArr,matchLoc){

        var i,origLen,startPos=0,endPos=0;
        origLen = searchFor.length;

        for(i in matchLoc){

            startPos = matchLoc[i];
            endPos = matchLoc[i] + origLen - 1;

            strArr[startPos] = "<mark>" + strArr[startPos];
            strArr[endPos] = strArr[endPos] + "</mark>";
        }
        console.log(strArr);
        render(strArr)
  }

  function render(strArr){
    console.log(strArr);
    var stringAppend = "";
    $("p").each(function(){$("p").empty();});
    stringAppend = strArr.join("");
    console.log(stringAppend);
    $("p").eq(0).empty().html(stringAppend);
  }
