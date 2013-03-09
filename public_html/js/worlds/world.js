

//

function definePhysicWorld() {
	

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
        ,  true                 //allow sleep
    );

    var w = window.innerWidth;
    var h = window.innerHeight;
	
    //define world objects

    var shape;

    
/*
    var playee = new Player(PixelToMeter);
    playee.setPhysic(world, {x: 100, y: 200});
*/

    var playee = new Persona(PixelToMeter);
    playee.Initialize(world, {x: 100, y: 200});

/*
    var rope1 = new Rope({world:world,length:2,scale:50});
    rope1.Initialize({x:300, y: 200});
    
*/

    var contcListener = new ContactListener();
    contcListener.SetUp(world);


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

    var ladder1 = new Ladder( { world:world });
    ladder1.Initialize({height:3,pos:{x:9,y:1.8}});

    var but = new SpecialButton({ world:world });
    but.Initialize({pos:{x:10,y:5}});

    var but2 = new SpecialButton({ world:world });
    but.Initialize({pos:{x:14,y:1}});
    

    var wall = new PGObject(world,"static",PixelToMeter);

    var pol = new b2PolygonShape();
    pol.SetAsArray([new b2Vec2(0,h),new b2Vec2(0,h-40),
        new b2Vec2(w,h-150),new b2Vec2(w,h)],4);
    wall.setPhysic(pol,{x:0,y:0});

    var pol2 = new b2PolygonShape();
    pol2.SetAsArray([new b2Vec2(w-10,0),new b2Vec2(w,0),
        new b2Vec2(w,h),new b2Vec2(w-10,h)],4);

    wall.setPhysic(pol2,{x:0,y:0});

    var pol3 = new b2PolygonShape();
    pol3.SetAsArray([new b2Vec2(0,h),new b2Vec2(0,0),
        new b2Vec2(10,0),new b2Vec2(10,h)],4);

    wall.setPhysic(pol3,{x:0,y:0});   

    var pol4 = new b2PolygonShape();
    pol4.SetAsArray([new b2Vec2(0,0),new b2Vec2(w,0),
        new b2Vec2(w,10),new b2Vec2(0,10)],4);

    wall.setPhysic(pol4,{x:0,y:0});   
/*
    var pol4 = new b2PolygonShape();
    pol4.SetAsBox( w/2, 10);

    wall.setPhysic(pol4,{x:w/2,y:20});   */
    
    /*
    var rope1 = new Rope({world:world,length:2,scale:50,count:2});
    rope1.Initialize({body:wall.phys[3],shape:wall.shapes[3]},{x:300, y: 100});
    
    */


    //console.log(wall);
    var os = [];    
    os.push(wall);
    //os.push(playee);
    
  

    return {os:os,world:world,width:window.innerWidth,height:window.innerHeight,pixelToMeter:PixelToMeter};

}

function throwNewGravityFeature(){
    Render.world.SetGravity(new b2Vec2(0, -1*Render.world.GetGravity().y));
}