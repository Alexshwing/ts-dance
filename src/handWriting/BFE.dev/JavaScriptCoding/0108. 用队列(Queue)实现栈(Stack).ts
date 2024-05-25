// @ts-nocheck
/* you can use this Queue which is bundled together with your code
class Queue {
  enqueue(element) {
    // add new element to the queue
  }
  peek() { 
    // return the head element
  }
  dequeue() { 
    // remove head element from the queue
  }
  size() { 
    // return the queue size
  }
}
*/

// you need to complete the following Stack, using only Queue
class Stack {
  constructor() {
    this.dq = new Queue();
  }
  push(x) {
    let n = this.size();
    this.dq.enqueue(x);
    while (n > 0) {
      this.dq.enqueue(this.dq.dequeue());
      n -= 1;
    }
  }
  peek() {
    return this.dq.peek();
  }
  pop() {
    return this.dq.dequeue();
  }
  size() {
    return this.dq.size();
  }
}
