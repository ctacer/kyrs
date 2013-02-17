


window.addEventListener('load',function(e){


	//window.addEventListener('resize',resizer,false);


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
        ,  b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef ;

            

    var world = new b2World(
        new b2Vec2(0, 10)    //gravity
        ,  true                 //allow sleep
    );
	

    var stage = new Kinetic.Stage({
		container :'container',
		width: window.innerWidth,
		height: window.innerHeight
	});

    var ball = new PGObject(world,"dynamic");
    ball.bindStage(stage);

    var shape = new b2CircleShape();
    shape.SetRadius(50);
    ball.setPhysic(shape,{x:window.innerWidth/2,y:100});  

    var w = window.innerWidth;
    var h = window.innerHeight;

    var wall = new PGObject(world,"static");
    wall.bindStage(stage);

    var pol = new b2PolygonShape();
    pol.SetAsArray([new b2Vec2(0,h),new b2Vec2(0,h-40),new b2Vec2(w,h-10),new b2Vec2(w,h)/*,new b2Vec2(w,0),
    	new b2Vec2(w,h)*/],4);
    wall.setPhysic(pol,{x:0,y:0});
    var pol2 = new b2PolygonShape();
    pol2.SetAsArray([new b2Vec2(w-10,0),new b2Vec2(w,0),new b2Vec2(w,h),new b2Vec2(w-10,h)/*,new b2Vec2(w,0),
    	new b2Vec2(w,h)*/],4);

    wall.setPhysic(pol2,{x:0,y:0});




	window.Render = new Renderer(world,stage);
	Render.setStatElement(document.getElementById( 'viewport' ));

	Render.addObject(ball);
	//Render.createDebuger();

	Render.render();


},false);



function resizer(event){


	stage.setHeight(window.innerHeight);
	stage.setWidth(window.innerWidth);


}

