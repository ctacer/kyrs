

function Model( prop ){

	this.objs = [];

	this.AddModel = function( obj ){
		this.objs = this.objs.concat(obj);
	}

	this.AddModelToBegin = function( obj ){
		if( obj.constructor.toString().match( /\bArray\b/) == null){
			this.objs.splice(0,0,obj);
		}
	}

	this.GetWorld = function(){
		return this.world;
	}

	/*this.GetScale = function(){
		return this.SCALE;
	}
	*/
	this.Initialize = function( prop ){
		this.objs = prop.objs || [];
		this.inWorldHeight = 12;// meters 
		this.inWorldWidth = 15;// meters
		this.world = new b2World(
	        new b2Vec2(prop.gravity.x, prop.gravity.y)    //gravity
	        //,  true                 //allow sleep
	    );
	    //this.SCALE = prop.SCALE;

	}

	this.Step = function(){
		this.world.Step(1 / 60, 10, 10);
	}

	this.Update = function(){
		for (var i = 0; i < this.objs.length; i++) {
	        this.objs[i].Update();
	    }
	}

	this.Translate = function( pos ){
		for (var i = 0; i < this.objs.length; i++) {
	        this.objs[i].Translate(pos);
	    }
	}

	this.HandleResize = function( param ){
		for (var i = 0; i < this.objs.length; i++) {
			this.objs[i].HandleResize( param );
		};
	}

	this.Initialize(prop);
	
}