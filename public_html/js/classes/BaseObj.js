

function BaseObject(  ){}

addProperty( BaseObject.prototype, {

	getType: function(){ return 'BaseObject'; },
	updateObj : function(){},
	getBody: function( param ){
		var bodydef = new b2BodyDef();
		bodydef.type = b2Body.b2_dynamicBody;
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

        fixtureDef.shape = param.shape;

        var body = param.world.CreateBody(bodydef);
        body.CreateFixture(fixtureDef);

        return body;
	},
	attachFixture: function( param ){
		var fixtureDef = new b2FixtureDef();
        fixtureDef.density = 1;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 0.2;
        fixtureDef.shape = param.shape;

        param.body.CreateFixture(fixtureDef);
	},
	setRevoluteJoint: function(param){
		var revoluteJointDef = new b2RevoluteJointDef();
        revoluteJointDef.Initialize(param.b1,param.b2,param.anchor);
        param.world.CreateJoint(revoluteJointDef);

        return param.world.CreateJoint(revoluteJointDef);
	}

});

function newObject( name ){
	this.name = name;
	this.getName = function(){
		return this.name;
	}
}

addProperty( newObject.prototype, BaseObject.prototype );

function addProperty(obj, prop)
{
	for(var key in prop){
		if( prop.hasOwnProperty(key) )
			obj[key] = prop[key];
	}
}

function Extend(child, parent ){

	addProperty( child, parent );

}



