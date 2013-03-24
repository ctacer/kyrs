


function Animate(){

	//stats = new Stats();       
    //document.getElementById('viewport').appendChild( stats.domElement );

	var canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);

	image = new createjs.Bitmap("resources/world/ground.png");
	stage.addChild(image);

	/*
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", handleTick);
	*/
	
	window.addEventListener('resize',function(event){

		document.getElementById('canvas').width = window.innerWidth - 2;
		document.getElementById('canvas').height = window.innerHeight - 2;

	},false);

	function handleTick(event) {
	    image.x += 10;
	    stage.update();
	    stats.update();
	}

}