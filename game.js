
//Joni Vesto 2017



var block_i = [
  [0, 0],
  [-1, 0],
  [2, 0],
  [1, 0]
];

var block_o = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1]
];

var block_t = [
  [0, 0],
  [1, 0],
  [2, 0],
  [1, 1]
];

var block_s = [
  [0, 0],
  [1, 0],
  [1, 1],
  [2, 1]
];

var block_z = [
  [0, 0],
  [1, 0],
  [0, 1],
  [-1,1]
];

var block_j = [
  [0, 0],
  [0, 1],
  [2, 0],
  [1, 0]
];

var block_l = [
  [0, 0],
  [1, 0],
  [2, 0],
  [2, 1]
];


var gameOver = true;
var refleshRate = 900;
var next;
var pivotX = 4;
var pivotY = 0;
var printValue;
var score = 0;
var letter = "a";

function Start() {
    gameOver = false;
    GenerateGrid();
    NextBlock();

}

function Update(){

    if(gameOver==false){

    Print(""); 
    pivotY++;
    MakeMove(0);
    document.getElementById("score").innerHTML = "Score: " + score;

    }
}

function MakeMove(dir){

    if(pivotY<2){
        pivotX = 4;
    }

    var a1 = document.getElementById(next[0][0] + pivotX + "_" + (next[0][1] + pivotY));
    if(a1==null){Undo(dir);}
    else if(a1.innerHTML!=""){
        Freeze(dir);return;
    }
    var a2 = document.getElementById(next[1][0] + pivotX + "_" + (next[1][1] + pivotY));
    if(a2==null){Undo(dir);}
    else if(a2.innerHTML!=""){
        Freeze(dir);return;
    }

    var a3 = document.getElementById(next[2][0] + pivotX + "_" + (next[2][1] + pivotY));
    if(a3==null){Undo(dir);}
    else if(a3.innerHTML!=""){
        Freeze(dir);return;
    }
    var a4 = document.getElementById(next[3][0] + pivotX + "_" + (next[3][1] + pivotY));
    if(a4==null){Undo(dir);}
    else if(a4.innerHTML!=""){
        Freeze(dir);return;
    }
    Print(printValue);
}

function Freeze(d){

    Undo(d);
    var a1 = document.getElementById(next[0][0] + pivotX + "_" + (next[0][1] + pivotY));
    var a2 = document.getElementById(next[1][0] + pivotX + "_" + (next[1][1] + pivotY));
    var a3 = document.getElementById(next[2][0] + pivotX + "_" + (next[2][1] + pivotY));
    var a4 = document.getElementById(next[3][0] + pivotX + "_" + (next[3][1] + pivotY));

    a1.innerHTML = printValue+"&nbsp";
    a2.innerHTML = printValue+"&nbsp";
    a3.innerHTML = printValue+"&nbsp";
    a4.innerHTML = printValue+"&nbsp";

    pivotX = 4;
    pivotY = 0;

    BreakLine();
    
    NextBlock();
}

function Print(p){

    var a1 = document.getElementById(next[0][0] + pivotX + "_" + (next[0][1] + pivotY));
    if(a1!=null){
    a1.innerHTML=p;
    }

    var a2 = document.getElementById(next[1][0] + pivotX + "_" + (next[1][1] + pivotY));
    if(a2!=null){
    a2.innerHTML=p;
    }

    var a3 = document.getElementById(next[2][0] + pivotX + "_" + (next[2][1] + pivotY));
    if(a3!=null){
    a3.innerHTML=p;
    }

    var a4 = document.getElementById(next[3][0] + pivotX + "_" + (next[3][1] + pivotY));
    if(a4!=null){
    a4.innerHTML=p;    
    }
}

function BreakLine(){

    for (var i = 1; i <= 20; i++) {

        var line = 0;
        line = 0;

        for (var j = 1; j <= 10; j++) {

            if(document.getElementById(j+'_'+i).innerHTML!=""){
                line++;
            }
        }

        if (line >= 10) {
            for (var x = 1; x <= 10; x++) {

            document.getElementById(x + '_' + i).innerHTML = "";
            score++;
            }
        Collapse(i);
        }
}       

}

function Collapse(i){

    var all = document.getElementsByClassName("cell");
    
    for (var r = 10*20; r >= 0; r--) {

        if (all[r].innerHTML!="") {

            var click = all[r].id;
            var _index = 0;
            var howLong = click.length;

            for (var x = 0; x <= 4; x++) {
                if (click.charAt(x) == "_") {
                    _index = x;
                }
            }

            var y = 1;
            var x = 1;

            if (_index == 1) {
                x = parseInt(click.charAt(0));
            }
            else if (_index == 2) {
                x = parseInt(click.charAt(0) + click.charAt(1));
            }

            if (_index == 1 && howLong == 3) {
                y = parseInt(click.charAt(2));
            }
            if (_index == 1 && howLong == 4) {
                y = parseInt(click.charAt(2) + click.charAt(3));
            }
            if (_index == 2 && howLong == 4) {
                y = parseInt(click.charAt(3));
            }
            if (_index == 2 && howLong == 5) {
                y = parseInt(click.charAt(3) + click.charAt(4));
            }

            var save = document.getElementById(x + '_' + y).innerHTML;

            if (document.getElementById(x + '_' + (y + 1)) && document.getElementById(x + '_' + (y + 1)).innerHTML == "" && y<=i) {
                document.getElementById(x + '_' + y).innerHTML = "";
                document.getElementById(x + '_' + (y + 1)).innerHTML = save;
            }

        }
    }
}


function Undo(dir){
    if (dir == 0) { pivotY--; }
    if (dir == 1) { pivotX++; }
    if (dir == 2) { pivotX--; }
}

function Input(key){

    switch(key){
        case (13):
            console.log("enter key");
            Hold();
            break;
        case (119):
            console.log("w key");
            Rotate();
            Rotate();
            Rotate();
            break;
        case (115):
            console.log("s key");
            Rotate();
            break;
        case (100):
            console.log("d key");
            Print(""); 
            pivotX++;
            MakeMove(2);         
            break;
        case (97):
            console.log("a key");
            Print(""); 
            pivotX--;
            MakeMove(1); 
            break;
        
        case (32):
             console.log("space");
             Print(""); 
             pivotY++;
             MakeMove(0); 
             break;
        default:
             console.log("invalid key");
             break;
    }

}

function Rotate(){

    

    Print("");
    
    Print(printValue);
}

function GenerateGrid(){

    var canvas = document.getElementById('canvas');
    canvas.innerHTML="";

    var x = 0;
    var y = 1;


    for(var i = 0; i < 10 * 21; i++){
        
        if(x >= 10){
            y++;
            x = 0;
        }
               
        x++;
        if (y == 21) { canvas.innerHTML = canvas.innerHTML + '<div class="cell" id="' + x + '_' + y + '">x</div>'; } else {
            canvas.innerHTML = canvas.innerHTML + '<div class="cell" id="' + x + '_' + y + '"></div>';
        }
    }
    
    
    
}

function NextBlock(){

    var randomize = Math.floor((Math.random() * 7) + 1);
    var send;
    
    switch(randomize){
        case (1):
            send = block_i;
            letter = "i";
            printValue = '<div style=" height:100%; width:100%; background-color:cyan; color:rgba(0, 0, 0, 0.00);border: 3px outset cyan; box-sizing:border-box;">i</div>';
            break;
        case (2):
            send = block_j;
            letter = "j";
            printValue='<div style="height:100%;width:100%;background-color:royalblue;color:rgba(0, 0, 0, 0.00);border:3px outset royalblue;box-sizing:border-box;">j</div>';     
            break;
        case (3):
            send = block_l;
            letter = "l";
            printValue='<div style="height:100%;width:100%;background-color:orange; color: rgba(0, 0, 0, 0.00);border: 3px outset orange; box-sizing: border-box;">l</div>';    
            break;
        case (4):
            send = block_o;
            letter = "o";
            printValue='<div style="height:100%;width:100%;background-color: yellow; color:rgba(0, 0, 0, 0.00);border: 3px outset yellow; box-sizing: border-box;">o</div>';     
            break;
        case (5):
            send = block_s;
            letter = "s";
            printValue='<div style="height: 100%; width:100%; background-color: lime; color:rgba(0, 0, 0, 0.00); border: 3px outset lime; box-sizing: border-box;">s</div>';    
            break;
        case (6):
            send = block_t;
            letter = "t";
            printValue='<div style="height:100%; width:100%;background-color:magenta; color:rgba(0, 0, 0, 0.00); border:3px outset magenta;box-sizing:border-box;">t</div>';     
            break;
        case (7):
            send = block_z;
            letter = "z";
            printValue='<div style="height:100%; width:100%; background-color: red; color: rgba(0, 0, 0, 0.00); border: 3px outset red; box-sizing: border-box;">z</div>';    
            break;
        default:
             console.log("error");
            break;
    }
    next = send;
    document.getElementById("next").style.backgroundImage = "url('"+letter+".png')";
    document.getElementById("next").style.transform = "scale(0.1) rotate(-45deg)";
    document.getElementById("next").style.opacity = "0";
    setTimeout(function(){ document.getElementById("next").style.transform = "scale(1) rotate(-45deg)"; document.getElementById("next").style.opacity = "1";}, 200);
}

var inHold;
var memory;
function Hold(){
    
    
    if(inHold==null){
        inHold = next;
        Print("");
        NextBlock();
        Print(printValue);
        }
    else{
        memory = inHold;
        inHold = next;
        Print("");
        next = memory;
        Print(printValue);
    }

    document.getElementById("hold").style.backgroundImage = "url('"+letter+".png')";
    document.getElementById("hold").style.transform = "scale(0.1) rotate(-45deg)";
    document.getElementById("hold").style.opacity = "0";
    setTimeout(function(){ document.getElementById("hold").style.transform = "scale(1) rotate(-45deg)";document.getElementById("hold").style.opacity = "1"; }, 200);
}


function Border(){
    var v = document.getElementById("vertica").checked;
    var h = document.getElementById("horizon").checked;

    var c = document.getElementsByClassName("cell");

    for (var x = 0; x < c.length; x++) {
        if(v){
            c[x].style.borderBottom = "1px dashed rgba(0, 0, 255, 0.41)";
            c[x].style.borderTop = "1px dashed rgba(0, 0, 255, 0.41)";
        }else{
            c[x].style.borderBottom = "1px dashed black";
            c[x].style.borderTop = "1px dashed black";
        }

        if(h){
            c[x].style.borderLeft = "1px dashed rgba(0, 0, 255, 0.41)";
            c[x].style.borderRight = "1px dashed rgba(0, 0, 255, 0.41)";
        }else{
            c[x].style.borderLeft = "1px dashed black";
            c[x].style.borderRight = "1px dashed black";
        }
    }
 
}

$(window).keyup(function(e){if(e.which===32){Input();}});
$(document).ready(function(){window.setInterval(function(){Update();},refleshRate);Start();});





