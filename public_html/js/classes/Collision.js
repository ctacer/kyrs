

function ContactListener(){

	this.listener = new b2ContactListener(); 

	this.SetFunctions = function(){

		this.listener.BeginContact = function(contact){
			//Begin Contact
			var conA = contact.GetFixtureA().GetBody().GetUserData();
			var conB = contact.GetFixtureB().GetBody().GetUserData();

			if( !conA || !conB  )
				return;

			if( conB.name && conA.name && conA.name.toUpperCase() == 'KILLOBJ' && conB.name.toUpperCase() == 'PLAYER' ){
				//console.log("end");				
				GAME.over();
				//contact.SetEnabled(true);

			}
			if( conA.name && conB.name && conB.name.toUpperCase() == 'KILLOBJ' && conA.name.toUpperCase() == 'PLAYER' ){
				//console.log("end");
				GAME.over();
				//contact.SetEnabled(true);
			}

			if( conB.name && conA.name && conA.name.toUpperCase() == 'PIXIOBJ' && conB.name.toUpperCase() == 'PLAYER' ){
				//console.log("end");
				conA.Dispatch();
				GAME.stepScore();
				//contact.SetEnabled(true);

			}
			if( conA.name && conB.name && conB.name.toUpperCase() == 'PIXIOBJ' && conA.name.toUpperCase() == 'PLAYER' ){
				//console.log("end");
				conB.Dispatch();
				GAME.stepScore();
				//contact.SetEnabled(true);
			}

			if( conB.name && conA.name && conB.name.toUpperCase() == 'PLAYER' && conA.name.toUpperCase() == 'GROUND' ){
				//console.log("flat \'n\' land handler");
				var player = conB;
				
				player._land();
				
			}
			
			//pixiObj
			//console.log('\n');

			//SpecialButton
			if( conB.name && conA.name && conA.name.toUpperCase() == 'SPECIALBUTTON' && conB.name.toUpperCase() == 'PLAYER' ){
				throwNewGravityFeature();
			}
			if( conA.name && conB.name && conB.name.toUpperCase() == 'SPECIALBUTTON' && conA.name.toUpperCase() == 'PLAYER' ){
				throwNewGravityFeature();
			}
			

		}
		this.listener.EndContact = function(contact){
			//End Contact
			/*console.log( conA );
			console.log( conB );*/
			/*var conA = contact.GetFixtureA().GetBody().GetUserData();
			var conB = contact.GetFixtureB().GetBody().GetUserData();

			if( !conA || !conB  )
				return;
			if( conB.name && conA.name && conA.name.toUpperCase() == 'PIXIOBJ' && conB.name.toUpperCase() == 'PLAYER' ){
				//console.log("end");
				conA.Dispatch();
				GAME.stepScore();
				//contact.SetEnabled(true);

			}
			if( conA.name && conB.name && conB.name.toUpperCase() == 'PIXIOBJ' && conA.name.toUpperCase() == 'PLAYER' ){
				//console.log("end");
				conB.Dispatch();
				GAME.stepScore();
				//contact.SetEnabled(true);
			}*/

		}
		this.listener.PostSolve = function(contact, impulse){
			//PostSolve
			/*var conA = contact.GetFixtureA().GetBody().GetUserData();
			var conB = contact.GetFixtureB().GetBody().GetUserData();

			if( !conA || !conB  )
				return;
			if( conB.name && conA.name && conA.name.toUpperCase() == 'PIXIOBJ' && conB.name.toUpperCase() == 'PLAYER' ){
				//console.log(contact);
				conA.Dispatch();
				GAME.stepScore();

			}
			if( conA.name && conB.name && conB.name.toUpperCase() == 'PIXIOBJ' && conA.name.toUpperCase() == 'PLAYER' ){
				//console.log(contact);
				conB.Dispatch();
				GAME.stepScore();
			}*/
		}
		this.listener.PreSolve = function(contact, oldManifold){
			//PreSolve

			var conA = contact.GetFixtureA().GetBody().GetUserData();
			var conB = contact.GetFixtureB().GetBody().GetUserData();

			if( !conA || !conB  )
				return;
			
			if( conB.name && conA.name && conA.name.toUpperCase() == 'PIXIOBJ' && conB.name.toUpperCase() == 'PLAYER' ){
				console.log("start");
				//conA.Dispatch();
				//GAME.stepScore();
				//contact.SetEnabled(false);

			}
			if( conA.name && conB.name && conB.name.toUpperCase() == 'PIXIOBJ' && conA.name.toUpperCase() == 'PLAYER' ){
				console.log("start");
				//conB.Dispatch();
				//GAME.stepScore();
				//contact.SetEnabled(false);
			}

			if( conB.name && conA.name && conA.name.toUpperCase() == 'LADDER' && conB.name.toUpperCase() == 'PLAYER' ){
				//console.log(contact);
				contact.SetEnabled(false);
			}
			if( conA.name && conB.name && conB.name.toUpperCase() == 'LADDER' && conA.name.toUpperCase() == 'PLAYER' ){
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