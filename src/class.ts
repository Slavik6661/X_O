// Welcome to the TypeScript Playground, this is a website
// which gives you a chance to write, share and learn TypeScript.

// You could think of it in three ways:
//
//  - A location to learn TypeScript where nothing can break
//  - A place to experiment with TypeScript syntax, and share the URLs with others
//  - A sandbox to experiment with different compiler features of TypeScript
/* 
class Car{
    carBrand:string
    carModel:string
    color:string
    year:number
    price:number

    constructor( carBrand:string,carModel:string,color:string,year:number,price:number ) {  
        this.carBrand = carBrand
        this.carModel = carModel
        this.color = color
        this.year = year
        this.price = price
    } 

    show(){
        console.log(this.carBrand,)
        console.log( this.carModel,)
        console.log( this.color ,)
        console.log( this.year ,)
        console.log(this.price ,)
        
    }
  

}
  class CarNew extends Car{
      constructor(carBrand:string,carModel:string,color:string,year:number,price:number ){
        super(carBrand,carModel,color,year,price)
      }
        show(){
        console.log(this.carBrand,)
        console.log( this.carModel,)
        console.log( this.color ,)
        console.log( this.year ,)
        console.log(this.price ,)
        
    }
       
    }
 

 let Lada = new CarNew('Lada','Granta','green',2022,1200000)
 Lada.show()
 let LadaVesta = new CarNew('Lada','Vesta','blue',2077,1400000)
 LadaVesta.show()*/

/*Реализуйте класс Worker (Работник), который будет иметь следующие свойства: name (имя), surname (фамилия), rate (ставка за день работы),
 days (количество отработанных дней). Также класс должен иметь метод getSalary(), который будет выводить зарплату работника.
 Зарплата - это произведение (умножение) ставки rate на количество отработанных дней days.

Вот так должен работать наш класс:

var worker = new Worker('Иван', 'Иванов', 10, 31);

console.log(worker.name); //выведет 'Иван'
console.log(worker.surname); //выведет 'Иванов'
console.log(worker.rate); //выведет 10
console.log(worker.days); //выведет 31
console.log(worker.getSalary()); //выведет 310 - то есть 10*31

class Worker_ {
    name:string;
    surname:string
    rate:number
    days:number

    constructor(name:string,surname:string, rate:number,days:number){
        this.name=name
        this.surname=surname
        this.rate=rate
        this.days=days
    }

    getSalary(){
        return this.rate*this.days
    }
    setRate(value:number){
       return this.rate=value

    }
    setDays(value:number){
       return this.days=value
    }

     getRate(){
       return this.rate

    }
    getDays(){
       return this.days
    }

}
let worker = new Worker_('Иван', 'Иванов', 10, 31);

console.log(worker.getRate()); //выведет 10
console.log(worker.getDays()); //выведет 31
console.log(worker.getSalary()); //выведет 310 - то есть 10*31

//Теперь используем сеттер:
worker.setRate(200); //увеличим ставку
worker.setDays(10); //уменьшим дни
console.log(worker.getSalary()); //выведет 200 - то есть 20*10
*/

/*Реализуйте класс Validator, который будет проверять строки. К примеру, у него будет метод isEmail параметром принимает строку и проверяет,
 является ли она корректным емейлом или нет. Если является - возвращает true, если не является - то false.
  Кроме того, класс будет иметь следующие методы: метод isDomain для проверки домена, метод isDate для проверки даты и метод isPhone
 для проверки телефона: */

/*
class Validator{
    
    constructor(){
    
    }
    isEmail(value:string){
        
        return value.match('/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')?true:false
    }
    isDomain(value:string){
        value.match('^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$')
    }
    isDate(value:string){
     return true
    }
    isPhone(value:string){
        value.match('/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im')
    }

}
let validator = new Validator();

console.log(validator.isEmail('phphtml@mail.ru'));
console.log(validator.isDomain('phphtml.net'));
console.log(validator.isDate('12.05.2020'));
console.log(validator.isPhone('+375 (29) 817-68-92')); //тут можете формат своей страны
*/

/* Реализуйте класс Student (Студент), который будет наследовать от класса User, подобно тому, как это сделано в теоретической части урока.
 Этот класс должен иметь следующие свойства: name (имя, наследуется от User), surname (фамилия, наследуется от User), year (год поступления в вуз). 
 Класс должен иметь метод getFullName() (наследуется от User), с помощью которого можно вывести одновременно имя и фамилию студента. 
 Также класс должен иметь метод getCourse(), который будет выводить текущий курс студента (от 1 до 5). 
 Курс вычисляется так: нужно от текущего года отнять год поступления в вуз. Текущий год получите самостоятельно. */
/*  function summ(){
        return console.log(5+5)
        
    }
 class User{
    name:string
    surname:string
    year:number
    


    constructor( name:string, surname:string,year:number ) {  
        this. name =  name
        this. surname =  surname
        this.year = year
      
    } 
       getFullName(summ:()=>void){
        
        return this.name+ ' ' +this.surname + ' ' +summ()
    }

}
  class Student extends User{
      constructor(name:string, surname:string,year:number ){
        super(name,surname,year)
      }
      
       getFullName(){
          return super.getFullName(summ)
          
       }
        
    

    getCourse(){
        let date= new Date
        return date.getFullYear()-this.year+ ' ' +'курс'
    }
       
    }

    let  student = new Student('Иван', 'Иванов', 2018);

console.log(student.name); //выведет 'Иван'
console.log(student.surname); //выведет 'Иванов'
console.log(student.getFullName()); //выведет 'Иван Иванов'
console.log(student.getCourse());  */

/* class TV{
    state:boolean=false
    chenal:number=0
    constructor( ) 
    
    {
        
    } 

    onTV(value:boolean){
       
        return this.state=value
    }
    
    offTV(value:boolean){

        return this.state=value

    }

    setChenals(value:number){
        if(this.state==true){
           this.chenal=value
          return console.log('включаю ' +  this.chenal + ' канал')
        }
        else{
           
            return console.log('сначала включи TV ')
        }
    }

    getChenal(){
        return console.log('сейчас в находитесь на ' +  this.chenal + 'канал')
    }
    getStateTV(){
        if(this.state){return console.log('ТВ вкл')}
        else{return console.log('ТВ выкл')}
        
    }

}
  
let tv=new TV()

tv.getStateTV();  */
function swap(lastNumber: number, j: number) {
  lastNumber = arg[j]; //450

  arg[j] = arg[j + 1]; //450=43

  arg[j + 1] = lastNumber; //43=450

  return arg[j], arg[j + 1];
}
function sorNumber(...arg: number[]): number[] {
  let lastNumber: number = 0;
  for (let i = 0; i < arg.length; i++) {
    for (let j = 0; j < arg.length; j++) {
      if (arg[j] > arg[j + 1]) {
        swap(arg[j], lastNumber);
      }
    }
  }

  return arg;
}
let arg = [2, 5, 4, 6, 450, 43, 212, 435, 322];
console.log(sorNumber(...arg));
