function Renderer ( param ){

	this.SetModel = function( model ){
		this.model = model;
		this.FillStage();
	}

	this.SetController = function( controller ){
		this.controller = controller;
	}

	this.SetBG = function( bg ){
		//this.backgrounds = bg;
	}

	this.GetStage = function(){
		return this.stage;
	}

	this.GetSCALE = function(){
		return this.SCALE;
	}

	this.GetWidth = function(){
		return this.stage.canvas.width;
	}
	this.GetHeight = function(){
		return this.stage.canvas.height;
	}

	this.Translate = function( pos ){
		this.model.Translate( pos );
	}

	this.Initialize = function( param ){

		this.stage = param.stage;
		this.world = param.world;
		this.model = param.model || null;
		//this.backgrounds = param.bg || null;
		this.SCALE = param.SCALE || (window.innerHeight / 12 /*Model.inWorldHeight*/) || 50;

		this.stage.canvas.width = window.innerWidth ;
		this.stage.canvas.height = window.innerHeight ;

		if(this.model)
			this.FillStage();

		this.ListenEvent();

	}

	this.FillStage = function(){

		for (var i = 0; i < this.model.objs.length; i++) {
			for (var j = 0; j < this.model.objs[i].skins.length; j++) {
				if(this.model.objs[i].skins[j].skin_type != "auto")
					this.stage.addChild(this.model.objs[i].skins[j]);
				//console.log( this.model.objs[i].skins[j] );
			};
		};

	}

	this.ListenEvent = function(){

		var self = this;

		window.addEventListener('resize',function(event){

			var wi = ( (window.innerWidth )/self.stage.canvas.width );
			var	hi = ( ( window.innerHeight )/self.stage.canvas.height );

			self.SCALE = (window.innerHeight / 12 /*Model.inWorldHeight*/) ;

			self.model.HandleResize( {
				w: wi,
				h: hi,
				SCALE: self.SCALE
			} );

	        self.stage.canvas.width = window.innerWidth ;
	        self.stage.canvas.height = window.innerHeight ;

	    },false);

	}
	
	this.Initialize( param );

	this.createDebuger = function(scale){

			var debugDraw = new b2DebugDraw();		

            debugDraw.SetSprite(document.getElementById('canvas').getContext("2d"));
            debugDraw.SetDrawScale(scale || 50.0);
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

	this.tick = function (){
		this.ticker = true;
	}

	this.SetFPS = function( fps ){
		if(this.ticker)
			createjs.Ticker.setFPS( fps );
	}


	this.render = function (){

		var self = this;
		/*var bool = false,im;

		if(!bool){
	        im = new Image();
	        im.onload = function(){
	        	self.stage.canvas.getContext('2d').drawImage(im,100,100);
	        }
	        im.src="resources/toolbox/lamp.png";
	        bool = !bool;
	    }*/

	    if(this.ticker)
	    	ticker();
	    else{

			if(!this.debug)
				func();
			else
				deb();
		}


		function func(){
	        requestAnimFrame(func);
	        
	        if(self.stats)
	        	self.stats.update();
	                
	        self.world.Step(1 / 60, 10, 10);	                     
	  		
	        self.model.Update();
	        self.controller.Update();
	        //self.backgrounds.Update();
	        self.stage.update();
	        //self.stage.canvas.getContext('2d').drawImage(im,100,100);
	        
	        self.world.ClearForces();
	    }

	    function ticker(){

		    createjs.Ticker.addEventListener("tick", handleTick);
			function handleTick(event) {
			    // Actions carried out each frame
			    if (!event.paused) {
			        if(self.stats)
			        	self.stats.update();
			                
			        self.world.Step(1 / 60, 10, 10);	                     
			  		
			        self.model.Update();
			        //self.backgrounds.Update();
			        self.stage.update();
			        //self.stage.canvas.getContext('2d').drawImage(im,100,100);
			        
			        self.world.ClearForces();	        

			    }
			}

		}

	    function deb(){
	        requestAnimFrame(deb);
	        
	        if(self.stats)
	        	self.stats.update();
	        
	        self.model.Update();
	        //self.backgrounds.Update();
	        self.world.Step(1 / 60, 10, 10);
	        self.world.DrawDebugData();           
	  		self.world.ClearForces();
	    }

	}
    

}


