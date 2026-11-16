export const module1Data = {
  title: "Module 1: The Core Reconciliation Loop",
  steps: [
    {
      id: 1,
      time: "T+0.00s",
      title: "The Trigger (Git Commit)",
      lesson: "In GitOps, Git is the single source of truth. The desired state is defined here.",
      activeNodes: ["laptop", "github"],
      activeEdge: "laptop-github",
      inspector: { type: "yaml", title: "deployment.yaml", code: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: payment-service\nspec:\n  replicas: 3 # Changed from 2` }
    },
    {
      id: 2,
      time: "T+0.15s",
      title: "The Wake-Up Call (Webhook)",
      lesson: "ArgoCD can poll Git, but a webhook makes it instant.",
      activeNodes: ["github", "repo-server"],
      activeEdge: "github-repo",
      inspector: { type: "json", title: "Webhook Payload", code: `{\n  "ref": "refs/heads/main",\n  "head_commit": { "id": "8f3a1b" }\n}` }
    },
    {
      id: 3,
      time: "T+0.80s",
      title: "Drift Detection",
      lesson: "The Application Controller compares Git vs Live cluster.",
      activeNodes: ["app-controller"],
      activeEdge: "repo-controller",
      inspector: { type: "bash", title: "State Diff", code: `- Live:    replicas: 2\n+ Desired: replicas: 3` }
    },
    {
      id: 4,
      time: "T+1.10s",
      title: "The Reconciliation (Sync)",
      lesson: "ArgoCD sends a PATCH request to the K8s API.",
      activeNodes: ["app-controller", "k8s-api"],
      activeEdge: "controller-k8s",
      inspector: { type: "bash", title: "K8s API Request", code: `PATCH /apis/apps/v1/deployments/payment-service\nAuthorization: Bearer eyJhbGc...` }
    },
    {
      id: 5,
      time: "T+2.50s",
      title: "Verification",
      lesson: "Kubelet starts the new Pod. ArgoCD confirms Healthy.",
      activeNodes: ["k8s-api", "worker"],
      activeEdge: "k8s-worker",
      inspector: { type: "yaml", title: "ArgoCD Status", code: `status:\n  sync: Synced\n  health: Healthy` }
    }
  ],
  exam: [
    {
      question: "In GitOps, what is considered the 'Single Source of Truth'?",
      options: ["The Kubernetes Cluster", "The Git Repository", "The ArgoCD Dashboard"],
      correct: 1
    },
    {
      question: "How does ArgoCD know immediately that a change was made in Git?",
      options: ["It checks every 10 seconds", "A Webhook sends a payload", "The developer emails the admin"],
      correct: 1
    },
    {
      question: "If a rogue admin manually changes replicas to 5 in the cluster, what will ArgoCD do?",
      options: ["Leave it alone", "Delete the cluster", "Revert it back to match Git"],
      correct: 2
    }
  ]
};