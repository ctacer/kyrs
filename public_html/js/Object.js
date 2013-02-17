


function DynamicObject(world){


	this.world = world;
	
	this.setPhysic = function(b2shape,pos){

		var bodydef = new b2BodyDef();
		bodydef.type = b2Body.b2_dynamicBody;
	    bodydef.position.Set(pos.x, pos.y);

	    var fixtureDef = new b2FixtureDef();
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;
        fixtureDef.shape = b2shape;

	    var body = this.world.CreateBody(bodydef);
	    body.CreateFixture(fixtureDef);
	    this.phys = [];
	    this.phys.push(body);	

	    this.setGraphic(this.phys.length - 1);
	}
/*
	this.addPhysic = function(){

	}
*/
	
	this.bindStage = function(stage){
		this.layer = new Kinetic.Layer();
		this.stage = stage;
		this.stage.add(this.layer);
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
				x: this.phys[i].GetPosition().x,
				y: this.phys[i].GetPosition().y,
				radius: this.phys[i].GetFixtureList().GetShape().GetRadius(),
				fill: 'red',
		        stroke: 'black',
		        strokeWidth: 1
			});
		}
		if(this.phys[i].GetFixtureList().GetShape().GetType() == 1){
			var ar = this.phys[i].GetFixtureList().GetShape().GetVertices();
			var arr = [];
			for (var i = 0; i < ar.length; i++) {
				arr.push(ar[i].x);
				arr.push(ar[i].y);
			};
			shape = new Kinetic.Polygon({
				points: arr,
				fill: 'blue',
		        stroke: 'black',
		        strokeWidth: 1
			});
		}

		this.parts = [];
		this.parts.push(shape);


		this.layer.add(shape);
		
	}

	this.updateObj = function (){
		
		for (var i = 0; i < this.parts.length; i++) {			
			var pos = this.phys[i].GetPosition();
			this.parts[i].setPosition( pos.x, pos.y );
            this.parts[i].setRotation( this.phys[i].GetAngle()*180/Math.PI );
		};
	}

	this.drawObj = function(){
		//this.stage.draw();
	}
	
}




function StaticObject(world){
	
	this.world = world;


	this.setPhysic = function(b2shape,pos){

		var bodydef = new b2BodyDef();
		bodydef.type = b2Body.b2_staticBody;
	    bodydef.position.Set(pos.x, pos.y);

	    var fixtureDef = new b2FixtureDef();
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;
        fixtureDef.shape = b2shape;

	    var body = this.world.CreateBody(bodydef);
	    body.CreateFixture(fixtureDef);
	    this.phys = [];
	    this.phys.push(body);	

	    this.setGraphic(this.phys.length - 1);
	}
/*
	this.addPhysic = function(){

	}
*/
	
	this.bindStage = function(stage){
		this.layer = new Kinetic.Layer();
		this.stage = stage;
		this.stage.add(this.layer);
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
				x: this.phys[i].GetPosition().x,
				y: this.phys[i].GetPosition().y,
				radius: this.phys[i].GetFixtureList().GetShape().GetRadius(),
				fill: 'red',
		        stroke: 'black',
		        strokeWidth: 1
			});
		}
		if(this.phys[i].GetFixtureList().GetShape().GetType() == 1){
			var ar = this.phys[i].GetFixtureList().GetShape().GetVertices();
			var arr = [];
			for (var i = 0; i < ar.length; i++) {
				arr.push(ar[i].x);
				arr.push(ar[i].y);
			};
			shape = new Kinetic.Polygon({
				points: arr,
				fill: 'blue',
		        stroke: 'black',
		        strokeWidth: 1
			});
		}

		this.parts = [];
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



function Object (world,type_){

	if(type_.toUpperCase() == "STATIC"){
		return new StaticObject(world);
	}
	if(type_.toUpperCase() == "DYNAMIC"){
		return new DynamicObject(world);
	}

}


