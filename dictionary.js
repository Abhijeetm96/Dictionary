"use strict"

function stoperror() {
  return true;
}  
window.onerror = stoperror;

addEventListener("keydown", function(event) 
   { 
    
   
   if (event.keyCode === 13)         
 { search();
   event.preventDefault();
   window.location.href="#output";
 }      
         return null;
   }
);

var url,speak;

async function search()
{ 

  var word = document.getElementById("search").value;
   var  show = document.getElementById("output");

    if(word==""||word==null)
    {
document.getElementById("errorMsg").innerText='Please enter any word';
     }
    else
     {

document.getElementById("errorMsg").innerText='';    
//fetching data
 url ="https://dictionaryapi.com/api/v3/references/learners/json/"+word
 +"?key=0b7b491c-f2c5-4e6c-8832-d30fdfb77654";

   const def = await fetch(url);

   const jsonobj = await def.json();

                           
 if(typeof(jsonobj[0])=="string")
  {
     var sugg = jsonobj[0];

     for (var i = 1; i < jsonobj.length ; i++) 
  {
     sugg = sugg + ', '+jsonobj[i];
  }
document.getElementById("partOfSpeech").innerHTML="";
show.innerHTML = 'Sorry! No results found.<br>Did you mean : <br> '+
sugg+ '  ?';

   }
  else
   {
   
  if(jsonobj[0]==undefined)
  {
      show.innerHTML = "Sorry! No results found."; return 0;
  }
   
  var partOfSpeech = jsonobj[0].fl;
  
  var defs= [];

  defs=jsonobj[0].shortdef;

  var output=""; 
  speak= word + "." + partOfSpeech+";";

 for (var i = 0; i < defs.length; i++) 
  {
    output += "<div class='define'><div class='circle'></div>" + defs[i] + ".</div>";
    speak += defs[i] + ";";
    }
         document.getElementById("partOfSpeech").innerHTML= partOfSpeech+ "<i id='sound' class='fas fa-volume-up'></i><br>";

    show.innerHTML=output;

         }
}
}


function read()
{   
   console.log= function (){ return null; } ;
    responsiveVoice.speak(speak,"UK English Female",{rate: 0.92,pitch: 0.93});
    
}

function msg()
{
    document.getElementById("errorMsg").innerText='Hit Enter to search !';
      document.getElementById("ask").style.boxShadow="0 0 10px 2px #00b8ee";
}

