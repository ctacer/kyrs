

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
                

    setToolbox();



    window.Model = new Model({
        gravity: {x: 0, y: 10},
        SCALE: 50        
    });
	
    var playee = new Persona(Model.GetScale());
    playee.Initialize(Model.GetWorld(), {x: 100, y: 200});

    Model.AddModel( playee );
    //Model.objs[0].bodys['wheel'].SetAngularVelocity(15);


    spriteSheet ={"animations": { "stand":[59], "run": [0, 25], "jump": [26, 63]}, "images": ["/resources/world/runningGrant.png"], "frames": {"regX": 165.75/2, "height": 292.5, "count": 64, "regY": 292.5/2, "width": 165.75}};

    var ss = new createjs.SpriteSheet(spriteSheet);
    //ss.addEventListener("complete", function(event){});
    grant = new createjs.BitmapAnimation(ss);

    // Set up looping
    ss.getAnimation("stand").next = "stand";
    ss.getAnimation("run").next = "run";
    ss.getAnimation("jump").next = "stand";
    grant.gotoAndPlay("stand");

    grant.scaleX = 0.12;
    grant.scaleY = 0.24;

    playee.SetSkin( grant );


    /*var contcListener = new ContactListener();
    contcListener.SetUp(world);
    */

    window.Controller = new Controller( {
        player: playee
    });

    var canvas = document.getElementById("canvas");
    var stage = new createjs.Stage(canvas);

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

        window.Render = new Renderer({
            world: Model.GetWorld(),
            stage:stage ,
            SCALE: Model.GetScale() 
            //model: Model     
        });

        var w = stage.canvas.width;
        var h = stage.canvas.height;


        //set walls bodys
        var wall = new PGObject({
            world:Model.GetWorld(),
            SCALE:Model.GetScale(),
            type_:"static"
        });
        
        wall.Set({
            skin: (new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,10,h)) ),
            type:"polygon",
            width: 10/Model.GetScale(),
            height: h/Model.GetScale(),
            pos: {x: 10/2,y: h/2}
        });
        wall.Set({
            skin: (new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,10,h)) ),
            type:"polygon",
            width: 10/Model.GetScale(),
            height: h/Model.GetScale(),
            pos: {x: w-10/2,y: h/2}
        });
        wall.Set({
            skin: (new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,w,10)) ),
            type:"polygon",
            width: w/Model.GetScale(),
            height: 10/Model.GetScale(),
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
                    BG.AddSkin( b_mp , {scale:100/b_mp.image.height,gap: 20,y:(Render.GetHeight() - 100 )} );
                    break;
                case "backfon":

                    var b_mp = new createjs.Bitmap(result);
                    console.log(b_mp);                    
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

        Render.render();

    }

}

