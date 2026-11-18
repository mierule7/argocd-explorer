export const terraform1Data = {
  title: "Module 1: The Terraform Apply Lifecycle",
  visibleNodes: ["laptop", "github", "ci-runner", "terraform", "aws", "terraform-state"],
  steps: [
    {
      id: 1,
      time: "T+0.00s",
      from: "Developer",
      to: "GitHub",
      title: "COMMIT · main.tf",
      lesson: "The developer commits a Terraform configuration file defining an EC2 instance.",
      activeNodes: ["laptop", "github"],
      activeEdge: "laptop-github",
      inspector: { 
        type: "hcl", 
        title: "main.tf", 
        code: `resource "aws_instance" "web" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = "t2.micro"\n}` 
      }
    },
    {
      id: 2,
      time: "T+0.30s",
      from: "GitHub",
      to: "CI Runner",
      title: "TRIGGER · GitHub Actions",
      lesson: "The commit triggers the CI/CD pipeline. The runner checks out the code.",
      activeNodes: ["github", "ci-runner"],
      activeEdge: "github-ci",
      inspector: { 
        type: "yaml", 
        title: "workflow.yml", 
        code: `on:\n  push:\n    branches: [main]\njobs:\n  terraform:\n    runs-on: ubuntu-latest` 
      }
    },
    {
      id: 3,
      time: "T+1.00s",
      from: "CI Runner",
      to: "Terraform",
      title: "PLAN · Calculate Diff",
      lesson: "Terraform compares the code against the State File and generates an execution plan.",
      activeNodes: ["ci-runner", "terraform"],
      activeEdge: "ci-terraform",
      inspector: { 
        type: "bash", 
        title: "Terraform Plan", 
        code: `Terraform will perform the following actions:\n\n  # aws_instance.web will be created\n  + resource "aws_instance" "web" {\n      + ami           = "ami-0c55b159cbfafe1f0"\n      + instance_type = "t2.micro"\n    }` 
      }
    },
    {
      id: 4,
      time: "T+2.00s",
      from: "Terraform",
      to: "AWS Cloud",
      title: "APPLY · Provision Resources",
      lesson: "After approval, Terraform calls the AWS API to create the actual EC2 instance.",
      activeNodes: ["terraform", "aws"],
      activeEdge: "terraform-aws",
      inspector: { 
        type: "bash", 
        title: "AWS API Call", 
        code: `aws ec2 run-instances \\\n  --image-id ami-0c55b159cbfafe1f0 \\\n  --instance-type t2.micro` 
      }
    },
    {
      id: 5,
      time: "T+2.50s",
      from: "Terraform",
      to: "State File",
      title: "UPDATE · Save State",
      lesson: "Terraform updates the remote State File (e.g., in S3) to remember it created this resource.",
      activeNodes: ["terraform", "terraform-state"],
      activeEdge: "terraform-state",
      inspector: { 
        type: "json", 
        title: "terraform.tfstate", 
        code: `{\n  "version": 4,\n  "resources": [\n    {\n      "type": "aws_instance",\n      "name": "web",\n      "instances": [{ "attributes": { "id": "i-0123456789abcdef0" } }]\n    }\n  ]\n}` 
      }
    }
  ],
  exam: [
    {
      question: "What is the purpose of the 'Terraform Plan' step?",
      options: ["To immediately create resources", "To calculate the diff between code and state before applying", "To delete old resources"],
      correct: 1
    },
    {
      question: "Why is the State File important?",
      options: ["It stores the AWS credentials", "It maps real-world resources to your configuration", "It compiles the HCL code"],
      correct: 1
    },
    {
      question: "Which component actually makes the API call to AWS?",
      options: ["GitHub Actions", "The Terraform CLI", "The State File"],
      correct: 1
    }
  ]
};