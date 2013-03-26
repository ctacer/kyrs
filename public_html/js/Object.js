


function DynamicObject( param ){


	this.world = param.world;
	this.bodys = [];
	this.skins = [];
	this.SCALE = param.SCALE || 50;
	this.bodyType = param.bodyType;	//b2Body.b2_staticBody || b2Body.b2_dynamicBody
	
	this.Set = function( param ){

		var skin = param.skin;
		//fix origin position
		skin.regX = param.width/2*this.SCALE;
		skin.regY = param.height/2*this.SCALE;
		//

		var shape = this.getShapeFromSkin({
			type: param.type,
			width: param.width,
			height: param.height,			
		});

		var body = this.getBody( {world:this.world, position:{x:param.pos.x/this.SCALE, y:param.pos.y/this.SCALE },
				shape:shape ,bodyProperty:{type: this.bodyType, fixedRotation: true, userData:param.bodyName || 'GROUND'/*, linearDamping: 0.4*/} } );
	    
	    this.bodys.push(body);
	    this.skins.push(param.skin);	
	    
	}

	this.Update = function(){
		for (var i = 0; i < this.bodys.length; i++ ) {
			
			this.skins[i].rotation = this.bodys[i].GetAngle() * (180 / Math.PI);
			this.skins[i].x = this.bodys[i].GetWorldCenter().x * this.SCALE;
			this.skins[i].y = this.bodys[i].GetWorldCenter().y * this.SCALE;

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
			SCALE:param.SCALE,
			bodyType:b2Body.b2_staticBody
		});
	}
	if(param.type_.toUpperCase() == "DYNAMIC"){
		return new DynamicObject({
			world:param.world,
			SCALE:param.SCALE,
			bodyType:b2Body.b2_dynamicBody
		});
	}

}


Extend( DynamicObject.prototype, BaseObject.prototype );