

function Actor(){
	
	this.bodys = {};
	this.skins = {};

	//{SCALE: ,title: ,body:, skin:}
	this.Initialize = function( param ){
		this.SCALE = param.SCALE;
		this.bodys[param.title] = param.body;
		this.skins[param.title] = param.skin;
	}

	this.Update = function(){
		for (var key in this.bodys) {
			
			this.skins[key].rotation = this.body.GetAngle() * (180 / Math.PI);
			this.skins[key].x = this.bodys[key].GetWorldCenter().x * this.SCALE;
			this.skins[key].y = this.bodys[key].GetWorldCenter().y * this.SCALE;

		};
		
	}


}

Extend( Actor.prototype, BaseObject.prototype );