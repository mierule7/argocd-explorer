export const module3Data = {
  title: "Module 3: DevSecOps - Secure Secret Management",
  visibleNodes: ["laptop", "github", "repo-server", "app-controller", "k8s-api", "eso", "pod"],
  steps: [
    {
      id: 1,
      time: "T+0.00s",
      title: "Committing the ExternalSecret",
      lesson: "The developer commits an ExternalSecret YAML. Notice it contains NO actual passwords, just a reference.",
      activeNodes: ["laptop", "github"],
      activeEdge: "laptop-github",
      inspector: { 
        type: "yaml", 
        title: "external-secret.yaml", 
        code: `apiVersion: external-secrets.io/v1beta1\nkind: ExternalSecret\nmetadata:\n  name: db-secret\nspec:\n  secretStoreRef:\n    name: vault-backend\n  target:\n    name: k8s-db-secret\n  data:\n    - secretKey: password\n      remoteRef:\n        key: secret/data/db\n        property: password` 
      }
    },
    {
      id: 2,
      time: "T+0.50s",
      title: "ArgoCD Syncs the CRD",
      lesson: "ArgoCD detects the new file and applies the ExternalSecret Custom Resource to the cluster.",
      activeNodes: ["repo-server", "app-controller", "k8s-api"],
      activeEdge: "controller-k8s",
      inspector: { 
        type: "yaml", 
        title: "K8s API Response", 
        code: `externalsecret.external-secrets.io/db-secret created` 
      }
    },
    {
      id: 3,
      time: "T+1.20s",
      title: "ESO Fetches from Vault",
      lesson: "The External Secrets Operator (ESO) sees the new resource, authenticates with Vault, and fetches the real password securely.",
      activeNodes: ["k8s-api", "eso", "vault"],
      activeEdge: "eso-vault",
      inspector: { 
        type: "json", 
        title: "Vault API Response", 
        code: `{\n  "data": {\n    "password": "**** (Masked) ****"\n  }\n}` 
      }
    },
    {
      id: 4,
      time: "T+1.50s",
      title: "Generating the K8s Secret",
      lesson: "ESO creates a standard Kubernetes Secret containing the real password. The secret never touches Git.",
      activeNodes: ["eso", "k8s-api"],
      activeEdge: "k8s-eso",
      inspector: { 
        type: "yaml", 
        title: "Generated K8s Secret", 
        code: `apiVersion: v1\nkind: Secret\nmetadata:\n  name: k8s-db-secret\ntype: Opaque\ndata:\n  password: c3VwZXJzZWNyZXRwYXNzd29yZA==` 
      }
    },
    {
      id: 5,
      time: "T+2.00s",
      title: "Pod Mounts the Secret",
      lesson: "The application Pod starts and securely mounts the secret as an environment variable.",
      activeNodes: ["eso", "pod"],
      activeEdge: "eso-pod",
      inspector: { 
        type: "yaml", 
        title: "Pod Environment", 
        code: `env:\n  - name: DB_PASSWORD\n    valueFrom:\n      secretKeyRef:\n        name: k8s-db-secret\n        key: password` 
      }
    }
  ],
  exam: [
    {
      question: "Where is the actual database password stored in this workflow?",
      options: ["In the Git repository", "In the ExternalSecret YAML", "In the Vault"],
      correct: 2
    },
    {
      question: "What component is responsible for fetching the secret from Vault?",
      options: ["ArgoCD", "External Secrets Operator (ESO)", "The Pod itself"],
      correct: 1
    }
  ]
};