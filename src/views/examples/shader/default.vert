
precision mediump float;
precision mediump int;

// cpu에서 gpu로 공용 변수 넘겨줌, time, 클릭 여부
// uniform은 변하지 않는 값
// ex 클릭시 모두가 다 알아야 하므로, 하나만 알 필요가 없으므로 공용
// 모두가 하나만 봐, 하나만 생김, 같은 메모리 영역을 본다.
uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional
uniform float time;
// 자동으로 인덱싱 되어 넘ㄴ어온다. 그 때가 ATTribute로 넘어온다.
// vec3인걸로 보아 한 점에 대해 Main함수가 실행됨

// 아래의 포지션은 geometry에 넣어준 것들
attribute vec3 position;
attribute vec4 color;

// vertex에서 frag로 넘길 떄 쓰는 변수

varying vec3 vPosition;
// 정점 세 개에 대한 선형보관한 하나의 색
varying vec4 vColor;
void main()	{
  vec3 pos = position;
  pos.z = sin(position.x * 0.3 + position.y * 0.3 + time) * 1.0;
  // vPosition = pos;
  // vColor = color;

  // 이거는 걍 외워라
  // 매트릭스는 이동과 크기와 회전의 값을 가지고 있다.
  // 카메라 상의 위치, 물체가 어디에 나와야하는지,
  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}

// 4 바이 4
// mesh가 가지고 있다. vertex 하나하나마다 가지고 있는게 아니다.
// 이거덕분에 바꿀 수 있다.

// cpu가 gpu에게 삼천개 돌아, 버텍스는 또 돌아~