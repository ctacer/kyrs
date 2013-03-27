
function Controller( prop ){

	
	this.Initialize = function( prop ){

		this.player = prop.player;
		this.player.PrepareListen();
		this.ListenPlayer();
	}

	this.ListenPlayer = function(){

		var self = this;

		window.addEventListener('keydown',function(event){

			if ( event.keyCode >= 37 && event.keyCode <= 39 ){
				self.player.setMovement(event.keyCode);
			}
/*
			if(event.keyCode == "37"){//left
				self.player.moveLeft(true);
			}
			if(event.keyCode == "38"){//up
				self.player.moveUp(true);
			}
			if(event.keyCode == "39"){//right
				self.player.moveRight(true);				
			}
*/
		},false);

		window.addEventListener('keyup',function(event){

			if ( event.keyCode >= 37 && event.keyCode <= 39 ){
				self.player.resetMovement(event.keyCode);
			}

/*
			if(event.keyCode == "37"){//left
				self.player.moveLeft(false);
			}
			if(event.keyCode == "38"){//up
				self.player.moveUp(false);
			}
			if(event.keyCode == "39"){//right
				self.player.moveRight(false);				
			}
*/
		},false);

	}

	this.Initialize( prop );

}