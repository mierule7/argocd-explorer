# InfraBlueprint 🏗️

**Interactive DevOps Learning Platform**

InfraBlueprint is a web-based tool that visualizes how DevOps and DevSecOps tools work under the hood. Instead of reading dry documentation, watch animated data flow through a network topology, inspect real code payloads, and test your knowledge.

🌐 **[Live Demo](https://infrablueprint.onrender.com)**  
📖 **[Full Project Documentation](./PROJECT_DOCUMENTATION.md)**

## ✨ Features

- **Interactive Topology Maps:** Watch packets and data flow between components like GitHub, ArgoCD, and Kubernetes.
- **Code Inspector:** Click any step to see the exact YAML, JSON, or HTTP payloads used in real-world scenarios.
- **Exam Mode:** Test your knowledge with interactive quizzes at the end of every module.
- **Modular Architecture:** Easily scalable. Add new tools (Terraform, Docker) as new "Topics" without rewriting the core app.

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Diagrams:** React Flow (`@xyflow/react`)
- **Hosting:** Render

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/infrablueprint.git
   cd infrablueprint
   ```
