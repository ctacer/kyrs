



function startRenderin(){

	// I decided that 2 meter = 100 pixels

var start =Date.now(),end =0,pox = 0, posy = 0;
console.log(APP.ball.GetPosition().y);


	function render(){
        requestAnimFrame(render);
        APP.stats.update();
                
        APP.world.Step(1 / 60, 10, 10);
        APP.world.DrawDebugData();
             
  
            var body  = APP.ball;
            var actor = APP.circle;            
            var p = body.GetPosition();
            actor.setPosition( p.x  ,p.y );	// updating actor            
            actor.setRadius(body.GetFixtureList().GetShape().GetRadius());
            actor.setRotation( body.GetAngle()*180/Math.PI );


             
            if(Math.floor(p.y) - Math.floor(posy) == 0)
            {
            	//console.log(p.y);
            	//console.log((Date.now() - start)/1000);
            }
            posy = p.y;
            //console.log(p.y);
            
            //APP.stage.draw();
        
        APP.world.ClearForces();
    }

    render();


}

function setStatElement(el){

	var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '1px';
    stats.domElement.style.top = '1px';
    stats.domElement.style.zIndex = 100;        
    el.appendChild( stats.domElement );

    APP.stats = stats;

}

function setCanvas(){

	var stage = new Kinetic.Stage({
		container :'container',
		width: 600,
		height: 600
	});

	var layer = new Kinetic.Layer();

	var circle = new Kinetic.Circle({
		x: 0,
		y: 0,
		radius: 25,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 1
	});

	layer.add(circle);

	stage.add(layer);

	APP.stage = stage;
	APP.circle = circle;
	var el = document.createElement('div');	
	el.id = "meter";
	for (var i = 0; i < 6; i++) {
		var ne = document.createElement('div');
		ne.className = "meter_one";	
		ne.style.backgroundColor = "#"+rgbToHex(i*51,i*25,i*51);
		el.appendChild(ne);
	};
	 
	document.body.appendChild(el);

}

function addListener(){


	window.addEventListener('keydown',function(e){
		console.log('key: '+String.fromCharCode(e.keyCode)+";keyCode"+e.keyCode);

		//w : || up
		if(e.keyCode == 87 || e.keyCode == 38){
			//move up
			//APP.ball.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, -150),APP.ball.GetWorldCenter());
			APP.ball.ApplyForce(new Box2D.Common.Math.b2Vec2(0, -150),APP.ball.GetWorldCenter());
			console.log('d');
		}

		//d : || right
		if(e.keyCode == 68 || e.keyCode == 39){
			//move right
			APP.ball.ApplyImpulse(new Box2D.Common.Math.b2Vec2(150, 0),APP.ball.GetWorldCenter());
		}

		//s : || down
		if(e.keyCode == 83 || e.keyCode == 40){
			//move down
			APP.ball.ApplyImpulse(new Box2D.Common.Math.b2Vec2(0, 150),APP.ball.GetWorldCenter());
		}

		//a : || left
		if(e.keyCode == 65 || e.keyCode == 37){
			//move left
			APP.ball.ApplyImpulse(new Box2D.Common.Math.b2Vec2(-150, 0),APP.ball.GetWorldCenter());
		}
	},false);


}

function rgbToHex (r, g, b)    { 
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);         

        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
         
        return (r + g + b).toUpperCase();
}
