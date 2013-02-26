

function Player(pxTmtr){
	

	
	this.phys = [];
	this.parts = [];
	this.PixelToMeter = pxTmtr || 50;
	
	this.setPhysic = function(world,pos){

		var bodydef = new b2BodyDef();
		bodydef.type = b2Body.b2_dynamicBody;

		var fixtureDef = new b2FixtureDef();
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;
        var shape;

        var p = {x:pos.x/this.PixelToMeter, y:pos.y/this.PixelToMeter};


        //define body of the body
        bodydef.position.Set(pos.x/this.PixelToMeter, pos.y/this.PixelToMeter);

        shape = new b2PolygonShape();
        shape.SetAsBox(0.3,0.3);

        fixtureDef.shape = shape;

        var body = world.CreateBody(bodydef);
        body.CreateFixture(fixtureDef);

        this.phys.push({body:body,tittle:'body', color: "#00FF00"});


        //define head body
		bodydef.position.Set( p.x, p.y - 0.55 );
	    
        shape = new b2CircleShape();
        shape.SetRadius(0.2);       

        fixtureDef.shape = shape;

	    var head = world.CreateBody(bodydef);
	    head.CreateFixture(fixtureDef);	      

	    this.phys.push({body:head,tittle:'head', color: "#FF00FF"});

	    var weldJointDef = new b2WeldJointDef();
		weldJointDef.Initialize(body, head, body.GetWorldCenter());
		 
		world.CreateJoint(weldJointDef);


        //define left leg body
        bodydef.position.Set( p.x - 0.1, p.y + 0.37 );

        shape = new b2PolygonShape();
        shape.SetAsBox(0.07,0.1);

        fixtureDef.shape = shape;

        var leftLeg = world.CreateBody(bodydef);
        leftLeg.CreateFixture(fixtureDef);

        this.phys.push({body:leftLeg,tittle:'left leg', color: "#FF00FF"});


        //define right leg body
        bodydef.position.Set( p.x + 0.05, p.y + 0.37 );

        shape = new b2PolygonShape();
        shape.SetAsBox(0.07,0.1);

        fixtureDef.shape = shape;

        var rightLeg = world.CreateBody(bodydef);
        rightLeg.CreateFixture(fixtureDef);

        this.phys.push({body:rightLeg,tittle:'right leg', color: "#00FFFF"});
        
	    	    
	}




	this.bindStage = function(stage){

		if(!this.phys[0]){
			console.log('Failed to set Graphic:Physic object not correct.');
			console.log('\tClass DynamicObject.\tmethod:setGraphic().');
			return;
		}

		var layer = new Kinetic.Layer();		
		stage.add(layer);

		
		var shape;
		

		for (var i = 0; i < this.phys.length; i++) {

			if(this.phys[i].body.GetFixtureList().GetShape().GetType() == 0){
			
				shape = new Kinetic.Circle({
					x: this.phys[i].body.GetPosition().x*this.PixelToMeter,
					y: this.phys[i].body.GetPosition().y*this.PixelToMeter,
					radius: this.phys[i].body.GetFixtureList().GetShape().GetRadius()*this.PixelToMeter,
					fill: this.phys[i].color,
			        stroke: 'black',
			        strokeWidth: 1
				});
			}			
			if(this.phys[i].body.GetFixtureList().GetShape().GetType() == 1){
				var ar=this.phys[i].body.GetFixtureList().GetShape().GetVertices();
				var arr = [];
				for (var j = 0; j < ar.length; j++) {
					arr.push(ar[j].x*this.PixelToMeter);
					arr.push(ar[j].y*this.PixelToMeter);
				};
				shape = new Kinetic.Polygon({
					points: arr,
					fill: this.phys[i].color,
			        stroke: 'black',
			        strokeWidth: 1
				});
			}
			

			layer.add(shape);
			this.parts.push(shape);
			

		}

	
		
	}

	this.updateObj = function (){
		
		
		for (var i = 0; i < this.parts.length; i++) {	
			
			var pos = this.phys[i].body.GetPosition();
			this.parts[i].setPosition( pos.x*this.PixelToMeter, pos.y*this.PixelToMeter );
	        this.parts[i].setRotation( this.phys[i].body.GetAngle() );					
		}
	}

	

}
