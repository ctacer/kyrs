

//boxcore

window.onload = function(){
	

	b2Vec2 = Box2D.Common.Math.b2Vec2
    ,   b2AABB = Box2D.Collision.b2AABB
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
                

    //setToolbox();



    window.Model = new Model({
        gravity: {x: 0, y: 10}/*,
        SCALE: 50*/
    });
	var canvas = document.getElementById("canvas");
    var stage = new createjs.Stage(canvas);

    window.Render = new Renderer({
        world: Model.GetWorld(),
        stage:stage /*,
        SCALE: Model.GetScale() */
        //model: Model     
    });

    var playee = new Persona({SCALE: Render.GetSCALE() });
    playee.Initialize(Model.GetWorld(), {x: 100, y: 200});

    Model.AddModel( playee );
    //Model.objs[0].bodys['wheel'].SetAngularVelocity(15);


    //spriteSheet ={"animations": { "stand":[59], "run": [0, 25], "jump": [26, 63]}, "images": ["/resources/world/runningGrant.png"], "frames": {"regX": 165.75/2, "height": 292.5, "count": 64, "regY": 292.5/2, "width": 165.75}};
    spriteSheet = {
        "images": ["resources/persona/Pixie/pixie_easel.png"],"frames": [

            [104, 193, 97, 100], 
            [2, 2, 105, 102], 
            [2, 200, 96, 104], 
            [203, 194, 94, 93], 
            [407, 99, 94, 97], 
            [2, 106, 100, 92], 
            [318, 2, 99, 95], 
            [311, 99, 94, 97], 
            [2, 406, 93, 92], 
            [2, 306, 93, 98], 
            [215, 2, 101, 94], 
            [211, 98, 98, 94], 
            [109, 2, 104, 93], 
            [109, 97, 100, 94], 
            [109, 2, 104, 93]
        ],
        "animations": {
            
                "fall":[0, 2,"fall",6], 
                "run":[3,11,"run",6],
                "flat":[12, 14, "flat",6],
                "stand":[11,11,"stand",6]
        },
        "texturepacker": [
                "SmartUpdateHash: $TexturePacker:SmartUpdate:3d9903c9e34ccb07b382206529c283ec$",
                "Created with TexturePacker (http://www.texturepacker.com) for EasalJS"
        ]
    }

    var ss = new createjs.SpriteSheet(spriteSheet);
    //ss.addEventListener("complete", function(event){});
    grant = new createjs.BitmapAnimation(ss);

    // Set up looping
    ss.getAnimation("fall").next = "fall";
    ss.getAnimation("run").next = "run";
    ss.getAnimation("flat").next = "flat";
    grant.gotoAndPlay("stand");
/*
    grant.scaleX = 0.12;
    grant.scaleY = 0.24;*/

    playee.SetSkin( grant );


    var contcListener = new ContactListener();
    contcListener.SetUp(Model.GetWorld() );
    

    window.Controller = new Controller( {
        player: playee
    });


    /*
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);
    */    
    
    var skin;

    var manifest = [
        {src:"resources/world/backgrass1.png", id:"backgrass1"},
        {src:"resources/world/ceilingrass.png", id:"ceilingrass"},
        {src:"resources/world/groundgrass.png", id:"groundgrass"},
        {src:"resources/world/backfon.png", id:"backfon"},
        //{src:"resources/img/WorldAssets-hd_easeljs.json", id:"JSON"}
        //{src:"resources/world/parallaxHill2.png", id:"BG"}
    ];

    var loader = new modelLoader({
        source :manifest,
        callback: handlLoad,
        LOAD: true
    });
    

    function handlLoad( models ){

        var os = [];

        var w = stage.canvas.width;
        var h = stage.canvas.height;


        //set walls bodys
        var wall = new PGObject({
            world:Model.GetWorld(),
            SCALE:Render.GetSCALE(),
            type_:"static"
        });
        
        wall.Set({
            skin: (new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,10,h)) ),
            type:"polygon",
            width: 10,
            height: h,
            pos: {x: 10/2,y: h/2}
        });
        /*wall.Set({
            skin: (new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,10,h)) ),
            type:"polygon",
            width: 10,
            height: h,
            pos: {x: w-10/2,y: h/2}
        });*/
        wall.Set({
            skin: (new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,w,10)) ),
            type:"polygon",
            width: w,
            height: 10,
            pos: {x: w/2,y: 10/2}
        });
        os.push(wall);

        var BG = new contextBack({
            stage:Render.GetStage()
        });
        //BG.AddSkin( "/resources/img/iP4_BGtile.jpg" );

        for (var i = 0; i < models.length; i++) {
            var item = models[i];
            var id = item.id;
            var result = loader.getResult(id);

            if (item.type == createjs.LoadQueue.IMAGE) {
                var bmp = new createjs.Bitmap(result);
            }

            switch (id) {
                case "backgrass1":

                    var b_mp = new createjs.Bitmap(result);
                    console.log(b_mp);                    
                    //BG.AddSkin( b_mp3 , {scale:300/b_mp3.image.height,speed: 5, y:/*(Render.GetHeight() - 100 )*b_mp.image.height/100*/0} );
                    BG.AddSkin( b_mp , {scale:100/b_mp.image.height,gap: 0,y:/*(Render.GetHeight() - 100 )*b_mp.image.height/100*/(Render.GetHeight() - 150)} );
                    break;
                case "ceilingrass":

                    var b_mp = new createjs.Bitmap(result);
                    console.log(b_mp);                    
                    //BG.AddSkin( b_mp3 , {scale:300/b_mp3.image.height,speed: 5, y:/*(Render.GetHeight() - 100 )*b_mp.image.height/100*/0} );
                    BG.AddSkin( b_mp , {scale:100/b_mp.image.height,gap: 0,y:/*(Render.GetHeight() - 100 )*b_mp.image.height/100*/0} );
                    break;
                case "groundgrass":

                    var b_mp = new createjs.Bitmap(result);
                    console.log(b_mp);                    
                    //BG.AddSkin( b_mp3 , {scale:300/b_mp3.image.height,speed: 5, y:/*(Render.GetHeight() - 100 )*b_mp.image.height/100*/0} );
                    //BG.AddSkin( b_mp , {scale:100/b_mp.image.height,gap: 20,y:(Render.GetHeight() - 100 )} );
                    var ground = new PGObject({  
                        type_: "static",                      
                        world:Model.GetWorld(),
                        SCALE:Render.GetSCALE()
                    });

                    ground.Set({
                        skin: {rotation: 0, x: 0, y: 0,skin_type: "auto"},
                        width: w,
                        height: 100,
                        type: "polygon",
                        pos: {x: w/2,y: (Render.GetHeight() - 50 )}
                    });
                    os.push(ground);
                    break;
                case "backfon":

                    var b_mp = new createjs.Bitmap(result);
                    //BG.AddSkin( b_mp3 , {scale:300/b_mp3.image.height,speed: 5, y:/*(Render.GetHeight() - 100 )*b_mp.image.height/100*/0} );
                    BG.AddSkin( b_mp , {scale:Render.GetHeight()/b_mp.image.height,speed: 5,y:0}, {id:0} );
                    break;
                default:
                    break;
            }
        }


        Model.AddModel( os );

        BG.Finalize();

        Model.AddModelToBegin( BG );

        Render.SetModel( Model );

        console.log(Render);


        Render.setStatElement(document.getElementById( 'viewport' ));

        /*Render.tick();
        Render.SetFPS( 15 );*/

        //Render.createDebuger(window.innerHeigth/12);

        Render.render();

    }

}

