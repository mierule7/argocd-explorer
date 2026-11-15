export const module2Data = {
  title: "Module 2: The App of Apps Pattern",
  visibleNodes: ["laptop", "github", "repo-server", "app-controller", "k8s-api"], // <--- Add this line!
  steps: [
    {
      id: 1,
      time: "T+0.00s",
      title: "Deploying the Root App",
      lesson: "Instead of managing 50 apps manually, we deploy one 'Root' application in ArgoCD.",
      activeNodes: ["laptop", "github"],
      activeEdge: "laptop-github",
      inspector: { 
        type: "yaml", 
        title: "root-app.yaml", 
        code: `apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: root-app\nspec:\n  source:\n    path: /apps` 
      }
    },
    {
      id: 2,
      time: "T+0.50s",
      title: "Scanning the Directory",
      lesson: "ArgoCD looks at the '/apps' folder in Git to find other Application YAML files.",
      activeNodes: ["github", "repo-server"],
      activeEdge: "github-repo",
      inspector: { 
        type: "json", 
        title: "Directory Scan", 
        code: `Scanning /apps...\nFound: frontend-app.yaml\nFound: backend-app.yaml\nFound: db-app.yaml` 
      }
    },
    {
      id: 3,
      time: "T+1.00s",
      title: "Child Apps Generated",
      lesson: "ArgoCD automatically creates the child applications in the cluster via the K8s API.",
      activeNodes: ["app-controller", "k8s-api"],     // <--- New: Lights up K8s API
      activeEdge: "controller-k8s",                   // <--- New: Highlights the line to K8s                 // <--- Old
      inspector: { 
        type: "yaml", 
        title: "Generated Apps", 
        code: `status:\n  resources:\n    - kind: Application\n      name: frontend-app\n    - kind: Application\n      name: backend-app` 
      }
    }
  ],
  exam: [
    {
      question: "Why use the 'App of Apps' pattern?",
      options: ["It makes Git run faster", "It manages multiple apps from a single root configuration", "It deletes unused namespaces"],
      correct: 1
    }
  ]
};