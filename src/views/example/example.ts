import { Vue, Component } from 'vue-property-decorator';
import * as THREE from 'three';
import { Scene } from 'three';

@Component({})
export default class Example extends Vue {
  public $refs!: {
    renderer: HTMLElement;
  };

  private scene: THREE.Scene = new THREE.Scene();
  private camera!: THREE.Camera;
  private renderer!: THREE.WebGLRenderer;

  private update() {
    // 렌더링을 다시 해라. 컴퓨터가 호출해주는거야 (호출자가 내가 아님)
    // this가 우리가 아는 this가 아니야.
    // 여기 안의 this는 혹시 class로 뺐을 때를 대비해서 ㅎㅎ
    requestAnimationFrame(this.update.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  private mounted() {
    // Scene 은 장면 -> 그룹, 물체를 등록
    this.scene = new THREE.Scene();

    // 절두체 안에 보여지는 애들만 그림

    // Camera
    // Perspective : 원근법 3d (보이는 각도(얘만 줄이면 확대가 됨), 가로 세로 비율, 가까운애의 거리, 가장 멀리의 거리)
    // near과 far 평면의 크기가 같으면 2d로 보임
    // Orthographic: 직교 2d
    this.camera = new THREE.PerspectiveCamera(
      75,
      // 이거 알아야해서 여기서 초기화해야함
      this.$refs.renderer.clientWidth / this.$refs.renderer.clientHeight,
      0.1,
      1000,
    );

    // this.camera = new THREE.OrthographicCamera(-this.$refs.renderer.clientWidth / 2,
    // this.$refs.renderer.clientWidth / 2, - this.$refs.renderer.clientHeight / 2,
    // this.$refs.renderer.clientHeight / 2, 0.1, 1000);

    // 화면에 보이는 버퍼 (그래픽카드는 한 픽셀에 대해 rgb를 갖고 있다. 몇 바이트로 표현하느냐에 따라 보여지는게 달라져)

    // 더블 버퍼링 : 백버퍼에 그림을 칠하고 프론트 버퍼랑 바꿔서 백버퍼를 보여주고~

    this.renderer = new THREE.WebGLRenderer();
    // 이만한 버퍼를 생성하는거야
    const width = this.$refs.renderer.clientWidth;
    const height = this.$refs.renderer.clientHeight;
    this.renderer.setSize(width, height);
    this.$refs.renderer.appendChild(this.renderer.domElement);

    // 1

    // // vertices , index 정보가 있다.
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // // TODO / 헤야할 일: bufferGeometry를 써서 도형 만들기

    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // // Mesh = geometry + material
    // const cube = new THREE.Mesh(geometry, material);
    // this.scene.add(cube);

    // // const geometry1 = new THREE.BoxGeometry(100, 100, 100);
    // // const material1 = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    // // const cube1 = new THREE.Mesh(geometry1, material1);
    // // // cube1.set
    // // this.scene.add(cube1);

    // 2

    const geometry = new THREE.BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    const vertices = new Float32Array([
      -1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      1.0,
      1.0,
      1.0,

      1.0,
      1.0,
      1.0,
      -1.0,
      1.0,
      1.0,
      -1.0,
      -1.0,
      1.0,
    ]);

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);



    // final
    this.camera.position.z = 5;
    this.update();
  }
}
