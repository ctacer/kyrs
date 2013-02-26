


window.addEventListener('load',function(e){


	//window.addEventListener('resize',resizer,false);


    var o = definePhysicWorld();
    defineGraphicWorld( o );

	


},false);



function resizer(event){


	stage.setHeight(window.innerHeight);
	stage.setWidth(window.innerWidth);


}

