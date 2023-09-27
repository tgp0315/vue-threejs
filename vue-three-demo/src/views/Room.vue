<template>
    <canvas id="canvasDom" ref="canvasDom"></canvas>
</template>
  
<script setup>
  import { nextTick, onMounted, reactive, ref } from 'vue'
  import Base from './base'
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
  import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
  const canvasDom = ref(null)
  let base = reactive(null)
  onMounted(() => {
    nextTick(() => {
      base = new Base(canvasDom.value)
      addLight()
      loadgltf()
      base.update()
    })
  })
  const loadgltf = () => {
    new GLTFLoader().load('../../public/model/Isometric.glb', g => {
      // console.log(g, GUI)
      const obj1 = g.scene
      obj1.rotation.x = 0
      obj1.rotation.y = -0.8
      obj1.rotation.z = 0
      addShadow(obj1.children)
      base.scene.add(obj1)
      // const gui = new GUI()
      // let obj = {x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0}
      // gui.add(obj, 'x', -10.0, 10.0, 0.1).onChange((val) => {
      //   base.camera.position.x = val
      // })
      // gui.add(obj, 'y', -10.0, 10.0, 0.1).onChange((val) => {
      //   base.camera.position.y = val
      // })
      // gui.add(obj, 'z', -10.0, 10.0, 0.1).onChange((val) => {
      //   base.camera.position.z = val
      // })
      // gui.add(obj, 'rx', -10.0, 10.0, 0.1).onChange((val) => {
      //   obj1.rotation.x = val
      // })
      // gui.add(obj, 'ry', -10.0, 10.0, 0.1).onChange((val) => {
      //   obj1.rotation.y = val
      // })
      // gui.add(obj, 'rz', -10.0, 10.0, 0.1).onChange((val) => {
      //   obj1.rotation.z = val
      // })
    })
  }

  const addLight = () =>{
    let light = new THREE.AmbientLight(0xffffff, 0.6)
    base.scene.add(light)

    let dirLight = new THREE.DirectionalLight()
    dirLight.castShadow = true
    base.scene.add(dirLight)
  }

  const addShadow = (obj) => {
    obj.forEach(val => {
      if (val instanceof THREE.Mesh) {
        val.castShadow = true
        val.receiveShadow = true
      } else {
        if (val.children) {
          addShadow(val.children)
        }
      }
    })
  }
  
</script>
  
<style>
  /* #canvasDom {
    height: 100vw!important;
    width: 100vh!important;
  } */
</style>