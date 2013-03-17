

//grapihc world

function defineGraphicWorld (o) {
	
/*

	var stage = new Kinetic.Stage({
		container :'container',
		width: o.width,
		height: o.height
	});
	*/

	window.Render = new Renderer({
		world: o.world,
		//stage:stage ,
		pxTmtr: o.pixelToMeter		
	});

	Render.setStatElement(document.getElementById( 'viewport' ));
/*
	for (var i = 0; i < o.os.length; i++) {
		//o.os[i].bindStage(stage);
		Render.addObject( o.os[i] );
	}
	*/
	Render.createDebuger();

	Render.render();



}