import { Component, signal } from "@angular/core";

@Component({
  selector: "app-skills",
  imports: [],
  templateUrl: "./skills.html",
  styleUrl: "./skills.scss",
})
export class Skills {
  skills = signal([
      {
        skill: "Frontend Development",
        subSkills: [
          "Angular – Component-based architecture, reactive forms, services, routing, RxJS patterns, state management, modular application design.",
          "TypeScript – Strong typing, interfaces, generics, clean architecture, and scalable code organization.",
          "JavaScript (ES6+) – DOM manipulation, asynchronous programming (Promises, async/await), modular code patterns.",
          "HTML5 – Semantic structure, accessibility best practices, responsive markup.",
          "CSS3 – Modern layouts using Flexbox & Grid, animations, custom properties, responsive and mobile-first design.",
        ],
      },
      {
        skill: "Mobile App Development",
        subSkills: [
          "Ionic Framework – Hybrid mobile app development, UI components, navigation patterns, theming, forms, and Angular integration.",
          "Capacitor – Native runtime for accessing device functionalities (Camera, Filesystem, Geolocation), plugin development, platform builds (iOS/Android).",
        ],
      },
      {
        skill: "Cross-Platform & UI/UX",
        subSkills: [
          "Responsive interface design",
          "Reusable component creation",
          "Performance optimization for web and mobile apps",
        ],
      },
      {
        skill: "Additional Skills",
        subSkills: [
          "REST API integration",
          "Version control (Git)",
          "Debugging and troubleshooting",
          "Agile development practices",
        ],
      },
    ]);
}
