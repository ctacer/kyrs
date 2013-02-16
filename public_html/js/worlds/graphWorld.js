



function startRenderin(){

	// I decided that 2 meter = 100 pixels


	function render(){
        requestAnimFrame(render);
        APP.stats.update();
                
        APP.world.Step(1 / 60, 10, 10);
        //APP.world.DrawDebugData();
             
  
            var body  = APP.ball;
            var actor = APP.circle;            
            var p = body.GetPosition();
            actor.setPosition( p.x *30 ,p.y *30);	// updating actor            
            
            actor.setRotation( body.GetAngle()*180/Math.PI );
            APP.stage.draw();
        
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
		x: stage.getWidth() / 2,
		y: stage.getHeight() / 2,
		radius: 30,
		fill: 'red',
		stroke: 'black',
		strokeWidth: 4
	});

	layer.add(circle);

	stage.add(layer);

	APP.stage = stage;
	APP.circle = circle;

}