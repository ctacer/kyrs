

function SpecialButton(param){
	
	this.phys = null;
	this.world = param.world || null;
	

	this.Initialize = function( param ){
		//Initialize Ladder

		//If the fixture never needs to collide with anything you could make it a sensor. If you need it to collide with 
		//some things but not others you could do contact->SetEnabled(false) in the PreSolve of the collision listener,
		// depending on what it collided with.

		if(!this.world)
			this.world = param.world;

		var specBut = new b2PolygonShape();
		specBut.SetAsBox( 0.25, 0.02 );

		this.phys = this.getBody( {world:this.world, position:param.pos, shape:specBut, bodyProperty:{ type:b2Body.b2_staticBody, fixedRotation: true, userData: 'SpecialButton'} 
		/*,fixtureProperty: {isSensor:true}*/ } );


	}


}

Extend( SpecialButton.prototype, BaseObject.prototype );