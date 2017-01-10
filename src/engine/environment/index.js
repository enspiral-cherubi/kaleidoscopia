import THREE from 'three'
import $ from 'jquery'
import _ from 'lodash'
import randomColor from 'randomcolor'
import ThreeOrbitControls from 'three-orbit-controls'
var OrbitControls = ThreeOrbitControls(THREE)
import THREEFlyControls from 'three-fly-controls'
THREEFlyControls(THREE)
import WindowResize from 'three-window-resize'
import getOrbit from './groups'

class Environment {

  constructor () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 1000)
    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = 100
    this.camera.lookAt(new THREE.Vector3(0,0,0))




    this.renderer = new THREE.WebGLRenderer({alpha: true, canvas: $('#three-canvas')[0]})
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xffffff, 1)

    this.controls = new OrbitControls(this.camera)
    // this.controls = new THREE.FlyControls(this.camera, this.renderer.domElement)
    // this.controls.movementSpeed = 0.1

    this.painting = false

    // this.spaceGroup = 1+Math.floor(Math.random()*17)
    this.spaceGroup = 4
    console.log("Hi! You are drawing with wallpaper group number " + this.spaceGroup + ".")

    this.c2 = new THREE.Matrix3()
    this.c2.set(
      -1,0,0,
      0,-1,0,
      0,0,1
    )

    this.c6 = new THREE.Matrix3()
    this.c6.set(
      1,-1,0,
      1,0,0,
      0,0,1
    )

    this.drawSymmetryCenters()

    // console.log(this.c6.applyToVector3Array([1,0,1]))



    var windowResize = new WindowResize(this.renderer, this.camera)

  }

  render () {
    this.renderer.render(this.scene, this.camera)
  }

  // 'private'

  drawSymmetryCenters () {
    //p6
    var t1 = new THREE.Vector3(30,0,0)
    var t2 = new THREE.Vector3(30,30,0)
    var w = new THREE.Vector3(0,0,0)
    var centers = []
    for(var i = -10; i<11; i++){
      for(var j = -10; j<11; j++){
        var u = w.clone()
        u = u.addScaledVector(t1,i)
        u = u.addScaledVector(t2,j)
        centers.push(u)
      }
    }
    this.geometry = new THREE.Geometry()
    this.geometry.vertices.push(...centers)
    var centersMesh = new THREE.Points(this.geometry)
    this.scene.add(centersMesh)
  }

  startDrawing (e) {
    if((e.key === " ") && (this.painting === false)){
        this.pointColor = randomColor()
        this.painting = true
    }
    // this.drawing = new THREE.Points(this.geometry)
    // this.scene.add(this.drawing)
  }

  stopDrawing (e) {
    if(e.key === " "){
      this.painting = false
    }
    // this.geometry = new THREE.Geometry()
  }

  draw (e) {
    if(this.painting)
    {
      var vector = new THREE.Vector3(2*e.clientX/window.innerWidth - 1,
                                    -2*e.clientY/window.innerHeight + 1,
                                    0.5
                                  )
      vector.unproject( this.camera )
      var direction = vector.sub( this.camera.position ).normalize()
      var distance = - this.camera.position.z / direction.z
      var position = this.camera.position.clone().add( direction.multiplyScalar( distance ) )
      var orbit = getOrbit(position,this.spaceGroup)
      var orbitGeometry = new THREE.Geometry()
      orbitGeometry.vertices.push(...orbit)
      var orbitMaterial = new THREE.PointsMaterial({color:this.pointColor})
      var orbitMesh = new THREE.Points(orbitGeometry,orbitMaterial)
      this.scene.add(orbitMesh)
    }
  }


}

export default Environment
