/* 
控制器是我们的核心类，这里涉及到我们几乎所有的逻辑
所以第一步我们应该进行实例化
接着我们应该找到对应的键盘操作，并且记录当前的键盘值。
*/
import Food from './Food'
import Snack from './Snack'
import ScorePanel from './ScorePanel'
class GameControl {
  food: Food;
  snack: Snack;
  scorePannel: ScorePanel;
  keyDownDate: string = '';
  isMove: boolean = true;
  constructor() {
    //实例化工具类
    this.food = new Food();
    this.snack = new Snack();
    this.scorePannel = new ScorePanel();
    this.init();
  }

  //初始化操作
  init() {
    //监听键盘事件，并且给回调函数改变this指向
    window.addEventListener('keydown', this.changeKeyDowEvent.bind(this))
    this.move();
  }

  //键盘事件
  changeKeyDowEvent(value: KeyboardEvent) {
    let tempKeytype: string = value.key
    // 判断是否是方向键，如果不是方向键忽略，如果是方向键则将方向更新为当前的方向
    if (tempKeytype == 'ArrowUp' || tempKeytype == 'ArrowDown' || tempKeytype == 'ArrowLeft' || tempKeytype == 'ArrowRight') {
      this.keyDownDate = tempKeytype
    }
  }

  //移动
  move() {
    // 这里就是处理我们蛇蛇移动的逻辑。首先我们应该通过方向进行后续的加减操作

    //临时储存当前蛇蛇的坐标
    let x: number = this.snack.X;
    let y: number = this.snack.Y;
    switch (this.keyDownDate) {
      case 'ArrowUp':
        y -= 10
        break;
      case 'ArrowDown':
        y += 10
        break;
      case 'ArrowLeft':
        x -= 10
        break;
      case 'ArrowRight':
        x += 10
        break;
    }
    //得到最终x，y坐标以后直接设置snack的坐标
    try {
      this.snack.X = x;
      this.snack.Y = y;
      //设置完以后直接进行吃屎检测
      this.eatOk(this.snack.X,this.snack.Y);
    } catch (error) {
      alert('撞墙啦');
      this.isMove = false
    }

    //接着在开启一个定时器，进行循环递归move事件，使🐍身体一致保持移动
    // this.isMove && setTimeout(this.move.bind(this), 300 - ((this.scorePannel.leval - 1) * 30))
    this.isMove && setTimeout(this.move.bind(this), 50)
  }

  //吃食检测,这里涉及的就是我们时候吃到食物
  eatOk(x: number, y: number) {
    if (x == this.food.X && y == this.food.Y) {
      //加分
      this.scorePannel.addScore();
      //更换位置
      this.food.setPoistion();
      //加身体
      this.snack.addBody();
    }
  }


}


export default GameControl;