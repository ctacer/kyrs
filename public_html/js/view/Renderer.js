



function Renderer ( prop ){

	this.objs = [];
	this.stage = prop.stage || null;
	this.world = prop.world;
	this.PixelToMeter = prop.pxTmtr || 50;
	this.model = prop.model;


	this.createDebuger = function(){

			var debugDraw = new b2DebugDraw();		
			console.log(this);

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

		if(!this.debug)
			func();
		else
			deb();


		function func(){
	        requestAnimFrame(func);
	        
	        if(self.stats)
	        	self.stats.update();
	                
	        //self.world.Step(1 / 60, 10, 10);	
	        self.model.Step();

	        //Model.Update();                     
	        //self.model.Update();
	  		
	        /*for (var i = 0; i < self.objs.length; i++) {
	        	self.objs[i].updateObj();
	        };*/
	        //self.stage.draw();
/*
	        if(self.debug){
	        	self.world.DrawDebugData();    
	        }

*/
	        self.world.ClearForces();
	    }

	    function deb(){
	        requestAnimFrame(deb);
	        
	        if(self.stats)
	        	self.stats.update();
	                
	        self.model.Step();
	        //self.world.Step(1 / 60, 10, 10);
	        self.world.DrawDebugData();           
	  		self.world.ClearForces();
	    }

	}
    

}