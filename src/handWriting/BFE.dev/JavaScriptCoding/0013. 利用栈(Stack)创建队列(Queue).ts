class Queue {
  inStk: any[];
  outStk: any[];
  constructor() {
    this.inStk = [];
    this.outStk = [];
  }

  enqueue(element: any) {
    this.inStk.push(element);
  }

  // 在输出栈为空时进行调整, 这样保证栈顶为队头
  adjust() {
    while (this.inStk.length > 0) {
      this.outStk.push(this.inStk.pop());
    }
  }

  peek() {
    if (this.outStk.length === 0) {
      this.adjust();
    }
    return this.outStk[this.outStk.length - 1];
  }

  dequeue() {
    if (this.outStk.length === 0) {
      this.adjust();
    }
    return this.outStk.pop();
  }

  size() {
    return this.inStk.length + this.outStk.length;
    // return count of element
  }
}
