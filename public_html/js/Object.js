


function DynamicObject(world,pxTmtr){


	this.world = world;
	this.phys = [];
	this.parts = [];
	this.PixelToMeter = pxTmtr || 50;
	
	this.setPhysic = function(b2shape,pos){

		var bodydef = new b2BodyDef();
		bodydef.type = b2Body.b2_dynamicBody;
		if(pos)
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

	this.JointBodys = function(_type,i,j,opt){

		if(!this.phys[i] || !this.phys[j])return;

		var jointDef,joint;

		 switch (_type.toUpperCase() ){
		 	case "DISTANCE":
		 		jointDef = new b2DistanceJointDef();
		 		jointDef.Initialize(this.phys[i],this.phys[j],this.phys[i].GetWorldCenter(),this.phys[j].GetWorldCenter() );
		 		jointDef.collideConnected = true;
		 		joint = this.world.CreateJoint(jointDef);
		 		break;
		 	case "REVOLUTE":
		 		jointDef = new b2RevoluteJointDef();
		 		if(opt.grBody){
			 		jointDef.Initialize(this.phys[i],opt.grBody,this.phys[i].GetWorldCenter() );
			 		jointDef.lowerAngle = -0.3*Box2D.Common.b2Settings.b2_pi;
			 		jointDef.upperAngle = 0.3*Box2D.Common.b2Settings.b2_pi;
			 		/*
					jointDef.motorSpeed = 0.0f;
					jointDef.enableMotor = true;
			 		jointDef.enableLimit = true;
					jointDef.maxMotorTorque = 1;
					*/
			 		joint = this.world.CreateJoint(jointDef);
		 		}		 		
		 		break;
		 	case "PULLEY":
		 		jointDef = new b2PulleyJointDef();
				var groundAnchor1 = new b2Vec2(5, 0);
				var groundAnchor2 = new b2Vec2(6, 12);
				var ratio = 1;				
				jointDef.Initialize(this.phys[i],this.phys[j], groundAnchor1, groundAnchor2, this.phys[i].GetWorldCenter(),this.phys[j].GetWorldCenter(), ratio);
				/*
				jointDef.maxLength1 = 4;
				jointDef.maxLength2 = 4;
				*/
		 		joint = this.world.CreateJoint(jointDef);
		 		break;
		 	case "PRISMATIC":
		 		jointDef = new b2PrismaticJointDef();
		 		jointDef.Initialize(this.phys[i],this.phys[j],this.phys[i].GetWorldCenter(), new b2Vec2(0,1) );		 		
		 					
				jointDef.lowerTranslation = -2.5;
				jointDef.upperTranslation = 2.5;
				/*
				jointDef.enableLimit = true;
				jointDef.maxMotorForce = 1.0f;
				jointDef.motorSpeed = 0.0f;
				jointDef.enableMotor = true;
				*/
		 		joint = this.world.CreateJoint(jointDef);
		 		break;
		 	default:
		 		console.log("Invalid Joint Type!<Object.js:JointBodys():method>");
		 		break;
		 }


/*		
		try{
			jointDef = eval("new b2" + _type + "JointDef();");
		}
		catch(er){
			console.log(er);
			return;
		}

		*/



	}
	
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
				fill: '#FF0000',
		        stroke: 'black',
		        strokeWidth: 1
			});
		}
		if(this.phys[i].GetFixtureList().GetShape().GetType() == 1){
			var ar = this.phys[i].GetFixtureList().GetShape().GetVertices();
			var arr = [];
			for (var j = 0; j < ar.length; j++) {
				arr.push(ar[j].x*this.PixelToMeter);
				arr.push(ar[j].y*this.PixelToMeter);
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
            this.parts[i].setRotation( this.phys[i].GetAngle());
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
		if(pos)
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


