

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
	    

	    this.Listener();

	}

	this.Listener = function(){

		var self = this;

		window.addEventListener('keydown',function(event){

			//console.log(event.keyCode + "/t" + String.fromCharCode(event.keyCode));
			if(event.keyCode == "37"){//left
				//console.log(self.phys['wheel']);
				var velocity = self.phys['wheel'].GetLinearVelocity();
				//console.log(velocity);
				//self.phys['wheel'].SetAngularVelocity(-300*Math.PI);
				self.phys['box'].SetLinearVelocity(new b2Vec2(-3,0));

				/*if(velocity.x >= -3.5)
					self.phys['wheel'].ApplyTorque(-Math.PI);*/
			}
			if(event.keyCode == "38"){//up
				//catch collide with ground body
				
				self.phys['wheel'].ApplyImpulse( new b2Vec2(0,-1), self.phys['wheel'].GetWorldCenter() );
				self.phys['box'].ApplyImpulse( new b2Vec2(0,-1), self.phys['box'].GetWorldCenter() );
			}
			if(event.keyCode == "39"){//right
				var velocity = self.phys['wheel'].GetLinearVelocity();
				//console.log(velocity);
				/*if(velocity.x <= 3.5)
					self.phys['wheel'].ApplyTorque(Math.PI);*/
				//self.phys['wheel'].SetAngularVelocity(300*Math.PI);
				self.phys['box'].SetLinearVelocity(new b2Vec2(3,0));

				//console.log(velocity);
				
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