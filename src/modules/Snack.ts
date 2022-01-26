/* 
🐍的核心类
首先我们应该有🐍的元素节点，蛇头的节点，还有蛇身的节点
*/
class Snack {
  head: HTMLElement;
  bodies: HTMLCollection;
  element: HTMLElement;
  constructor() {
    this.head = document.querySelector('#snake>div') as HTMLElement;
    this.bodies = document.getElementById('snake')!.getElementsByTagName('div')
    this.element = document.getElementById('snake')!
  }

  // 获取蛇头X坐标
  get X(): number {
    return this.head.offsetLeft
  }
  // 获取蛇头Y坐标
  get Y(): number {
    return this.head.offsetTop;
  }

  // 设置蛇头X坐标
  set X(value: number) {
    if (this.X == value) {
      return
    }
    if (value < 0 || value > 350) {
      throw Error
    }
    //修改x时，是在修改水平方向，🐍的左右移动
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      console.log('同方向移动')
      //直接设置向同方向运动
      if (value > this.X) {
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    this.checkBody();;
    this.movebody()//设置🐍身体移动的方法
    this.head.style.left = value + 'px';
  }
  // 设置蛇头Y坐标
  set Y(value: number) {
    if (this.Y == value) {
      return
    }
    if (value < 0 || value > 350) {
      throw Error
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {

      console.log('同方向移动')
      //直接设置向同方向运动
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    this.checkBody();
    this.movebody()//设置🐍身体移动的方法
    this.head.style.top = value + 'px';

    //回头检测，撞到身体检测
  }

  // 设置蛇身增加的方法
  addBody() {
    this.element.insertAdjacentHTML('beforeend', "<div></div>")
  }


  //蛇身移动方法
  movebody() {
    // 我们遍历除过蛇头的蛇身部分，从尾开始遍历，然后将后一个的元素位置给前一个元素的位置；
    for (let i = this.bodies.length - 1; i > 0; i--) {
      //获取当前元素的上一个元素的为位置；
      //2=>1
      let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      //赋值操作；
      (this.bodies[i] as HTMLElement).style.left = x + "px";
      (this.bodies[i] as HTMLElement).style.top = y + "px";
    }
  }


  checkBody() {
    //获取所有身体是否和蛇头相等
    for (let i = 1; i < this.bodies.length; i++) {
      let db= this.bodies[i] as HTMLElement;
      if (this.X === db.offsetLeft && this.Y === db.offsetTop) {
        alert('游戏结束');
        return
      }
    }
  }
}

export default Snack