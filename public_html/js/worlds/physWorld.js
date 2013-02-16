
APP = {};
function setPhysicWorld(){


			
            var   b2Vec2 = Box2D.Common.Math.b2Vec2
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
            ,  b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef
            ;

            var world = new b2World(
               new b2Vec2(0, 10)    //gravity
            ,  true                 //allow sleep
            );


            var fixtureDef = new b2FixtureDef();
            fixtureDef.density = 1;
            fixtureDef.friction = 0.5;
            fixtureDef.restitution = 0.2;

            //ground definition
            var bodyDef = new b2BodyDef();            
            bodyDef.type = b2Body.b2_staticBody;

            //top wall
            fixtureDef.shape = new b2PolygonShape();
            fixtureDef.shape.SetAsBox(10,0.2);
            bodyDef.position.Set(10,0.1);
            world.CreateBody(bodyDef).CreateFixture(fixtureDef);

            //bottom wall
            bodyDef.position.Set(10,20-0.1);
            world.CreateBody(bodyDef).CreateFixture(fixtureDef);

            //right wall
            fixtureDef.shape = new b2PolygonShape();
            fixtureDef.shape.SetAsBox(0.2,10);
            bodyDef.position.Set(20-0.1,10);
            world.CreateBody(bodyDef).CreateFixture(fixtureDef);

            //left wall
            bodyDef.position.Set(0.1,10);
            world.CreateBody(bodyDef).CreateFixture(fixtureDef);


            //create a ball
            bodyDef.type = b2Body.b2_dynamicBody;
            fixtureDef.shape = new b2CircleShape();
            fixtureDef.shape.SetRadius(1);

            bodyDef.position.Set(10,1);
            var ball = world.CreateBody(bodyDef);
            ball.CreateFixture(fixtureDef);
            APP.ball = ball;
           

            var debugDraw = new b2DebugDraw();
            debugDraw.SetSprite(document.getElementsByTagName("canvas")[0].getContext("2d"));
            debugDraw.SetDrawScale(30.0);
            debugDraw.SetFillAlpha(0.5);
            debugDraw.SetLineThickness(1.0);
            debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
            world.SetDebugDraw(debugDraw);

            world.DrawDebugData();

            APP.world = world;

	
}

