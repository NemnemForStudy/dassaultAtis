	
//attribute vec3 position;
//attribute vec3 normal;
const float PI = 3.14159;

uniform mat4 uMBWMatrix;	
uniform mat4 uMVMatrix;
uniform mat4 uMPMatrix;
uniform float uZoom;
uniform vec3 uEye;
uniform int uMode;
uniform float uThickness;
uniform float uMixProj;
uniform int uFlip;
uniform float uDz2D;
uniform float uAspectRatio;

varying vec3 vTextureCoord;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;


void main(void) 
{
	/*if(uFlip == 0)
	{
		gl_Position = vec4(0,0,0,1);
		return;
	}*/
	//vec3 viewDir = vec3(uMPMatrix[0][2], uMPMatrix[1][2], uMPMatrix[2][2]); 
	float fact = (0.0015/(pow(uZoom,0.7)));
	
	// Move vertex to proper world position (initial geometry is a cube)	
	//float sp = dot(position, uEye);
	vec3 OP3d =  (vec4(position+uThickness*fact*normal,1.0)).xyz;	
	vec3 OP2d =  vec4(position,1.0).xyz;	

	float radius = 1.0;

	vTextureCoord = OP2d;	
	vNormal = OP2d;
	vTangent = normalize(cross(vec3(0,1,0), vNormal));
	vBinormal = normalize(cross(vTangent, vNormal));
	
	vec3 projP = vec3(OP2d.x, 0.0, OP2d.z);
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
	float yangle = asin(OP2d.y);
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
	pre_gl_Position_2d = vec4(x+0.001*uThickness*dot(vTangent,normal), y2d+0.001*uThickness*dot(-vBinormal,normal), uDz2D, 1.0);
	
	
	
	
	float MixProj  = uMixProj;
	// Final position in projected view space
	vec4 pre_gl_Position_3d;
	vec4 pos = ( viewMatrix * modelMatrix * vec4(radius*OP3d, 1.0) );
	pre_gl_Position_3d = projectionMatrix * pos;
//    gl_Position = pre_gl_Position_3d;
//    return;
//	vec4 pre_gl_Position_2d;
/*	float yangle = asin(OP2d.y);
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
	}*/
	
/*	
	float y2d = uAspectRatio*log(tan(PI/4.0+yangle*0.5))/ PI;
	pre_gl_Position_2d = vec4(x+0.001*uThickness*dot(vTangent,normal), y2d+0.001*uThickness*dot(-vBinormal,normal), uDz2D, 1.0);
*/	
	gl_Position = MixProj*pre_gl_Position_2d + (1.0 - MixProj)*pre_gl_Position_3d;	//if(sp < 0.0)

	if(uMode == 0)
	{
		gl_Position.z *= 0.99/pow(uZoom,0.02);
	}
}
