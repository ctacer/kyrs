function onloader(){



    // I decided that 2 meter = 100 pixels


    //var APP = {};


    setStatElement(document.getElementById( 'viewport' ));

    setCanvas();

    setPhysicWorld();
            
    startRenderin();


    

            



}

window.onload = onloader;