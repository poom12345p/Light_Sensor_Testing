"use strict";

const GRAVITY = 0.05;
const VX = 1.25 ;


/*
Learn how to make a ship bounce around the canvas
with gravity, friction and mass.
*/

//Create a new Hexi instance, and start it.
var g = hexi(1600, 900, setup, ["images/star.png"]);

//Set the background color and scale the canvas
g.backgroundColor = 0x142a4f;
g.scaleToWindow();

//Declare variables used in more than one function
var mvalue = undefined;
var mask = undefined;
var particleStream = undefined;
var k=0;
var kf=0;
var remoteCMD = "0";
var ws = undefined;

let sendSync = false;
//If you 're not loading any files, start Hexi after
//you've decalred your global variables
g.start();

//The `setup` function to initialize your application
function setup() {



  // ======================================
  // initialize the line graph

  // =========================================
    // create the tiles 
	g.tilingSprite(
    "images/bg.png",
    g.canvas.width,
    g.canvas.height
  );
	
   
	
	mask =g.sprite(["images/lightmask.png"]);
	mask.pivotX = mask.width/2;
	mask.pivotY = mask.height/2;


	mvalue = g.text("0", "48px Futura", "white", 50, g.canvas.height-100);
	mvalue.visible=true;

  ///////////////////////////////////////////////
  //  Web Socket Connection
  ///////////////////////////////////////////////

  ws = new WebSocket("ws://localhost:8989/ws");

   ws.onopen = function()
   {
	   	ws.send("list");
		ws.send("close COM3");
   	ws.send("open COM3 115200 tinyg");
      // Web Socket is connected, send data using send()

   };
	
   ws.onmessage = function (evt) 
   { 
      var received_msg = evt.data;
      console.log("Received: " + received_msg);
      
      try {
    	  var obj = JSON.parse(received_msg);
	      if (obj.hasOwnProperty('D')) {
	      	remoteCMD = obj.D.trim();
	      	console.log ("remoteCMD = " + remoteCMD)
	      }
	  } catch (e)  {}
	  
   };

  //When the pointer is tapped, center the ship
  //over the pointer and give it a new random velocity

  
    // check reset conditions


  mask.x = (g.canvas.width/2)+150;
  mask.y = (g.canvas.height/2)+100;
  //Change the game state to `play`.
  g.state = play;

// ==============================

  particleStream = g.particleEmitter(100, //The interval, in milliseconds
  function () {
    return g.createParticles( //The `createParticles` method
    //ship.x+(ship.width/2), ship.y+ship.height, 
    (ship.width/2), ship.height,
    function () {
      return g.sprite("images/star.png");
    }, 
    ship,       //The container to add the particles to
    40,               //Number of particles
    0.1,              //Gravity
    true,             //Random spacing
    1,2);             //Min/max angle
  });




}




let go = true;

//The `play` function will run in a loop
function play() {
if(`${parseInt(remoteCMD,10)}`>80)
{
	
mask.scale.x = `${parseInt(remoteCMD,10)}`/80;
mask.scale.y = mask.scale.x
}
mvalue.content = `${parseInt(remoteCMD,10)}`;
console.log(mask.scale.x);

 

  //Add any extra optional game loop code here.
}
//# sourceMappingURL=bouncingship.js.map

