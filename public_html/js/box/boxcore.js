

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
                        world:Model.GetWorld(),
                        SCALE:Model.GetScale(),
                        type_:"static"
                    });
                    
                    groundPhys.Set( {
                        skin: ground,
                        type:"polygon",
                        width:(w)/Model.GetScale(),
                        height:(79)/Model.GetScale(),
                        pos:{x: w/2,y: (h-79/2)}
                    } );
                    os.push(groundPhys);
                    

                    
                    break;
                case "hill":
                    hill = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,282,59));
                    hill.scaleX = hill.scaleY = 1;                    
                    hill.regX = 141;
                    hill.regY = 29.5;
                    var hillX = 1 * w/2 ;                    
                    hill.x = hillX;
                    hill.y = 59/2;
/*
                    console.log(Render.GetStage());
                    var back_hill = new Background({
                        stage: Render.GetStage(),
                        title: "hill",
                        skin:hill,
                        callback: "x+=5;loopx=(-100)"
                    });
                    console.log(back_hill.skins.length);
                    //os.push( back_hill );
                    Model.AddModelToBegin( back_hill );*/

                    /*var box = new PGObject({
                        world:Model.GetWorld(),
                        SCALE:Model.GetScale(),
                        type_:"dynamic"
                    });

                    box.Set( {
                        skin: hill,
                        type:"polygon",
                        width:(282)/Model.GetScale(),
                        height:(59)/Model.GetScale(),
                        pos:{x: hillX,y: (59/2)}
                    } );
                    os.push(box);
                    */

                    break;
                case "hill2":
                    hill2 = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,212,50));
                    hill2.x = Math.random() * w;
                    hill2.scaleX = hill2.scaleY = 3;
                    hill2.y = h - 79 - 125;/*
                    var bmp  = new createjs.Bitmap(result);
                    var bmp2  = new createjs.Bitmap(result);
                    bmp.x = 0;bmp.y = 0;
                    bmp.sourceRect = new createjs.Rectangle(112, 0, 100, 50);
                    bmp2.x = 100;bmp.y = 0;
                    bmp2.sourceRect = new createjs.Rectangle(0, 0, 112, 50);
                    console.log( bmp2.image.width * bmp2.scaleX );
                    bmp2.scaleX = bmp2.scaleY = 0.5;
                    console.log( bmp2.image.width * bmp2.scaleX );
                    //Render.stage.addChild(bmp);
                    var container = new createjs.Container();
                    var container2 = new createjs.Container();
                    container.addChild(bmp,bmp2);
                    container.x = 200;container.y = 50;
                    container2.x = 250;container2.y = 50;
                    var bmp3 = bmp.clone();
                    bmp3.x = 0;
                    Render.stage.addChild(container2);
                    container2.addChild(bmp3);
                    Render.stage.addChild(container);
                    console.log( container2 );
                    console.log( container2.getChildAt(1) );
                    console.log( Render.stage.canvas.width );*/

                    break;
            }
        }
/*
        var backG = new PGObject({
            world:Model.GetWorld(),
            SCALE:Model.GetScale(),
            type_:"static"
        });
        
        backG.Set( {
            skin: ground,
            type:"polygon",
            width:(w)/Model.GetScale(),
            height:(79)/Model.GetScale(),
            pos:{x: w/2,y: (h-79/2)}
        } );
        os.push(backG);*/

        Model.AddModel( os );

        var BG = new contextBack({
            stage:Render.GetStage()
        });
        BG.AddSkin( "/resources/img/iP4_BGtile.jpg" );
        Model.AddModelToBegin( BG );
        //Render.SetBG( BG );

        Render.SetModel( Model );

        console.log(Render);


        Render.setStatElement(document.getElementById( 'viewport' ));

        //Render.createDebuger();

        Render.render();

    }

}

