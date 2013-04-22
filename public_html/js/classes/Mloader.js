

function modelLoader( param ){
	
	this.callback = param.callback;
	this.sources = param.source;
	this.LOAD = param.LOAD || false;
	this.models = [];

	this.addModel = function( source ){
		this.sources = this.sources.concat(source);
	}

	this.getResult = function( id ){

		return this.loader.getResult(id);
	}

	this.Initialize = function(){

		console.log('loader_work');

		this.loader = new createjs.LoadQueue(false);
        this.loader.onFileLoad = handleFileLoad;
        this.loader.onComplete = handleComplete;
        this.loader.loadManifest(this.sources);        

	}

	if(this.LOAD){
		this.Initialize();
	}

	var self = this;	

	function handleFileLoad(event){
		
		self.models.push(event.item);
		if( event.item.callback ){
			event.item.callback(event.item);
		}
	}

	function handleComplete(){
		console.log('loader_done');
		self.callback(self.models);

	}

}