precision mediump float;
precision mediump int;
uniform float time;
varying vec3 vPosition;
varying vec4 vColor;
void main()	{
  // vec4 color = vec4( vColor );
  // color.r += sin( vPosition.x * 10.0 + time ) * 0.5;
  // gl_FragColor = color;
  //

  // frag는 색칠하는 친구야

  // 이거는 한 픽셀에 해당 색을 부여
  // 픽셀수만큼 이 함수가 돈다.
  gl_FragColor = vec4(1, 1, 1, 1);
}