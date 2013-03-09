

function ContactListener(){

	this.listener = new b2ContactListener(); 

	this.SetFunctions = function(){

		this.listener.BeginContact = function(contact){
			//Begin Contact

			if( !contact.GetFixtureA().GetBody().GetUserData() || !contact.GetFixtureB().GetBody().GetUserData()  )
				return;
			
			console.log( contact.GetFixtureA().GetBody().GetUserData().toUpperCase() );
			console.log( contact.GetFixtureB().GetBody().GetUserData().toUpperCase() );

			if( contact.GetFixtureA().GetBody().GetUserData().toUpperCase() == 'GROUND' || contact.GetFixtureB().GetBody().GetUserData().toUpperCase() == 'GROUND' ){
				//means some body contact other body with userData property of 'GROUND'

				console.log( 'GROUND body has been contacted' );
			}

			if( contact.GetFixtureA().GetBody().GetUserData().toUpperCase() == 'PLAYER' || contact.GetFixtureB().GetBody().GetUserData().toUpperCase() == 'PLAYER' ){
				console.log( 'PLAYER body has been contacted' );
			}
			console.log('\n');

			//SpecialButton
			if( contact.GetFixtureA().GetBody().GetUserData().toUpperCase() == 'SPECIALBUTTON' && contact.GetFixtureB().GetBody().GetUserData().toUpperCase() == 'PLAYER' ){
				throwNewGravityFeature();
			}
			if( contact.GetFixtureB().GetBody().GetUserData().toUpperCase() == 'SPECIALBUTTON' && contact.GetFixtureA().GetBody().GetUserData().toUpperCase() == 'PLAYER' ){
				throwNewGravityFeature();
			}
			

		}
		this.listener.EndContact = function(contact){
			//End Contact
			/*console.log( contact.GetFixtureA().GetBody().GetUserData() );
			console.log( contact.GetFixtureB().GetBody().GetUserData() );*/

		}
		this.listener.PostSolve = function(contact, impulse){
			//PostSolve
		}
		this.listener.PreSolve = function(contact, oldManifold){
			//PreSolve

			if( !contact.GetFixtureA().GetBody().GetUserData() || !contact.GetFixtureB().GetBody().GetUserData()  )
				return;
			
			if( contact.GetFixtureA().GetBody().GetUserData().toUpperCase() == 'LADDER' && contact.GetFixtureB().GetBody().GetUserData().toUpperCase() == 'PLAYER' ){
				//console.log(contact);
				contact.SetEnabled(false);
			}
			if( contact.GetFixtureB().GetBody().GetUserData().toUpperCase() == 'LADDER' && contact.GetFixtureA().GetBody().GetUserData().toUpperCase() == 'PLAYER' ){
				//console.log(contact);
				contact.SetEnabled(false);
			}

			


		//If the fixture never needs to collide with anything you could make it a sensor. If you need it to collide with 
		//some things but not others you could do contact->SetEnabled(false) in the PreSolve of the collision listener,
		// depending on what it collided with.

		}

	}

	this.SetUp = function(world){

		this.SetFunctions();

		world.SetContactListener( this.listener );

	}
	
}