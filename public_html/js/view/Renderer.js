function Renderer ( param ){

	this.SetModel = function( model, bg ){
		this.model = model;
		this.backModel = bg;
		this.FillStage();
	}
	this.EdgeOfWorld = {left:0, right:1000, up:0, down:1000}
	this.EdgesOfModels = [];

	this.SetEdgesFromModel = function(){
		this.EdgesOfModels = [];
		for (var i = 0; i < this.backModel.skins.length; i++) {
			if(this.backModel.skins[i].Edge )
				this.EdgesOfModels = this.EdgesOfModels.concat(this.backModel.skins[i].Edge);
		}
	}

	this.GetModelEdges = function(){
		return this.EdgesOfModels;
	}

	this._requeryModel = function( index ){
		this.backModel._requeryFrame( index );
	}

	this.SetEdges = function( param ){
		this.EdgeOfWorld.left = param.left || this.EdgeOfWorld.left;
		this.EdgeOfWorld.right = param.right || this.EdgeOfWorld.right;
		this.EdgeOfWorld.up = param.up || this.EdgeOfWorld.up;
		this.EdgeOfWorld.down = param.down || this.EdgeOfWorld.down;
	}

	this.GetEdges = function(){
		return this.EdgeOfWorld;
	}

	this.StageCenter = {
		point: {x:0,y:0},
		Translate: function( pos_){
			this.point.x += (pos_.x*(pos_.SCALE) );
			this.point.y += (pos_.y*(pos_.SCALE) );
		},
		HandleResize: function( pos_ ){
			this.point.x *= pos_.x;
			this.point.y *= pos_.y;
		}
	}
	this.GetWorldCenter = function(){
		return this.StageCenter.point;
	}

	this.ISREADY = function(){
		return (this.model != null)?(true):(false);
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
		this.StageCenter.Translate( pos );
		this.model.Translate( pos );
		this.backModel.Translate( pos );
		this.SetEdgesFromModel();
	}

	this.Initialize = function( param ){

		this.stage = param.stage;
		this.world = param.world;
		this.model = param.model || null;
		this.backModel = param.bg || null;
		//this.backgrounds = param.bg || null;
		this.SCALE = param.SCALE || (window.innerHeight / 12 /*Model.inWorldHeight*/) || 50;

		this.stage.canvas.width = window.innerWidth ;
		this.stage.canvas.height = window.innerHeight ;
		this.StageCenter.point = {x:window.innerWidth/2, y:window.innerHeight/2};
		this.PAUSED = false;

		if(this.model && this.backModel)
			this.FillStage();

		this.ListenEvent();

	}

	this.ToogleGame = function(){
		this.PAUSED = !this.PAUSED;
	}

	this.FillStage = function(){
		
		for (var j = 0; j < this.backModel.skins.length; j++) {
			if(this.backModel.skins[j].skin_type != "auto")
				this.stage.addChild(this.backModel.skins[j]);
			//console.log( this.backModel.objs[i].skins[j] );
		};
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
			self.backModel.HandleResize( {
				w: wi,
				h: hi,
				SCALE: self.SCALE
			} );
			self.StageCenter.HandleResize({x:wi, y:hi});
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

	this.throwFrames = function( fc ){
		var self = this;
		var frameCount = fc;

		function func(){
			if(frameCount != 0)
	        	requestAnimFrame(func);

	        frameCount--;
	        if(self.PAUSED)return;
	        
	        if(self.stats)
	        	self.stats.update();
	                
	        self.world.Step(1 / 60, 10, 10);	                     
	  		
	        self.model.Update();
	        self.backModel.Update();
	        if(self.controller)
	        	self.controller.Update();
	        //self.backgrounds.Update();
	        self.stage.update();
	        //self.stage.canvas.getContext('2d').drawImage(im,100,100);
	        
	        self.world.ClearForces();
	    }
	    func();
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

	        if(!self.PAUSED){
	                
		        self.world.Step(1 / 60, 10, 10);	                     
		  		
		        //self.model.Update();
		        if(self.controller)
		        	self.controller.Update();
		    }
		    self.backModel.Update();
		    self.model.Update();
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
			        self.backModel.Update();
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


