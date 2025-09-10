import { AnimationCallbackEvent, Component, model, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-animation",
  imports: [FormsModule],
  template: `
    <div class="animation-container">
      <div class="header-section">
        <h1
          class="title"
          (animate.enter)="titleAnimation($event)"
        >
          ✨ Stylish Text Animation
        </h1>
        <p class="subtitle">Add and remove text with smooth animations</p>
      </div>

      <div class="input-section">
        <div class="input-group">
          <input
            type="text"
            [(ngModel)]="text"
            placeholder="Enter your text here..."
            class="text-input"
            (keydown.enter)="addText()"
          />
          <button
            (click)="addText()"
            class="add-button" 
          >
            <span class="button-icon">+</span>
            Add Text
          </button>
        </div>
      </div>

      <div class="items-section">
        @if (textArray().length === 0) {
        <div [animate.enter]="'fadein'" class="empty-state">
          <div class="empty-icon">📝</div>
          <p class="empty-text">No items yet. Add some text to get started!</p>
        </div>
        } @for (item of textArray(); track $index) {
        <div
          class="text-item"
          [animate.enter]="'slideFadeIn'"
          [animate.leave]="'slideFadeOut'"
        >
          <div class="item-content">
            <span class="item-icon">💫</span>
            <p class="item-text">{{ item }}</p>
          </div>
          <button
            (click)="removeText(item)"
            class="remove-button"
            title="Remove this item"
          >
            <span class="button-icon">×</span>
          </button>
        </div>
        }
      </div>
    </div>
  `,
  styles: `
    .animation-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .header-section {
      text-align: center;
      margin-bottom: 3rem;
      color: white;
    }

    .title {
      font-size: 3rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      letter-spacing: -0.5px;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin: 0;
      font-weight: 300;
    }

    .input-section {
      background: white;
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }

    .input-group {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .text-input {
      flex: 1;
      padding: 1rem 1.5rem;
      border: 2px solid #e5e7eb;
      border-radius: 15px;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      outline: none;
      background: #f9fafb;
    }

    .text-input:focus {
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      transform: translateY(-1px);
    }

    .text-input::placeholder {
      color: #9ca3af;
    }

    .add-button {
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 15px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .add-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .add-button:active:not(:disabled) {
      transform: translateY(0);
    }

    .add-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    .button-icon {
      font-size: 1.2rem;
      font-weight: bold;
    }

    .items-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .empty-state {
      background: rgba(255, 255, 255, 0.95);
      padding: 3rem;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .empty-text {
      font-size: 1.2rem;
      color: #6b7280;
      margin: 0;
      font-weight: 300;
    }

    .text-item {
      background: rgba(255, 255, 255, 0.95);
      padding: 1.5rem;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }

    .text-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    }

    .item-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 1;
    }

    .item-icon {
      font-size: 1.5rem;
      opacity: 0.7;
    }

    .item-text {
      font-size: 1.1rem;
      margin: 0;
      color: #374151;
      font-weight: 500;
    }

    .remove-button {
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 10px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
    }

    .remove-button:hover {
      background: #dc2626;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
    }

    .remove-button:active {
      transform: scale(0.95);
    }

    /* Enhanced Animations */
    .fadein {
      animation: fadeInAnimation 2s ease-out forwards;
    }

    .fadeout {
      animation: fadeOutAnimation 0.4s ease-in forwards;
    }

    .slideFadeIn {
      animation: slideFadeInAnimation 1s ease-out forwards;
    }

    .slideFadeOut {
      animation: slideFadeOutAnimation 1s ease-in forwards;
    }

    @keyframes fadeInAnimation {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeOutAnimation {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-10px);
      }
    }

    @keyframes slideFadeInAnimation {
      from {
        opacity: 0;
        transform: translateX(-20px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
    }

    @keyframes slideFadeOutAnimation {
      from {
        opacity: 1;
        transform: translateX(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateX(20px) scale(0.9);
      }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .animation-container {
        padding: 1rem;
      }
      
      .title {
        font-size: 2.5rem;
      }
      
      .input-group {
        flex-direction: column;
        align-items: stretch;
      }
      
      .add-button {
        justify-content: center;
      }
    }
  `,
})
export class Animation {
  text = model<string>("");
  textArray = signal<string[]>([]);

  addText() {
    this.textArray.update((prev) => [...prev, this.text()]);
    this.text.set("");
  }
  removeText(item: string) {
    this.textArray.update((prev) => prev.filter((i) => i !== item));
  }
  titleAnimation(event:  AnimationCallbackEvent) {
    console.log(event);
    event.target.classList.add('fadein');
    event.animationComplete();
  }
}
