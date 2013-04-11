

//light

function Light( param ){


	this.Initialize = function( param ){				
		this.light = document.getElementById('lightCanvas');
		//this.shadow = document.getElementById('shadowCanvas');

		this.lightCtx = this.light.getContext("2d");
		//this.lightCtx = this.shadow.getContext("2d");

		this.objs = param.objs || [];
		this.LightR = param.R || 200;
		this.position = param.pos;
	}

	this.AddObj = function( obj ){
		this.objs = this.objs.concat(obj);
	}

	this.Update = function(){
		for (var i = 0; i < this.objs.length; i++) {
			this.Built( {pos:this.position,LightR: this.LightR,/*get body position*/obj:{x: 100,y: 100,width: 81,height: 79},color: "yellow"} );
		};
	}
	
	this.Built = function(param){
		this.createShadow( param );
		this.createLight( param );
		this.createMask( param );
	}

	this.createMask = function( param ){

	}


	this.createShadow = function(){//{pos:{x: ,y: },LightR: ,obj:{x: ,y: },color: ""}

		//light 
		lightCtx.clearRect(0,0,lightCanvas.width,lightCanvas.height);

		//draw light
		var L = {R:param.LightR ,x:param.pos.x ,y:param.pos.y}

		var grd=lightCtx.createRadialGradient(L.x,L.y,1,L.x,L.y,L.R);
		//lightCtx.globalAlpha = 1;
		grd.addColorStop(0,( param.color || "#C8C8C8") );
		grd.addColorStop(1,"white");
		lightCtx.fillStyle=grd;
		lightCtx.arc(L.x,L.y,L.R,0,2*Math.PI,false);
		lightCtx.fill();

		lightCtx.globalCompositeOperation = "destination-out";

		//draw objs

		lightCtx.fillStyle = "blue";
		lightCtx.fillRect( 0,0,(param.obj.x + param.obj.width), (param.obj.y + param.obj.height) );


	}

	this.createLight = function(){//{pos:{x: ,y: },LightR: ,obj:{x: ,y: },color: ""}

		//light 
		lightCtx.clearRect(0,0,lightCanvas.width,lightCanvas.height);

		//draw light
		var L = { R:param.LightR ,x:param.pos.x ,y:param.pos.y }

		var grd=lightCtx.createRadialGradient(L.x,L.y,1,L.x,L.y,L.R);
		//lightCtx.globalAlpha = 1;
		grd.addColorStop(0,( param.color || "yellow") );
		grd.addColorStop(1,"white");
		lightCtx.fillStyle=grd;
		lightCtx.arc(L.x,L.y,L.R,0,2*Math.PI,false);
		lightCtx.fill();

		lightCtx.globalCompositeOperation = "destination-out";

		//draw objs

		lightCtx.fillStyle = "blue";
		lightCtx.fillRect(param.obj.x,param.obj.y,(lightCanvas.width - param.obj.x), (lightCanvas.height - param.obj.y) );
		
	}


}