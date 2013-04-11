

//toolbox

function setToolbox (){


	var elms = document.getElementsByClassName('toolelms');
	var canvas = document.getElementById('canvas');

	for (var i = 0; i < elms.length; i++) {
		elms[i].addEventListener('dragstart',function(event){
			event.dataTransfer.setData("DataClass",event.target.dataset.class);
			//console.log(event);
		},false);
	};

	canvas.addEventListener('drop',function(event){
		event.preventDefault();
		var data = event.dataTransfer.getData("DataClass");
		console.log(data);
		//new object(data)
	},false);

	canvas.addEventListener('dragover',function(event){
		//console.log(event);
		event.preventDefault();
	},false);

}