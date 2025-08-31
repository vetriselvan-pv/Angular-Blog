import { Component } from "@angular/core";

@Component({
  selector: "app-operator",
  imports: [],
  template: `
    <div class="container">
      <h1 class="main-title">Assignment Operators</h1>
      
      <!-- Status Card -->
      <div class="card">
        <h2>Current Status</h2>
        <div class="status-grid">
          <div class="status-item">
            <span class="label">Marks:</span>
            <span class="value">{{ marks }}</span>
          </div>
          <div class="status-item">
            <span class="label">Counter:</span>
            <span class="value">{{ counter }}</span>
          </div>
          <div class="status-item">
            <span class="label">Multiplier:</span>
            <span class="value">{{ multiplier }}</span>
          </div>
          <div class="status-item">
            <span class="label">Mode:</span>
            <span class="value">{{ mode || 'Not set' }}</span>
          </div>
          <div class="status-item">
            <span class="label">Data:</span>
            <span class="value">{{ data || 'No data' }}</span>
          </div>
          <div class="status-item">
            <span class="label">Count:</span>
            <span class="value">{{ count ?? 'Not initialized' }}</span>
          </div>
        </div>
      </div>

      <!-- Arithmetic Assignment Card -->
      <div class="card">
        <h2>Arithmetic Assignment Operations</h2>
        <div class="button-group">
          <button class="btn btn-primary" (click)="marks += 10">+10 Marks</button>
          <button class="btn btn-danger" (click)="marks -= 5">-5 Marks</button>
          <button class="btn btn-info" (click)="multiplier *= 2">Double Multiplier</button>
          <button class="btn btn-info" (click)="multiplier /= 2">Half Multiplier</button>
          <button class="btn btn-warning" (click)="counter %= 3">Modulo Counter</button>
          <button class="btn btn-success" (click)="marks **= 2">Square Marks</button>
        </div>
      </div>

      <!-- Logical Assignment Card -->
      <div class="card">
        <h2>Logical Assignment Operations</h2>
        <div class="button-group">
          <button class="btn btn-secondary" (click)="data &&= 'FetchedData'">Set Data If Exists</button>
          <button class="btn btn-secondary" (click)="data ||= 'default'">Set Default Mode</button>
          <button class="btn btn-secondary" (click)="count ??= 0">Init Count</button>
        </div>
      </div>
    </div>
  `,
  styles: `
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .main-title {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
      font-size: 2.5rem;
      font-weight: 300;
    }

    .card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-bottom: 25px;
      padding: 25px;
      border: 1px solid #e1e5e9;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    }

    .card h2 {
      margin: 0 0 20px 0;
      color: #2c3e50;
      font-size: 1.5rem;
      font-weight: 600;
      border-bottom: 2px solid #3498db;
      padding-bottom: 10px;
    }

    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .status-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #3498db;
    }

    .label {
      font-weight: 600;
      color: #555;
    }

    .value {
      font-weight: 500;
      color: #2c3e50;
      background: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }

    .button-group {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .btn {
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .btn-primary {
      background: #3498db;
      color: white;
    }

    .btn-primary:hover {
      background: #2980b9;
    }

    .btn-danger {
      background: #e74c3c;
      color: white;
    }

    .btn-danger:hover {
      background: #c0392b;
    }

    .btn-success {
      background: #27ae60;
      color: white;
    }

    .btn-success:hover {
      background: #229954;
    }

    .btn-warning {
      background: #f39c12;
      color: white;
    }

    .btn-warning:hover {
      background: #e67e22;
    }

    .btn-info {
      background: #17a2b8;
      color: white;
    }

    .btn-info:hover {
      background: #138496;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #5a6268;
    }

    @media (max-width: 768px) {
      .container {
        padding: 15px;
      }

      .main-title {
        font-size: 2rem;
      }

      .card {
        padding: 20px;
      }

      .status-grid {
        grid-template-columns: 1fr;
      }

      .button-group {
        flex-direction: column;
      }

      .btn {
        width: 100%;
      }
    }
  `,
})
export class Operator {
  marks = 0;
  counter = 10;
  multiplier = 1;
  mode?: string;
  data: any = null;
  count?: number = 1;
}
