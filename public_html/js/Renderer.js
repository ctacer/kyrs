function Renderer (world,stage){

	this.objs = [];
	this.stage = stage;
	this.world = world;


	this.setStatElement = function(el){
		
		var stats = new Stats();
	    stats.domElement.style.position = 'absolute';
	    stats.domElement.style.right = '1px';
	    stats.domElement.style.top = '1px';
	    stats.domElement.style.zIndex = 100;        
	    el.appendChild( stats.domElement );
	    this.stats = stats;

	}

	this.addObject = function(obj){
		this.objs.push(obj);
	}
	

	this.render = function (){

		var self = this;

		requestAnimFrame(func)

	}



	function func(){
        requestAnimFrame(render);

        if(self.stats)
        	APP.stats.update();
                
        self.world.Step(1 / 60, 10, 10);
        //self.world.DrawDebugData();             
  		
        for (var i = 0; i < this.objs.length; i++) {
        	this.objs[i].updateObj();
        };
        self.stage.draw();


        self.world.ClearForces();
    }
    

}