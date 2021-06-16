import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM, VRMSchema } from '@pixiv/three-vrm'

window.addEventListener("DOMContentLoaded", () => {
  var modelPass = './static/models/base.vrm';
  var modelNum = 0

  $(document).on('click','#modelChangeBtn',function() {
    if (modelNum == 0) {
      modelPass = './static/models/upload.vrm';
      modelNum = 1;
    } else {
      modelNum = 0;
      modelPass = './static/models/base.vrm';
    }

    scene.remove.apply(scene, scene.children);

    sceneOption()
    newLoad()
    tick()
  })

  // レンダラーの設定
  var  canvas = <HTMLCanvasElement> document.getElementById('canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas: <HTMLCanvasElement> document.querySelector('#canvas'),
    antialias: true,
    alpha: true,
  })
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  // カメラの設定
  const camera = new THREE.PerspectiveCamera(
  35,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000,
  )
  camera.position.set(0, 1, 4)

  // カメラコントーロールの設定
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0.85, 0)
  controls.screenSpacePanning = true
  controls.update()

  // シーンの設定
  const scene = new THREE.Scene()
  sceneOption()

  function sceneOption() {
    // ライトの設定
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(1, 1, 1).normalize()
    scene.add(light)

    // グリッドを表示
    const gridHelper = new THREE.GridHelper(10, 10)
    scene.add(gridHelper)
    gridHelper.visible = true

    // 座標軸を表示
    const axesHelper = new THREE.AxesHelper(0.5)
    scene.add(axesHelper)
  }

  // VRMの読み込み
  const loader = new GLTFLoader()
  newLoad()

  function newLoad() {
    loader.load(modelPass,
      (gltf) => {
        VRM.from(gltf).then( (vrm) => {
          // シーンへの追加
          scene.add(vrm.scene)
          vrm.scene.rotation.y = Math.PI
        })
      }
    )
  }

  // 初回実行
  tick()

  function tick() {
    requestAnimationFrame(tick)
    // レンダリング
    renderer.render(scene, camera)
  }
})
