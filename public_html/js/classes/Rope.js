

function Rope(param){

	this.links = [];
	this.PixelToMeter = param.scale || 50;
	this.length = (param.length)?(Math.floor(param.length)):(1); //sets in meters
	this.linkCount = (param.count)?(this.length*param.count):(this.length*10); // count sets for 1 meter
	this.world = param.world;
	
	this.Initialize = function(wall,pos){

		//Create a rope object

		this.wall = wall.body;
		this.ConnectionPoint = new b2Vec2(pos.x, pos.y);
		
		var wid = 1 / 10,
			hei = this.length / this.linkCount;

		var polygon = new b2PolygonShape();
		polygon.SetAsBox(wid/2, hei/2);


		for (var i = 0; i < this.linkCount; i++) {
			
			var link = this.getBody( {world:this.world, position:{x:pos.x/this.PixelToMeter, y:pos.y/this.PixelToMeter + hei/2 + i*hei},
				shape:polygon , bodyProperty: {userData:'rope'} } );
			this.links.push(link);

			var anc1 = new b2Vec2(pos.x/this.PixelToMeter, pos.y/this.PixelToMeter + i*hei);

			if(i == 0){
				this.setRevoluteJoint( {world:this.world, b1:this.links[0], b2:this.wall, anchor:anc1} );
				continue;
			}
				
			this.setRevoluteJoint( {world:this.world, b1:this.links[i], b2:this.links[i-1], anchor:anc1} );				

		}
		


	}

	this.RevoluteJoint = function(b1, b2, anchor1, anchor2){
		var revoluteJointDef = new b2RevoluteJointDef();
        revoluteJointDef.Initialize(b1,b2,anchor1);
        var joint = this.world.CreateJoint(revoluteJointDef);
    }

	this.Conect = function(staticBody){

		//in Initialize

	}

}

Extend(Rope.prototype, BaseObject.prototype);