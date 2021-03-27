class Plejer{
  constructor(tocka1x, tocka1y, tocka2x, tocka2y){
    this.t1x = tocka1x;
    this.t1y = tocka1y;
    this.t2x = tocka2x;
    this.t2y = tocka2y;
  }
  nacrtaj(ekran){
    var sredinay = (this.t1y + this.t2y)/2;
    var ctx = ekran.context;
    ctx.fillStyle = "white";
    ctx.fillRect(this.t1x, sredinay, 10, 100);
  }
  dole(ekran){
    var y1 = this.t1y + 7;
    var y2 = this.t2y + 7;

    if(this.t2y <= 500){
      this.t1y = y1;
      this.t2y = y2;
      return;
    }
    else return;
  }

  gore(ekran){
    var y1 = this.t1y - 7;
    var y2 = this.t2y - 7;

    if(y1 >= 0){
      this.t1y = y1;
      this.t2y = y2;
      return;
    }
    else return;
  }
}

class Lopta{
  constructor(tockax, tockay){
    this.x = tockax;
    this.y = tockay;

    var smjer1 = Math.round(Math.random()*2);
    var smjer2 = Math.round(Math.random()*2);

    if(smjer1 == 0){
      this.brzinah = Math.round(Math.random()*(-6)-2);
    }
    else{
      this.brzinah = Math.round(Math.random()*6+2);
    }

    if(smjer2 == 0){
      this.brzinav = Math.round(Math.random()*(-6)+2);
    }
    else{
      this.brzinav = Math.round(Math.random()*6-2);
    }
  }
  nacrtaj(ekran){
    var ctx = ekran.context;
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, 10, 10);
  }

  update(ekran){
    var x = this.x;
    var y = this.y;

    y = y + this.brzinav;
    x = x + Math.round(this.brzinah*1.5);

    if(x < 35){
      return 2;
    }
    else if(x > 665){
      return 1;
    }

    if(y < 0 || y > 500){
      this.brzinav *= -1;
    }

    this.x = x;
    this.y = y;

    return -1;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function onStart(){
  displej.start();
  Loop();
}

var displej = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 700;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    ispis : function(str){
      this.context.font = "30px Arial";
      this.context.fillText(str, 10, 50);
    }
}

async function Loop(){
  var gotovo = false;
  var skor1 = 0;
  var skor2 = 0;

  let igrac1 = new Plejer(50,200, 50,300);
  let igrac2 = new Plejer(650,200, 650,300);
  let loptica = new Lopta(350, 250);

  addEventListener("keydown", function (event){
    switch(event.key) {
      case "ArrowDown":
        igrac2.dole(displej);
        break;
      case "ArrowUp":
        igrac2.gore(displej);
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  });

  while(!gotovo){
    displej.clear();
    igrac1.nacrtaj(displej);
    igrac2.nacrtaj(displej);
    loptica.nacrtaj(displej);

    var sredina = Math.round((igrac1.t1y+igrac1.t2y)/2);
    if(sredina + 15 < loptica.y) igrac1.dole(displej);
    else if(sredina - 15 > loptica.y) igrac1.gore(displej);

    if(igrac1.t1x + 10 >= loptica.x){
        if(igrac1.t1y <= loptica.y && igrac1.t2y >= loptica.y){
            var odsredine = Math.min(Math.abs(loptica.y - igrac1.t2y), Math.abs(loptica.y - igrac1.t1y));
            var kut = Math.atan((8+Math.abs(loptica.brzinav))/(odsredine+Math.abs(loptica.brzinah)));
            var brzina = Math.sqrt(Math.pow(loptica.brzinah, 2) + Math.pow(loptica.brzinav, 2)) * 1.3;

            loptica.brzinah = brzina*Math.cos(kut);

            loptica.brzina = brzina*Math.sin(kut);
          }
        }
    else if(igrac2.t1x <= loptica.x + 10){
        if(igrac2.t1y <= loptica.y && igrac2.t2y >= loptica.y){
            var odsredine = Math.min(Math.abs(loptica.y - igrac2.t2y), Math.abs(loptica.y - igrac2.t1y));
            var kut = Math.atan((8+Math.abs(loptica.brzinav))/(odsredine+Math.abs(loptica.brzinah)));
            var brzina = Math.sqrt(Math.pow(loptica.brzinah, 2) + Math.pow(loptica.brzinav, 2)) * 1.3;

            loptica.brzinah = -1*brzina*Math.cos(kut);

            loptica.brzinav = -1*brzina*Math.sin(kut);
          }
        }

    promjena = loptica.update(displej);

    if(promjena != -1){
      if(promjena == 1) skor1 = skor1 + 1;
      else if(promjena == 2) skor2 = skor2 + 1;

      loptica = new Lopta(350, 250);
    }

    var ispis1 = "Skor1 " + String(skor1);
    var ispis2 = "Skor2 " + String(skor2);
    document.getElementById("ispis1").innerHTML = ispis1;
    document.getElementById("ispis2").innerHTML = ispis2;

    await sleep(20);
  }
}
