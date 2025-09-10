import {
  Component, 
} from "@angular/core"; 

@Component({
  selector: "app-dashboard",
  imports: [],
  template: `
    <div class="card-list">
      @for (card of cards; track card.title; let i = $index) {
      <div [animate.enter]="'card-fade-in-up'" [style.--i]="i" class="dashboard-card list-item">
        <img [src]="card.image" alt="Card image" class="card-image" />
        <div class="card-content">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </div>
      </div>
      }
    </div>
  `,
  styles: `
  .card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 24px; 
}

.dashboard-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  width: 340px;
  height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.16);
}

.card-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
  text-align: center;
}

.card-content h3 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
}

.card-content p {
  margin: 0;
  color: #555;
  font-size: 1rem;
}
`,
})
export class Dashboard {
  cards = [
    {
      id: 1,
      title:
        "Mastering Angular Pipes: Create Custom Pipes with @Pipe Decorator",
      description:
        "Learn how to use the @Pipe decorator in Angular to transform data, create custom pipes, and optimize performance with pure vs impure pipes.",
      url: "https://medium.com/@vetriselvan_11/mastering-angular-pipes-create-custom-pipes-with-pipe-decorator-161b2e6695cf",
      image: "./blog-image/Pipe Decorator.png",
    },
    {
      id: 2,
      title:
        "Getting Started with Gemini CLI: Use Google Gemini Right from Your Terminal",
      description:
        "Learn how to install and use the Gemini CLI to run Google Gemini AI directly from your terminal. Step-by-step guide with setup and example.",
      url: "https://medium.com/@vetriselvan_11/getting-started-with-gemini-cli-use-google-gemini-right-from-your-terminal-326bf5ddd4a4",
      image: "./blog-image/Gemini CLI.png",
    },
    {
      id: 3,
      title:
        "JavaScript Obfuscator — How to Obfuscate JavaScript in Angular for Better Frontend Security",
      description:
        "Learn to protect your Angular application by using JS obfuscation. Step-by-step guide to integrating Webpack Obfuscator .",
      url: "https://medium.com/@vetriselvan_11/javascript-obfuscator-how-to-obfuscate-javascript-in-angular-for-better-frontend-security-00fa9fd1917e",
      image: "./blog-image/JS Obfuscator.png",
    },
    {
      id: 4,
      title: "Understanding Void Subject in RxJS",
      description:
        "Learn how to use Subject<void> in RxJS to emit events without passing values. This guide covers Angular examples, common use cases.",
      url: "https://medium.com/@vetriselvan_11/understanding-void-subject-in-rxjs-c3c17c245a36",
      image: "./blog-image/Void Subject.png",
    },
    {
      id: 5,
      title: "Mastering AsyncSubject in RxJS: How to Emit the Final Value",
      description:
        "Discover how AsyncSubject in RxJS works, why it’s different from other Subjects, and when to use it. Learn through real Angular examples.",
      url: "https://medium.com/@vetriselvan_11/mastering-asyncsubject-in-rxjs-how-to-emit-the-final-value-6156c79beff5",
      image: "./blog-image/Async Subject.png",
    },
    {
      id: 6,
      title:
        "Exploring ReplaySubject in RxJS: How to Replay Past Values in Angular",
      description:
        "Learn how to use ReplaySubject in RxJS to replay multiple emitted values to new subscribers in your Angular app. Step-by-step example",
      url: "https://medium.com/@vetriselvan_11/exploring-replaysubject-in-rxjs-how-to-replay-past-values-in-angular-68fbde291e26",
      image: "./blog-image/Reply Subject.png",
    },
    {
      id: 7,
      title: "RxJS : Understanding BehaviorSubject in Angular",
      description:
        "Learn how BehaviorSubject works under the hood and how to use it effectively in real-world Angular applications.",
      url: "https://medium.com/@vetriselvan_11/rxjs-understanding-behaviorsubject-in-angular-6b249eda358d",
      image: "./blog-image/behaviour subject.png",
    },
    {
      id: 8,
      title: "Exploring RxJS: Diving into Subjects with Interactive Demo",
      description:
        "Understanding RxJS Subjects: Multicasting, Observers, and Real-Time Angular Demos",
      url: "https://medium.com/@vetriselvan_11/exploring-rxjs-diving-into-subjects-with-interactive-demo-98566cb8b3e3",
      image: "./blog-image/rxjs_subject.png",
    },
    {
      id: 9,
      title:
        "Understanding @let in Angular Template Syntax: A Powerful Tool for Local Variables",
      description:
        "Learn how to use @let in Angular templates to create local variables and simplify complex UI logic. Discover the benefits, syntax, and real-world examples .",
      url: "https://medium.com/javascript-in-plain-english/understanding-let-in-angular-template-syntax-a-powerful-tool-for-local-variables-46cfeaaf3def",
      image: "./blog-image/@let.png",
    },
  ];
}
