import { Component, computed, effect, OnInit, signal } from "@angular/core";
import { Control, form } from "@angular/forms/signals";

@Component({
  selector: "app-js-operator",
  imports: [Control],
  templateUrl: "./js-operator.html",
  styles: `
  :host { display: block; font-family: Inter, Arial, sans-serif; color: #0f172a; }
    .container { max-width: 980px; margin: 20px auto; padding: 18px; }
    .header { text-align: left; margin-bottom: 16px; }
    h1 { font-size: 1.6rem; margin: 0 0 6px; }
    .subtitle { color: #475569; margin: 0; font-size: 0.95rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; }
    .card { background: #ffffff; border: 1px solid #e6eef5; padding: 12px; border-radius: 10px; box-shadow: 0 4px 10px rgba(2,6,23,0.03); }
    h2 { font-size: 1.05rem; margin: 0 0 8px; }
    .controls { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin-bottom: 8px; }
    input[type="number"], input[type="text"], select { padding: 6px 8px; border-radius: 6px; border: 1px solid #cbd5e1; min-width: 64px; }
    button { padding: 6px 10px; border-radius: 8px; border: none; background: #2563eb; color: white; cursor: pointer; }
    button:hover { filter: brightness(0.95); }
    .result { background: #0f172a; color: #e6eef5; padding: 8px; border-radius: 6px; font-family: monospace; }
    .code { background: #f8fafc; padding: 8px; border-radius: 6px; font-family: monospace; color: #0b1220; }
    .note { font-size: 0.85rem; color: #475569; }
    .footer { margin-top: 12px; font-size: 0.9rem; color: #475569; }`,
})
export class JsOperator implements OnInit {
  operator = signal({
    arithmeticA: 3,
    arithmeticB: 7,
    arithmeticOperator: "+",
  });

  readonly operatorForm = form(this.operator);

  // Arithmetic
  arithResult = computed(() => {
    const x = Number(this.operatorForm.arithmeticA().value());
    const y = Number(this.operatorForm.arithmeticB().value());
    try {
      switch (this.operatorForm.arithmeticOperator().value()) {
        case "+":
          return x + y;
        case "-":
          return x - y;
        case "*":
          return x * y;
        case "/":
          return y === 0 ? "Division by zero" : x / y;
        case "%":
          return x % y;
        case "**":
          return x ** y;
        default:
          return "Unknown op";
      }
    } catch (e) {
      return "Error";
    }
  });

  // Assignment
  assignBase = 10;
  assignAmount = 5;
  assignOp = "=";
  assignCurrent: any = this.assignBase;

  // Comparison
  cmpX: string = "5";
  cmpY: string = 5 as any;
  cmpOp: string = "==";
  cmpResult = signal<boolean | undefined | string>(undefined);

  // Logical
  logicA: boolean = true;
  logicB: boolean = false;
  logicOp: string = "&&";
  logicResult: any = "";

  // Ternary
  ternLeft = 7;
  ternRight = 3;
  ternResult: string = "";

  // Bitwise
  bitX = 5;
  bitY = 3;
  bitOp: string = "&";
  bitResult: any = "";
  bitXBinary = "";
  bitYBinary = "";

  constructor() {}

  ngOnInit(): void {}

  runAssignment() {
    // Demonstrate how assignment operators change value
    let cur = Number(this.assignCurrent);
    const amt = Number(this.assignAmount);
    switch (this.assignOp) {
      case "=":
        cur = amt;
        break;
      case "+=":
        cur += amt;
        break;
      case "-=":
        cur -= amt;
        break;
      case "*=":
        cur *= amt;
        break;
      case "/=":
        cur = amt === 0 ? 0 : cur / amt;
        break;
    }
    this.assignCurrent = cur;
  }

  resetAssignment() {
    this.assignCurrent = Number(this.assignBase);
  }

  runComparison() {
    // Try to interpret inputs as numbers if possible, but keep strings too
    const rawX = this.cmpX;
    const rawY = this.cmpY as any;

    // Build values; attempt numeric parse when both look like numbers
    const numX = Number(rawX);
    const numY = Number(rawY);
    const x = !isNaN(numX) && String(numX) === String(rawX) ? numX : rawX;
    const y = !isNaN(numY) && String(numY) === String(rawY) ? numY : rawY;

    try {
      switch (this.cmpOp) {
        case "==":
          this.cmpResult.set(x == y);
          break;
        case "===":
          this.cmpResult.set(x === y);
          break;
        case "!=":
          this.cmpResult.set(x != y);
          break;
        case "!==":
          this.cmpResult.set(x !== y);
          break;
        case ">":
          this.cmpResult.set(x > y);
          break;
        case "<":
          this.cmpResult.set(x < y);
          break;
        case ">=":
          this.cmpResult.set(x >= y);
          break;
        case "<=":
          this.cmpResult.set(x <= y);
          break;
      }
    } catch (e) {
      this.cmpResult.set("Error during comparison");
    }
  }

  runLogic() {
    const A = !!this.logicA;
    const B = !!this.logicB;
    switch (this.logicOp) {
      case "&&":
        this.logicResult = A && B;
        break;
      case "||":
        this.logicResult = A || B;
        break;
      case "!":
        this.logicResult = !A;
        break;
    }
  }

  runTernary() {
    this.ternResult = this.ternLeft > this.ternRight ? "left" : "right";
  }

  runBitwise() {
    const x = Number(this.bitX) | 0; // coerce to int
    const y = Number(this.bitY) | 0;
    this.bitXBinary = (x >>> 0).toString(2);
    this.bitYBinary = (y >>> 0).toString(2);
    switch (this.bitOp) {
      case "&":
        this.bitResult = x & y;
        break;
      case "|":
        this.bitResult = x | y;
        break;
      case "^":
        this.bitResult = x ^ y;
        break;
      case "~":
        this.bitResult = ~x;
        break;
      case "<<":
        this.bitResult = x << y;
        break;
      case ">>":
        this.bitResult = x >> y;
        break;
      default:
        this.bitResult = "Unknown";
    }
  }
}
