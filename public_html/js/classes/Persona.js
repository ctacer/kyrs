

function Persona(pxTmtr){

	this.PixelToMeter = pxTmtr || 50;
	this.bodys = {};
	this.skins = [];
	this.STATE = "sleep";
	
	this.Initialize = function(world,pos){

		this.world = world;


		var b1,b2,joint;
	    
	    var jointExperimentCubeShape = new b2PolygonShape();
	    jointExperimentCubeShape.SetAsBox(0.2,0.6);

	    b1 = this.getBody( {world:this.world, position:{x:pos.x/this.PixelToMeter, y:pos.y/this.PixelToMeter },
				shape:jointExperimentCubeShape ,bodyProperty:{fixedRotation : true, userData:'player', linearDamping: 0.4} } );

	    
	    this.bodys['box'] = b1;	    

	    var jointExperimentCircleShape = new b2CircleShape();
	    jointExperimentCircleShape.SetRadius(0.2);

	    b2 = this.getBody( {world:this.world, position:{x:pos.x/this.PixelToMeter, y:pos.y/this.PixelToMeter + 0.6 },
				shape:jointExperimentCircleShape, bodyProperty:{ userData:'player', linearDamping: 0.4, angularDamping: 50} } );

	    this.bodys['wheel'] = b2;
	    
	    this.setRevoluteJoint( {world:this.world, b1:b2, b2:b1, anchor:b2.GetWorldCenter()} );				
	    

	}

	this.SetSkin = function(skin){
		this.skins.push(skin);
		this.Update();
	}

	

	this.moveLeft = function( state ){

		switch (state){
			case true:
				if(this.STATE != "left"){
					this.skins[0].gotoAndPlay("run");
				}
				this.STATE = "left";
				var velocity = this.bodys['wheel'].GetLinearVelocity();
				this.bodys['box'].SetLinearVelocity(new b2Vec2(-3,0));				
				break;
			case false:
				this.STATE = "stand";
				this.bodys['box'].SetLinearVelocity(new b2Vec2(0,0));
				this.skins[0].gotoAndPlay("stand");
				break;
			default:
				break;
		}

	}

	this.moveRight = function( state ){

		switch (state){
			case true:
				if(this.STATE != "right"){
					this.skins[0].gotoAndPlay("run");
				}
				this.STATE = "right";
				var velocity = this.bodys['wheel'].GetLinearVelocity();
				this.bodys['box'].SetLinearVelocity(new b2Vec2(3,0));
				break;
			case false:
				this.STATE = "stand";
				this.bodys['box'].SetLinearVelocity(new b2Vec2(0,0));
				this.skins[0].gotoAndPlay("stand");
				break;
			default:
				break;
		}

	}

	this.moveUp = function( state ){
		//catch collide with ground body

		switch (state){
			case true:
				if(this.STATE != "jump"){
					this.skins[0].gotoAndPlay("jump");
				}
				this.STATE = "jump";
				this.bodys['wheel'].ApplyImpulse( new b2Vec2(0,-1), this.bodys['wheel'].GetWorldCenter() );
				this.bodys['box'].ApplyImpulse( new b2Vec2(0,-1), this.bodys['box'].GetWorldCenter() );
				break;
			case false:
				this.STATE = "stand";
				//this.skins[0].gotoAndPlay("stand");
				break;
			default:
				break;
		}

	}

	this.HandleResize = function( param ){
		//for (var i = 0; i < this.bodys.length; i++) {
			this.bodys["box"].SetPosition( new b2Vec2(this.bodys["box"].GetPosition().x*param.w, this.bodys["box"].GetPosition().y*param.h));
		//};
	}

	this.Update = function(){
			
			this.skins[0].rotation = this.bodys["box"].GetAngle() * (180 / Math.PI);
			this.skins[0].x = this.bodys["box"].GetWorldCenter().x * this.PixelToMeter;
			this.skins[0].y = this.bodys["box"].GetWorldCenter().y * this.PixelToMeter;

	}

}

Extend( Persona.prototype, BaseObject.prototype );