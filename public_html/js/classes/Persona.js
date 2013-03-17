

function Persona(pxTmtr){

	this.PixelToMeter = pxTmtr || 50;
	this.phys = {};
	this.parts = [];
	
	this.Initialize = function(world,pos){

		this.world = world;


		var b1,b2,joint;
	    
	    var jointExperimentCubeShape = new b2PolygonShape();
	    jointExperimentCubeShape.SetAsBox(0.2,0.6);

	    b1 = this.getBody( {world:this.world, position:{x:pos.x/this.PixelToMeter, y:pos.y/this.PixelToMeter },
				shape:jointExperimentCubeShape ,bodyProperty:{fixedRotation : true, userData:'player', linearDamping: 0.4} } );

	    
	    this.phys['box'] = b1;

	    var jointExperimentCircleShape = new b2CircleShape();
	    jointExperimentCircleShape.SetRadius(0.2);

	    b2 = this.getBody( {world:this.world, position:{x:pos.x/this.PixelToMeter, y:pos.y/this.PixelToMeter + 0.6 },
				shape:jointExperimentCircleShape, bodyProperty:{ userData:'player', linearDamping: 0.4, angularDamping: 50} } );

	    this.phys['wheel'] = b2;
	    
	    this.setRevoluteJoint( {world:this.world, b1:b2, b2:b1, anchor:b2.GetWorldCenter()} );				
	    

	}

	

	this.moveLeft = function(){
		//console.log(this.phys['wheel']);
		var velocity = this.phys['wheel'].GetLinearVelocity();
		//console.log(velocity);
		//this.phys['wheel'].SetAngularVelocity(-300*Math.PI);
		this.phys['box'].SetLinearVelocity(new b2Vec2(-3,0));

		/*if(velocity.x >= -3.5)
		this.phys['wheel'].ApplyTorque(-Math.PI);*/

	}

	this.moveRight = function(){
		var velocity = this.phys['wheel'].GetLinearVelocity();
		//console.log(velocity);
		/*if(velocity.x <= 3.5)
		this.phys['wheel'].ApplyTorque(Math.PI);*/
		//this.phys['wheel'].SetAngularVelocity(300*Math.PI);
		this.phys['box'].SetLinearVelocity(new b2Vec2(3,0));
		//console.log(velocity);
	}

	this.moveUp = function(){
		//catch collide with ground body
				
		this.phys['wheel'].ApplyImpulse( new b2Vec2(0,-1), this.phys['wheel'].GetWorldCenter() );
		this.phys['box'].ApplyImpulse( new b2Vec2(0,-1), this.phys['box'].GetWorldCenter() );
	}

	this.bindStage = function(stage){		
		this.Draw(stage);
	}

	this.Draw = function(stage){

		

	}

	this.updateObj = function (){

		//this.phys['wheel'].SetAngularVelocity(0);
		
		/*
		for (var i = 0; i < this.parts.length; i++) {	
			
			var pos = this.phys[i].body.GetPosition();
			this.parts[i].setPosition( pos.x*this.PixelToMeter, pos.y*this.PixelToMeter );
	        this.parts[i].setRotation( this.phys[i].body.GetAngle() );					
		}*/
	}

}

Extend( Persona.prototype, BaseObject.prototype );