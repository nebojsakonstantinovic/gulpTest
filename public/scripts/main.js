class Person {
  constructor(name) {
    this.name = name;
  }
  hello() {
    if (typeof this.name === 'string') {
      return `Hello, I am ${this.name}!`;
    } else {
      return 'Hello';
    }
  }
}

var person = new Person('Patak');
var greetHTML = templates.greeting({
  PATKA: 'idemo bre',
});

// var name = 'Max';
// var surname = 'Mad';

// document.write('Hello ' + surname + ' ' + name + '!');
document.write(person.hello());
document.write(greetHTML);
