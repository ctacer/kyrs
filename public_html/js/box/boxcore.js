

//boxcore

window.onload = function(){

    window.GAME = { STATE:"GAME_WAIT", _states:{"wait":"GAME_WAIT","ready": "GAME_READY","on": "GAME_ON","pause": "GAME_PAUSE","over": "GAME_OVER"},
    loaderEl : document.getElementById("loaderEl"), loaderNum : 0, SCORE: 0,ScoreEl : document.getElementById("ScoreEl"),gameOverEl : document.getElementById("gameOverEl")};
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
    GAME.over = function(){
        this.toogle();
        this.gameOverEl.style.display = "inline";
        this.STATE = this._states["over"];
    }
    GAME.restart = function(){        
        this.gameOverEl.style.display = "none;"
        load();
    }

    GAME.ready = function(){
        this.STATE = this._states["ready"];
        document.getElementById('layer1').style.display = "inline";
        document.getElementById('control_panel').style.display = "inline";
    }
    GAME.toogle = function(){}
    GAME.stepScore = function(){
        this.SCORE += 10;
        this.ScoreEl.innerHTML = this.SCORE;
        playee.POWER = this.SCORE%100;
    }


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

    window.logSkin = function( idskin ){
        console.log("skin x\t" + Render.backModel.skins[idskin].x );
        console.log("skin edge\t");
        console.log(Render.backModel.skins[idskin].Edge);
        console.log("children x\t");
        for (var i = 0; i < Render.backModel.skins[idskin].children.length; i++) {
            console.log(Render.backModel.skins[idskin].children[i].x);
        };
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



    window.Model = new ModelCreator({
        gravity: {x: 0, y: 25}/*,
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
        {src:"resources/persona/Pixie/pixie_array_full.png", id:"player", callback:playerComplete},
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

        {src:"resources/world/ceilingrass.png", id:"ceilingrass", callback:ceilingrassComplete},

        {src:"resources/world/pixie objs/candy.png", id:"candy", callback:pixiObjComplete},
        {src:"resources/world/pixie objs/watermelon.png", id:"watermelon", callback:pixiObjComplete},
        {src:"resources/world/pixie objs/guitar.png", id:"guitar", callback:pixiObjComplete},
        {src:"resources/world/pixie objs/panda.png", id:"panda", callback:pixiObjComplete},
        {src:"resources/world/pixie objs/phone.png", id:"phone", callback:pixiObjComplete},
        {src:"resources/world/pixie objs/rainbow.png", id:"rainbow", callback:pixiObjComplete},
        {src:"resources/world/pixie objs/smile.png", id:"smile", callback:pixiObjComplete},
        {src:"resources/world/pixie objs/unicorn.png", id:"unicorn", callback:pixiObjComplete},
        {src:"resources/world/pixie objs/shine.png", id:"shine", callback:pixiShineObjComplete},
        {src:"resources/world/bad_box.png", id:"bad_box", callback:bad_boxeObjComplete}


/*

*/
        //{src:"resources/img/WorldAssets-hd_easeljs.json", id:"JSON"}
        //{src:"resources/world/parallaxHill2.png", id:"BG"}
    ];

    var os = [];
    var pixiObjs = [];
    var pixiShine = null,bad_box = null;

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
        wall.Set({
            skin: (new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,10,h)) ),
            type:"polygon",
            width: 10,
            height: h,
            pos: {x: 15*w - 10/2,y: h/2}
        });
        wall.Set({
            skin: (new createjs.Shape(new createjs.Graphics().beginFill("#000000").drawRect(0,0,10,h)) ),
            type:"polygon",
            width: 15*w,
            height: 10,
            fixtureProperty: {friction: 0, restitution: 0, density: 1},
            pos: {x: 15*w/2,y: 5}
        });
        //6*w/2
        os.push(wall);

        BG = new contextDiv({
            stage:Render.GetStage()
        });
    }

    var loader = new modelLoader({
        source :manifest,
        callback: handlLoad,
        LOAD: true
    });

    function pixiShineObjComplete( model ){
        pixiShine = new createjs.Bitmap( model.tag );
        GAME.stepLoader();
    }

    function bad_boxeObjComplete( model ){
        bad_box = new createjs.Bitmap( model.tag );
        GAME.stepLoader();
    }

    function pixiObjComplete( model ){
        var b_mp = new createjs.Bitmap( model.tag );
        
        var setter = {
            scale: {w:1.4,h:1.4},
            skin: b_mp,//{rotation: 0, x: 0, y: 0,skin_type: "auto"},
            width: b_mp.image.width,//*(Render.GetWidth()/650),
            height: b_mp.image.height,//*(Render.GetHeight()/650),
            //scale: {h:3,w:1},            
            type: "circle",
            bodyName: "pixiObj",
            skinProperty: {accurate:true},/*
            speed: 0,*/
            pos: {x: 0,y: 0 }
        }
        pixiObjs.push(setter);

        GAME.stepLoader();
    }

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
            width: 15*w,
            height: Render.GetHeight()/4,
            //scale: {h:3,w:1},
            gap:{y:1/3},
            type: "polygon",/*
            speed: 0,*/
            pos: {x: 15*w/2,y: (7*Render.GetHeight()/8 )}
        });

        Model.AddModelToBegin(ground);

        Render.SetEdges( {left:0, right:15*w, up: 0, down:Render.GetHeight()*(10/12)} );
        //os.splice(0,0,ground);
        GAME.stepLoader();
    }

    function playerComplete( model ){
        var b_mp = new createjs.Bitmap( model.tag );


        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                onSpriteLoaded(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET","/resources/persona/Pixie/pixie_array_full.json",true);
        xmlhttp.send();
/*
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
        }*/

        function onSpriteLoaded( text ){
            var spriteSheet = JSON.parse(text);
            console.log(spriteSheet);
            spriteSheet.images[0] = model.tag;

            var ss = new createjs.SpriteSheet(spriteSheet);
            //ss.addEventListener("complete", function(event){});
            grant = new createjs.BitmapAnimation(ss);

            // Set up looping
            /*ss.getAnimation("fallL").next = "fallL";
            ss.getAnimation("fallR").next = "fallR";
            ss.getAnimation("runL").next = "runL";
            ss.getAnimation("runR").next = "runR";
            ss.getAnimation("flatL").next = "flatL";
            ss.getAnimation("flatR").next = "flatR";*/
            grant.gotoAndPlay("standR");
            //grant.scaleX = grant.scaleY = Render.GetHeight()/650;

            playee.SetSkin( grant, Render.GetHeight()/650 );
            GAME.stepLoader();
        }
        
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
        var ob = setPixiObjs(pixiObjs, pixiShine , bad_box, (Render.GetEdges().right - Render.GetEdges().left - 2*Render.GetWidth() ));
        console.log(ob);
        Model.AddModel( ob );

        Model.AddModel( os );

        BG.Finalize();

        /*BG = new contextDiv({
            stage:Render.GetStage()
        });*/

        //Model.AddModelToBegin( BG );

        Render.SetModel( Model, BG );
        Render.SetEdgesFromModel();

        console.log(Render);


        Render.setStatElement(document.getElementById( 'viewport' ));

        window.Controller = new ControllerClass( {
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
            if (this.STATE == this._states["over"]){
                //GAME.STATE = GAME._states["pause"];
                console.log("restart");
                document.getElementById("gameOverEl").style.display = "none";
                Render.RESTART = true;
                Model = null;
                playee = null;
                Controller = null;
                Render = null;
                this.restart();
            }
            if(this.STATE == this._states["pause"]){
                GAME.STATE = GAME._states["on"];
                window.Render.ToogleGame();
                Controller.Toogle();
                document.getElementById("control_panel").style.display = "none";
                document.getElementById("layer1").style.display = "none";
            }
            else if(this.STATE == this._states["on"]){
                GAME.STATE = GAME._states["pause"];
                window.Render.ToogleGame();
                Controller.Toogle();
                document.getElementById("control_panel").style.display = "inline";
                document.getElementById("layer1").style.display = "inline";
                return;
            }
        }
        GAME.endLoader();
        //Render.createDebuger( /*window.innerHeight/12*/ );
        
        //Render.stressTest(3*60);
        Render.render();

        /*Render.tick();
        Render.SetFPS( 15 );*/

        //Render.render();

    }

}

function setPixiObjs( arr , shinebg , box , activewidth){

    var ret = [];
    var obs = new PGObject({  
        type_: "static",                      
        world:Model.GetWorld(),
        SCALE:Render.GetSCALE()
    });
    
    var temp = obs,boxObj = obs.clone(),curPos = {x: Render.GetWidth()*2, y: 320, yy: 320},sign = 1;
    console.log(Render.GetEdges().down);
    var count = Math.round(activewidth*0.7/200);
    var countb = count - Math.round(activewidth*0.3/200);
    var delta = Render.GetWidth()/2;
    //count = 10;
    for (var i = 0; i < count; i++) {
        temp = obs.clone();
        var rand = Math.random();
         if(rand <= 0.35){
            sign = 1;
         }
         else if(rand <= 0.65)
            sign = 0
        else
            sign = -1;
        var ind = Math.round(Math.random()*(arr.length -1) );
        if(i % countb == 0)
            curPos.x += delta;
        curPos.x += 200 ;
        curPos.y += sign*80;
        if(curPos.y > Render.GetEdges().down){
            curPos.y -= sign*80;
        }
        if(curPos.y < Render.GetEdges().up){
            curPos.y -= sign*80;
        }

        if(curPos.y < Render.GetEdges().down/4){
            curPos.yy = Render.GetEdges().down/2 + 80;
        }
        else if(curPos.y < Render.GetEdges().down*2/4){
            curPos.yy = Render.GetEdges().down - 80;
        }
        else if(curPos.y < Render.GetEdges().down*3/4){
            curPos.yy = Render.GetEdges().up + 80;
        }
        else if(curPos.y < Render.GetEdges().down ){
            curPos.yy = Render.GetEdges().up/2 - 80;
        }

        //box
        if(i%2 == 0 && curPos.yy != null){
            boxObj = obs.clone();
            boxObj.Set({
                //scale: {w:1.4,h:1.4},
                skin: box.clone(),
                width: box.image.width,
                height: box.image.height,          
                type: "polygon",
                gap: {y:1/3,x:1/3},
                bodyName: "killObj",
                skinProperty: {accurate:true},
                pos: {x: curPos.x + 100, y: curPos.yy },
                shiftskin : true
            });
            ret.push(boxObj);
        }

        arr[ind].pos = {x: curPos.x, y: curPos.y };
        arr[ind].skin = arr[ind].skin.clone();
        arr[ind].shiftskin = true;
        arr[ind].isSensor = true;
        temp.Set(arr[ind]);
        //console.log(curPos);
        temp.Set({
            scale: {w:1.4,h:1.4},
            skin: shinebg.clone(),
            width: shinebg.image.width,
            height: shinebg.image.height,          
            type: "circle",
            shiftskin: true,
            bodyName: "pixiObj",
            skinProperty: {accurate:true},
            pos: {x: curPos.x, y: curPos.y },
            DISABLEBODY : true
        });
        temp.setAction( function(body,skins){
            body.SetAngle( body.GetAngle() + Math.PI/180);
            /*if( Math.round(body.GetAngle()*180) % 6 == 0)
                for (var i = 0; i < skins.length; i++) {
                    skins[i].actX = (1 + Math.random()/10);
                    skins[i].actY = (1 + Math.random()/10);
                };*/
        });
        ret.push(temp);
    }
    

    return ret;

}

