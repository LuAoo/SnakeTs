/* 
 定义食物类
 首先作为食物类我们首要想到就是先有食物元素
 其次就是我们应该由获得当前元素位置的方法
 最后我们每次食物被吃以后就需要我们更改依次食物的位置，我们也需要一个更改食物位置的方法
*/
class Food {
  element: HTMLElement;
  constructor() {
    this.element = document.getElementById('food')!;
  }
  get X(): number {
    return this.element.offsetLeft
  }
  get Y(): number {
    return this.element.offsetTop
  }
  setPoistion(): void {
    let x: number = Math.floor(Math.random() * 30) * 10;
    let y: number = Math.floor(Math.random() * 30) * 10;
    this.element.style.left = x + 'px';
    this.element.style.top = y + 'px'
  }
}
export default Food;