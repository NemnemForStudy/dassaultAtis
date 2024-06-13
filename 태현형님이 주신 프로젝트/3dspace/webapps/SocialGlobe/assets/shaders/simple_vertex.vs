///attribute vec3 position;

//attribute vec2 uv;

attribute vec2 aTextureCoord;

uniform vec3 externalThickness ;
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
    vec3 offsets = externalThickness;

    vTextureCoord = vec3(uv, 1.0);
    vTextureCoord.x = vTextureCoord.x*offsets.z + offsets.x;
    vTextureCoord.y = vTextureCoord.y*offsets.z + offsets.y;

    // Final position in projected view space
    vec4 pre_gl_Position_3d;
    vec4 pos = ( viewMatrix * modelMatrix * vec4(position, 1.0) );
    pre_gl_Position_3d = projectionMatrix * pos;

    gl_Position = pre_gl_Position_3d;
}
