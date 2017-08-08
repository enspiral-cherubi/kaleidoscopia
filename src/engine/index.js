import THREE from 'three'
import Environment from './environment'
import View from './view'
import $ from 'jquery'
import loop from 'raf-loop'

class Engine {

  constructor () {
    this.environment = new Environment()
    this.view = new View()
  }

  bindEventListeners () {
    var self = this
    $(window).load(this.view.closeLoadingScreen)
    $(window).mousedown((e)=>{self.environment.startDrawing(e)})
    // $(window).keydown((e)=>{self.environment.startDrawing(e)})
    // $(window).mousemove((e)=>{self.environment.draw(e)})
    $(window).mouseup((e)=>{self.environment.stopDrawing(e)})
    // $(window).keypress((e)=>{self.environment.toggleColors(e)})
  }

  start () {
    loop((t) => {
      this.environment.render()
    }).start()
  }

}

export default Engine
