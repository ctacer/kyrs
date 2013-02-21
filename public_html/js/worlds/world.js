

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
    ,   b2JointDef = Box2D.Dynamics.Joints.b2JointDef  ;
                



    var PixelToMeter = 50;

    var world = new b2World(
        new b2Vec2(0, 10)    //gravity
        ,  true                 //allow sleep
    );

    var w = window.innerWidth;
    var h = window.innerHeight;
	
    //define world objects

    var shape;

    var cub = new PGObject(world,"dynamic",PixelToMeter);

    shape = new b2PolygonShape();
    shape.SetAsArray([new b2Vec2(w/2+30,180),new b2Vec2(w/2+30,240),new b2Vec2(w/2-30,240),new b2Vec2(w/2-30,180)],4); 

    cub.setPhysic(shape);
    
    var ball = new PGObject(world,"dynamic",PixelToMeter);    

    shape = new b2CircleShape();
    shape.SetRadius(50);
    ball.setPhysic(shape,{x:w/2,y:100});  

    //distance ball body
    shape.SetRadius(40);
    ball.setPhysic( shape,{x:w/2-200,y:120} );
    ball.JointBodys('DISTANCE',0,1);

    var playee = new Player(PixelToMeter);
    playee.setPhysic(world, {x: 100, y: 200});


    

    var wall = new PGObject(world,"static",PixelToMeter);

    var pol = new b2PolygonShape();
    pol.SetAsArray([new b2Vec2(0,h),new b2Vec2(0,h-40),
        new b2Vec2(w,h-10),new b2Vec2(w,h)],4);
    wall.setPhysic(pol,{x:0,y:0});

    var pol2 = new b2PolygonShape();
    pol2.SetAsArray([new b2Vec2(w-10,0),new b2Vec2(w,0),
        new b2Vec2(w,h),new b2Vec2(w-10,h)],4);

    wall.setPhysic(pol2,{x:0,y:0});


    var os = [];
    os.push(ball);
    os.push(wall);
    os.push(cub);
    os.push(playee);
    


    return {os:os,world:world,width:w,height:h,pixelToMeter:PixelToMeter};

}