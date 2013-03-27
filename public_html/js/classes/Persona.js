

function Persona(pxTmtr){

	this.PixelToMeter = pxTmtr || 50;
	this.bodys = {};
	this.skins = [];
	this.STATE = "sleep";
	this._events = {};

	this.Initialize = function(world,pos){

		this.world = world;


		var b1,b2,joint;
	    
	    var jointExperimentCubeShape = new b2PolygonShape();
	    jointExperimentCubeShape.SetAsBox(0.2,0.6);

	    b1 = this.getBody( {world:this.world, position:{x:pos.x/this.PixelToMeter, y:pos.y/this.PixelToMeter },
				shape:jointExperimentCubeShape ,bodyProperty:{fixedRotation : true, userData:'player'/*, linearDamping: 0.4*/} } );

	    
	    this.bodys['box'] = b1;	    

	    var jointExperimentCircleShape = new b2CircleShape();
	    jointExperimentCircleShape.SetRadius(0.2);

	    b2 = this.getBody( {world:this.world, position:{x:pos.x/this.PixelToMeter, y:pos.y/this.PixelToMeter + 0.6 },
				shape:jointExperimentCircleShape, bodyProperty:{ userData:'player'/*, linearDamping: 0.4*/, angularDamping: 50}/*, 
				fixtureProperty: {}*/ } );

	    this.bodys['wheel'] = b2;
	    
	    this.setRevoluteJoint( {world:this.world, b1:b2, b2:b1, anchor:b2.GetWorldCenter()} );	

	    console.log(this.bodys["wheel"]);		
	    

	}

	this.SetSkin = function(skin){
		this.skins.push(skin);
		this.Update();
	}

	this.PrepareListen = function(){

		this._events["37"] = {};
		this._events["37"].value = false;
		this._events["37"].move = moveLeft;
		this._events["37"].stop = stopLeft;

		this._events["38"] = {};
		this._events["38"].value = false;
		this._events["38"].move = moveUp;
		this._events["38"].stop = stopUp;

		this._events["39"] = {};
		this._events["39"].value = false;
		this._events["39"].move = moveRight;
		this._events["39"].stop = stopRight;

	}

	this.resetMovement = function(code){code+="";
		//console.log(code);
		this._events[code].value = false;
		this._events[code].stop(this);
	}
	this.setMovement = function(code){code+="";
		this._events[code].value = true;
		this._events[code].move(this);
	}

	this.move = function(){

		for (var key in this._events) {
			if(this._events[key].value){
				//console.log(this);
				this._events[key].move(this);
			}
		};

	}

	

	function moveLeft( self ){

		if(self.STATE != "left"){
			self.skins[0].gotoAndPlay("run");
		}
		self.STATE = "left";
		self.bodys['wheel'].SetAngularVelocity( -Math.PI*40 );

	}

	function stopLeft( self ){

		self.STATE = "stand";
		//self.bodys['wheel'].SetAngularVelocity(Math.PI*0);
		self.skins[0].gotoAndPlay("stand");

	}

	function moveRight( self ){

		if(self.STATE != "right"){
			self.skins[0].gotoAndPlay("run");
		}
		
		self.STATE = "right";				
		self.bodys['wheel'].SetAngularVelocity( Math.PI*40 );
		//self.bodys["wheel"].SetAngularDamping(50);

	}

	function stopRight( self ){

		self.STATE = "stand";
		//this.bodys['box'].SetLinearVelocity(new b2Vec2(0,0));
		//this.bodys['wheel'].SetLinearVelocity(new b2Vec2(0,0));
		//self.bodys["wheel"].SetAngularDamping(20);
		self.bodys['wheel'].SetAngularVelocity(Math.PI*0);
		self.skins[0].gotoAndPlay("stand");			

	}

	function moveUp( self ){
		//catch collide with ground body

		if(self.STATE != "jump"){
			self.skins[0].gotoAndPlay("jump");
		}
		self.STATE = "jump";
		//this.bodys['wheel'].ApplyImpulse( new b2Vec2(0,-1), this.bodys['wheel'].GetWorldCenter() );
		self.bodys['box'].ApplyImpulse( new b2Vec2(0,-1), self.bodys['box'].GetWorldCenter() );
		//self.bodys['box'].SetLinearVelocity( new b2Vec2(0,-3) );

	}

	function stopUp( self ){
		//catch collide with ground body

		self.STATE = "stand";
		//this.skins[0].gotoAndPlay("stand");
		

	}

	this.HandleResize = function( param ){
		//for (var i = 0; i < this.bodys.length; i++) {
			this.bodys["box"].SetPosition( new b2Vec2(this.bodys["box"].GetPosition().x*param.w, this.bodys["box"].GetPosition().y*param.h));
		//};
	}

	this.Update = function(){

//			this.move();
			/*if( this.i == 60 ){
				console.clear();
				console.log(Math.round(this.bodys['wheel'].GetAngularVelocity() ));
				this.i = 0;
			}
			else
				this.i++;*/

			this.move();
			this.skins[0].rotation = this.bodys["box"].GetAngle() * (180 / Math.PI);
			this.skins[0].x = this.bodys["box"].GetWorldCenter().x * this.PixelToMeter;
			this.skins[0].y = this.bodys["box"].GetWorldCenter().y * this.PixelToMeter;

	}

}

Extend( Persona.prototype, BaseObject.prototype );