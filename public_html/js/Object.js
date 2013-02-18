


function DynamicObject(world,pxTmtr){


	this.world = world;
	this.phys = [];
	this.parts = [];
	this.PixelToMeter = pxTmtr || 50;
	
	this.setPhysic = function(b2shape,pos){

		var bodydef = new b2BodyDef();
		bodydef.type = b2Body.b2_dynamicBody;
	    bodydef.position.Set(pos.x/this.PixelToMeter, pos.y/this.PixelToMeter);

	    var fixtureDef = new b2FixtureDef();
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;

        if(b2shape.GetType() == 0){//circle
        	b2shape.SetRadius(b2shape.GetRadius()/this.PixelToMeter);
        }
        if(b2shape.GetType() == 1){//polygon
        	var ar = b2shape.GetVertices();	
        	//var arr = [];		
			for (var i = 0; i < ar.length; i++) {
				ar[i].x/=this.PixelToMeter;
				ar[i].y/=this.PixelToMeter;
			}
			b2shape.SetAsArray(ar);
        }

        fixtureDef.shape = b2shape;

	    var body = this.world.CreateBody(bodydef);
	    body.CreateFixture(fixtureDef);
	    
	    
	    this.phys.push(body);	

	    //this.setGraphic(this.phys.length - 1);
	}
/*
	this.addPhysic = function(){

	}
*/
	
	this.bindStage = function(stage){
		this.layer = new Kinetic.Layer();
		this.stage = stage;
		this.stage.add(this.layer);

		this.bindGraphic();
	}

	this.bindGraphic = function(){

		for (var i = 0; i < this.phys.length; i++) {
			this.setGraphic(i);			
		};

	}

	this.setGraphic = function(i){

		if(!this.phys[i]){
			console.log('Failed to set Graphic:Physic object not correct.');
			console.log('\tClass DynamicObject.\tmethod:setGraphic().');
			return;
		}

		
		var shape;

		if(this.phys[i].GetFixtureList().GetShape().GetType() == 0){
			shape = new Kinetic.Circle({
				x: this.phys[i].GetPosition().x*this.PixelToMeter,
				y: this.phys[i].GetPosition().y*this.PixelToMeter,
				radius: this.phys[i].GetFixtureList().GetShape().GetRadius()*this.PixelToMeter,
				fill: 'red',
		        stroke: 'black',
		        strokeWidth: 1
			});
		}
		if(this.phys[i].GetFixtureList().GetShape().GetType() == 1){
			var ar = this.phys[i].GetFixtureList().GetShape().GetVertices();
			var arr = [];
			for (var i = 0; i < ar.length; i++) {
				arr.push(ar[i].x*this.PixelToMeter);
				arr.push(ar[i].y*this.PixelToMeter);
			};
			shape = new Kinetic.Polygon({
				points: arr,
				fill: 'blue',
		        stroke: 'black',
		        strokeWidth: 1
			});
		}

		
		this.parts.push(shape);


		this.layer.add(shape);
		
	}

	this.updateObj = function (){
		
		for (var i = 0; i < this.parts.length; i++) {			
			var pos = this.phys[i].GetPosition();
			this.parts[i].setPosition( pos.x*this.PixelToMeter, pos.y*this.PixelToMeter );
            this.parts[i].setRotation( this.phys[i].GetAngle()*180/Math.PI );
		};
	}

	this.drawObj = function(){
		//this.stage.draw();
	}
	
}




function StaticObject(world,pxTmtr){
	
	this.world = world;
	this.phys = [];
	this.parts = [];
	this.PixelToMeter = pxTmtr || 50;

	this.setPhysic = function(b2shape,pos){

		var bodydef = new b2BodyDef();
		bodydef.type = b2Body.b2_staticBody;
	    bodydef.position.Set(pos.x/this.PixelToMeter, pos.y/this.PixelToMeter);

	    var fixtureDef = new b2FixtureDef();
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;

        if(b2shape.GetType() == 0){//circle
        	b2shape.SetRadius(b2shape.GetRadius()/this.PixelToMeter);
        }
        if(b2shape.GetType() == 1){//polygon
        	var ar = b2shape.GetVertices();	
        	//var arr = [];		
			for (var i = 0; i < ar.length; i++) {
				ar[i].x/=this.PixelToMeter;
				ar[i].y/=this.PixelToMeter;
			}
			b2shape.SetAsArray(ar);
        }
        
        fixtureDef.shape = b2shape;

	    var body = this.world.CreateBody(bodydef);
	    body.CreateFixture(fixtureDef);
	    
	    this.phys.push(body);	

	    //this.setGraphic(this.phys.length - 1);
	}
/*
	this.addPhysic = function(){

	}
*/
	
	this.bindStage = function(stage){
		this.layer = new Kinetic.Layer();
		this.stage = stage;
		this.stage.add(this.layer);

		this.bindGraphic();
	}

	this.bindGraphic = function(){

		for (var i = 0; i < this.phys.length; i++) {
			this.setGraphic(i);			
		};

	}

	this.setGraphic = function(i){

		if(!this.phys[i]){
			console.log('Failed to set Graphic:Physic object not correct.');
			console.log('\tClass StaticObject.\tmethod:setGraphic().');
			return;
		}

		
		var shape;

		if(this.phys[i].GetFixtureList().GetShape().GetType() == 0){
			shape = new Kinetic.Circle({
				x: this.phys[i].GetPosition().x*this.PixelToMeter,
				y: this.phys[i].GetPosition().y*this.PixelToMeter,
				radius: this.phys[i].GetFixtureList().GetShape().GetRadius()*this.PixelToMeter,
				fill: 'red',
		        stroke: 'black',
		        strokeWidth: 1
			});
		}
		if(this.phys[i].GetFixtureList().GetShape().GetType() == 1){
			var ar = this.phys[i].GetFixtureList().GetShape().GetVertices();
			var arr = [];
			for (var i = 0; i < ar.length; i++) {
				arr.push(ar[i].x*this.PixelToMeter);
				arr.push(ar[i].y*this.PixelToMeter);
			};
			//console.log(arr);
			shape = new Kinetic.Polygon({
				points: arr,
				fill: 'blue',
		        stroke: 'black',
		        strokeWidth: 1
			});
		}

		
		this.parts.push(shape);


		this.layer.add(shape);
		
	}

	this.updateObj = function (){
		
		/*for (var i = 0; i < this.parts.length; i++) {			
			var pos = this.phys[i].GetPosition();
			this.parts[i].setPosition( pos.x, pos.y );
            this.parts[i].setRotation( this.phys[i].GetAngle()*180/Math.PI );
		};*/
	}

	this.drawObj = function(){
		//this.stage.draw();
	}


}



function PGObject (world,type_ ,pxTmtr){

	if(type_.toUpperCase() == "STATIC"){
		return new StaticObject(world,pxTmtr);
	}
	if(type_.toUpperCase() == "DYNAMIC"){
		return new DynamicObject(world,pxTmtr);
	}

}


