

//contextBack

function contextBack( param ){

	this.Initialize = function( param ){

		this.stage = param.stage;
		this.skinsURL = [];
		this.skins = []; //new createjs.Container();
		this._protoBMPS = [];//new createjs.Bitmap( img );
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
		this.skins.push( cont );

		if( url.image ){
			this.skinsURL.push( "url" );			
			this._protoBMPS.push( url );
		}
		else{
			this.skinsURL.push( url );		
			this._protoBMPS.push( new createjs.Bitmap( url ) );
		}

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
		var curBMP = this._protoBMPS[this.skins.indexOf(cont)];
		curBMP.snapToPixel = true;
		var curContainer = cont;
		var param = curContainer.param || parama;

		
		var scale = 1, _ResizeScale = 1;
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

			if(param.x)
				curContainer.x = param.x ;
			if(param.y)
				curContainer.y = param.y ;
			if(param.speed){
				//
			}

			curContainer.param = param;
		}
		//console.log(scale);
		var width = (curBMP.image.width - 2*GAP )* scale  ;
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

			//console.log(scale);
			_bmp.scaleX = _bmp.scaleY = scale ;
			_bmp.GAP = GAP;
			_bmp.x = i *( _bmp.image.width - 2*GAP )* _bmp.scaleX ;//(curBMP.image.width - 2*GAP )* scale * _ResizeScale 
			//_bmp.cache(0,0,_bmp.image.width * scale,_bmp.image.height*scale);
		}
		for (var i = count; i < curContainer.getNumChildren(); i++) {
			curContainer.removeChildAt(i);
		};
		//console.log(curContainer);
	}

	
	this.Sort = function(){
		var ides = [];
		var _bmpes = [];
		for (var i = 0; i < this.skins.length; i++) {
			if(this.skins[i].posId != undefined ){
				ides.push( this.skins[i]);
				this.skins.splice(i,1);
				_bmpes.push( this._protoBMPS[i] );
				this._protoBMPS.splice(i,1);i--;
			}
		}
		ides.sort(function(a,b){
			return a.posId-b.posId});
		this.skins = ides.concat(this.skins);
		this._protoBMPS = _bmpes.concat(this._protoBMPS);
		//console.log(this.skins);
	}

	this.Finalize = function(){
		this.Sort();
	}

	this.Translate = function( pos ){
		//if(Math.floor(pos.x *pos.SCALE) <= 0)return;

		for (var i = 0; i < this.skins.length; i++) {
			this.skins[i].x -= pos.x*pos.SCALE + (this.skins[i].param.speed != undefined)?this.skins[i].param.speed:0;
			this.skins[i].y -= pos.y *pos.SCALE;
		};
	}

	this.action = function ( container ){

		for (var i = 0; i < container.getNumChildren(); i++) {
			var child = container.getChildAt(i);
			child.x -= (container.param.speed != undefined)?container.param.speed:3;			
			if( child.x <= -(child.image.width - 2*child.GAP)* child.scaleX ){
				//remove from start add to the end
				//child = container.getChildAt(0).clone();
				//child.x = container.getChildAt(container.getNumChildren() - 1).x + child.image.width * child.scaleX  ;
				child.x += (container.getNumChildren() ) * (child.image.width - 2*child.GAP)* child.scaleX ;
				//container.removeChildAt(0);
				//container.addChild( child );
				//container.getChildAt(0).x -= 3;
			}
		};
		

	}

	this._adjustWidth = function( curWidth ){

		var count = ( Math.floor( this.stage.canvas.width / curWidth ) + 2 );

		return count;
		
	}

	this.Update = function(){

		/*for (var i = 0; i < this.skins.length; i++) {
			this.action( this.skins[i] );
		};*/

	}
	this.HandleResize = function( parama ){
		//console.log(parama);
		for(var i = 0; i < this.skins.length; i++) {
			this.skins[i].param._Resize = parama;
			this.Set(this.skins[i]);
		};

	}


}