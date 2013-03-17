

function loadMap( world, PixelToMeter, h, w ){
	
	var mapbodys = [];


    var rope1; 
    {
        //ceallin creatin

        var jointExperimentDef = new b2BodyDef();    

        var jointExperimentFixture = new b2FixtureDef();
        jointExperimentFixture.density = 1;
        jointExperimentFixture.friction = 0.5;
        jointExperimentFixture.restitution = 0.2;

        var jointExperimentCircleShape = new b2PolygonShape();
        jointExperimentCircleShape.SetAsBox( 2,0.1 );
        jointExperimentFixture.shape = jointExperimentCircleShape;

        jointExperimentDef.position.Set( 4, 0.5 );
        var ceallin = world.CreateBody(jointExperimentDef);
        ceallin.CreateFixture(jointExperimentFixture);


        rope1 = new Rope({world:world,length:2,scale:50,count:10});
        rope1.Initialize({body:ceallin },{x:150, y: 25});
        console.log(rope1);

    }

    //push rope

    var ladder1 = new Ladder( { world:world });
    ladder1.Initialize({height:3,pos:{x:9,y:1.8}});

    var but = new SpecialButton({ world:world });
    but.Initialize({pos:{x:10,y:5}});

    var but2 = new SpecialButton({ world:world });
    but.Initialize({pos:{x:14,y:1}});

    //push buts after
    

    var wall = new PGObject(world,"static",PixelToMeter);

    var pol = new b2PolygonShape();
    pol.SetAsArray([new b2Vec2(0,h),new b2Vec2(0,h-0.8),
        new b2Vec2(w,h-3),new b2Vec2(w,h)],4);
    wall.setPhysic({
        shape:pol,
        pos:{x:0,y:0}
    });

    var pol2 = new b2PolygonShape();
    pol2.SetAsArray([new b2Vec2(w-0.2,0),new b2Vec2(w,0),
        new b2Vec2(w,h),new b2Vec2(w-0.2,h)],4);

    wall.setPhysic({
        shape:pol2,
        pos:{x:0,y:0}
    });

    var pol3 = new b2PolygonShape();
    pol3.SetAsArray([new b2Vec2(0,h),new b2Vec2(0,0),
        new b2Vec2(0.2,0),new b2Vec2(0.2,h)],4);

    wall.setPhysic({
        shape:pol3,
        pos:{x:0,y:0}
    });   

    var pol4 = new b2PolygonShape();
    pol4.SetAsArray([new b2Vec2(0,0),new b2Vec2(w,0),
        new b2Vec2(w,0.2),new b2Vec2(0,0.2)],4);

    wall.setPhysic({
        shape:pol4,
        pos:{x:0,y:0}
    });   

    mapbodys.push(wall);

	return mapbodys;

}