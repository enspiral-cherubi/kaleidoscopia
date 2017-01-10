import THREE from 'three'

var getOrbit = function (origin,group) {
  var orbit = []
  if(group === 1){
    //p1
    var translation1 = new THREE.Vector3(30,10,0)
    var translation2 = new THREE.Vector3(0,30,0)
    return makeLattice(origin,translation1,translation2)
  }
  if(group === 2){
    //p2
    var translation1 = new THREE.Vector3(30,0,0)
    var translation2 = new THREE.Vector3(0,20,0)
    var c2rotationCenter = new THREE.Vector3(0,0,1)
    var w = origin.clone()
    var row = makeLattice(origin,translation1,translation2)
    orbit.push(...row)
    var newRow = row
    for(var i = 0; i<2; i++){
      //iterate over point group
      newRow = newRow.map((u)=> rotate(u,c2rotationCenter,Math.PI))
      orbit.push(...newRow)
    }
  }
  if(group === 3){
    //pm
    var translation1 = new THREE.Vector3(30,0,0)
    var translation2 = new THREE.Vector3(0,20,0)
    var reflectionAxis = new THREE.Vector3(0,1,0)
    var reflectionOffset = new THREE.Vector3(0,0,0)
    var pts = makeLattice(origin,translation1,translation2)
    orbit.push(...pts)
    var newPts = pts
    for(var i = 0; i<2; i++){
      //iterate over point group
      newPts = newPts.map((u)=>reflect(u,reflectionAxis,reflectionOffset))
      orbit.push(...newPts)
    }
  }
  if(group === 4){
    //pg
    var translation1 = new THREE.Vector3(30,0,0)
    var translation2 = new THREE.Vector3(0,20,0)
    var glideAxis1 = new THREE.Vector3(0,1,0)
    var glideShift1 = new THREE.Vector3(0,10,0)
    var glideOffset1 = new THREE.Vector3(0,0,0)
    var glideAxis2 = new THREE.Vector3(1,0,0)
    var glideShift2 = new THREE.Vector3(15,0,0)
    var glideOffset2 = new THREE.Vector3(0,0,0)
    var pts = makeLattice(origin,translation1,translation2)
    orbit.push(...pts)
    var newPts = pts
    for(var i = 0; i<2; i++){
      //iterate over point group
      newPts = newPts.map((u)=>glideReflect(u,glideAxis1,glideOffset1,glideShift1))
      orbit.push(...newPts)
    }
    for(var i = 0; i<2; i++){
      newPts = newPts.map((u)=>glideReflect(u,glideAxis2,glideOffset2,glideShift2))
      orbit.push(...newPts)
    }
  }
  if(group === 5){
    //TODO
  }
  if(group === 6){
    //TODO
  }
  if(group === 7){
    //TODO
  }
  if(group === 8){
    //TODO
  }
  if(group === 9){
    //TODO
  }
  if(group === 10){
    //TODO
  }
  if(group === 11){
    //TODO
  }
  if(group === 12){
    //TODO
  }
  if(group === 13){
    //TODO
  }
  if(group === 14){
    //TODO
  }
  if(group === 15){
    //TODO
  }
  if(group === 16){
    //p6
    var t1 = new THREE.Vector3(30,0,0)
    var t2 = new THREE.Vector3(30,30,0)
    var w = origin.clone()
    var row = []
    for(var i = -10; i<11; i++){
      for(var j = -10; j<11; j++){
        var u = w.clone()
        u = u.addScaledVector(t1,i)
        u = u.addScaledVector(t2,j)
        row.push(u)
      }
    }
    // row = row.map((u)=>{return new THREE.Vector3(...this.c6.applyToVector3Array([u.x,u.y,u.z]))})
    orbit.push(...row)
    var newRow = row
    for(var i = 0; i<6; i++){
      newRow = newRow.map((u)=>{return new THREE.Vector3(...this.c6.applyToVector3Array([u.x,u.y,u.z]))})
      orbit.push(...newRow)
      // newRow = _.range(-10,10).map((u) => {return u.add(t)})
    }
  }
  if(group === 17){
    //TODO
  }
  return orbit
}

var makeLattice = function(origin,translation1,translation2) {
  var translation1 = new THREE.Vector3(30,0,0)
  var translation2 = new THREE.Vector3(0,20,0)
  var w = origin.clone()
  var row = []
  for(var i = -10; i<11; i++){
    for(var j = -10; j<11; j++){
      var u = w.clone()
      u = u.addScaledVector(translation1,i)
      u = u.addScaledVector(translation2,j)
      row.push(u)
    }
  }
  return row
}

var rotate = function(position,axis,angle) {
  var newPosition = position.clone()
  newPosition.applyAxisAngle(axis,angle)
  return newPosition
}

var reflect = function(position,axis,offset) {
  var axialComponent = position.clone()
  axialComponent = axialComponent.projectOnVector(axis)
  var normalComponent = position.clone()
  normalComponent = normalComponent.sub(axialComponent)
  return axialComponent.sub(normalComponent).addScaledVector(offset,2)
}

var glideReflect = function(position,axis,offset,shift) {
  return reflect(position,axis,offset).add(shift)
}


module.exports = getOrbit
