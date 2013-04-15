

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

	this.AddSkin = function( url, param ){

		var cont = new createjs.Container();
		cont.x = 0;cont.y = 0;
		//this.stage.addChild( cont );
		this.skins.push( cont );

		if( url.image ){
			this.skinsURL.push( "url" );			
			this._protoBMPS.push( url );
		}
		else{
			this.skinsURL.push( url );		
			this._protoBMPS.push( new createjs.Bitmap( url ) );
		}
		this.Set(false, param);
	}

	this.Set = function( id, param ){
		var GAP = 0;

		var ids = id || this._protoBMPS.length - 1;
		var curBMP = this._protoBMPS[ids];
		//curBMP.snapToPixel = true;
		var curContainer = this.skins[ids];		
		var height = this.stage.canvas.height;
		var scale = height / (curBMP.image.height *  curBMP.scaleY);
		if(param){
			if(param.scale)
				scale = param.scale;
			if(param.gap != null){
				GAP = param.gap ;
				curBMP.sourceRect = new createjs.Rectangle(GAP, 0, curBMP.image.width - GAP , curBMP.image.height);
			}
			if(param.x)
				curContainer.x = param.x;
			if(param.y)
				curContainer.y = param.y;
		}
		var width = curBMP.image.width * curBMP.scaleX * scale - GAP;
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
				console.log( count );
			}
			else
				_bmp = curContainer.getChildAt(i);

			_bmp.scaleX = _bmp.scaleY = scale ;
			_bmp.GAP = GAP;
			_bmp.x = i *( _bmp.image.width * _bmp.scaleX - GAP) ;
			//_bmp.cache(0,0,_bmp.image.width * scale,_bmp.image.height*scale);
		}
		for (var i = count; i < curContainer.getNumChildren(); i++) {
			curContainer.removeChildAt(i);
		};
		console.log(curContainer);
	}

	this._fillContainer = function( count ){
		/*var curBMP = this._protoBMPS[this._protoBMPS.length - 1];		
		for (var i = 0; i < count; i++) {
			var _bmp = curBMP.clone();//new createjs.Bitmap( this.skinsURL[this.skinsURL.length - 1] );
			_bmp.scaleX = _bmp.scaleY = 
		};*/
	}

	this.action = function ( container ){

		for (var i = 0; i < container.getNumChildren(); i++) {
			var child = container.getChildAt(i);
			child.x -= 3;			
			if( child.x <= -child.image.width * child.scaleX ){
				//remove from start add to the end
				//child = container.getChildAt(0).clone();
				//child.x = container.getChildAt(container.getNumChildren() - 1).x + child.image.width * child.scaleX  ;
				child.x += (container.getNumChildren() ) * (child.image.width * child.scaleX - child.GAP) ;
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

		for (var i = 0; i < this.skins.length; i++) {
			this.action( this.skins[i] );
		};

	}
	this.HandleResize = function( param ){

		for(var i = 0; i < this.skins.length; i++) {
			this.Set(i);
		};

	}


}