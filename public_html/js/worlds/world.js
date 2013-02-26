

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
    ,   b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef    ;
                



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
/*
    var playee = new Persona(PixelToMeter);
    playee.Initialize(world, {x: 100, y: 200});
*/

       

    var b1,b2,joint;
    var jointExperimentDef = new b2BodyDef();
    jointExperimentDef.type = b2Body.b2_staticBody;

    var jointExperimentFixture = new b2FixtureDef();
    jointExperimentFixture.density = 1;
    jointExperimentFixture.friction = 0.5;
    jointExperimentFixture.restitution = 0.2;

    var jointExperimentCubeShape = new b2PolygonShape();
    jointExperimentCubeShape.SetAsBox(2,1);
    jointExperimentDef.position.Set(2,6);

    jointExperimentFixture.shape = jointExperimentCubeShape;
    b1 = world.CreateBody(jointExperimentDef);
    b1.CreateFixture(jointExperimentFixture);

    jointExperimentDef.type = b2Body.b2_dynamicBody;

    var jointExperimentCircleShape = new b2CircleShape();
    jointExperimentCircleShape.SetRadius(1);
    jointExperimentDef.position.Set(4,5);

    jointExperimentFixture.shape = jointExperimentCircleShape;
    b2 = world.CreateBody(jointExperimentDef);
    b2.CreateFixture(jointExperimentFixture);

    

    var revoluteJointDef = new  b2RevoluteJointDef();
    revoluteJointDef.Initialize(b2, b1, b2.GetWorldCenter());
     
    revoluteJointDef.maxMotorTorque = 1.0;
    revoluteJointDef.enableMotor = true;

    revoluteJointDef.maxMotorTorque = 20;
    revoluteJointDef.motorSpeed = - Math.PI; //1 turn per second counter-clockwise
 
    world.CreateJoint(revoluteJointDef);

     




    

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
    os.push(wall);
    //os.push(playee);
    
  

    return {os:os,world:world,width:window.innerWidth,height:window.innerHeight,pixelToMeter:PixelToMeter};

}