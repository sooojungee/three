import { Vue, Component } from 'vue-property-decorator';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import _ from 'lodash';
import { Scene, DoubleSide, VertexColors } from 'three';

// @ts-ignore
import vs from '!!raw-loader!./default.vert';
// @ts-ignore
import fs from '!!raw-loader!./default.frag';

// npm install raw-loader
// material => 붓질

interface SampleAttributes {
  pos: THREE.BufferAttribute;
  color: THREE.BufferAttribute;
}

interface SampleProperties {
  pos: Float32Array;
  color: Float32Array;
}

@Component({})
export default class BufferGeometry extends Vue {
  public $refs!: {
    renderer: HTMLElement;
  };
  private scene!: THREE.Scene;
  private camera!: THREE.Camera;
  private renderer!: THREE.WebGLRenderer;

  private attr!: SampleAttributes;
  private props!: SampleProperties;
  private geometry!: THREE.BufferGeometry;
  private material!: THREE.Material;
  private mesh!: THREE.Mesh;
  private controller!: OrbitControls;

  private x: number = 16;
  private y: number = 16;
  private pointCount: number = 0;
  private indices: number[] = [];
  private tick: number = 0;

  private update() {
    this.tick += 0.1;
    requestAnimationFrame(this.update.bind(this));
    (this.material as THREE.RawShaderMaterial).uniforms.time = {
      value: this.tick,
    };
    this.renderer.render(this.scene, this.camera);
  }

  private mounted() {
    const width = this.$refs.renderer.clientWidth;
    const height = this.$refs.renderer.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 60;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);

    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
      },
      vertexShader: vs,
      fragmentShader: fs,
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.pointCount = (this.x + 1) * (this.y + 1);

    // 알아서 0으로 채워짐
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

    const size = 1;
    for (let i = 0; i < this.pointCount; i++) {
      this.props.pos.set(
        [(i % (this.x + 1)) * size, Math.floor(i / (this.x + 1)) * size, 1],
        i * 3,
      );
      // this.props.color.set([(i % (this.x + 1)) / (this.x + 1), 1, 1, 1], 4 * i);
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
