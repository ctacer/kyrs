

//boxcore

window.onload = function(){

	beload();

}




//

function beload() {
	

	b2Vec2 = Box2D.Common.Math.b2Vec2
    ,  b2AABB = Box2D.Collision.b2AABB
    ,   b2BodyDef = Box2D.Dynamics.b2BodyDef
    ,   b2Body = Box2D.Dynamics.b2Body
    ,   b2FixtureDef = Box2D.Dynamics.b2FixtureDef
    ,   b2Fixture = Box2D.Dynamics.b2Fixture
    ,   b2World = Box2D.Dynamics.b2World
    ,   b2MassData = Box2D.Collision.Shapes.b2MassData
    ,   b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
    ,   b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
    ,   b2DebugDraw = Box2D.Dynamics.b2DebugDraw
    ,   b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef 
    ,   b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint
    ,   b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef
    ,   b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint
    ,   b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
    ,   b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint
    ,   b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef
    ,   b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint
    ,   b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef 
    ,   b2Joint = Box2D.Dynamics.Joints.b2Joint
    ,   b2JointDef = Box2D.Dynamics.Joints.b2JointDef  
    ,   b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef
    ,   b2ContactListener = Box2D.Dynamics.b2ContactListener    ;
                



    var PixelToMeter = 50;

    var world = new b2World(
        new b2Vec2(0, 10)    //gravity
        //,  true                 //allow sleep
    );

    var w = window.innerWidth/PixelToMeter;
    var h = window.innerHeight/PixelToMeter;
	
    //define world objects

    var shape;


    //define grahic for playee 
    //var grahicPlayee = new PIXI.js.SomeObj() ...
    //bind id for graphic obj 
    //graphicPlayee.idName = "Playee";
    //and send this name as userData property into constructor of Persona class for update manipulation 
    //graphicObj["key"].pos = Box2DObj["key"] 
    var playee = new Persona(PixelToMeter);
    playee.Initialize(world, {x: 100, y: 200});


    /*var contcListener = new ContactListener();
    contcListener.SetUp(world);
    */


    //var os = loadMap(world, PixelToMeter, h, w);


    /*window.Model = new Model({
        objs: os,
        world:world        
    });*/

    window.Controller = new Controller( {
        player: playee
    });

    var canvas = document.getElementById("canvas");
    var stage = new createjs.Stage(canvas);

    /*var image = new createjs.Bitmap("resources/world/ground.png");
    stage.addChild(image);
*/
    /*
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);
    */

    ViewFactory(stage, world, PixelToMeter);

    //add event listener to my renderer class
    
    
    
  

}



function ViewFactory(stage,world,PixelToMeter){
    
    var skin;

    var manifest = [
        //{src:"resources/world/runningGrant.png", id:"grant"},
        {src:"resources/world/sky.png", id:"sky"},
        {src:"resources/world/ground.png", id:"ground"},
        {src:"resources/world/parallaxHill1.png", id:"hill"},
        {src:"resources/world/parallaxHill2.png", id:"hill2"}
    ];

    var loader = new modelLoader({
        source :manifest,
        callback: handlLoad,
        LOAD: true
    });
    

    function handlLoad( models ){

        var os = [];

        window.Render = new Renderer({
            world: world,
            stage:stage ,
            SCALE: PixelToMeter 
            //model: Model     
        });

        var w = stage.canvas.width;
        var h = stage.canvas.height;

        for (var i = 0; i < models.length; i++) {
            var item = models[i];
            var id = item.id;
            var result = loader.getResult(id);

            if (item.type == createjs.LoadQueue.IMAGE) {
                var bmp = new createjs.Bitmap(result);
            }

            switch (id) {
                case "sky":
                    sky = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,w,h));
                    break;
                case "ground":
                    ground = new createjs.Shape();
                    var g = ground.graphics;
                    g.beginBitmapFill(result);
                    g.drawRect(0, 0, w+330, 79);
                    ground.regX = w/2;
                    ground.regY = 79/2;
                    ground.y = h-79/2;
                    ground.x = w/2;

                    var groundPhys = new PGObject({
                        world:world,
                        SCALE:PixelToMeter,
                        type_:"static"
                    });
                    console.log(w);
                    groundPhys.Set( {
                        skin: ground,
                        type:"polygon",
                        width:(w)/PixelToMeter,
                        height:(79)/PixelToMeter,
                        pos:{x: w/2,y: (h-79/2)}
                    } );
                    os.push(groundPhys);
                    
                    break;
                case "hill":
                    hill = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,282,59));
                    hill.scaleX = hill.scaleY = 1;                    
                    hill.regX = 141;
                    hill.regY = 29.5;
                    var hillX = Math.random() * w + 141;                    
                    hill.x = hillX;
                    hill.y = 59/2;

                    var box = new PGObject({
                        world:world,
                        SCALE:PixelToMeter,
                        type_:"dynamic"
                    });
                    box.Set( {
                        skin: hill,
                        type:"polygon",
                        width:(282)/PixelToMeter,
                        height:(59)/PixelToMeter,
                        pos:{x: hillX,y: (59/2)}
                    } );
                    os.push(box);

                    break;
                case "hill2":
                    hill2 = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,212,50));
                    hill2.x = Math.random() * w;
                    hill2.scaleX = hill2.scaleY = 3;
                    hill2.y = h - 79 - 125;
                    break;
            }
        }

        //stage.addChild( ground );
        //stage.addChild(sky, ground, hill, hill2);
        //render()

        window.Model = new Model({
            objs: os,
            world:world        
        });
        console.log(Model);

        console.log('start');
        
        Render.SetModel( Model );


        Render.setStatElement(document.getElementById( 'viewport' ));

        //Render.createDebuger();

        Render.render();

    }

}

