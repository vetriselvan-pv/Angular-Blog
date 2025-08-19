import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import { Renderer2 } from "@angular/core";

@Component({
  selector: "app-renderer",
  imports: [],
  template: `<div #parent class="wrapper">
    <p>renderer works!</p>
  </div> `,
  styles: `
  .wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  }
  `,
})
export class Renderer {
  private renderer: Renderer2 = inject(Renderer2);
  // private el: ElementRef = inject(ElementRef);
  @ViewChild("parent") parent: ElementRef | undefined;
  constructor() {}

  ngOnInit() {
  }
  ngAfterViewInit() {
    
    const divElement = this.renderer.createElement("div");

    this.renderer.setProperty(
      divElement,
      "innerHTML",
      "This is a dynamically created div element. Right click on it to see the inspect element."
    );

    this.renderer.setStyle(divElement, "color", "red");
    this.renderer.setAttribute(divElement, "class", "dynamic-element");
    this.renderer.appendChild(this.parent?.nativeElement, divElement);
    this.renderer.listen(divElement, "click", () => {
      console.log("div clicked");
    });
    this.renderer.listen(divElement, "mouseover", () => {
      console.log("div mouseover");
      this.renderer.setStyle(divElement, "color", "green");
    });
    this.renderer.listen(divElement, "mouseout", () => {
      console.log("div mouseout");
      this.renderer.setStyle(divElement, "color", "red");
    });

    const inputElement = this.renderer.createElement("input");
    this.renderer.setProperty(
      inputElement,
      "value",
      "Dynamic Input value"
    );
    this.renderer.setProperty(
      inputElement,
      "id",
      "dynamic-input"
    );

    this.renderer.appendChild(this.parent?.nativeElement, inputElement);
    this.renderer.listen(inputElement, "blur", () => {
      console.log("input value changed");
    });

    const commentElement = this.renderer.createComment(
      "This is a dynamically created comment element."
    );
    this.renderer.appendChild(this.parent?.nativeElement, commentElement);

    const textElement = this.renderer.createText(
      "This is a dynamically created text element."
    );
    this.renderer.appendChild(this.parent?.nativeElement, textElement);

    const buttonElement = this.renderer.createElement("button");
    this.renderer.setProperty(buttonElement, "innerText", "Click me");
    this.renderer.insertBefore(
      this.parent?.nativeElement,
      buttonElement,
      divElement
    );

    this.renderer.createComment(
      "This is a dynamically created comment element."
    );

    setTimeout(() => {
      this.renderer.removeChild(this.parent?.nativeElement, textElement);
    }, 5000);

    const rootElement = this.renderer.selectRootElement('app-root',true);
    console.log(rootElement);
  
  }
}
