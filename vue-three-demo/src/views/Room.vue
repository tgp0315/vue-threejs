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
    let light = new THREE.AmbientLight(0xffffff, 0.7)
    base.scene.add(light)

    let dirLight = new THREE.DirectionalLight()
    dirLight.castShadow = true
    // 处理阴影的平滑
    dirLight.shadow.mapSize.set(2024, 2024)
    base.scene.add(dirLight)
  }
  // 纹理加载器
  let textureLoader = new THREE.TextureLoader()

  const addShadow = (obj) => {
    obj.forEach(val => {
      console.log(val)
      if (val instanceof THREE.Mesh) {
        val.castShadow = true
        val.receiveShadow = true
        if (val.name.includes('Pape')) {
          // console.log(val)
          val.material.map = textureLoader.load(`../../public/img/Photo_-_2.jpg`)
        }
        if (val.name === 'Plane014_1') {
          console.log(val)
          let video = document.createElement('video')
          video.src = '../../public/video.mp4'
          video.loop = true
          video.muted = true
          video.play()
          const videoTexture = new THREE.VideoTexture(video)
          videoTexture.minFilter = THREE.NearestFilter
          videoTexture.magFilter = THREE.NearestFilter
          videoTexture.generateMipmaps = false
          videoTexture.encoding = THREE.sRGBEncoding
          // videoTexture.center = new THREE.Vector2(0.5, 0.5)
          videoTexture.rotation = Math.PI / 2
          const videoMaterial = new THREE.MeshBasicMaterial({
            map: videoTexture,
          });
          val.material = videoMaterial
          // val.material.map = textureLoader.load(`../../public/img/Photo_-_2.jpg`)
        }
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