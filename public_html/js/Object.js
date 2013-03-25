


function DynamicObject( param ){


	this.world = param.world;
	this.bodys = [];
	this.skins = [];
	this.PixelToMeter = param.pxTmtr || 50;
	this.bodyType = param.bodyType;	//b2Body.b2_staticBody || b2Body.b2_dynamicBody
	
	this.Set = function( param ){

		var skin = param.skin;
		var shape = this.getShapeFromSkin({
			type: param.type,
			width: param.width,
			height: param.height,			
		});

		var body = this.getBody( {world:this.world, position:{x:param.pos.x/this.PixelToMeter, y:param.pos.y/this.PixelToMeter },
				shape:shape ,bodyProperty:{type: this.bodyType, fixedRotation: true, userData:param.bodyName || 'GROUND', linearDamping: 0.4} } );
	    
	    this.bodys.push(body);
	    this.skins.push(param.skin);	
	    
	}

	this.Update = function(){
		for (var i = 0; i < this.bodys.length; i++ ) {
			
			this.skins[i].rotation = this.bodys[i].GetAngle() * (180 / Math.PI);
			this.skins[i].x = this.bodys[i].GetWorldCenter().x * this.PixelToMeter;
			this.skins[i].y = this.bodys[i].GetWorldCenter().y * this.PixelToMeter;

		};
	}

	this.HandleResize = function( param ){
		for (var i = 0; i < this.bodys.length; i++) {
			this.bodys[i].SetPosition( new b2Vec2(this.bodys[i].GetPosition().x*param.w, this.bodys[i].GetPosition().y*param.h));
		};
	}
	
	
}



function PGObject ( param ){

	if(param.type_.toUpperCase() == "STATIC"){
		return new DynamicObject({
			world:param.world,
			pxTmtr:param.SCALE,
			bodyType:b2Body.b2_staticBody
		});
	}
	if(param.type_.toUpperCase() == "DYNAMIC"){
		return new DynamicObject({
			world:param.world,
			pxTmtr:param.SCALE,
			bodyType:b2Body.b2_dynamicBody
		});
	}

}


Extend( DynamicObject.prototype, BaseObject.prototype );