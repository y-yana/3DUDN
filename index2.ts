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
  let mixer
  const loader = new GLTFLoader()
  newLoad()

  function newLoad() {
    loader.load(modelPass,
      (gltf) => {
        VRM.from(gltf).then( (vrm) => {
          // シーンへの追加
          scene.add(vrm.scene)
          vrm.scene.rotation.y = Math.PI
          setupAnimation(vrm)
        })
      }
    )
  }

  // http → str
  const http2str = (url) => {
    try {
      let request=new XMLHttpRequest()
      request.open("GET",url,false)
      request.send(null)
      if (request.status==200 && request.readyState == 4) {
        return request.responseText.trim()
      }
    } catch (e) {
      console.log(e)
    }
    return null
  }    
 
  // CSV → hierarchy
  const csv2hierarchy = (csv, fps) => {
    // 文字列 → 配列
    let lines =  csv.trim().split('\n')
    let data: number[][] = []
    for (let j=0; j<lines.length; j++) {
      data[j] = []
      let strs = lines[j].split(',')
      for (let i=0; i<55*4; i++) {
        data[j][i] = Number(strs[i])            
      }
    }
    // 配列 → hierarchy
    let hierarchy = []
    for (let i=0; i<55; i++) {
      let keys = []
      for (let j=0; j<data.length; j++) {
        keys[j] = {
          rot: new THREE.Quaternion(-data[j][i*4],-data[j][i*4+1],data[j][i*4+2],data[j][i*4+3]).toArray(),
          time: fps*j                       
        }
      }
      hierarchy[i] = {'keys': keys}
    } 
    console.log("hierarchyの長さ"+hierarchy.length)
    console.log(hierarchy) 
    hierarchy.splice(23,1)
    console.log(hierarchy)
    return hierarchy
  }

  // 初回実行
  tick()

  function tick() {
    requestAnimationFrame(tick)
    // レンダリング
    renderer.render(scene, camera)
  }
})
