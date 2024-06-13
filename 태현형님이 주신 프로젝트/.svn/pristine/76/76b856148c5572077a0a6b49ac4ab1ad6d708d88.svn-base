///attribute vec3 position;

//attribute vec2 uv;
/*
uniform mat4 uMBWMatrix;	
uniform mat4 uMVMatrix;
uniform mat4 uMPMatrix;
uniform int uFlip;
uniform int uNormalize;
uniform float uMixProj;
uniform float uDz2D;
uniform int uOSMMode;
*/
const float PI = 3.14159;

varying vec3 vTextureCoord;
varying vec3 vNormal;
varying vec3 vTangent;
varying vec3 vBinormal;


void main(void) 
{
    mat4 mvMat = viewMatrix * modelMatrix;
    vec3 up = vec3(mvMat[0][0], mvMat[1][0], mvMat[2][0]);
    vec3 right = vec3(mvMat[0][1], mvMat[1][1], mvMat[2][1]);
    vec3 posi = 2.0*uv.x*right + 2.0*uv.y*up;
    vTextureCoord = posi;
    gl_Position =   projectionMatrix * 
                mvMat * 
     // 0.00001*position.x: needed because otherwise position will be removed by optimizer and then generate a warning
               vec4(posi,1.0+0.00001*position.x);
    
    return;
}
