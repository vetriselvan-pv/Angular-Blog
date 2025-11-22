<h1> Interface in typescript </h1>

Hey Devs
We all know typeScript is a super set of javascript and the type declaration makes it more powerful. Lets understanding the basic to advance interface conceot in typescript

<b> what is interface ? </b>

In typescript it is a way to define the shape of the object. It define the what propertie that object have and the type of the property. Even the methods inside the object can also be defined.

How to define a interface for a object?

<h2>1. Interface for a object </h2>

```ts
interface ISampleProps = {
    name : string
}
```

You need to provide the reserved keyword interface before the interface name. For coding standard I is used to indicate the variable is interface. Its not neccessary to startwith I always . You can define the name whatever based on the need.

<h2>2. Interface with optional property </h2>

```ts
interface IOptionalProps = {
    name : string
    role? : string
}

const sample : IOptionalProps = {
    name : 'Mike'
}

console.log(sample.role);

 const sample : IOptionalProps = {
    name : 'Mike',
    role : 'Developer'
}

console.log(sample.role)
```

In the above example the role is a optional property to the object .

<h2>3. Interface with method property </h2>

```ts
interface IMethodProps = {
    name : string ,
    greet() : void
}

const sample : IMethodProps = {
    name : 'Alan',
    greet(){
        console.log('Hi '+this.name)
    }
}

console.log(sample.greet())
```

The above example will make you understand how to define a method property to the object. Same you can define the method property as optional as well.

<h2>4. Interface for a function </h2>

```ts
interface ISampleFn {
  (param: string): string;
}

const greeting: ISampleFn = (param: string) => `Hi ${param}`;
```

<h2>5. Interfaces for Arrays & Index Signatures </h2>

```ts
interface ISampleArray {
  [index: number]: string;
}

const sampleArray: ISampleArray = ["a", "b", "c"];
```

<h2>6. Intersection of Interfaces (Combining Types)</h2>

``` ts 

interface ISampleA {
  a: string;
}

interface ISampleB {
  b: number;
}

type TSampleAB = A & B;

const obj: TSampleAB = {
  a: "hello",
  b: 123,
};

```

<h2>Generic Interfaces</h2>

``` ts
interface ISampleGeneric<T> {
  status: number;
  data: T;
}

const sample: ISampleGeneric<string> = {
  status: 200,
  data: "Success",
};

```

