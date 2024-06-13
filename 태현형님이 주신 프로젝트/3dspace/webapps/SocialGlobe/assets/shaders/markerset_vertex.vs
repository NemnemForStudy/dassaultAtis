///attribute vec3 position;

//attribute vec2 uv;

attribute vec2 aTextureCoord;

uniform mat4 uMBWMatrix;	
uniform mat4 uMVMatrix;
uniform mat4 uMPMatrix;
uniform int uFlip;
uniform int uNormalize;
uniform float uMixProj;
uniform float uDz2D;
uniform int uOSMMode;
uniform float uAspectRatio;

const float PI = 3.14159;

varying vec3 vTextureCoord;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;


void main(void) 
{
/*            gl_Position =   projectionMatrix * 
                        viewMatrix * 
                        modelMatrix * 
                        vec4(position,1.0);
    
    return;*/
	// Move vertex to proper world position (initial geometry is a cube)
	vec3 OP =  vec4(position,1.0).xyz;	
	vec3 VP;
	float radius = 1.0;
	float dz = 0.0;
	if(uNormalize == 1)
	{
//		radius = 0.985;
		radius = 0.998;
		VP = normalize(OP);
		vTextureCoord = VP;	
		vNormal = normal;
		vTangent = normalize(cross(vec3(0,1,0), vNormal));
		vBinormal = normalize(cross(vTangent, vNormal));
	}
	else
	{
		VP = OP;
		// Sampling texture in a cube map -> UV are then xyz of normal vector...
		//	which happen to be the vertices positions for a unit sphere
		//vec3 P2 =  normalize( (uMBWMatrix * vec4(position,1.0)).xyz );	
		vec3 P2 =  VP;	
		
		// Sampling texture in a cube map -> UV are then xyz of normal vector...
		//	which happen to be the vertices positions for a unit sphere
		vTextureCoord = vec3(vec2(0.5+0.5*uv.x, 0.5+0.5*uv.y), 1.0);	
		vNormal = normal;
		vTangent = normalize(cross(vec3(0,1,0), VP));
		vBinormal = normalize(cross(vTangent, VP));
	}
	
	vec3 projP = vec3(VP.x, 0.0, VP.z);
	if(length(projP) < 0.001)
	{
		projP = vec3(1.0, 0.0, 1.0);
	}
	vec3 normalizedProjP = normalize(projP);
	float sign = 0.0;
	if(normalizedProjP.z > 0.0) 
		sign = -1.0;
	else
		sign = 1.0;
	float angle = sign*acos(normalizedProjP.x);
	if(uFlip != 0 && angle > 0.0)
	{
		angle -= 2.0*PI;
	}
	float x = angle / PI;
	vec4 pre_gl_Position_2d;
	float yangle = asin(VP.y);
	float minangle = 1.31;
	if(yangle < -minangle)
	{
		yangle = -minangle;
	}
	else
	{
		if(yangle > minangle)
		{
			yangle = minangle;
		}
	}	
	float y2d = uAspectRatio*log(tan(PI/4.0+yangle*0.5))/ PI;
	pre_gl_Position_2d = vec4(x+0.04*uv.x/uAspectRatio, y2d+0.04*(1.0+uv.y), uDz2D, 1.0);
	
	
	
	
	float MixProj  = uOSMMode != 2 ? uMixProj : 0.0;
	// Final position in projected view space
	vec4 pre_gl_Position_3d;
	vec4 pos = ( viewMatrix  * modelMatrix * (vec4(radius*VP, 1.0)/*+ vec4(0.5*uv, 0, 0)*/));
	pre_gl_Position_3d = projectionMatrix * pos;
	vec2 posOnScreen = (1.0/pre_gl_Position_3d.w)*pre_gl_Position_3d.xy;
	float distanceToGround = length(cameraPosition) - 1.0;
	vec2 dp = vec2(posOnScreen.x, posOnScreen.y+1.0/(distanceToGround*distanceToGround));
	vec2 vy = 0.04*normalize(vec2(dp.x, dp.y));
	vec2 vx = 0.04*normalize(vec2(dp.y, -dp.x));
    if(dot(cameraPosition, VP) > 0.0)
    {
        pre_gl_Position_3d += pre_gl_Position_3d.w*vec4((uv.x*vx.x+(1.0+uv.y)*vy.x)/uAspectRatio, uv.x*vx.y+(1.0+uv.y)*vy.y, 0,0);
    }
	
	gl_Position = MixProj*pre_gl_Position_2d + (1.0 - MixProj)*pre_gl_Position_3d;

	//gl_Position = pre_gl_Position_3d;
}
