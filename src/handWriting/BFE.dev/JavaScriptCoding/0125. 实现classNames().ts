// @ts-nocheck
/**
在React中，可以使用className添加CSS class name，其为字符串，可以添加多个class name。

<p className="classname1 classname2">
  BFE.dev can help
</p>
但如果class name是动态生成的，写起来就比较麻烦了。

<p 
  className={`classname1  ${shouldAddClassname2 ? 'classname2' : ''}`}>
  BFE.dev can help
</p>
为了解决这个问题，classnames 也许能帮上忙。

classNames()接受任意的参数，其将过滤其中的falsy值，然后生成最终的class name字符串。

string 和 number 的话，直接使用
classNames('BFE', 'dev', 100) 
// 'BFE dev 100'
其他的primitive将被忽略
classNames(
  null, undefined, Symbol(), 1n, true, false
) 
// ''
Object的enumerable property，如果key是string而且value是truthy的话将被保留。数组需要扁平化。

const obj = new Map()
obj.cool = '!'

classNames({BFE: [], dev: true, is: 3}, obj) 
// 'BFE dev is cool'

classNames(['BFE', [{dev: true}, ['is', [obj]]]])
// 'BFE dev is cool'
请实现这样的classNames()

注意

该问题的目的并不是要再现classnames这个package，其spec可能有所不同，所以请按照上述spec实现你的代码。
 */
function classNames(...args) {
  return args
    .flat(Infinity)
    .reduce((prev, cur) => {
      if (typeof cur === 'string' || typeof cur === 'number') {
        prev.push(cur);
      }

      if (typeof cur === 'object' && cur !== null) {
        Object.entries(cur).forEach(([k, v]) => {
          if (!!v) {
            prev.push(k);
          }
        });
      }

      return prev;
    }, [])
    .join(' ');
}

const obj = new Map([['foo', 'bar']]);
obj.cool = '!';
obj.not = false;
obj[Symbol()] = 'symbol';
Object.defineProperty(obj, 'hidden', { value: true });

console.log(classNames(['BFE', [{ dev: true }, ['is', [obj]]]]));

//  'BFE dev is cool'

export {};
