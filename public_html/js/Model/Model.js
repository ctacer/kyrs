

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
	this.deleteObj = function(o){
		this.objs.splice(this.objs.indexOf(o),1);
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
	        if(this.objs[i].name.toUpperCase() != "DELETE")
	        	this.objs[i].Update();
	        else{
	        	for (var j = 0; j < this.objs[i].bodys.length; j++) {
	        		this.world.DestroyBody(this.objs[i].bodys[j]);
	        	};
	        	//var stage = this.objs[i].skins[0].getStage();
	        	for (var j = 0; j < this.objs[i].skins.length; j++) {
	        		/*stage.removeChild(*/ this.objs[i].skins[j].removeAllChildren(); //);
	        	};
	        	this.deleteObj(this.objs[i]);
	        }
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