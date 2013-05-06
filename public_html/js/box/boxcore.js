

//boxcore

window.onload = function(){

    window.GAME = { STATE:"GAME_WAIT", _states:{"wait":"GAME_WAIT","ready": "GAME_READY","on": "GAME_ON","pause": "GAME_PAUSE","over": "GAME_OVER"},
    loaderEl : document.getElementById("loaderEl"), loaderNum : 0};
    this.loaderEl.style.display = "inline";
    GAME.stepLoader = function(){
        this.loaderNum = (this.loaderNum)%3 + 1;
        var _str = window.getComputedStyle(this.loaderEl, null).backgroundImage;
        _str = _str.replace( /(\d)(\.png)/g , (this.loaderNum + 1) + "\.png" );
        this.loaderEl.style.backgroundImage = _str;
        //console.log(_str);
    }
    GAME.endLoader = function(){
        this.loaderEl.style.display = "none";
    }
    GAME.ready = function(){
        this.STATE = this._states["ready"];
        document.getElementById('layer1').style.display = "inline";
        document.getElementById('control_panel').style.display = "inline";
    }
    GAME.toogle = function(){}


    document.getElementById("start_button").addEventListener('click',function(){
        GAME.toogle();
    },false);

    document.getElementById("settings_button").addEventListener('click',function(){
        
    },false);


    document.getElementById("help_button").addEventListener('click',function(){
            var el = document.getElementById("help_panel");
            el.style.display = "inline";
    },false);
    
    document.getElementById("close_button").addEventListener('click',function(){
            var el = document.getElementById("help_panel");
            el.style.display = "none";
    },false);

    window.addEventListener('keydown',function(event){
        //console.log(event.keyCode);
        if(event.keyCode == 70){//F key
            toggleFullScreen();            
        }
        if(event.keyCode == 80){//P key
            GAME.toogle();
        }
    },false);

    function toggleFullScreen() {
      if (!document.fullscreenElement &&    // alternative standard method
          !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    }

    load();


}

function load(){
	

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

    window.playee = new Persona({SCALE: Render.GetSCALE() });
    playee.Initialize(Model.GetWorld(), {x: 100, y: 200});

    Model.AddModel( playee );


    var contcListener = new ContactListener();
    contcListener.SetUp(Model.GetWorld() );


    //spriteSheet ={"animations": { "stand":[59], "run": [0, 25], "jump": [26, 63]}, "images": ["/resources/world/runningGrant.png"], "frames": {"regX": 165.75/2, "height": 292.5, "count": 64, "regY": 292.5/2, "width": 165.75}};
    /*
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", handleTick);
    */    
    
    var skin;

    var manifest = [
        {src:"resources/persona/Pixie/pixie_easel.png", id:"player", callback:playerComplete},
        {src:"resources/world/groundgrass.png", id:"groundgrass", callback:groundgrassComplete},

        {src:"resources/world/backfon.png", id:"backfon", callback:backfonComplete},

        {src:"resources/world/backgrass1.png", id:"backgrass1", callback:backgrass1Complete},
        {src:"resources/world/up_back.png", id:"up_back", callback:up_backComplete},

        {src:"resources/world/upgrass.png", id:"upgrass", callback:upgrassComplete},
        {src:"resources/world/tree1.png", id:"tree1", callback:tree1Complete},
        {src:"resources/world/tree2.png", id:"tree2", callback:tree2Complete},

        {src:"resources/world/Lava.png", id:"Lava", callback:lavaComplete},
        {src:"resources/world/leaves1.png", id:"leaves1", callback:leaves1Complete},
        {src:"resources/world/leaves2.png", id:"leaves2", callback:leaves2Complete},
        {src:"resources/world/leaves3.png", id:"leaves3", callback:leaves3Complete},

        {src:"resources/world/ceilingrass.png", id:"ceilingrass", callback:ceilingrassComplete}
/*

*/
        //{src:"resources/img/WorldAssets-hd_easeljs.json", id:"JSON"}
        //{src:"resources/world/parallaxHill2.png", id:"BG"}
    ];

    var os = [];

    var w = stage.canvas.width;
    var h = stage.canvas.height;

    var BG;

    preLoad();

    function preLoad(){

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
        os.push(wall);

        BG = new contextBack({
            stage:Render.GetStage()
        });
    }

    var loader = new modelLoader({
        source :manifest,
        callback: handlLoad,
        LOAD: true
    });

    //0
    function backfonComplete( model ){
        var b_mp = new createjs.Bitmap( model.tag );
        //BG.AddSkin( b_mp3 , {scale:300/b_mp3.image.height,speed: 5, y:0} );
        BG.AddSkin( b_mp , {scale:Render.GetHeight()/b_mp.image.height,speed:0.3,y:0}, {id:0} );
        GAME.stepLoader();
    }

    //1
    function backgrass1Complete( model ){
        var b_mp = new createjs.Bitmap( model.tag );
        //console.log(b_mp);                    
        //BG.AddSkin( b_mp3 , {scale:300/b_mp3.image.height,speed: 5, y:0} );
        BG.AddSkin( b_mp , {scale:Render.GetHeight()/(2.25*b_mp.image.height),gap: 0,speed:0.5,y:(Render.GetHeight()*1.25/2.25)}, {id:1} );
        GAME.stepLoader();
    }
    function up_backComplete( model ){
        //console.log( model.tag );        
        var b_mp = new createjs.Bitmap( model.tag );
        //console.log(b_mp);
        BG.AddSkin( b_mp , {scale:Render.GetHeight()/(4*b_mp.image.height),gap: 0,speed:0.5,y:0}, {id:1} );
        GAME.stepLoader();
    }      

    //2
    function tree1Complete( model ){
        //console.log( model.tag );        
        var b_mp = new createjs.Bitmap( model.tag );
        //console.log(b_mp);
        BG.AddSkin( b_mp , {scale:Render.GetHeight()/(1.25*b_mp.image.height),gap: 0,widthScale: 4,speed:0.6,y:(Render.GetHeight()*0.25/5)}, {id:2} );    
        GAME.stepLoader();
    }
    function tree2Complete( model ){
        //console.log( model.tag );        
        var b_mp = new createjs.Bitmap( model.tag );
        //console.log(b_mp);
        BG.AddSkin( b_mp , {scale:Render.GetHeight()/(1.25*b_mp.image.height),gap: 0,widthScale: 5,speed:0.6,x:-Render.GetWidth()/2, y:(Render.GetHeight()*0.25/5)}, {id:2} );        
        GAME.stepLoader();
    }

    //3
    function upgrassComplete( model ){
        //console.log( model.tag );
        var b_mp = new createjs.Bitmap( model.tag );
        //console.log(b_mp);
        BG.AddSkin( b_mp , {scale:Render.GetHeight()/(4*b_mp.image.height),gap: 0,speed:0.6,y:0}, {id:3} );
        GAME.stepLoader();
    }

    //4
    function leaves1Complete( model ){
        //console.log( model.tag );
        var b_mp = new createjs.Bitmap( model.tag );
        //console.log(b_mp);
        BG.AddSkin( b_mp , {scale:Render.GetHeight()*2/(3*b_mp.image.height),gap: 0,widthScale:30,speed:0.8,y:0}, {id:4} );
        GAME.stepLoader();
    }
    function leaves2Complete( model ){
        //console.log( model.tag );
        var b_mp = new createjs.Bitmap( model.tag );
        //console.log(b_mp);
        BG.AddSkin( b_mp , {scale:Render.GetHeight()*2/(3*b_mp.image.height),gap: 0,widthScale:30,speed:0.8,x:-30,y:0}, {id:4} );
        GAME.stepLoader();
    }
    function leaves3Complete( model ){
        //console.log( model.tag );
        var b_mp = new createjs.Bitmap( model.tag );
        //console.log(b_mp);
        BG.AddSkin( b_mp , {scale:Render.GetHeight()*2/(3*b_mp.image.height),gap: 0,widthScale:30,speed:0.8,x:-60,y:0}, {id:4} );
        GAME.stepLoader();
    }
    function lavaComplete( model ){
        //console.log( model.tag );        
        var b_mp = new createjs.Bitmap( model.tag );
        //console.log(b_mp);
        BG.AddSkin( b_mp , {scale:Render.GetHeight()/(2.75*b_mp.image.height),gap: 0,speed:0.8,y:(Render.GetHeight()*1.75/2.75)}, {id:4} );
        GAME.stepLoader();
    }

    //5
    function ceilingrassComplete( model ){
        //console.log(result);
        var b_mp = new createjs.Bitmap( model.tag );
        //console.log(b_mp);                    
        //BG.AddSkin( b_mp3 , {scale:300/b_mp3.image.height,speed: 5, y:0} );
        BG.AddSkin( b_mp , {scale:Render.GetHeight()/(6*b_mp.image.height),gap: 0,speed:1,y:0}, {id:5} );
        GAME.stepLoader();
    }
    function groundgrassComplete( model ){
        var b_mp = new createjs.Bitmap( model.tag );
        //console.log(b_mp);                    
        //BG.AddSkin( b_mp3 , {scale:300/b_mp3.image.height,speed: 5, y:/*(Render.GetHeight() - 100 )*b_mp.image.height/100*/0} );
        //BG.AddSkin( b_mp , {scale:100/b_mp.image.height,gap: 20,speed:0,y:(Render.GetHeight() - 100 )} );
        var ground = new PGObject({  
            type_: "static",                      
            world:Model.GetWorld(),
            SCALE:Render.GetSCALE()
        });

        ground.Set({
            skin: b_mp,//{rotation: 0, x: 0, y: 0,skin_type: "auto"},
            skinProperty: {gap:{left:12,right:12}},
            width: 5*w,
            height: Render.GetHeight()/4,
            //scale: {h:3,w:1},
            gap:{y:Render.GetHeight()/12},
            type: "polygon",/*
            speed: 0,*/
            pos: {x: 5*w/2,y: (7*Render.GetHeight()/8 )}
        });
        Model.AddModelToBegin(ground);

        Render.SetEdges( {left:0, right:5*w} );
        //os.splice(0,0,ground);
        GAME.stepLoader();
    }

    function playerComplete( model ){
        var b_mp = new createjs.Bitmap( model.tag );

        spriteSheet = {
            "images": [model.tag],"frames": [

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
            }
        }

        var ss = new createjs.SpriteSheet(spriteSheet);
        //ss.addEventListener("complete", function(event){});
        grant = new createjs.BitmapAnimation(ss);

        // Set up looping
        ss.getAnimation("fall").next = "fall";
        ss.getAnimation("run").next = "run";
        ss.getAnimation("flat").next = "flat";
        grant.gotoAndPlay("stand");
        //grant.scaleX = grant.scaleY = Render.GetHeight()/650;

        playee.SetSkin( grant, Render.GetHeight()/650 );
        GAME.stepLoader();
    }    

    function handlLoad( models ){

        //BG.AddSkin( "/resources/img/iP4_BGtile.jpg" );
/*
        for (var i = 0; i < models.length; i++) {
            var item = models[i];
            var id = item.id;
            var result = loader.getResult(id);

            if (item.type == createjs.LoadQueue.IMAGE) {
                var bmp = new createjs.Bitmap(result);
            }

            switch (id) {
                case "backgrass1":
                default:
                    break;
            }
        }
*/

        Model.AddModel( os );

        BG.Finalize();

        //Model.AddModelToBegin( BG );

        Render.SetModel( Model, BG );
        Render.SetEdgesFromModel();

        console.log(Render);


        Render.setStatElement(document.getElementById( 'viewport' ));

        window.Controller = new Controller( {
            player: playee,
            render: Render
        });

        Render.SetController(Controller);

        GAME.ready();

        GAME.toogle = function(){
            if( this.STATE == this._states["ready"] ){
                window.Render.ToogleGame();
                GAME.STATE = GAME._states["pause"];
            }
            if(this.STATE == this._states["pause"]){
                GAME.STATE = GAME._states["on"];
                Controller.Toogle();
                window.Render.ToogleGame();
                document.getElementById("control_panel").style.display = "none";
                document.getElementById("layer1").style.display = "none";
            }
            else if(this.STATE == this._states["on"]){
                GAME.STATE = GAME._states["pause"];
                Controller.Toogle();
                window.Render.ToogleGame();
                document.getElementById("control_panel").style.display = "inline";
                document.getElementById("layer1").style.display = "inline";
                return;
            }
        }
        GAME.endLoader();
        Render.render();

        /*Render.tick();
        Render.SetFPS( 15 );*/

        //Render.createDebuger( window.innerHeight/12 );

        //Render.render();

    }

}

