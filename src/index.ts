import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM, VRMSchema } from '@pixiv/three-vrm'

window.addEventListener("DOMContentLoaded", ()=> {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0,1,3);

  const renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff);
  light.position.set(1,1,1).normalize();
  scene.add(light);

  const loader = new GLTFLoader();
  loader.load(
    './static/models/test.vrm',

    (gltf) => {
      VRM.from(gltf).then( (vrm) => {
        scene.add(vrm.scene);
        vrm.scene.rotation.y = Math.PI;

        vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.LeftUpperArm)!.rotation.x = 0.6;
        vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.LeftLowerArm)!.rotation.x = 0.8;
        vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.LeftLowerArm)!.rotation.y = -1.;
        vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.LeftHand)!.rotation.y = -0.5;
        vrm.humanoid!.getBoneNode(VRMSchema.HumanoidBoneName.RightUpperArm)!.rotation.z = -1.3;

        vrm.blendShapeProxy!.setValue(VRMSchema.BlendShapePresetName.Fun, .7);
        vrm.blendShapeProxy!.setValue(VRMSchema.BlendShapePresetName.Sorrow, .2);
        vrm.blendShapeProxy!.update();

      })
    }
  )

  const update = () => {
    requestAnimationFrame(update);
    renderer.render(scene, camera);
  };
  update();
})
