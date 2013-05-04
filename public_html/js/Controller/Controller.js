
function Controller( prop ){

	
	this.Initialize = function( prop ){

		this.player = prop.player;
		this.player.PrepareListen();
		this.render = prop.render;
		this.STATE = "SLEEP";
		//this.ListenPlayer();
	}

	this.Update = function(){

		//console.log( this.player.GetPosition().x );
		var edge = this.render.GetEdges();
		var width = this.render.GetWidth();
		var pos = this.player.GetPosition();
		var point = this.render.GetWorldCenter();

		if( pos.x < width/2 - 100  ){
			var _pos = {
				x: (pos.x - width/2 + 100)/pos.SCALE,
				y: 0,
				SCALE: pos.SCALE 
			};
			if( (point.x + _pos.x*_pos.SCALE) - width/2 >= edge.left ){
				this.render.Translate( _pos );			
			}
		}
		if( pos.x > width/2 + 100  ){
			var _pos = {
				x: (pos.x - width/2 - 100)/pos.SCALE,
				y: 0,
				SCALE: pos.SCALE 
			};
			//console.log( this.player.bodys["wheel"].GetLinearVelocity() );
			//console.log(_pos.x*this.player.GetPosition().SCALE );
			//if(Math.floor(_pos.x *_pos.SCALE) <= 0)return;
			//if( Math.abs(this.player.bodys["wheel"].GetLinearVelocity().x ) > 1 )
			if( (point.x + _pos.x*_pos.SCALE) + width/2 <= edge.right ){
				this.render.Translate( _pos );
			}
			//}
		}
	}
	//var self = this;
	this.ListenPlayer = function(){

		var self = this;
		this.STATE = "LISTEN";

		window.addEventListener('keydown',function(event){
			_keydownhandler(event,self);
		},false);

		window.addEventListener('keyup',function(event){
			_keyuphandler(event,self);
		},false);

	}
	this.StopListenPlayer = function(){

		var self = this;
		this.STATE = "SLEEP";

		window.removeEventListener('keydown',function(event){
			_keydownhandler(event,self);
		},false);

		window.removeEventListener('keyup',function(event){
			_keyuphandler(event,self);
		},false);

	}
	this.Toogle = function(){
		if(this.STATE == "LISTEN")
			this.StopListenPlayer();
		else if(this.STATE == "SLEEP")
			this.ListenPlayer();
	}

	function _keydownhandler(event, self){
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
	}
	function _keyuphandler(event, self){
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
	}

	this.Initialize( prop );

}