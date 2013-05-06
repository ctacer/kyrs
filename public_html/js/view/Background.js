

//contextBack

function contextBack( param ){

	this.Initialize = function( param ){

		this.stage = param.stage;
		this.SCALE = 1;
		this.Edge = 0;
		this._initSCALE = 1;
		this.skins = []; //new createjs.Container();
		this._protoBMPS = [];//new createjs.Bitmap( img );

	}

	this.Initialize( param );

	this.AddSkin = function( url, param ,posi ){

		var cont = new createjs.Container();
		cont.x = 0;cont.y = 0;
		
		if(posi)
			cont.posId = posi.id ;
		this.skins.push( cont );

		this._protoBMPS.push( url );

		this.Set(cont, param);
	}

	this.Set = function( cont, parama ){
		var GAP = 0;
		
		//var ids = id || this._protoBMPS.length - 1;
		var curBMP = this._protoBMPS[this.skins.indexOf(cont)];
		curBMP.snapToPixel = true;
		var curContainer = cont;
		var param = curContainer.param || parama;

		
		var scale = 1;
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
			if(!param.speed){
				param.speed = 1;
			}

			curContainer.param = param;
		}
		var adjWidth = false,width_perc = 1;
		if(param.orientation)
			switch (param.orientation.type.toUpperCase()){
				case "FILL":
					scale = stage.canvas.height/curBMP.image.height;
					break;
				case "WIDTH":
					adjWidth = param.orientation.width || this.stage.canvas.width;
					break;
				case "WIDTH_PERCENT":
					width_perc = param.orientation.width || 1;
					break;
				case "HEIGHT":
					scale = stage.canvas.height/curBMP.image.height;
					break;
				default:

					break;
			}

		var width = (curBMP.image.width - 2*GAP )* scale * width_perc ;
		var count = this._adjustWidth( width, adjWidth );

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
			_bmp.x = i *( _bmp.image.width - 2*GAP )* _bmp.scaleX ;//(curBMP.image.width - 2*GAP )* scale * _ResizeScale 
			//_bmp.cache(0,0,_bmp.image.width * scale,_bmp.image.height*scale);
		}
		for (var i = count; i < curContainer.getNumChildren(); i++) {
			curContainer.removeChildAt(i);
		};
		////console.log(curContainer);
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
		////console.log(this.skins);
	}

	this.Finalize = function(){
		this.Sort();
	}

	this.Translate = function( pos ){
		this.SCALE = pos.SCALE;
		for (var i = 0; i < this.skins.length; i++) {
			this.skins[i].x -= pos.x*pos.SCALE*this.skins[i].param.speed;			
		};
	}


	this._adjustWidth = function( curWidth, adjWidth ){

		var count;
		if(!adjWidth)
			count = ( Math.floor( this.stage.canvas.width / curWidth ) + 2 );
		else
			count = ( Math.floor( adjWidth / curWidth ) + 1 );

		return count;
		
	}

	this.Update = function(){

		/*for (var i = 0; i < this.skins.length; i++) {
			this.skins[i].x -= this.skins[i].x*this.skins[i].param.speed;
			//this.skins[i].y -= pos.y *pos.SCALE;
		};*/

	}
	this.HandleResize = function( parama ){
		this.SCALE = parama.SCALE;
	}


}