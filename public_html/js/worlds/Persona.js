

function Persona(pxTmtr){

	this.PixelToMeter = pxTmtr || 50;
	this.phys = {};
	this.parts = [];
	
	this.Initialize = function(world,pos){

		var b1,b2,joint;
	    var jointExperimentDef = new b2BodyDef();
	    jointExperimentDef.type = b2Body.b2_dynamicBody;
	    jointExperimentDef.fixedRotation = true;

	    var jointExperimentFixture = new b2FixtureDef();
	    jointExperimentFixture.density = 1;
	    jointExperimentFixture.friction = 0.5;
	    jointExperimentFixture.restitution = 0.2;

	    var jointExperimentCubeShape = new b2PolygonShape();
	    jointExperimentCubeShape.SetAsBox(0.2,0.6);
	    jointExperimentDef.position.Set(pos.x/this.PixelToMeter,pos.y/this.PixelToMeter);

	    jointExperimentFixture.shape = jointExperimentCubeShape;
	    b1 = world.CreateBody(jointExperimentDef);
	    b1.CreateFixture(jointExperimentFixture);

	    this.phys['box'] = b1;

	    jointExperimentDef.type = b2Body.b2_dynamicBody;
	    jointExperimentDef.fixedRotation = false;

	    var jointExperimentCircleShape = new b2CircleShape();
	    jointExperimentCircleShape.SetRadius(0.4);
	    jointExperimentDef.position.Set(pos.x/this.PixelToMeter,pos.y/this.PixelToMeter + 0.6);

	    jointExperimentFixture.shape = jointExperimentCircleShape;
	    b2 = world.CreateBody(jointExperimentDef);
	    b2.CreateFixture(jointExperimentFixture);

	    this.phys['wheel'] = b2;


	    

	    var revoluteJointDef = new  b2RevoluteJointDef();
	    revoluteJointDef.Initialize(b2, b1, b2.GetWorldCenter());
	    
	    /* 
	    revoluteJointDef.maxMotorTorque = 1.0;
	    revoluteJointDef.enableMotor = true;

	    revoluteJointDef.maxMotorTorque = 20;
	    revoluteJointDef.motorSpeed =  -Math.PI; //1 turn per second counter-clockwise
	 	*/
	    world.CreateJoint(revoluteJointDef);

	    this.Listener();

	}

	this.Listener = function(){

		var self = this;

		window.addEventListener('keydown',function(event){

			console.log(event.keyCode + "/t" + String.fromCharCode(event.keyCode));
			if(event.keyCode == "37"){//left
				self.phys['wheel'].SetAngularVelocity(-Math.PI);
			}
			if(event.keyCode == "38"){//up
				self.phys['wheel'].ApplyImpulse( new b2Vec2(0,-1), self.phys['wheel'].GetWorldCenter() );
				self.phys['box'].ApplyImpulse( new b2Vec2(0,-1), self.phys['box'].GetWorldCenter() );
			}
			if(event.keyCode == "39"){//right
				self.phys['wheel'].ApplyTorque(Math.PI);
			}
			if(event.keyCode == "40"){//down

			}

		},false);

	}

	this.bindStage = function(stage){		
		this.Draw(stage);
	}

	this.Draw = function(stage){

		var shape;
		var layer = new Kinetic.Layer();
		stage.add(layer);

		for (var i = 0; i < this.phys.length; i++) {

			if(this.phys[i].tittle == "body"){

				shape = new Kinetic.Ellipse({
			        x: this.phys[i].body.GetPosition().x*this.PixelToMeter,
			        y: this.phys[i].body.GetPosition().y*this.PixelToMeter,
			        radius: { x: this.PixelToMeter*0.25, y: this.PixelToMeter*0.6 },
			        fill: this.phys[i].color,
			        stroke: 'black',
			        strokeWidth: 1
			    });			

			}
			if(this.phys[i].tittle == "head"){
				console.log(this.phys[i].body.GetPosition().x*this.PixelToMeter);
				shape = new Kinetic.Ellipse({
			        x: this.phys[i].body.GetPosition().x*this.PixelToMeter,
			        y: this.phys[i].body.GetPosition().y*this.PixelToMeter,
			        radius: { x: this.PixelToMeter*0.2, y: this.PixelToMeter*0.15 },
			        fill: this.phys[i].color,
			        stroke: 'black',
			        strokeWidth: 1
			    });	
			}
			if(this.phys[i].tittle == "left leg"){
				var p = {x:this.phys[i].body.GetPosition().x*this.PixelToMeter, y:this.phys[i].body.GetPosition().y*this.PixelToMeter};
				shape = new Kinetic.Polygon({
					x: this.phys[i].body.GetPosition().x*this.PixelToMeter,
			        y: this.phys[i].body.GetPosition().y*this.PixelToMeter,
				    points: [0.07*this.PixelToMeter,-0.1*this.PixelToMeter,
				    	0.07*this.PixelToMeter,0.08*this.PixelToMeter,
				    	0.1*this.PixelToMeter,0.1*this.PixelToMeter,
				    	-0.07*this.PixelToMeter,0.1*this.PixelToMeter,
				    	-0.07*this.PixelToMeter,-0.1*this.PixelToMeter],
				    fill: this.phys[i].color,
				    stroke: 'black',
				    strokeWidth: 1
				});
			    
			}
			if(this.phys[i].tittle == "right leg"){
				var p = {x:this.phys[i].body.GetPosition().x*this.PixelToMeter, y:this.phys[i].body.GetPosition().y*this.PixelToMeter};
				shape = new Kinetic.Polygon({
					x: this.phys[i].body.GetPosition().x*this.PixelToMeter,
			        y: this.phys[i].body.GetPosition().y*this.PixelToMeter,
				    points: [0.07*this.PixelToMeter,-0.1*this.PixelToMeter,
				    	0.07*this.PixelToMeter,0.08*this.PixelToMeter,
				    	0.1*this.PixelToMeter,0.1*this.PixelToMeter,
				    	-0.07*this.PixelToMeter,0.1*this.PixelToMeter,
				    	-0.07*this.PixelToMeter,-0.1*this.PixelToMeter],
				    fill: this.phys[i].color,
				    stroke: 'black',
				    strokeWidth: 1
				});	
			}
			layer.add(shape);
			this.parts.push(shape);
			
		};

	}

	this.updateObj = function (){
		
		
		for (var i = 0; i < this.parts.length; i++) {	
			
			var pos = this.phys[i].body.GetPosition();
			this.parts[i].setPosition( pos.x*this.PixelToMeter, pos.y*this.PixelToMeter );
	        this.parts[i].setRotation( this.phys[i].body.GetAngle() );					
		}
	}

}