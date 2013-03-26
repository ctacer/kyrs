

function Background( param ){

	this._skins = {};
	this.skins = [];
	//this.stage = null;

	this.AddSkin = function( param ){
		this.stage = param.stage;
		this._skins[param.title] = {
			stage:param.stage,
			skin:param.skin,
			action:Paarser(param.callback)
		};
		this.skins.push(param.skin);
	}

	if(param)
		this.AddSkin( param );

	this.Update = function(){
		for (var key in this._skins) {
			this._skins[key].action();
		};
	}

	this.HandleResize = function( param ){



	}

	function Paarser( stringToAction ){

		//"x+=27;y+=0;loopx=(-10)y=(-0);"
		
		var regEx = /[xy]\+=\d+/igm;

		var mas = stringToAction.match(regEx);
		var str = "";
		if(mas)
			for (var i = 0; i < mas.length; i++) {
				str+="this.skin."+mas[i]+";"
			};
		

		regEx = /(loop)(([xy])=\(-?\d+\))(([xy])=\(-?\d+\))?/im;
		mas = stringToAction.match(regEx);
		if(mas){
			if(mas[3] != undefined){
				var res = (mas[3] == "x")?("width"):("height");
				str += "if(this.skin." + mas[3] + " > this.stage.canvas." + res + "){this.skin." + mas[2] + ";}";
			}
			if(mas[5] != undefined){
				var res = (mas[5] == "x")?("width"):("height");
				str  += "if(this.skin." + mas[5] + " > this.stage.canvas." + res + "){this.skin." + mas[4] + ";}";
			}
		}
		
		str = "try{" + str + "}catch(exc){console.log('parsed update Function');}";		
		var func = Function(str);

		console.log(str);
		return func;
	}
	
}



/*




var parsedStr = "x+=27;y+=0;loopx(-10)y(0);";
		
		var regEx = /[xy]\+=\d+/igm;

		var mas = stringToAction.match(regEx);
		var str = "";
		for (var i = 0; i < mas.length; i++) {
			str+="this.skin."+mas[i]+";"
		};
		

		regEx = /loop\w{1,2}/im;
		mas = stringToAction.match(regEx);
		if(mas[0].search( /x/im ) != -1)
			str += "if(this.skin.x > stage.canvas.width){this.skin.x = 0;}";
		if(mas[0].search( /y/im ) != -1)
			str += "if(this.skin.y > stage.canvas.height){this.skin.y = 0;}";
		
		str = "try{" + str + "}catch(exc){console.log('parsed update Function');}";		
		var func = Function(str);

		console.log(str);
		return func;

		*/