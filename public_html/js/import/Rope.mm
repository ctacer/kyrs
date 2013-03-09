//
//  Rope.m
//  RopeDemo
//
//  Created by Oles Terletskyy on 21.11.12.
//
//

#import "Rope.h"
#import "GameObject_protected.h"

@interface Rope()
{
    NSUInteger countOfActors;
    NSUInteger countOfSegments;
    
    NSUInteger ropeLength;              //In Metres;
    
    b2Vec2 posHead;
    b2Vec2 posEnd;

    CGPoint *points;
}

@end

@implementation Rope

-(id) initObjectWithNode:(CCNode *)node atPosition:(b2Vec2)pos
{
    posHead = pos;
    
    countOfActors = 10;                  //Must be more than 1
    countOfSegments = 10;
    ropeLength = 5;    
    
    points = new CGPoint[countOfSegments * (countOfActors + 1)];
    
    self = [super initObjectWithNode:node];
    
    if(self){
        
    }
    
    return self;
}

-(void) draw
{
    [super draw];

    [self drawRope];
}

-(void) initObject
{
    [self createInterjacentActors];
}

-(void) drawRope
{
    if(![self getActors])
        return;
    
    [self buildInterpolationPoints];
    
    for(int i = 0; i < countOfSegments * (countOfActors); i++)
    {
        CGPoint pBeg = ccpMult(points[i], RATIO);
        CGPoint pEnd = ccpMult(points[i + 1], RATIO);
        
        //ccDrawLine(pBeg, pEnd);
        
        ccColor4F color;
        
        color.r = 1.0;
        color.g = 1.0;
        color.b = 1.0;
        color.a = 1.0;
        
        [self drawSmoothLineFrom:pBeg To:pEnd WithColor:color];
    }
}


-(void) createInterjacentActors
{
    [self createHead];
    
    
    for(int i = 0; i < countOfActors; i++){
        NSMutableArray *actors = [self getActors];
        
        b2Vec2 pos = ((Actor*)actors[actors.count-1]).body->GetPosition() - b2Vec2(0, (float)ropeLength / (float)countOfActors);
        
        [self createActorAtPos:pos];
        
        actors = [self getActors];
        b2Vec2 anchorA(0, 0.0);
        b2Vec2 anchorB(0, 0.0);
        
        //[self createRevoluteJointBetweenBodyA:((Actor*)actors[actors.count-2]).body bodyB:((Actor*)actors[actors.count-1]).body withAnchorA:&anchorA anchorB:&anchorB];
        [self createRopeJointBetweenBodyA:((Actor*)actors[actors.count-2]).body bodyB:((Actor*)actors[actors.count-1]).body withAnchorA:&anchorA anchorB:&anchorB];
        
    }
    
    NSMutableArray *actors = [self getActors];
    Actor *lastBodyActor = (Actor*)actors[actors.count-1];
    
    b2Vec2 pos = ((Actor*)actors[actors.count-1]).body->GetPosition() - b2Vec2(0, (float)ropeLength / (float)countOfActors);
    
    Actor *tail = [self createTailAtPos:pos];
    
    float width = (tail.body->GetFixtureList()[0].GetAABB(0).upperBound.y - tail.body->GetFixtureList()[0].GetAABB(0).lowerBound.y) / 2.0;
    b2Vec2 anchorA(0, 0.0);
    b2Vec2 anchorB(0, width);
    
    [self createRevoluteJointBetweenBodyA:lastBodyActor.body bodyB:tail.body withAnchorA:&anchorA anchorB:&anchorB];
    //[self createRopeJointBetweenBodyA:lastBodyActor.body bodyB:tail.body withAnchorA:&anchorA anchorB:&anchorB];
    [self createDistanceJointBetweenBodyA:lastBodyActor.body bodyB:tail.body];
}


-(void) createHead
{
    b2BodyDef bodyDef;
    bodyDef.type = b2_kinematicBody;
    bodyDef.position = posHead;

    b2Body *body = [[PhysicsSystem sharedPhysicsSystem] world]->CreateBody(&bodyDef);
    
    Actor *headActor = [self createActorWithBody:body name:anRopeHead];
    
    body->SetUserData(headActor);
    
    headActor.smoothedPosition = posHead;
    headActor.previousPosition = posHead;
    
    // Define another box shape for our dynamic body.
    b2PolygonShape dynamicBox;
    dynamicBox.SetAsBox(0.1f, .1f);//These are mid points for our 1m box
    
    // Define the dynamic body fixture.
    b2FixtureDef fixtureDef;
    fixtureDef.shape = &dynamicBox;
    fixtureDef.density = 1.0f;
    fixtureDef.friction = 0.3f;
    
    body->CreateFixture(&fixtureDef);
}

-(Actor *) createTailAtPos:(b2Vec2)pos
{
    b2BodyDef bodyDef;
    bodyDef.type = b2_dynamicBody;
    bodyDef.position = pos;
    
    b2Body *body = [[PhysicsSystem sharedPhysicsSystem] world]->CreateBody(&bodyDef);
    
    Actor *actor = [self createActorWithBody:body name:anRopeTail];
    
    actor.smoothedPosition = pos;
    actor.previousPosition = pos;
    
    // Define another box shape for our dynamic body.
    b2PolygonShape dynamicBox;
    dynamicBox.SetAsBox(.3f, .6f);                      //These are mid points for our 1m box
    
    // Define the dynamic body fixture.
    b2FixtureDef fixtureDef;
    fixtureDef.shape = &dynamicBox;
    fixtureDef.density = 0.0000001f;
    fixtureDef.friction = 0.3f;
    
    body->CreateFixture(&fixtureDef);
    
    return actor;
}

-(void) createActorAtPos:(b2Vec2)pos
{
    b2BodyDef bodyDef;
    bodyDef.type = b2_dynamicBody;
    bodyDef.position = pos;
    
    b2Body *body = [[PhysicsSystem sharedPhysicsSystem] world]->CreateBody(&bodyDef);
    
    Actor *actor = [self createActorWithBody:body name:anRopeBody];
    
    float mult = 1.0;
    
    if([self getActors].count == countOfActors / 2 + 1)
    {
        mult = 2.0;
    }
    
    body->SetUserData(actor);
    
    actor.smoothedPosition = pos;
    actor.previousPosition = pos;
    
    // Define another box shape for our dynamic body.
    b2PolygonShape dynamicBox;
    dynamicBox.SetAsBox(0.01, 0.01f);//These are mid points for our 1m box
    
    // Define the dynamic body fixture.
    b2FixtureDef fixtureDef;
    fixtureDef.shape = &dynamicBox;
    fixtureDef.density = 0.00001f * mult;
    fixtureDef.friction = 0.3f;
    
    body->SetType(b2_dynamicBody);
    
    body->CreateFixture(&fixtureDef);
}

-(void) buildInterpolationPoints
{
    CGPoint *interpolationPoints;
    
    NSMutableArray *actors = [self getActors];

    
    interpolationPoints = new CGPoint[actors.count];
    
    for(int i = 0; i < actors.count; i++)
    {
        if (!actors[i])
            break;
        b2Vec2 p = ((Actor *)actors[i]).body->GetPosition();
        
        interpolationPoints[i] = ccp(p.x, p.y);
    }
    
    genCubicInterpolation(interpolationPoints, actors.count, countOfSegments, points);
}

void genCubicInterpolation(CGPoint *points, unsigned num, unsigned segments, CGPoint *vertices)
{
    int count = 0;
    float dt = 1.0f / (float)segments;
 
    if (num < 2) return;
    
    // We need two extra points
    CGPoint d0, dN;
    
    d0 = ccpAdd(points[0], ccpNormalize(ccpSub(points[1], points[0])));
    dN = ccpAdd(points[num-1], ccpNormalize(ccpSub(points[num-1], points[num-2])));
    
    for (int i = 0; i < num - 1; i++) {
        vertices[count] = points[i];
        count++;
        
        CGPoint y0, y1, y2, y3;
        
        if (i==0) {
            y0 = d0;
        } else {
            y0 = points[i-1];
        }
        
        y1 = points[i];
        y2 = points[i+1];
        
        if (i==(num-2)) {
            y3 = dN;
        } else {
            y3 = points[i+2];
        }
        
        for (float mu=dt; mu < 1.f; mu += dt) {
            CGPoint a0, a1, a2, a3, p;
            double mu2 = mu * mu;

            
             a0.x = -0.5f * y0.x + 1.5f * y1.x -  1.5f * y2.x + 0.5f * y3.x;
             a0.y = -0.5f * y0.y + 1.5f * y1.y -  1.5f * y2.y + 0.5f * y3.y;
             
             a1.x = y0.x - 2.5f * y1.x + 2.f * y2.x - 0.5f * y3.x;
             a1.y = y0.y - 2.5f * y1.y + 2.f * y2.y - 0.5f * y3.y;
              
             a2.x = -0.5f * y0.x + 0.5f * y2.x;
             a2.y = -0.5f * y0.y + 0.5f * y2.y;
             
             a3.x = y1.x;
             a3.y = y1.y;
             
            
            // The point
            p.x = (a0.x * mu * mu2) + (a1.x * mu2) + (a2.x * mu) + a3.x;
            p.y = (a0.y * mu * mu2) + (a1.y * mu2) + (a2.y * mu) + a3.y;
    
            vertices[count] = p;
            count++;
        }
    }
    
    CCLOG(@"count = %d", count);
    
    vertices[count] = points[num-1];
}

-(void) createRevoluteJointBetweenBodyA:(b2Body *)bodyA bodyB:(b2Body *)bodyB withAnchorA:(b2Vec2 *)anchorA anchorB:(b2Vec2 *)anchorB
{
    b2RevoluteJointDef *revoluteJointDef = new b2RevoluteJointDef();
    
    revoluteJointDef->localAnchorA.Set(anchorA->x,anchorA->y);
    revoluteJointDef->localAnchorB.Set(anchorB->x,anchorB->y);
    revoluteJointDef->bodyA=bodyA;
    revoluteJointDef->bodyB=bodyB;
    
    revoluteJointDef->collideConnected = false;
    
    [[PhysicsSystem sharedPhysicsSystem] world]->CreateJoint(revoluteJointDef);
}

-(void)createRopeJointBetweenBodyA:(b2Body *)bodyA bodyB:(b2Body *)bodyB withAnchorA:(b2Vec2 *)anchorA anchorB:(b2Vec2 *)anchorB
{
    b2RopeJointDef *ropeJointDef = new b2RopeJointDef();
    ropeJointDef->bodyA = bodyA;
    ropeJointDef->bodyB = bodyB;
    ropeJointDef->localAnchorA.Set(anchorA->x,anchorA->y);
    ropeJointDef->localAnchorB.Set(anchorB->x,anchorB->y);

    ropeJointDef->maxLength = ropeLength / (float) countOfActors;
    ropeJointDef->collideConnected = false;
    
    [[PhysicsSystem sharedPhysicsSystem] world]->CreateJoint(ropeJointDef);
}


-(void)createDistanceJointBetweenBodyA:(b2Body *)bodyA bodyB:(b2Body *)bodyB
{
    b2DistanceJointDef *distanceJointDef = new b2DistanceJointDef();
    distanceJointDef->Initialize(bodyA, bodyB, bodyA->GetWorldCenter(), bodyB->GetWorldCenter());

    distanceJointDef->collideConnected = false;
    [[PhysicsSystem sharedPhysicsSystem] world]->CreateJoint(distanceJointDef);
}

-(void) drawSmoothLineFrom:(CGPoint)pos1 To: (CGPoint)pos2 WithColor: (ccColor4F)color
{
    //[shaderProgram_ use];
    //[shaderProgram_ setUniformsForBuiltins];
    //[shaderProgram_ setUniformLocation:-1 with4fv:(GLfloat*) &someColor.r count:1];
    
    CCGLProgram *mShaderProgram = [[CCShaderCache sharedShaderCache] programForKey:kCCShader_Position_uColor];
    
    uint mColorLocation = glGetUniformLocation( mShaderProgram->program_ , "u_color");
    
    [mShaderProgram use];
    [mShaderProgram setUniformForModelViewProjectionMatrix];
    
    [mShaderProgram setUniformLocation:mColorLocation withF1:color.r f2:color.g f3:color.b f4:color.a];
    

    
    //ccGLEnableVertexAttribs(kCCVertexAttribFlag_Position | kCCVertexAttribFlag_Color );
    GLfloat lineVertices[12];
    CGPoint dir, tan;
    
    float width = 0.6f;
    dir.x = pos2.x - pos1.x;
    dir.y = pos2.y - pos1.y;
    float len = sqrtf(dir.x*dir.x+dir.y*dir.y);
    if(len<0.00001)
        return;
    dir.x = dir.x/len;
    dir.y = dir.y/len;
    tan.x = -width*dir.y;
    tan.y = width*dir.x;
    
    lineVertices[0] = pos1.x + tan.x;
    lineVertices[1] = pos1.y + tan.y;
    lineVertices[2] = pos2.x + tan.x;
    lineVertices[3] = pos2.y + tan.y;
    lineVertices[4] = pos1.x;
    lineVertices[5] = pos1.y;
    lineVertices[6] = pos2.x;
    lineVertices[7] = pos2.y;
    lineVertices[8] = pos1.x - tan.x;
    lineVertices[9] = pos1.y - tan.y;
    lineVertices[10] = pos2.x - tan.x;
    lineVertices[11] = pos2.y - tan.y;
    
    ccColor4F vertices[6];
    ccColor4F color1 = {color.r, color.g, color.b, 0};
    ccColor4F color2 = {color.r, color.g, color.b, color.a};
    
    vertices[0] = color1;
    vertices[1] = color1;
    vertices[2] = color2;
    vertices[3] = color2;
    vertices[4] = color1;
    vertices[5] = color1;
    
    glVertexAttribPointer(kCCVertexAttrib_Position, 2, GL_FLOAT, GL_FALSE, 0, lineVertices);
    //glVertexAttribPointer(kCCVertexAttrib_Color, 4, GL_FLOAT, GL_FALSE, 0, vertices);
    //glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    glDrawArrays(GL_TRIANGLE_STRIP, 0, 6);
    
    CC_INCREMENT_GL_DRAWS(1);
    
    CHECK_GL_ERROR_DEBUG();
    
//    glVertexAttribPointer(kCCVertexAttrib_Position, 2, GL_FLOAT, GL_FALSE, 0, lineVertices);
//    glVertexAttribPointer(kCCVertexAttrib_Color, 4, GL_FLOAT, GL_FALSE, 0, vertices);
//    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
//    glDrawArrays(GL_TRIANGLE_STRIP, 0, 6);
    
}

@end
