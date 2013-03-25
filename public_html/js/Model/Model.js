

function Model( prop ){

	this.objs = [];

	this.AddModel = function( obj ){
		this.objs = this.objs.concat(obj);
	}

	this.GetWorld = function(){
		return this.world;
	}

	this.GetScale = function(){
		return this.SCALE;
	}

	this.Initialize = function( prop ){
		this.objs = prop.objs || [];
		this.world = new b2World(
	        new b2Vec2(prop.gravity.x, prop.gravity.y)    //gravity
	        //,  true                 //allow sleep
	    );
	    this.SCALE = prop.SCALE;

	}

	this.Step = function(){
		this.world.Step(1 / 60, 10, 10);
	}

	this.Update = function(){
		for (var i = 0; i < this.objs.length; i++) {
	        this.objs[i].Update();
	    }
	}

	this.HandleResize = function( param ){
		for (var i = 0; i < this.objs.length; i++) {
			this.objs[i].HandleResize( param );
		};
	}

	this.Initialize(prop);
	
}