export const module4Data = {
  title: "Module 4: Progressive Delivery (Canary)",
  visibleNodes: ["app-controller", "k8s-api", "rollout-controller", "ingress", "prometheus"],
  steps: [
    {
      id: 1,
      time: "T+0.00s",
      from: "App Controller",
      to: "K8s API",
      title: "SYNC · Rollout manifest",
      lesson: "ArgoCD pushes the Rollout CRD (with image v2.0) to the cluster.",
      activeNodes: ["app-controller", "k8s-api"],
      activeEdge: "controller-k8s",
      inspector: { type: "yaml", title: "rollout.yaml", code: `kind: Rollout\nspec:\n  strategy:\n    canary:\n      steps:\n        - setWeight: 20\n        - pause: {}\n  template:\n    spec:\n      containers:\n        - image: web-app:v2.0` }
    },
    {
      id: 2,
      time: "T+0.30s",
      from: "K8s API",
      to: "Rollout Controller",
      title: "TRIGGER · Watch Rollout CRD",
      lesson: "The Rollout Controller is watching for Rollout changes and picks up the new spec.",
      activeNodes: ["k8s-api", "rollout-controller"],
      activeEdge: "k8s-rollout",
      inspector: { type: "json", title: "Watch Event", code: `{\n  "type": "MODIFIED",\n  "object": {\n    "kind": "Rollout",\n    "name": "web-app"\n  }\n}` }
    },
    {
      id: 3,
      time: "T+0.60s",
      from: "Rollout Controller",
      to: "Ingress",
      title: "SET WEIGHT · 20% canary",
      lesson: "Instead of replacing everything, the controller tells the Ingress to send 20% of traffic to v2.0.",
      activeNodes: ["rollout-controller", "ingress"],
      activeEdge: "rollout-ingress",
      inspector: { type: "json", title: "Traffic Split", code: `{\n  "v1.0 (stable)": "80%",\n  "v2.0 (canary)": "20%"\n}` }
    },
    {
      id: 4,
      time: "T+0.90s",
      from: "Ingress",
      to: "Prometheus",
      title: "METRICS · error rate",
      lesson: "The Ingress exposes request metrics; Prometheus scrapes the error rate of the canary pods.",
      activeNodes: ["ingress", "prometheus"],
      activeEdge: "ingress-prometheus",
      inspector: { type: "bash", title: "Prometheus Query", code: `sum(rate(http_requests_total{version="v2.0",status="500"}))\n=> 0.01` }
    },
    {
      id: 5,
      time: "T+1.20s",
      from: "Prometheus",
      to: "Rollout Controller",
      title: "ANALYSIS · Healthy",
      lesson: "The AnalysisRun returns a verdict back to the controller: error rate is below the threshold.",
      activeNodes: ["prometheus", "rollout-controller"],
      activeEdge: "prometheus-rollout",
      inspector: { type: "json", title: "Analysis Result", code: `{\n  "phase": "Successful",\n  "metric": "error-rate",\n  "value": 0.01,\n  "threshold": 0.05\n}` }
    },
    {
      id: 6,
      time: "T+1.50s",
      from: "Rollout Controller",
      to: "Ingress",
      title: "SET WEIGHT · 100% promote",
      lesson: "Metrics are safe! The controller promotes v2.0 to 100% and scales down v1.0.",
      activeNodes: ["rollout-controller", "ingress"],
      activeEdge: "rollout-ingress",
      inspector: { type: "json", title: "Traffic Split", code: `{\n  "v1.0 (stable)": "0% (terminated)",\n  "v2.0 (canary)": "100% (promoted)"\n}` }
    }
  ],
  exam: [
    {
      question: "In this flow, what component decides how much traffic goes to each version?",
      options: ["Prometheus", "The Ingress", "GitHub"],
      correct: 1
    },
    {
      question: "Why does the controller wait for Prometheus before promoting to 100%?",
      options: ["To make the deploy faster", "To verify the canary is healthy before committing", "To save money on pods"],
      correct: 1
    },
    {
      question: "How many single hops does the full canary loop take (App Controller → back to Ingress)?",
      options: ["4", "6", "10"],
      correct: 1
    }
  ]
};