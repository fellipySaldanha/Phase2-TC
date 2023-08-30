# Tech-Challenge - Delivery System

## Sobre o Projeto

Sistema de autoatendimento de fast food que permite ao cliente selecionar e fazer seus pedidos sem precisar interagir com um atendente, com seguintes funcionalidades:

### Gerenciar Clientes

Cliente ao iniciar um pedido pode se cadastrar com nome, e-mail e cpf ou não se identificar

### Gerenciar Produtos

Os produtos podem ser cadastrados com nome, categoria, preço, descrição e imagens

As categorias dos pedidos são:

- Lanche
- Acompanhamento
- Bebida
- Sobremessa

### Pagamento

Integração com gateway de pagamento

#### Acompanhar Pedido

Ao confirmar pagamento, o pedido é enviado para preparo. O cliente pode acompanhar o progresso do seu pedido com as seguintes etapas:

- Recebido
- Em preparação
- Pronto
- Finalizado

## Tecnologias

- Node
- TypeScript
- Express
- MySQL
- Docker

## Domain Driven Design

https://miro.com/app/board/uXjVMKvnUGA=/?share_link_id=537199265716
![Tech Challenge FASE 01](https://p.ipic.vip/30tsa0.jpg)
![Tech Challenge FASE 01 (1)](https://github.com/fellipySaldanha/tech-challenge/assets/43252661/7e67ffe0-559b-4df0-9a19-fd97cfd867e7)

## Modelagem de Dados

![Diagrama de Entidades e Relacionamentos - Delivery System (1)](https://github.com/fellipySaldanha/tech-challenge/assets/43252661/7118b3eb-50cf-4b62-b6a3-8fdb9c5d862d)

## Iniciar Aplicação

## Deployment dependencies

<img src="https://github.com/kubernetes/minikube/raw/master/images/logo/logo.png" width="100" alt="minikube logo">

### Installation
https://minikube.sigs.k8s.io/docs/start/
https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/

### Documentation
https://minikube.sigs.k8s.io/docs/
https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands

## Getting started:
-> minikube start

<img src="https://raw.githubusercontent.com/kubernetes/minikube/master/site/static/images/screenshot.png" width="575" height="322" alt="screenshot">

-> Check if minikube started:
- `minikube status`

-> Check if there are services running:
- `kubectl get service`

-> Deploy the application using minikube cluster:
- `kubectl apply -f mysql-secret.yml,mysql-configmap.yml,db-deployment.yaml,db-service.yaml,api-deployment.yaml,api-service.yaml`

-> Check the status of the pods:
- `kubectl get pod`

-> Check the status of the services:
- `kubectl get service`

-> Give an external IP to the API Service (Get the api service name from the get service command):
- `minikube service api-service`

## Documentação de APIs

Após iniciar a aplicação, o swagger com as APIs estará disponivel em: http://localhost:3000/api-docs
![image](https://github.com/fellipySaldanha/tech-challenge/assets/43252661/ad170fee-5206-4913-950c-bfcd10fc80c9)
