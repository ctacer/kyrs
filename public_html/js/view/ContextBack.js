

//contextBack

function contextBack( param ){

	this.Initialize = function( param ){

		this.stage = param.stage;
		this.SCALE = 1;

		this.skins = []; //new createjs.Container();
		if( param.skins ){
			if( param.skins.length ){
				for (var i = 0; i < param.skins.length; i++) {
					this.AddSkin( param.skins[i] );
				}
			}
			else{
				this.AddSkin( param.skins );			
			}
		}	
		//this.container.x = 0;this.container.y = 0;
		//this.stage.addChild(this.container);

	}

	this.Initialize( param );

	this.AddSkin = function( url, param ,posi ){

		var cont = new createjs.Container();
		cont.x = 0;cont.y = 0;
		//this.stage.addChild( cont );
		if(posi)
			cont.posId = posi.id ;

		if( url.image ){			
			cont._protoBMPS = url ;
		}
		else{
			cont._protoBMPS = new createjs.Bitmap( url );
		}

		this.skins.push( cont );

		this.Set(cont, param);
	}

	this._resizeParam = function( param ,_Resize){


		if(param.scale)
			param.scale *= _Resize.h;
		else param.scale = 1;
		
		if(param.x)
			param.x *= _Resize.h;
		if(param.y)
			param.y *= _Resize.h;
		
	}


	this.Set = function( cont, parama ){
		var GAP = 0;
		
		//var ids = id || this._protoBMPS.length - 1;
		var _index = this.skins.indexOf(cont);
		var curContainer = cont;
		var curBMP = curContainer._protoBMPS;
		//curBMP.snapToPixel = true;
		var param = curContainer.param || parama;

		
		var scale = 1, _ResizeScale = 1, widthScale = 1;
		if( param && param._Resize){
			this._resizeParam( param, param._Resize);
		}
		if(param){
			if(param.scale)
				scale = param.scale;
			else param.scale = 1;

			if(param.gap != undefined){
				GAP = param.gap ;
				curBMP.sourceRect = new createjs.Rectangle(GAP, 0, curBMP.image.width - 2*GAP , curBMP.image.height);
			}
			else
				param.gap = GAP;

			if(param.widthScale)
				widthScale = param.widthScale;
			else
				param.widthScale = widthScale;

			if(param.x)
				curContainer.x = param.x ;
			if(param.y)
				curContainer.y = param.y ;
			if(!param.speed){
				param.speed = 1;
			}

			curContainer.param = param;
		}
		////console.log(scale);
		var width = (curBMP.image.width - 2*GAP )* scale * widthScale ;
		var count = this._adjustWidth( width );

		//for (var i = 0; i < this.skins.length; i++) {	
		/*
		if( count >= curContainer.getNumChildren() ){	
			for (var i = 0; i < curContainer.getNumChildren(); i++) {
				curContainer[i]
			};		
			for (var i = curContainer.getNumChildren(); i < count; i++) {
				var _bmp = curBMP.clone();//new createjs.Bitmap( this.skinsURL[this.skinsURL.length - 1] );
				_bmp.scaleX = _bmp.scaleY = scale ;
				curContainer
			};*/
		//};

		for (var i = 0; i < count; i++) {

			var _bmp;
			if( !curContainer.getChildAt(i) ){
				_bmp = curBMP.clone();//new createjs.Bitmap( this.skinsURL[this.skinsURL.length - 1] );
				curContainer.addChild( _bmp );
			}
			else
				_bmp = curContainer.getChildAt(i);

			////console.log(scale);
			_bmp.scaleX = _bmp.scaleY = scale ;
			_bmp.GAP = GAP;
			_bmp.x = width * i  + (width/2 - width/(widthScale*2)) ;//* ( 2*widthScale*i + widthScale - 1) / 2 ;
			//_bmp.cache(0,0,_bmp.image.width * scale,_bmp.image.height*scale);
		}
		//this.Edges[_index] = count *( _bmp.image.width - 2*GAP )* _bmp.scaleX;
		curContainer.Edge =  ( count * width );

		//console.log( this.Edges[_index] );
		for (var i = count; i < curContainer.getNumChildren(); i++) {
			curContainer.removeChildAt(i);
		};
		////console.log(curContainer);
	}

	
	this.Sort = function(){
		var ides = [];		
		for (var i = 0; i < this.skins.length; i++) {
			if(this.skins[i].posId != undefined ){
				ides.push( this.skins[i]);
				this.skins.splice(i,1);				
				i--;
			}
		}
		ides.sort(function(a,b){
			return a.posId-b.posId});
		this.skins = ides.concat(this.skins);
	}

	this._requeryFrame = function( index ){
		var curContainer = this.skins[index];
		var _min = curContainer.getChildAt(0);
		var _max = curContainer.getChildAt(0);
		for (var i = 0; i < curContainer.getNumChildren(); i++) {
			var temp = curContainer.getChildAt(i);
			console.log(temp.x);
			if( temp.x < _min.x)
				_min = temp;
			if( temp.x > _max.x)
				_max = temp;
		}
		//console.log(curContainer.param.widthScale);
		_min.x = _max.x + ( ( _min.image.width - 2*curContainer.param.gap ) * _min.scaleX * curContainer.param.widthScale ) ;
		curContainer.Edge += ( ( _min.image.width - 2*curContainer.param.gap )* _min.scaleX * curContainer.param.widthScale );
	}

	this.Finalize = function(){
		this.Sort();
	}

	this.Translate = function( pos ){

		this.SCALE = pos.SCALE;
		for (var i = 0; i < this.skins.length; i++) {
			//if( Math.abs(pos.x*pos.SCALE) >= 1.5 ){
				this.skins[i].x -= /*parseInt(*/ ( pos.x*pos.SCALE*this.skins[i].param.speed );
				this.skins[i].Edge -= /*parseInt(*/ ( pos.x*pos.SCALE*this.skins[i].param.speed );
				//this.skins[i].y -= pos.y *pos.SCALE;
			/*}
			else{
				//console.log( pos.x*pos.SCALE );
				this.skins[i].x -= pos.x*pos.SCALE;
				//this.skins[i].y -= pos.y *pos.SCALE;
			}*/
		};
	}


	this._adjustWidth = function( curWidth ){

		var count = ( Math.floor( this.stage.canvas.width / curWidth ) + 2 );

		return count;
		
	}

	this.Update = function(){

	}
	this.HandleResize = function( parama ){
		////console.log(parama);
		for(var i = 0; i < this.skins.length; i++) {
			this.skins[i].param._Resize = parama;
			this.Set(this.skins[i]);
		};

	}


}