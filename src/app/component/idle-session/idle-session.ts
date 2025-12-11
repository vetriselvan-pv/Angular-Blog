
import { Component, inject } from "@angular/core";
import { SessionIdleMonitor } from "../../service/session-idle-monitor/session-idle-monitor";

@Component({
  selector: "app-idle-session",
  imports: [],
  templateUrl: "./idle-session.html",
  styles: `
  .idle-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000; /* Ensure it's on top of everything */
}

.idle-popup-box {
  background-color: #fff;
  padding: 24px 32px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 90%;
  max-width: 420px;
}

.idle-popup-box h3 {
  margin-top: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.idle-popup-box p {
  font-size: 1rem;
  margin: 16px 0;
}

.idle-popup-box strong {
  font-size: 1.2rem;
  color: #d9534f; /* Warning color */
}

.idle-buttons {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
}

.idle-buttons button {
  flex: 1;
  padding: 12px 16px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
}

.btn-logout {
  background-color: #f1f1f1;
  color: #333;
  border: 1px solid #ccc;
}

.btn-logout:hover {
  background-color: #e6e6e6;
}

.btn-stay {
  background-color: #007bff; /* Your app's primary color */
  color: white;
}

.btn-stay:hover {
  background-color: #0056b3;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
`,
})
export class IdleSession {
  protected idleSessionService = inject(SessionIdleMonitor);

  logout(){
    this.idleSessionService.resetTimer();
  }
}
