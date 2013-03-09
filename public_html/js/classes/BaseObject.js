

function BaseObject( name )
{
	this.name = name || 'baseeeeeee';
	this.body = 0;
	this.blowUp = function(){console.log(this.name);}
	
	
}

function DynamicObject( name )
{
	this.type = 'b2_dynamicBody';
	//BaseObject.apply(this, arguments);
		
}

addProperty( DynamicObject.prototype, {

	getType : function(){		return 'b2_dynamicBody';	}

});
addProperty( DynamicObject.prototype, (new BaseObject() ) );

function addProperty(obj, prop)
{
	for(var key in prop){
		if( prop.hasOwnProperty(key) )
			obj[key] = prop[key];
	}
}



