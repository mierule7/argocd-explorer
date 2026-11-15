// src/data/index.js
import { module1Data } from './module1';
import { module2Data } from './module2';

export const modules = [
  { 
    id: 1, 
    title: "Module 1: The Core Reconciliation Loop", 
    data: module1Data 
  },
  { 
    id: 2, 
    title: "Module 2: App of Apps Pattern", 
    data: module2Data 
  },
  // You can easily add Module 3, 4, etc. here later!
];