


function DynamicObject( param ){


	this.world = param.world;
	this.bodys = [];
	this.skins = [];
	this.PixelToMeter = param.pxTmtr || 50;
	this.bodyType = param.bodyType;	//b2Body.b2_staticBody || b2Body.b2_dynamicBody
	
	this.Set = function( param ){

		var body = this.getBody( {world:this.world, position:{x:param.pos.x/this.PixelToMeter, y:param.pos.y/this.PixelToMeter },
				shape:param.shape ,bodyProperty:{type: this.bodyType, fixedRotation: true, userData:param.bodyName || 'GROUND', linearDamping: 0.4} } );
	    
	    this.bodys.push(body);
	    this.skins.push(param.skin);	
	    
	}

	this.Update = function(){
		for (var i = 0; i < this.bodys.length; i++ ) {
			
			this.skins[i].rotation = this.body.GetAngle() * (180 / Math.PI);
			this.skins[i].x = this.bodys[i].GetWorldCenter().x * this.PixelToMeter;
			this.skins[i].y = this.bodys[i].GetWorldCenter().y * this.PixelToMeter;

		};
	}
	
	
}



function PGObject (world,type_ ,pxTmtr){

	if(type_.toUpperCase() == "STATIC"){
		return new DynamicObject({
			world:world,
			pxTmtr:pxTmtr,
			bodyType:b2Body.b2_staticBody
		});
	}
	if(type_.toUpperCase() == "DYNAMIC"){
		return new DynamicObject({
			world:world,
			pxTmtr:pxTmtr,
			bodyType:b2Body.b2_dynamicBody
		});
	}

}


Extend( DynamicObject.prototype, BaseObject.prototype );