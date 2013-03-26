function Renderer ( param ){

	this.stage = param.stage;
	this.world = param.world;
	this.model = param.model || null;
	this.PixelToMeter = param.SCALE || 50;

	this.SetModel = function( model ){
		this.model = model;
		this.FillStage();
	}

	this.GetStage = function(){
		return this.stage;
	}

	this.Initialize = function(  ){

		this.stage.canvas.width = window.innerWidth - 2;
		this.stage.canvas.height = window.innerHeight - 2;

		if(this.model)
			this.FillStage();

		this.ListenEvent();

	}

	this.FillStage = function(){

		for (var i = 0; i < this.model.objs.length; i++) {
			for (var j = 0; j < this.model.objs[i].skins.length; j++) {
				this.stage.addChild(this.model.objs[i].skins[j]);
				//console.log( this.model.objs[i].skins[j] );
			};
		};

	}

	this.ListenEvent = function(){

		var self = this;

		window.addEventListener('resize',function(event){

			self.model.HandleResize( {
				w: ( (window.innerWidth - 2)/self.stage.canvas.width ),
				h: ( ( window.innerHeight - 2)/self.stage.canvas.height )
			} );

	        self.stage.canvas.width = window.innerWidth - 2;
	        self.stage.canvas.height = window.innerHeight - 2;

	    },false);

	}
	
	this.Initialize();

	this.createDebuger = function(){

			var debugDraw = new b2DebugDraw();		

            debugDraw.SetSprite(document.getElementById('canvas').getContext("2d"));
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
	    el.appendChild( stats.domElement );
	    this.stats = stats;

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
	                
	        self.world.Step(1 / 60, 10, 10);	                     
	  		
	        self.model.Update();
	        self.stage.update();
	        
	        self.world.ClearForces();
	    }

	    function deb(){
	        requestAnimFrame(deb);
	        
	        if(self.stats)
	        	self.stats.update();
	        
	        self.model.Update();        
	        self.world.Step(1 / 60, 10, 10);
	        self.world.DrawDebugData();           
	  		self.world.ClearForces();
	    }

	}
    

}


