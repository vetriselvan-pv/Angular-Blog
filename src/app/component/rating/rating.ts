import { Component, input, InputSignal, model, ModelSignal, Signal, signal } from "@angular/core";
import { FormValueControl, ValidationError, WithOptionalField } from "@angular/forms/signals";
import { MatError } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-rating",
  imports: [MatIcon, MatError],
  templateUrl: "./rating.html",
  styles: `
  .star-rating-container {
  display: flex;
  cursor: pointer;  
}
.error{
  color: red !important;
}

.star-icon {
  font-size: 24px;  
  transition: color 0.2s;
  user-select: none; 
  color: #ccc;  
}
 
.star-icon.filled {
  color: gold; 
}
 
.star-icon.readonly {
  cursor: default;
}
 
.star-icon:not(.readonly):hover {
  transform: scale(1.1);
}`,
})
export class Rating implements FormValueControl<number> {


  readonly value= model<number>(0); 

  readonly readonly = input<boolean>(false);

  readonly invalid = input<boolean>(false);

  readonly errors : InputSignal<readonly WithOptionalField<ValidationError>[]> = input<readonly WithOptionalField<ValidationError>[]>([])

  starArray: Signal<number[]> = signal(Array(5).fill(0).map((x, i) => i + 1));

    getStarIcon(index: number): string {
    const floorRating = Math.floor(this.value());
    const hasHalfStar = this.value() % 1 !== 0;

    if (index <= floorRating) {
      // Full star if the index is less than or equal to the whole rating
      return 'star';
    } else if (index === floorRating + 1 && hasHalfStar) {
      // Half star if it's the next star and the rating has a decimal part
      return 'star_half';
    } else {
      // Empty star (border) otherwise
      return 'star_border';
    }
  }


    rate(index: number): void {
    if (!this.readonly()) {
      this.value.set(index); 
    }
  }
}
