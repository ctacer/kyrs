


//{type: ,dynamic: ,position:{x: ,y: } ,world: ,bodyProperty:{ },fixtureProperty:{ } ,shape: {} }
//type == "polygon" 		  || "circle"	
//shape == {width: ,height: } || {radius: }
function Factory( param ){

	var body,shape;

	var bodydef = new b2BodyDef();
	if(param.dynamic)
		bodydef.type = b2Body.b2_dynamicBody;
	else
		bodydef.type = b2Body.b2_staticBody;
	bodydef.position.Set( param.position.x, param.position.y );

	if(param.bodyProperty){
    	addProperty(bodydef, param.bodyProperty);
    }

    //console.log(bodydef);

    var fixtureDef = new b2FixtureDef();
    fixtureDef.density = 1;
    fixtureDef.friction = 0.5;
    fixtureDef.restitution = 0.2;
    if(param.fixtureProperty){
    	addProperty(fixtureDef, param.fixtureProperty);
    }

    
	
	switch (param.type.toLowerCase()){
		case "polygon":
			//
			shape = new b2PolygonShape();
        	shape.SetAsBox( param.shape.width/2, param.height/2 );
			break;
		case "circle":
			//
			shape = new b2CircleShape();
	    	shape.SetRadius( param.shape.radius );
			break;
		
		default:
			//
			console.log("Invalid type of body\tFactory.js");
			break;

	}	

	fixtureDef.shape = shape;

    body = param.world.CreateBody(bodydef);
    body.CreateFixture(fixtureDef);

	return body;
}