import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-template-literals",
  imports: [CommonModule],
  templateUrl: "./template-literals.html",
  styles: `
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      margin-bottom: 2rem;
      overflow: hidden;
      border: 1px solid #e5e7eb;
    }

    .card-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
    }

    .card-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .card-body {
      padding: 1.5rem;
    }

    .example-section {
      margin-bottom: 1.5rem;
    }

    .example-section:last-child {
      margin-bottom: 0;
    }

    .example-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.75rem;
    }

    .code-example {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
      font-family: 'Monaco', 'Consolas', monospace;
    }

    .section-header {
      text-align: center;
      margin: 3rem 0 2rem;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
    }

    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .quote-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 1.5rem;
      border: 1px solid #e5e7eb;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .quote-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .quote-content {
      margin-bottom: 1rem;
    }

    .quote-text {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #374151;
      margin: 0;
      font-style: italic;
    }

    .quote-author {
      margin-top: 1rem;
      font-weight: 600;
      color: #6366f1;
      text-align: right;
    }

    .quote-tagged {
      border-top: 1px solid #e5e7eb;
      padding-top: 1rem;
    }

    .tagged-example {
      background: #f3f4f6;
      padding: 0.5rem;
      border-radius: 6px;
      font-family: 'Monaco', 'Consolas', monospace;
      color: #6b7280;
      display: block;
    }

    .greet-title {
      color: #6366f1;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .page-container {
        padding: 1rem;
      }
      
      .cards-grid {
        grid-template-columns: 1fr;
      }
      
      .section-title {
        font-size: 1.5rem;
      }
    }
  `,
})
export class TemplateLiterals {
  greeting: string = "Medium blogs";
  cssclass: string = "title";
  name: string = "Vetri";
  welcomeMessage = this.welcomeGreeting`Hi ${this.name} !! Welcome to  ${this.greeting} about Angular`;

  quote = [ 
    {
      quote: "Be the change that you wish to see in the world.",
      author: "Mahatma Gandhi",
    },
    {
      quote: "It always seems impossible until its done.",
      author: "Nelson Mandela",
    },
    {
      quote: "The best way to predict your future is to create it.",
      author: "Abraham Lincoln",
    },
    // {
    //   quote: "Injustice anywhere is a threat to justice everywhere.",
    //   author: "Martin Luther King Jr.",
    // },
  ];

  welcomeGreeting(
    content: TemplateStringsArray,
    greeting: string,
    name: string
  ) {
    console.log(content, greeting, name);
    return `${content[0]}${greeting} ${name}`;
  }

  quotes(content: TemplateStringsArray, ...args: any[]) {
    return `<blockquote class="quote-text">
    ${args[1]}
  </blockquote>
  <footer class="quote-author">
    — ${args[0]}
  </footer> `;
  }

  messageContent(content: TemplateStringsArray, ...args: any[]) {
    return `<blockquote class="quote-text">
    ${args[0]}
  </blockquote> `;
  }

  greet(content: TemplateStringsArray, ...args: any[]) {
    return `Hi ${args[0]} !! Welcome to blog about ${content[0]} in Angular`;
  }

  getQuote() {
    return this.quote[0].quote;
  }

  getAuthor() {
    return this.quote[0].author;
  }
}
