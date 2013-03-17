
function Controller( prop ){

	
	this.Initialize = function( prop ){

		this.player = prop.player;
		this.ListenPlayer();
	}

	this.ListenPlayer = function(){

		var self = this;

		window.addEventListener('keydown',function(event){

			if(event.keyCode == "37"){//left
				self.player.moveLeft();
			}
			if(event.keyCode == "38"){//up
				self.player.moveUp();
			}
			if(event.keyCode == "39"){//right
				self.player.moveRight();				
			}

		},false);

	}

	this.Initialize( prop );

}