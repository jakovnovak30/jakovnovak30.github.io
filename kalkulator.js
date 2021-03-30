var izraz = "";

function init(){
  document.getElementById("izraz").innerHTML = "Ovdje upisite racunske operacije";
}

function dodaj(x){
  izraz = izraz.concat(x);
  document.getElementById("izraz").innerHTML = izraz;
}

function resi(){
  var prvi, drugi;
  var operacija;

  var i;
  for(i=0;i<izraz.length;i++){
    if(izraz.charAt(i) == '+' || izraz.charAt(i) == '-' || izraz.charAt(i) == '*' || izraz.charAt(i) == '/'){
        prvi = izraz.substr(0, i);
        drugi = izraz.substr(i+1, izraz.length);
        operacija = izraz.charAt(i);

        var testni = "prvi: " + prvi + " drugi: " + drugi + " operacija: " + operacija;

        break;
    }
  }

  var resenje = "";

  switch(operacija){
    case "+":
      resenje = String(parseFloat(prvi) + parseFloat(drugi));
      break;
    case "-":
      resenje = String(parseFloat(prvi) - parseFloat(drugi));
      break;
    case "*":
      resenje = String(parseFloat(prvi) * parseFloat(drugi));
      break;
    case "/":
      resenje = String(parseFloat(prvi) / parseFloat(drugi));
      break;
  }

  if(resenje.length == 0 || resenje == ""){
    document.getElementById("izraz").innerHTML = "Math Error";
    return;
  }
  izraz = resenje;
  document.getElementById("izraz").innerHTML = izraz;

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
    default:
      break;
  }
  switch(event.code){
    case "Backspace":
      klir();
      break;
    case "Enter":
      resi();
      break;
    default:
      return;
  }
    return;
}, true);
