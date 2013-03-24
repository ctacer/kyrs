

function ViewFactory(stage,world,PixelToMeter){
	
	var skin;

	var manifest = [
        //{src:"resources/world/runningGrant.png", id:"grant"},
        {src:"resources/world/sky.png", id:"sky"},
        {src:"resources/world/ground.png", id:"ground"},
        {src:"resources/world/parallaxHill1.png", id:"hill"},
        {src:"resources/world/parallaxHill2.png", id:"hill2"}
    ];

    var loader = new modelLoader({
    	source :manifest,
    	callback: handlLoad,
    	LOAD: true
    });
	
    var w = stage.canvas.width;
    var h = stage.canvas.height;

	function handlLoad( models ){

		var os = [];

		for (var i = 0; i < models.length; i++) {
			var item = models[i];
			var id = item.id;
	        var result = loader.getResult(id);

	        if (item.type == createjs.LoadQueue.IMAGE) {
                var bmp = new createjs.Bitmap(result);
            }

            switch (id) {
                case "sky":
                    sky = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,w,h));
                    break;
                case "ground":
                    ground = new createjs.Shape();
                    var g = ground.graphics;
                    g.beginBitmapFill(result);
                    g.drawRect(0, 0, w+330, 79);
                    ground.y = h-79;
                    var groundPhys = new PGObject({
                    	world:world,
                    	SCALE:PixelToMeter,
                    	type_:"static"
                    });
                    groundPhys.Set( {
                    	skin: ground,
                    	type:"polygon",
                    	width:(w+330)/PixelToMeter,
                    	height:(79)/PixelToMeter,
                    	pos:{x: 0,y: (h-79)/PixelToMeter}
                    } );
                    os.push(groundPhys);
				    
                    break;
                case "hill":
                    hill = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,282,59));
                    hill.x = Math.random() * w;
                    hill.scaleX = hill.scaleY = 3;
                    hill.y = h - 59 - 79;
                    break;
                case "hill2":
                    hill2 = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,212,50));
                    hill2.x = Math.random() * w;
                    hill2.scaleX = hill2.scaleY = 3;
                    hill2.y = h - 79 - 125;
                    break;
            }
		}

		//stage.addChild(sky, ground, hill, hill2, grant);
		//render()

		window.Model = new Model({
	        objs: os,
	        world:world        
	    });

		window.Render = new Renderer({
	        world: world,
	        stage:stage ,
	        SCALE: PixelToMeter ,
	        model: Model}     
	    });

	    Render.setStatElement(document.getElementById( 'viewport' ));

	    Render.createDebuger();

	    Render.render();

	}

}