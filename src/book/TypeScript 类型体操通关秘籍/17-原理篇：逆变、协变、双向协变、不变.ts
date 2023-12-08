// 一、协变(covariant)
// 子类型可以赋值给父类型
interface Person {
  name: string;
  age: number;
}
interface Alex {
  name: string;
  age: number;
  hobbies: string[];
}
let p: Person = {
  name: '',
  age: 20,
};
let alex: Alex = {
  name: 'alex',
  age: 20,
  hobbies: ['play', 'cat'],
};

p = alex;

// 二、逆变(contravariant)
let printHobbies: (alex: Alex) => void = (alex) => {
  console.log(alex.hobbies);
};

let printName: (person: Person) => void = (person) => {
  console.log(person.name);
};

printHobbies = printName;
printName = printHobbies;
