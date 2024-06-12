// Node.js中有Event Emitter，Facebook 也曾经有自己的实现 不过已经archive了。

// 请实现你自己的 Event Emitter

// const emitter = new Emitter()
// 它需要支持事件订阅

// const sub1  = emitter.subscribe('event1', callback1)
// const sub2 = emitter.subscribe('event2', callback2)

// 同一个callback可以重复订阅同一个事件
// const sub3 = emitter.subscribe('event1', callback1)
// emit(eventName, ...args) 可以用来触发callback

// emitter.emit('event1', 1, 2);
// callback1 会被调用两次
// subscribe()返回一个含有release()的对象，可以用来取消订阅。

// sub1.release()
// sub3.release()
// 现在即使'event1'被触发,
// callback1 也不会被调用

class EventEmitter {
  mp = new Map();

  subscribe(name, cb) {
    if (!this.mp.has(name)) {
      this.mp.set(name, new Set());
    }
    const cbs = this.mp.get(name);
    const cbObj = { cb };
    cbs.add(cbObj);

    return {
      release: () => {
        cbs.delete(cbObj);
        if (cbs.size === 0) {
          this.mp.delete(name);
        }
      },
    };
  }

  emit(name, ...args) {
    if (!this.mp.get(name)) {
      return;
    }
    const cbs = this.mp.get(name);
    cbs.forEach((cbObj) => {
      cbObj.cb.apply(this, args);
    });
  }
}
