export const module5Data = {
  title: "Module 5: Template Rendering (Helm/Kustomize)",
  visibleNodes: ["laptop", "github", "repo-server", "app-controller", "k8s-api", "worker"],
  steps: [
    {
      id: 1,
      time: "T+0.00s",
      from: "Developer",
      to: "GitHub",
      title: "COMMIT · values.yaml",
      lesson: "The developer commits a Helm 'values.yaml' file to Git, defining variables like replicaCount: 3.",
      activeNodes: ["laptop", "github"],
      activeEdge: "laptop-github",
      inspector: { 
        type: "yaml", 
        title: "values.yaml", 
        code: `replicaCount: 3\nimage:\n  repository: nginx\n  tag: "1.21"` 
      }
    },
    {
      id: 2,
      time: "T+0.30s",
      from: "GitHub",
      to: "Repo Server",
      title: "FETCH & RENDER · Helm Chart",
      lesson: "The Repo Server fetches the chart from Git and runs 'helm template' to compile the variables into raw YAML.",
      activeNodes: ["github", "repo-server"],
      activeEdge: "github-repo",
      inspector: { 
        type: "bash", 
        title: "Repo Server Command", 
        code: `$ helm template my-app ./chart -f values.yaml\n> Generating deployment.yaml...` 
      }
    },
    {
      id: 3,
      time: "T+0.60s",
      from: "Repo Server",
      to: "App Controller",
      title: "RETURN · Rendered Manifests",
      lesson: "The Repo Server sends the fully rendered, plain Kubernetes YAML back to the Application Controller.",
      activeNodes: ["repo-server", "app-controller"],
      activeEdge: "repo-controller",
      inspector: { 
        type: "yaml", 
        title: "Rendered deployment.yaml", 
        code: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: my-app\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n        - image: nginx:1.21` 
      }
    },
    {
      id: 4,
      time: "T+0.90s",
      from: "App Controller",
      to: "K8s API",
      title: "APPLY · Raw YAML",
      lesson: "The App Controller applies the raw YAML to the cluster. No Helm or Kustomize binaries are needed on the cluster itself!",
      activeNodes: ["app-controller", "k8s-api"],
      activeEdge: "controller-k8s",
      inspector: { 
        type: "bash", 
        title: "Kubectl Apply", 
        code: `kubectl apply -f deployment.yaml\ndeployment.apps/my-app configured` 
      }
    },
    {
      id: 5,
      time: "T+1.20s",
      from: "K8s API",
      to: "Worker Node",
      title: "SCHEDULE · Pods",
      lesson: "The K8s API tells the Worker Node to schedule 3 Nginx pods based on the rendered spec.",
      activeNodes: ["k8s-api", "worker"],
      activeEdge: "k8s-worker",
      inspector: { 
        type: "yaml", 
        title: "Pod Status", 
        code: `NAME                     READY   STATUS\nmy-app-7d9f8b6c5-x9z2k   1/1     Running\nmy-app-7d9f8b6c5-q8w3m   1/1     Running\nmy-app-7d9f8b6c5-p7v4n   1/1     Running` 
      }
    }
  ],
  exam: [
    {
      question: "Which component is responsible for running 'helm template' or 'kustomize build'?",
      options: ["The Application Controller", "The Repo Server", "The Worker Node"],
      correct: 1
    },
    {
      question: "Why does ArgoCD apply raw YAML instead of Helm charts directly to the cluster?",
      options: ["It's faster", "It keeps the cluster clean of third-party binaries like Helm", "Helm charts are too large"],
      correct: 1
    },
    {
      question: "If you change a value in Git, which component detects the change first?",
      options: ["The Repo Server", "The Application Controller", "The Worker Node"],
      correct: 1
    }
  ]
};