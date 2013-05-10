


function DynamicObject( param ){


	this.world = param.world;
	this.bodys = [];
	this.skins = [];
	this.SCALE = param.SCALE || 50;
	this._initSCALE = this.SCALE;
	this.bodyType = param.bodyType;	//b2Body.b2_staticBody || b2Body.b2_dynamicBody
	
	this.Set = function( param ){

		//console.log(skin);
		this.name = param.bodyName || 'GROUND';
		if(!param.scale || !param.scale.h || !param.scale.w)
			param.scale = {h:1, w:1};
		if(!param.gap || !param.gap.y)
			param.gap = {y:0};
		//fix origin position
		var skin = this.fitSkin(param.skin, param.width, param.height ,param.skinProperty );
		skin.regX = param.width*this.SCALE/(this._initSCALE*2);
		skin.regY = param.height*this.SCALE/(this._initSCALE*2);
		skin.actX = skin.actY = 1;
		//
		skin.gap = param.gap;

		var shape = this.getShapeFromSkin({
			type: param.type,
			width: param.width/(this.SCALE/**param.scale.w*/),
			height: (param.height - param.gap.y)/(this.SCALE/**param.scale.h*/)
		});

		this.skins.push(skin);
		if(!param.DISABLEBODY){
			var body = this.getBody( {world:this.world, position:{x:param.pos.x/this.SCALE, y:(param.pos.y + param.gap.y/2)/this.SCALE },
					shape:shape ,bodyProperty:{type: this.bodyType, fixedRotation: true, userData:this/*, linearDamping: 0.4*/},fixtureProperty:{
						isSensor:!!param.isSensor
					} } );
		    this.bodys.push(body);
		}
		else{
	    	var temp = this.skins[this.bodys.length - 1];
	    	this.skins.splice((this.bodys.length - 1),1);
	    	this.skins.push(temp);
	    }
	    if(param.speed){
	    	this.speed = param.speed;
	    }
	    
	}

	this.fitSkin = function(skin, width, height, property ){
		//fit skin size width ...
		//console.log(skin);
		if(!skin.image)return skin;

		var GAP = {left:0,right:0} ;
		if( property ){
			if(property.gap != undefined){
				GAP = property.gap;
				skin.sourceRect = new createjs.Rectangle(GAP.left, 0, skin.image.width - GAP.left - GAP.right , skin.image.height);
			}
			if(property.accurate){
				var cont = new createjs.Container();
				skin.scaleX = skin.scaleY = (height/skin.image.height) ;//scale only for skin
				cont.addChild(skin);
				cont.scaleX = cont.scaleY = this.SCALE/this._initSCALE; //dynamic scale only for container
				return cont;
			}
		}

		var cont = new createjs.Container();
		//cont.x = 0;cont.y = 0;
		var count = Math.floor(width/( (skin.image.width  - GAP.left - GAP.right ) *(height/skin.image.height) ) ) + 1;
		//console.log(count);
		for (var i = 0; i < count; i++) {
			var _skin = skin.clone();
			_skin.scaleX = _skin.scaleY = (height/skin.image.height) ;//scale only for skin
			_skin.x =  i*(skin.image.width  - GAP.left - GAP.right )*(height/skin.image.height) ;
			cont.addChild(_skin);
		};
		cont.scaleX = cont.scaleY = this.SCALE/this._initSCALE; //dynamic scale only for container

		return cont;
	}

	this.Update = function(){
		this.action();
		for (var i = 0; i < this.bodys.length; i++ ) {
			if(this.skins[i].skin_type != "auto"){
				this.skins[i].rotation = this.bodys[i].GetAngle() * (180 / Math.PI);
				this.skins[i].x = this.bodys[i].GetWorldCenter().x * this.SCALE;
				this.skins[i].y = (this.bodys[i].GetWorldCenter().y) * this.SCALE - this.skins[i].gap.y/2*this.SCALE/this._initSCALE;
				//console.log("\tLOOK HEAR\t");
				this.skins[i].scaleX = this.skins[i].scaleY = this.SCALE/this._initSCALE;
			}

		}

		for (var i = this.bodys.length; i < this.skins.length; i++) {
			if(this.skins[i].skin_type != "auto"){
				
				this.skins[i].rotation = this.bodys[0].GetAngle() * (180 / Math.PI);
				this.skins[i].x = this.bodys[0].GetWorldCenter().x * this.SCALE;
				this.skins[i].y = (this.bodys[0].GetWorldCenter().y) * this.SCALE - this.skins[i].gap.y/2*this.SCALE/this._initSCALE;
				//console.log("\tLOOK HEAR\t");
				this.skins[i].scaleX = this.skins[i].actX * this.SCALE/this._initSCALE;
				this.skins[i].scaleY = this.skins[i].actY * this.SCALE/this._initSCALE;
			}
		};
	}

	this.Translate = function( pos ){
		for (var i = 0; i < this.bodys.length; i++) {
			this.bodys[i].SetPosition( new b2Vec2( this.bodys[i].GetWorldCenter().x - pos.x , this.bodys[i].GetWorldCenter().y - pos.y ) );
		};
	}

	this.HandleResize = function( param ){
		/*for (var i = 0; i < this.bodys.length; i++) {
			this.bodys[i].SetPosition( new b2Vec2(this.bodys[i].GetPosition().x*param.w, this.bodys[i].GetPosition().y*param.h));
		};*/
		this.SCALE = param.SCALE;
	}
	this.GetPosition = function(){
		return {x:this.bodys[0].GetWorldCenter().x * this.SCALE, y: this.bodys[0].GetWorldCenter().y * this.SCALE,
		rotation: this.bodys[0].GetAngle() * (180 / Math.PI), SCALE: this.SCALE };
	}

	this.clone = function(){
		var ret = new DynamicObject({  
            world:this.world,
			SCALE:this.SCALE,
			bodyType:this.bodyType
    	});
	    return ret;
	}
	this.Dispatch = function(){
		//console.log("del");
		this.name = "DELETE";
	}
	this.setAction = function( callBack ){
		this._actionCallBack = callBack;
	}
	this.action = function(){
		if(this._actionCallBack){//console.log("action");
			for (var i = 0; i < this.bodys.length; i++ )
				this._actionCallBack(this.bodys[i],this.skins);
		}
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