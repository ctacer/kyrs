

function Model( prop ){

	this.objs = [];

	this.Initialize = function( prop ){
		this.objs = prop.objs || [];
		this.world = prop.world;
	}

	this.Step = function(){
		this.world.Step(1 / 60, 10, 10);
	}

	this.Update = function(){
		for (var i = 0; i < this.objs.length; i++) {
	        this.objs[i].Update();
	    }
	}

	this.Initialize(prop);
	
}