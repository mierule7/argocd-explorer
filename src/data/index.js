import { module1Data } from './module1';
import { module2Data } from './module2';
import { module3Data } from './module3';
import { module4Data } from './module4';
import { module5Data } from './module5';

export const topics = [
  {
    name: "ArgoCD",
    modules: [
      { id: 1, title: "Module 1: The Core Reconciliation Loop", data: module1Data },
      { id: 2, title: "Module 2: App of Apps Pattern", data: module2Data },
      { id: 3, title: "Module 3: DevSecOps - Secure Secrets", data: module3Data },
      { id: 4, title: "Module 4: Progressive Delivery (Canary)", data: module4Data },
            { id: 5, title: "Module 5: Template Rendering (Helm/Kustomize)", data: module5Data }

    ]
  },
  {
    name: "Terraform", // Placeholder for the future!
    modules: [
      { id: 99, title: "Coming Soon: State Management", data: null } 
    ]
  },
  {
    name: "Kubernetes", // Placeholder for the future!
    modules: [
      { id: 98, title: "Coming Soon: Pod Lifecycle", data: null }
    ]
  }
];