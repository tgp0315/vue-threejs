import * as THREE from 'three'
export default class Base {
  constructor(canvas) {
    // 创建一个新的场景对象
    this.scene = new THREE.Scene()
    // 透视相机 用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
    this.camera = new THREE.PerspectiveCamera(
      75, //  摄像机视锥体垂直视野角度
      window.innerWidth / window.innerHeight, // 摄像机视锥体长宽比
      0.0001, // 摄像机视锥体近端面
      100000 // 摄像机视锥体远端面
    )
    // 渲染器
    this.renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true // 是否执行抗锯齿
    })
    this.camera.position.y = 1.6
    this.camera.position.z = 4.6
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.shadowMap.enabled = true
  }

  update() {
    requestAnimationFrame(this.update.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}