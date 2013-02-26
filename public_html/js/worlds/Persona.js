

function Persona(pxTmtr){

	this.PixelToMeter = pxTmtr || 50;
	this.phys = [];
	this.parts = [];
	
	this.Initialize = function(world,pos){

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
        shape.SetAsBox( 0.3, 0.3 );

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
        bodydef.position.Set( p.x - 0.1, p.y + 0.5 );

        shape = new b2PolygonShape();
        shape.SetAsBox(0.07,0.1);

        fixtureDef.shape = shape;

        var leftLeg = world.CreateBody(bodydef);
        leftLeg.CreateFixture(fixtureDef);

        weldJointDef.Initialize(body, leftLeg, body.GetWorldCenter());		 
		world.CreateJoint(weldJointDef);

        this.phys.push({body:leftLeg,tittle:'left leg', color: "#FF00FF"});


        //define right leg body
        bodydef.position.Set( p.x + 0.05, p.y + 0.5 );

        shape = new b2PolygonShape();
        shape.SetAsBox(0.07,0.1);

        fixtureDef.shape = shape;

        var rightLeg = world.CreateBody(bodydef);
        rightLeg.CreateFixture(fixtureDef);

        weldJointDef.Initialize(body, rightLeg, body.GetWorldCenter());		 
		world.CreateJoint(weldJointDef);

        this.phys.push({body:rightLeg,tittle:'right leg', color: "#00FFFF"});

        //define stabilizer body
        bodydef.position.Set( p.x + 0.05, p.y + 0.5 );

        shape = new b2PolygonShape();
        shape.SetAsBox(0.07,0.1);

        fixtureDef.shape = shape;

        var rightLeg = world.CreateBody(bodydef);
        rightLeg.CreateFixture(fixtureDef);

        weldJointDef.Initialize(body, rightLeg, body.GetWorldCenter());		 
		world.CreateJoint(weldJointDef);

        this.phys.push({body:rightLeg,tittle:'right leg', color: "#00FFFF"});

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