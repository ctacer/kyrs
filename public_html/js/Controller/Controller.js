
function Controller( prop ){

	
	this.Initialize = function( prop ){

		this.player = prop.player;
		this.player.PrepareListen();
		this.render = prop.render;
		this.ListenPlayer();
	}

	this.Update = function(){

		//console.log( this.player.GetPosition().x );

		if(this.player.GetPosition().x >= this.render.GetWidth()/2 ){
			var _pos = {
				x: (this.player.GetPosition().x - this.render.GetWidth()/2)/this.player.GetPosition().SCALE,
				y: 0,
				SCALE: this.player.GetPosition().SCALE 
			};
			//console.log(_pos.x*this.player.GetPosition().SCALE );
			if(Math.floor(_pos.x *_pos.SCALE) <= 0)return;
			//if( Math.floor( _pos.x*this.player.GetPosition().SCALE ) > 0){
				this.render.Translate( _pos );
			//}
		}
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