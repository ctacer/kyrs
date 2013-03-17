

function View( prop ){

	this.Initialize = function( prop ){
		this.elems = prop.elems;
		this.PixelToMeter = prop.PixelToMeter;
	}

	this.Draw = function(){
		for (var i = 0; i < this.elems.length; i++) {

			/*var pos = this.phys[i].GetPosition();
			this.parts[i].setPosition( pos.x*this.PixelToMeter, pos.y*this.PixelToMeter );
            this.parts[i].setRotation( this.phys[i].GetAngle());
            */

            //Get position of model's obj 
            //Set position of view's obj

		};
	}
		


	this.Initialize( prop );
}