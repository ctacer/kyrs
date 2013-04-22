

function Persona(param){

	this.SCALE = param.SCALE || 50;
	this._initSCALE = this.SCALE;
	this.bodys = {};
	this.skins = [];
	this.STATE = "sleep";
	this._events = {};

	this.Initialize = function(world,pos){

		this.world = world;
		this.name = "Player";


		var b1,b2,joint;
	    
	    var jointExperimentCubeShape = new b2PolygonShape();
	    jointExperimentCubeShape.SetAsBox(0.2,0.6);

	    b1 = this.getBody( {world:this.world, position:{x:pos.x/this.SCALE, y:pos.y/this.SCALE },
				shape:jointExperimentCubeShape ,bodyProperty:{fixedRotation : true, userData:this/*, linearDamping: 0.4*/} } );

	    
	    this.bodys['box'] = b1;

	    var jointExperimentCircleShape = new b2CircleShape();
	    jointExperimentCircleShape.SetRadius(0.2);

	    b2 = this.getBody( {world:this.world, position:{x:pos.x/this.SCALE, y:pos.y/this.SCALE + 0.6 },
				shape:jointExperimentCircleShape, bodyProperty:{ userData:this/*, linearDamping: 0.6, angularDamping: 50*/}, 
				fixtureProperty: {friction: 100} } );

	    this.bodys['wheel'] = b2;
	    
	    this.setRevoluteJoint( {world:this.world, b1:b2, b2:b1, anchor:b2.GetWorldCenter()} );	

	    //console.log(this.bodys["wheel"]);		
	    

	}

	this.SetSkin = function(skin){
		this.skins.push(skin);
		this.STATE = "stand";
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
				this.bodys['wheel'].SetAngularDamping(0);
				//this.bodys['wheel'].SetLinearDamping(0);
				this._events[key].move(this);
			}
		};

	}

	

	function moveLeft( self ){

		if(self.STATE == "stand"){
			self.skins[0].gotoAndPlay("run");
			self.STATE = "left";
		}
		self.bodys['wheel'].SetAngularVelocity( -Math.PI*10 );

	}

	function stopLeft( self ){

		if(self.STATE != "flat"){
			self.STATE = "stand";
			//self.bodys['wheel'].SetAngularVelocity(Math.PI*0);
			self.skins[0].gotoAndPlay("stand");
		}
		self.bodys['wheel'].SetAngularDamping(100);


	}

	function moveRight( self ){

		if(self.STATE == "stand"){
			self.skins[0].gotoAndPlay("run");			
			self.STATE = "right";				
		}
		self.bodys['wheel'].SetAngularVelocity( Math.PI*10 );
		//self.bodys["wheel"].SetAngularDamping(50);

	}

	function stopRight( self ){

		if(self.STATE != "flat"){
			self.STATE = "stand";
			self.skins[0].gotoAndPlay("stand");
		}
		//this.bodys['box'].SetLinearVelocity(new b2Vec2(0,0));
		//this.bodys['wheel'].SetLinearVelocity(new b2Vec2(0,0));
		//self.bodys["wheel"].SetAngularDamping(20);
		//self.bodys['wheel'].SetAngularVelocity(Math.PI*0);
		self.bodys['wheel'].SetAngularDamping(100);
		//self.bodys['wheel'].SetLinearDamping(100);
		//console.log(self.bodys['wheel']);
		//self.skins[0].gotoAndPlay("run");			

	}

	function moveUp( self ){
		//catch collide with ground body

		if(self.STATE != "flat"){
			self.skins[0].gotoAndPlay("flat");
			//this.bodys['wheel'].ApplyImpulse( new b2Vec2(0,-1), this.bodys['wheel'].GetWorldCenter() );
			self.bodys['box'].ApplyImpulse( new b2Vec2(0,-4.0), self.bodys['box'].GetWorldCenter() );
			//self.bodys['box'].SetLinearVelocity( new b2Vec2(0,-3) );
		}
		self.STATE = "flat";

	}

	function stopUp( self ){
		//catch collide with ground body

		//self.STATE = "stand";
		//this.skins[0].gotoAndPlay("stand");
		

	}

	this._land = function(){
		this.STATE = "stand";
		this.skins[0].gotoAndPlay("stand");
		this.bodys['wheel'].SetAngularDamping(100);
	}

	this.HandleResize = function( param ){
		//for (var i = 0; i < this.bodys.length; i++) {
			//this.bodys["box"].SetPosition( new b2Vec2(this.bodys["box"].GetPosition().x*param.w, this.bodys["box"].GetPosition().y*param.h));
			this.SCALE = param.SCALE;
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
			this.skins[0].x = this.bodys["box"].GetWorldCenter().x * this.SCALE;
			this.skins[0].y = this.bodys["box"].GetWorldCenter().y * this.SCALE;
			//console.log("\tLOOK HEAR\t");
			this.skins[0].scaleX = this.skins[0].scaleY = this.SCALE/this._initSCALE;

	}

	this.Translate = function( pos ){
		this.bodys["box"].SetPosition( new b2Vec2( this.bodys["box"].GetWorldCenter().x - pos.x, this.bodys["box"].GetWorldCenter().y - pos.y ) );
		this.bodys["wheel"].SetPosition( new b2Vec2( this.bodys["wheel"].GetWorldCenter().x - pos.x, this.bodys["wheel"].GetWorldCenter().y - pos.y ) );
	}

	this.GetPosition = function(){
		return {x:this.bodys["box"].GetWorldCenter().x * this.SCALE, y: this.bodys["box"].GetWorldCenter().y * this.SCALE,
		rotation: this.bodys["box"].GetAngle() * (180 / Math.PI), SCALE: this.SCALE };
	}


}

Extend( Persona.prototype, BaseObject.prototype );