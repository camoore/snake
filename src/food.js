export default class Food {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  update(){

  }
  render(context){
    context.save();
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, 1, 1);
    context.restore();
  }
}
