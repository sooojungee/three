import { Vue, Component } from 'vue-property-decorator';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import _ from 'lodash';
import { Scene, DoubleSide, VertexColors, Vector3 } from 'three';

interface SampleAttributes {
  pos: THREE.BufferAttribute;
  color: THREE.BufferAttribute;
}

interface SampleProperties {
  pos: Float32Array;
  color: Float32Array;
}

@Component({})
export default class BufferGeometryWave extends Vue {
  public $refs!: {
    renderer: HTMLElement;
  };
  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private renderer!: THREE.WebGLRenderer;

  private attr!: SampleAttributes;
  private props!: SampleProperties;
  private geometry!: THREE.BufferGeometry;
  private material!: THREE.MeshBasicMaterial;
  private mesh!: THREE.Mesh;
  private controller!: OrbitControls;
  private mouse!: THREE.Vector3;

  private x: number = 20;
  private y: number = 20;
  private pointCount: number = 0;
  private indices: number[] = [];
  private tick: number = 0;

  private update() {
    requestAnimationFrame(this.update.bind(this));

    this.tick += 0.1;
    for (let i = 0; i < this.pointCount; i++) {
      this.props.pos[i * 3 + 2] = Math.sin(
        Math.sqrt(
          Math.pow(this.x / 2 - this.props.pos[i * 3], 2) +
            Math.pow(this.y / 2 - this.props.pos[i * 3 + 1], 2),
        ) - this.tick,
      );
      const vector = new Vector3(
        this.props.pos[i * 3] - this.props.pos[i * 3 + 3],
        this.props.pos[i * 3 + 1] - this.props.pos[i * 3 + 1 + 3],
        this.props.pos[i * 3 + 2] - this.props.pos[i * 3 + 2 + 3],
      );
      const vector2 = new Vector3(
        this.props.pos[i * 3] - this.props.pos[i * 3 - 3 * (this.y + 1)],
        this.props.pos[i * 3 + 1] -
          this.props.pos[i * 3 + 1 - 3 * (this.y + 1)],
        this.props.pos[i * 3 + 2] -
          this.props.pos[i * 3 + 2 - 3 * (this.y + 1)],
      );

      const a = vector.cross(vector2).normalize();

      const mouseV = new Vector3(
        this.props.pos[i * 3] - this.mouse.x,
        this.props.pos[i * 3 + 1] - this.mouse.y,
        this.props.pos[i * 3 + 2] - this.mouse.z,
      ).normalize();

      const b = Math.abs(a.dot(mouseV));

      this.props.color.set(
        [
          (b * (i % (this.x + 1))) / (this.x + 1),
          (b * i) / this.pointCount,
          b * 1,
          1,
        ],
        4 * i,
      );
    }
    this.attr.pos.needsUpdate = true;
    this.attr.color.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }

  private onDocumentMouseMove(event: MouseEvent) {
    event.preventDefault();
    this.mouse.x = event.clientX - window.innerWidth / 2;
    this.mouse.y = -(event.clientY - window.innerHeight / 2);
    this.mouse.z = 40;
  }

  private mounted() {
    const width = this.$refs.renderer.clientWidth;
    const height = this.$refs.renderer.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 20;
    this.mouse = new THREE.Vector3();
    document.addEventListener('mousemove', this.onDocumentMouseMove, false);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.MeshBasicMaterial({
      side: DoubleSide,
      vertexColors: VertexColors,
    });
    this.pointCount = (this.x + 1) * (this.y + 1);

    this.props = {
      pos: new Float32Array(this.pointCount * 3),
      color: new Float32Array(this.pointCount * 4),
    };
    this.props.color.fill(1);

    this.attr = {
      pos: new THREE.BufferAttribute(this.props.pos, 3),
      color: new THREE.BufferAttribute(this.props.color, 4),
    };

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.translateX(-this.x / 2);
    this.mesh.translateY(-this.y / 2);
    const size = 1;
    for (let i = 0; i < this.pointCount; i++) {
      this.props.pos.set(
        [(i % (this.x + 1)) * size, Math.floor(i / (this.x + 1)) * size, 1],
        i * 3,
      );
      this.props.color.set(
        [(i % (this.x + 1)) / (this.x + 1), i / this.pointCount, 1, 1],
        4 * i,
      );
    }

    for (let i = 0; i < this.x * this.y; i++) {
      const std = (i % this.x) + Math.floor(i / this.x) * (this.x + 1);
      this.indices.push(0 + std);
      this.indices.push(1 + std);
      this.indices.push(this.x + 1 + std);
      this.indices.push(1 + std);
      this.indices.push(this.x + 2 + std);
      this.indices.push(this.x + 1 + std);
    }

    this.geometry.addAttribute('position', this.attr.pos);
    this.geometry.addAttribute('color', this.attr.color);
    this.geometry.setIndex(this.indices);

    this.controller = new OrbitControls(this.camera, this.renderer.domElement);

    this.$refs.renderer.appendChild(this.renderer.domElement);
    this.scene.add(this.mesh);
    this.update();
  }
}
