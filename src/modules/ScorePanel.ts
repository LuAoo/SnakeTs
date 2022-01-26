/* 
积分器类，这个类主要是操作分数和等级的类。
主要属性有以下：分数变量、分数元素、等级变量、等级元素，最高等级，等级界限
主要方法有以下：加分方法，加等级方法
*/

class ScorePanel {
  score: number = 0;
  leval: number = 1;
  scoreElement: HTMLElement;
  levalElement: HTMLElement;
  maxLeval: number;
  degree: number;
  constructor(maxLeval: number = 10, degree: number = 10) {
    this.scoreElement = document.getElementById('score')!;
    this.levalElement = document.getElementById('leval')!;
    this.maxLeval = maxLeval;
    this.degree = degree;
  }

  addScore(): void {
    //如果这里分数到达一定程度就会升级
    this.scoreElement.innerHTML = ++this.score + ''
    if (this.score % this.degree == 0) {
      this.addLeval();
    }

  }

  //升级，注意到达满级后直接跳出
  addLeval(): void {
    if (this.leval + 1 > this.maxLeval) {
      alert('you win')
      return;
    }
    this.levalElement.innerHTML = ++this.leval + ''
  }
}

export default ScorePanel;