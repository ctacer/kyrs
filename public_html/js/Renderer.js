function Renderer (world,stage,pxTmtr){

	this.objs = [];
	this.stage = stage;
	this.world = world;
	this.PixelToMeter = pxTmtr || 50;

	this.createDebuger = function(){

			var debugDraw = new b2DebugDraw();		

            debugDraw.SetSprite(document.getElementById('DebugCanvas').getContext("2d"));
            debugDraw.SetDrawScale(50.0);
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


		if(!this.debug)
			func();
		else
			deb();

		//func();


		function func(){
	        requestAnimFrame(func);
	        //console.log('sd');
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
	        //console.log('sd');
	        if(self.stats)
	        	self.stats.update();
	                
	        self.world.Step(1 / 60, 10, 10);
	        self.world.DrawDebugData();           
	  		self.world.ClearForces();
	    }

	}
    

}