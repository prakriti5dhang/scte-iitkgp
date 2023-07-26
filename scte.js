var ctx1 = null;
var canvas1;
var pointSize=2;
var arr= [];
var quotient1,quotient2;
var tabrowindex=0;
var xyz = new Array();
var cell;
var table;
var counter=0;
var x,y;
var count1=0;
var coordinates1 = new Array();
var coordinates2 = new Array();
var classes = new Array();
var xCo = new Array();
var yCo = new Array();
var transX2,transY2;
var temp1,temp2;
var i=0;
var tabrowindex=0;    


$(document).ready(function(){
    $("#mycanvas1").click(function(e){
        getPosition1(e);
    });
});

function canvas11() {
canvas1 = document.getElementById("mycanvas1"),
ctx1 = canvas1.getContext('2d'),
transX = canvas1.width*0 , //21
transY = canvas1.height * 1; //399
ctx1.translate(transX, transY);
ctx1.fillRect(0,-transY, 1, canvas1.height); //vertical Axis
ctx1.fillRect( - transX, 0, canvas1.width, 1); //Horizantal Axis
canvas1.onmousemove = function(e) {
var pos1 = getMousePos1(canvas1, e);
//out.innerHTML = 'X:' + pos1.x + ' Y:' + pos1.y;
}
};
var coordinates = new Array();
function getPosition1(event){
var rect = canvas1.getBoundingClientRect();
x = event.clientX - rect.left- transX;
y = event.clientY - rect.top- transY;
drawCoordinates(x,y);
tabled();
}


function getMousePos1(canvas1, evt) {
var rect = canvas1.getBoundingClientRect();
return {
x: evt.clientX - (rect.left + 0.5) - transX,
y: evt.clientY - rect.top - transY
       };
}

function drawCoordinates(x,y){	
xCo.push(x);yCo.push(y);
if(counter < 100) {
var ctx1 = document.getElementById("mycanvas1").getContext("2d");
ctx1.beginPath();
ctx1.arc(x, y, pointSize, 0, Math.PI * 2, true);
ctx1.lineWidth=1;
ctx1.strokeStyle="blue";
ctx1.fillStyle="blue";
ctx1.fill();
ctx1.stroke();

    if ((x>= 0 && x <= 225) && (y >= -400 && y <= -200)){
        classes.push(1);
    } else if ((x >= 225 && x <= 450) && (y >= -400 && y <= -200)) {
        classes.push(2);
    } else if ((x >=0 && x <= 225) && (y >= -200 && y <= 0)) {
        classes.push(3);
    } else {
        //alert(isPoint1 +"   "+isPoint2);
        if(is_in_triangle(x,y,225,-200,220,0,450,0)) classes.push(3);
        if(is_in_triangle(x,y,225,-200,450,-200,450,0)) classes.push(2);
    }
    }
    //alert(classes);
temp1 = Math.abs(x);
temp2 = Math.abs(y);
quotient1 = parseFloat(temp1/ 49).toPrecision(6); // 11
quotient2 = parseFloat(temp2 / 52).toPrecision(6); // 3
var cord = quotient1+"|"+quotient2;
xyz.push(cord);
//alert("cord");
coordinates1[count1] = quotient1;
coordinates2[count1] = quotient2;
count1++;
}



function tabled() {
table = document.getElementById("mytable");

arr[0] = tabrowindex + 1;
arr[1] = quotient1;//x
arr[2] = quotient2;//y


if (table.rows.length <= 100) 
{
    var row = table.insertRow(++tabrowindex); // Row increment
    for (var q = 0; q < 3; q++) 
    {
        cell = row.insertCell(q);
        cell.innerHTML = arr[q];
        document.getElementById("tpdata").innerHTML="Added training point " + arr[0]+" at ( "+arr[1]+" , "+arr[2]+" )";
    }
}
}


function reset(){
ctx1.fillStyle = "black";
ctx1.clearRect( 0, -400, canvas1.width, canvas1.height);
ctx1.fillRect(0, - transY, 1, canvas1.height); //vertical Axis
ctx1.fillRect( - transX, 0, canvas1.width, 1); //Horizantal Axis
var rowCount = table.rows.length;
for (var j = rowCount -1; j >= 0; j--) {
table.deleteRow(j);
   }
tabrowindex = 0;
i=0;
 //console.log(xyz);
xyz=[];
classes=[];
}



function classify(){
rect1();
rect2();
rect3();
tri1();
tri2();
//alert(classes.length);
for(i=0; i<classes.length; i++) {
var tree=table.rows[i].cells;
tree[3].innerHTML = classes[i];
}
moveRight();
}


//var animate, left=0, imgObj=null, report = document.getElementById('report'), i=0;
function moveRight(){
/*imgObj.style.setProperty(" -webkit-transition", " width 2s");
imgObj.style.setProperty("transition", "width 2s"); }*/
for ( tabrowindex = 0; tabrowindex < table.rows.length; tabrowindex++) {
var rwr1 = table.rows[tabrowindex].cells;
ctx1.beginPath();
ctx1.lineWidth=1;
ctx1.arc(((parseFloat(rwr1[1].innerHTML))*49), (-(parseFloat(rwr1[2].innerHTML))*52), pointSize, 0, Math.PI * 2, true);
ctx1.strokeStyle = 'black';
ctx1.stroke();
 }
}

function rect1()
{
    ctx1.beginPath();
    ctx1.moveTo(0,-400);
    ctx1.lineTo(225,-400);
    ctx1.lineTo(225, -200);
    ctx1.lineTo(0, -200);
    ctx1.closePath();
    ctx1.lineWidth = 2;
    ctx1.stroke();
    ctx1.fillStyle='#0040ff';
    ctx1.fill();
}

function rect2()
{
    ctx1.beginPath();
    ctx1.moveTo(225,-400);
    ctx1.lineTo(450,-400);
    ctx1.lineTo(450, -200);
    ctx1.lineTo(225, -200);
    ctx1.closePath();
    ctx1.lineWidth = 2;
    //ctx1.strokeStyle = 'black';
    ctx1.stroke();
    ctx1.fillStyle='red';
    ctx1.fill();
}
function rect3()
{
    ctx1.beginPath();
    ctx1.moveTo(0,-200);
    ctx1.lineTo(225,-200);
    ctx1.lineTo(225, 0);
    ctx1.lineTo(0, 0);
    ctx1.closePath();
    ctx1.lineWidth = 2;
    ctx1.stroke();
    ctx1.fillStyle='#66ff33';
    ctx1.fill();
    
}
function tri1()
{
    ctx1.beginPath();
    ctx1.moveTo(225,-200);
    ctx1.lineTo(225, 0);
    ctx1.lineTo(450, 0);
    ctx1.closePath();
    ctx1.fillStyle='#66ff33';
    ctx1.fill();
}
function tri2()
{
    ctx1.beginPath();
    ctx1.moveTo(225,-200);
    ctx1.lineTo(450,-200);
    ctx1.lineTo(450, 0);
    ctx1.closePath();
    ctx1.fillStyle='red';
    ctx1.fill();
}



function is_in_triangle (x,y,x1,y1,x2,y2,x3,y3){

    var v0 = [x3-x1,y3-y1];
    var v1 = [x2-x1,y2-y1];
    var v2 = [x-x1,y-y1];
    
    var dot00 = (v0[0]*v0[0]) + (v0[1]*v0[1]);
    var dot01 = (v0[0]*v1[0]) + (v0[1]*v1[1]);
    var dot02 = (v0[0]*v2[0]) + (v0[1]*v2[1]);
    var dot11 = (v1[0]*v1[0]) + (v1[1]*v1[1]);
    var dot12 = (v1[0]*v2[0]) + (v1[1]*v2[1]);
    
    var invDenom = 1/ (dot00 * dot11 - dot01 * dot01);
    
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    
    if((u >= 0) && (v >= 0) && (u + v < 1)) {	
        return true;
    }
}
