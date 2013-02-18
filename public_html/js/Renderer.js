function Renderer (world,stage,pxTmtr){

	this.objs = [];
	this.stage = stage;
	this.world = world;
	this.PixelToMeter = pxTmtr || 50;

	this.createDebuger = function(){

		var debugDraw = new b2DebugDraw();

		var newCanvas = document.createElement('canvas');
		newCanvas.className = "DebugCanvas";
		newCanvas.style.width = 10*this.stage.getWidth()/this.PixelToMeter + "px";
		newCanvas.style.height = 10*this.stage.getHeight()/this.PixelToMeter + "px";
		document.body.appendChild(newCanvas);

            debugDraw.SetSprite(newCanvas.getContext("2d"));
            debugDraw.SetDrawScale(10.0);
            debugDraw.SetFillAlpha(0.5);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
            this.world.SetDebugDraw(debugDraw);

            this.world.DrawDebugData();
            this.debug = true;

	}


	this.setStatElement = function(el){
		
		var stats = new Stats();
	    stats.domElement.style.position = 'absolute';
	    stats.domElement.style.right = '1px';
	    stats.domElement.style.top = '1px';
	    stats.domElement.style.zIndex = 100;        
	    el.appendChild( stats.domElement );
	    this.stats = stats;

	}

	this.addObject = function(obj){
		this.objs.push(obj);
	}
	

	this.render = function (){

		var self = this;

		/*var start = { t: Date.now() , y:self.objs[0].parts[0].getPosition().y };
		var cur = { t: Date.now() , y:100 };*/

/*
		if(!this.debug)
			func();
		else
			deb();
*/
		func();


		function func(){
	        requestAnimFrame(func);

	        if(self.stats)
	        	self.stats.update();
	                
	        self.world.Step(1 / 60, 10, 10);	                     
	  		
	        for (var i = 0; i < self.objs.length; i++) {
	        	self.objs[i].updateObj();
	        	/*
	        	if( Math.floor((Date.now() - start.t)/1000) == 1 ){
	        		console.log(self.objs[i].parts[0].getPosition().y - start.y);
	        		console.log( '\t' + ((Date.now() - start.t)/1000) );
	        	}*/
	        };
	        self.stage.draw();

	        if(self.debug){
	        	self.world.DrawDebugData();    
	        }


	        self.world.ClearForces();
	    }

	    function deb(){
	        requestAnimFrame(deb);

	        if(self.stats)
	        	self.stats.update();
	                
	        self.world.Step(1 / 60, 10, 10);
	        self.world.DrawDebugData();           
	  		self.world.ClearForces();
	    }

	}
    

}