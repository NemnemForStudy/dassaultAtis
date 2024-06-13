	
//attribute vec3 position;
//attribute vec3 normal;
const float PI = 3.14159;

//uniform mat4 uMBWMatrix;	
//uniform mat4 modelViewMatrix;
//uniform mat4 projectionMatrix;
uniform float uZoom;
uniform vec3 uEye;
uniform int uMode;
uniform float uThickness;
uniform float uMixProj;
uniform int uFlip;
uniform float uDz2D;
uniform float uAspectRatio;



void main(void) 
{
            gl_Position =   projectionMatrix * 
                        viewMatrix *
                        modelMatrix * 
                        vec4(position,1.0);
    
    return;
}
