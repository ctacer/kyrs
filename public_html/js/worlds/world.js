

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


    var contcListener = new ContactListener();
    contcListener.SetUp(world);


    var os = loadMap(world, PixelToMeter, h, w);


    window.Model = new Model({
        objs: os,
        world:world        
    });

    window.Controller = new Controller( {
        player: playee
    });

    window.Render = new Renderer({
        world: world,
        //stage:stage ,
        pxTmtr: PixelToMeter ,
        model: Model     
    });

    Render.setStatElement(document.getElementById( 'viewport' ));

    Render.createDebuger();

    Render.render();
    
  

}

function throwNewGravityFeature(){
    Render.world.SetGravity(new b2Vec2(0, -1*Render.world.GetGravity().y));
}