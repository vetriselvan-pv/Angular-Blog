import {
  CommonModule,
  formatCurrency,
  formatDate,
  formatNumber,
  formatPercent,
} from "@angular/common";
import {
  Component,
  effect,
  inject,
  model,
  resource,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  imports: [FormsModule, CommonModule],
  template: `
    <div class="welcome-section">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to Angular Blog</h1>
        <p class="hero-subtitle">Explore modern Angular features and formatting utilities</p>
      </div>
    </div>

    <div class="stats-grid grid grid-cols-4">
      <div class="stat-card card">
        <div class="card-body text-center">
          <div class="stat-icon">📅</div>
          <h3 class="stat-title">Current Date</h3>
          <p class="stat-value">{{ date }}</p>
          <p class="stat-description">Formatted with Angular DatePipe</p>
        </div>
      </div>

      <div class="stat-card card">
        <div class="card-body text-center">
          <div class="stat-icon">💰</div>
          <h3 class="stat-title">Currency</h3>
          <p class="stat-value">{{ amount }}</p>
          <p class="stat-description">Formatted with CurrencyPipe</p>
        </div>
      </div>

      <div class="stat-card card">
        <div class="card-body text-center">
          <div class="stat-icon">📊</div>
          <h3 class="stat-title">Percentage</h3>
          <p class="stat-value">{{ percentage }}</p>
          <p class="stat-description">Formatted with PercentPipe</p>
        </div>
      </div>

      <div class="stat-card card">
        <div class="card-body text-center">
          <div class="stat-icon">🔢</div>
          <h3 class="stat-title">Number</h3>
          <p class="stat-value">{{ number }}</p>
          <p class="stat-description">Formatted with DecimalPipe</p>
        </div>
      </div>
    </div>

    <div class="features-section">
      <h2 class="section-title">Angular Features Demo</h2>
      <div class="features-grid grid grid-cols-2">
        <div class="feature-card card">
          <div class="card-header">
            <h3 class="card-title">🚀 Modern Components</h3>
            <p class="card-subtitle">Built with latest Angular standalone components</p>
          </div>
          <div class="card-body">
            <ul class="feature-list">
              <li>Standalone Components</li>
              <li>Signal-based Reactivity</li>
              <li>Modern Router Features</li>
              <li>Zoneless Change Detection</li>
            </ul>
          </div>
        </div>

        <div class="feature-card card">
          <div class="card-header">
            <h3 class="card-title">🎨 Modern Design</h3>
            <p class="card-subtitle">Clean, responsive, and accessible UI</p>
          </div>
          <div class="card-body">
            <ul class="feature-list">
              <li>Glassmorphism Effects</li>
              <li>Smooth Animations</li>
              <li>Responsive Grid System</li>
              <li>Modern Typography</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    /* Welcome Section */
    .welcome-section {
      text-align: center;
      padding: 3rem 0;
      margin-bottom: 3rem;
    }

    .hero-content {
      max-width: 600px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: #718096;
      margin: 0;
      font-weight: 400;
    }

    /* Stats Grid */
    .stats-grid {
      margin-bottom: 4rem;
    }

    .stat-card {
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-8px) scale(1.02);
    }

    .stat-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      display: block;
    }

    .stat-title {
      font-size: 1rem;
      font-weight: 600;
      color: #4a5568;
      margin: 0 0 0.5rem 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
      margin: 0 0 0.5rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-description {
      font-size: 0.875rem;
      color: #718096;
      margin: 0;
    }

    /* Features Section */
    .features-section {
      margin-bottom: 3rem;
    }

    .section-title {
      font-size: 2.25rem;
      font-weight: 700;
      text-align: center;
      color: #2d3748;
      margin-bottom: 2rem;
      position: relative;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }

    .feature-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .feature-list li {
      padding: 0.5rem 0;
      position: relative;
      padding-left: 1.5rem;
      color: #4a5568;
      font-weight: 500;
    }

    .feature-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #667eea;
      font-weight: bold;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .hero-subtitle {
        font-size: 1.1rem;
      }
      
      .welcome-section {
        padding: 2rem 0;
        margin-bottom: 2rem;
      }
      
      .stats-grid {
        margin-bottom: 2rem;
      }
      
      .stat-icon {
        font-size: 2rem;
      }
      
      .stat-value {
        font-size: 1.25rem;
      }
    }
  `,
})
export class Home {
  date = formatDate(new Date(), "dd/MM/yyyy", "en-US");
  amount = formatCurrency(1000, "en-US", "$", "USD");
  percentage = formatPercent(1 / 100, "en-US");
  number = formatNumber(976544567.8889, "en-US", "1.2-2");
  userText = model<string>("");

  message = resource<string, { userInput: string }>({
    params: (): { userInput: string } => ({
      userInput: this.userText(),
    }),
    stream: ({ params }) => {
      console.log(params);
      return new Promise((resolve) => {
        const messageSignal = signal<string[]>([]);
        const socket = new WebSocket("ws://localhost:8080");
        console.log(params["userInput"]);
        socket.onmessage = (event) => {
          resolve(event.data);
          // messageSignal.update((prev) => [...prev , event.data]);
          // resolve(messageSignal());
        };
        socket.onopen = () => {
          socket.send("Hello Server");
        };
      });
    },
  });

  private route = inject(Router);

  constructor() {}

  send() {}
  nav() {
    this.route.navigate(["login"]);
  }
}
