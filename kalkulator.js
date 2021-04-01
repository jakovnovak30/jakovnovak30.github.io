var izraz = "";
var kju = [];

function init(){
  document.getElementById("izraz").innerHTML = "Ovdje upisite racunske operacije";
}

function dodaj(x){
  izraz = izraz.concat(x);
  document.getElementById("izraz").innerHTML = izraz;
}

function zadnji(){
  if(izraz.length > 0) izraz = izraz.substr(0, izraz.length-1);
  document.getElementById("izraz").innerHTML = izraz;

  if(izraz.length == 0) init();

  return;
}

function resi(){
  izraz = String(math.evaluate(izraz));

  if(izraz.length == 0 || izraz == ""){
    document.getElementById("izraz").innerHTML = "Math Error";
    return;
  }

  document.getElementById("izraz").innerHTML = izraz;
  return;
}

function klir(){
  //brise izraz (C)
  document.getElementById("izraz").innerHTML = "Klird!";
  izraz = "";
}


addEventListener("keydown", function (event){
  switch(event.key) {
    case "0":
      dodaj('0');
      break;
    case "1":
      dodaj('1');
      break;
    case "2":
      dodaj('2');
      break;
    case "3":
      dodaj('3');
      break;
    case "4":
      dodaj('4');
      break;
    case "5":
      dodaj('5');
      break;
    case "6":
      dodaj('6');
      break;
    case "7":
      dodaj('7');
      break;
    case "8":
      dodaj('8');
      break;
    case "9":
      dodaj('9');
      break;
    case "+":
      dodaj('+');
      break;
    case "-":
      dodaj('-');
      break;
    case "*":
      dodaj('*');
      break;
    case "/":
      dodaj('/');
      break;
    case ".":
      dodaj('.');
      break;
    case "(":
      dodaj('(');
      break;
    case ")":
      dodaj(')');
      break;
    default:
      break;
  }
  switch(event.code){
    case "Backspace":
      zadnji();
      break;
    case "Enter":
      resi();
      break;
    default:
      return;
  }
    return;
}, true);
