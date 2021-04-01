var blocks = [];
var kvadrat = false;

class Blok{
    constructor(color, x1, y1, x2, y2, x3, y3, x4, y4){
        this.kx = [x1, x2, x3, x4];
        this.ky = [y1, y2, y3, y4];

        this.boja = color;
    }
    spawn(okvir){
        var i;
        var j;
        var k;
        for(i=0;i<blocks.length-1;i++){
            for(j=0;j < blocks[i].kx.length;j++){
              for(k=0;k < this.kx.length;k++){
                if(this.kx[k] >= blocks[i].kx[j]-20 && this.kx[k] <= blocks[i].kx[j]+20 && this.ky[k] >= blocks[i].ky[j]-20 && this.ky[k] <= blocks[i].ky[j]+20) return false;
              }
            }
          }

        var ctx = okvir.context;
        ctx.fillStyle = this.boja;
        for(i=0;i<4;i++) ctx.fillRect(this.kx[i], this.ky[i], 20, 20);

        return true;
      }
    padni(okvir){
        var noviy = [];
        var i;
        for(i=0;i<this.ky.length;i++){
          noviy.push(this.ky[i]+10);
          if(this.ky[i] >= 680) return false;
        }
        this.ky = noviy;

        for(i=0;i<noviy.length;i++){
        }

        var j;
        var k;
        for(i=0;i<blocks.length-1;i++){
          for(j=0;j<blocks[i].kx.length;j++){
            for(k=0;k<this.kx.length;k++){
              if(blocks[i].kx[j] == this.kx[k] && blocks[i].ky[j] == this.ky[k]+20) return false;
            }
          }
        }

        okvir.clear();
        return true;
      }
    levo(okvir){
        var novix = [];
        var brojac = 0;
        var i;

        for(i=0;i<this.ky.length;i++){
          if(this.kx[i] < 20) brojac += 1;

          novix.push(this.kx[i]-20);
        }

        if(brojac >= 1) return;

        var j;
        var k;
        for(i=0;i<blocks.length-1;i++){
          for(j=0;j<blocks[i].kx.length;j++){
            for(k=0;k<novix.length;k++){
              if(blocks[i].kx[j] == novix[k] && this.ky[k]+40 >= blocks[i].ky[j]) return;
            }
          }
        }

        this.kx = novix;
      }
    desno(okvir){
        var novix = [];
        var i;

        for(i=0;i<this.kx.length;i++){
          if(this.kx[i]+20 >= 400) return;
          novix.push(this.kx[i]+20);
        }

        var j;
        var k;
        for(i=0;i<blocks.length-1;i++){
          for(j=0;j<blocks[i].kx.length;j++){
            for(k=0;k<novix.length;k++){
              if(blocks[i].kx[j] == novix[k] && this.ky[k]+40 >= blocks[i].ky[j]) return;
            }
          }
        }
        this.kx = novix;
      }
  rotiraj(okvir){
        var novix = [];
        var noviy = [];

        var prvix = this.kx[0];
        var prviy = this.ky[0];
        var i;
        var ctx = okvir.context;
        ctx.fillStyle = "black";
        for(i=0;i<this.kx.length;i++){
            ctx.fillRect(this.kx[i], this.ky[i], 20, 20);
          //  var angle = 90;
            var dx = this.kx[i] - prvix;
            var dy = this.ky[i] - prviy;
            var x = -dy + prvix;
            var y =  dx + prviy;
            if(x <= 0 || x >= 380 || y <= 0 || y >= 680) return;

            novix.push(x);
            noviy.push(y);
          }

        var j;
        var k;
        for(i=0;i<blocks.length-1;i++){
          for(j=0;j<blocks[i].kx.length;j++){
            for(k=0;k<novix.length;k++){
              if(novix[k] >= blocks[i].kx[j] && novix[k] <= blocks[i].kx[j]+40 && noviy[k] >= blocks[i].ky[j] && noviy[k] <= blocks[i].ky[j]+40) return;
              }
            }
          }

        this.kx = novix;
        this.ky = noviy;
    }
}

function nacrtaj(okvir){
  var i;
  var j;
  var ctx = okvir.context;
  //magenta, red, green, yellow, orange, darkblue, lightblue

  for(i=0;i<blocks.length;i++){
    for(j=0;j<blocks[i].kx.length;j++){
      ctx.fillStyle = blocks[i].boja;
      ctx.fillRect(blocks[i].kx[j], blocks[i].ky[j], 20, 20);
    }
  }
}


var displej = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 400;
        this.canvas.height = 700;
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomColor(){
  var colors = ["magenta", "red", "green", "yellow", "orange", "darkblue", "lightblue"];
  var color = colors[Math.round(Math.random() * 6)];
  return color;
}

function kreni(){
  displej.start();
  Loop();
}

function izbrisi(okvir, red){
  var i;
  var j;

  for(i=0;i<blocks.length-1;i++){
      var noviy = [];
      var novix = [];
      for(j=0;j<blocks[i].kx.length;j++){
        if(blocks[i].ky[j] >= red-10 && blocks[i].ky[j] < red+10);
        else{
          if(blocks[i].ky[j] < red+10){
            novix.push(blocks[i].kx[j]);
            noviy.push(blocks[i].ky[j]+20);
          }
          else{
            noviy.push(blocks[i].ky[j]);
            novix.push(blocks[i].kx[j]);
          }
        }
      }
      blocks[i].kx = novix;
      blocks[i].ky = noviy;
      //if(noviy.length == 0) delete blocks[i];
    }

    return;
  }

  function provjeri(okvir, red){
      var brojac = 0;
      var i;
      var ctx = okvir.context;
      const imageData = ctx.getImageData(0, 0, okvir.canvas.width, okvir.canvas.height);
      const data = imageData.data;


      for(i = 10; i < 400; i+=20) {
        var s = 4 * red * 400 + 4 * i;  // calculate the index in the array

        if(data[s] != 0 || data[s+1] != 0 || data[s+2] != 0){
          brojac += 1;
        }
      }

      if(brojac == 20) return true;

      return false;
    }

async function Loop(){
  var traje = true;
  var pada = false;
  var brzina = 100;
  var trenutni=0;
  var skor=0;

  addEventListener("keydown", function(event){
    switch(event.key) {
      case "ArrowDown":
        brzina = 20;
        break;
      case "ArrowUp":
        if(!kvadrat) blocks[trenutni].rotiraj(displej);
        break;
      case "ArrowLeft":
        blocks[trenutni].levo(displej);
        break;
      case "ArrowRight":
        blocks[trenutni].desno(displej);
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  }, true);

  addEventListener('keyup', function(){
      brzina = 100;
      return;
  });

  while(traje){
    if(!pada){
        var novi = Math.round(Math.random()*6);
        var color = getRandomColor();

        if(novi == 0){
          let prvi = new Blok(color, 200,100, 180,100, 220,100, 200, 80);
          traje = prvi.spawn(displej);
          blocks.push(prvi);
          kvadrat = false;
        }
        else if(novi == 1){
          let prvi = new Blok(color, 140,100, 160,100, 180,100, 200, 100);
          traje = prvi.spawn(displej);
          blocks.push(prvi);
          kvadrat = false;
        }
        else if(novi == 2){
          let prvi = new Blok(color,200,100, 200,80, 220,100, 240, 100);
          traje = prvi.spawn(displej);
          blocks.push(prvi);
          kvadrat = false;
        }
        else if(novi == 3){
          let prvi = new Blok(color, 200,100, 220,100, 240,100, 240, 80);
          traje = prvi.spawn(displej);
          blocks.push(prvi);
          kvadrat = false;
        }
        else if(novi == 4){
          let prvi = new Blok(color, 200,100, 200,80, 220,100, 220, 80);
          traje = prvi.spawn(displej);
          blocks.push(prvi);
          kvadrat = true;
        }
        else if(novi == 5){
          let prvi = new Blok(color, 180,100, 200,100, 200,80, 220, 80);
          traje = prvi.spawn(displej);
          blocks.push(prvi);
          kvadrat = false;
        }
        else if(novi == 6){
          let prvi = new Blok(color, 280,80, 300,80, 300,100, 320, 100);
          traje = prvi.spawn(displej);
          blocks.push(prvi);
          kvadrat = false;
        }
        /*
        preview sledeceg
        if next == 0:
            sledeci = blokovi.Blok(next_color, (500,400), (480,400), (520,400), (500,380))
            sledeci.spawn(displej, blocks)
        elif next == 1:
            sledeci = blokovi.Blok(next_color, (440,400), (460,400), (480,400), (500, 400))
            sledeci.spawn(displej, blocks)
        elif next == 2:
            sledeci = blokovi.Blok(next_color, (500,400), (500,380), (520,400), (540, 400))
            sledeci.spawn(displej, blocks)
        elif next == 3:
            sledeci = blokovi.Blok(next_color, (500,400), (520,400), (540,400), (540, 380))
            sledeci.spawn(displej, blocks)
        elif next == 4:
            sledeci = blokovi.Blok(next_color, (500,400), (500,380), (520,400), (520, 380))
            sledeci.spawn(displej, blocks)
        elif next == 5:
            sledeci = blokovi.Blok(next_color, (480,400), (500,400), (500,380), (520, 380))
            sledeci.spawn(displej, blocks)
        elif next == 6:
            sledeci = blokovi.Blok(next_color, (580,380), (600,380), (600,400), (620, 400))
            sledeci.spawn(displej, blocks)
        */


        var i = 80;
        while(i < 700){
          if(provjeri(displej, i)){
            skor = skor + 100;
            document.getElementById("test").innerHTML = 'Trebal bi brisati red.' + String(i) + 'Skor: ' + String(skor);
            izbrisi(displej, i);
          }
          i += 20;
        }

        pada = true;
    }

    trenutni = blocks.length-1;

    pada = blocks[trenutni].padni(displej);

    nacrtaj(displej);

    await sleep(brzina);
  }
}
