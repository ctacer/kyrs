

function Ladder (param){

	this.phys = null;
	this.world = param.world || null;
	

	this.Initialize = function( param ){
		//Initialize Ladder

		//If the fixture never needs to collide with anything you could make it a sensor. If you need it to collide with 
		//some things but not others you could do contact->SetEnabled(false) in the PreSolve of the collision listener,
		// depending on what it collided with.

		if(!this.world)
			this.world = param.world;

		var ladderShape = new b2PolygonShape();
		ladderShape.SetAsBox( 0.25, param.height/2 );

		this.phys = this.getBody( {world:this.world, position:param.pos, shape:ladderShape, bodyProperty:{fixedRotation: true, userData: 'Ladder'} 
		/*,fixtureProperty: {isSensor:true}*/ } );


	}

}

Extend( Ladder.prototype, BaseObject.prototype );