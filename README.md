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
- Kubernetes

## Domain Driven Design

https://miro.com/app/board/uXjVMKvnUGA=/?share_link_id=537199265716
![Tech Challenge FASE 01](https://p.ipic.vip/30tsa0.jpg)
![Tech Challenge FASE 01 (1)](https://github.com/fellipySaldanha/tech-challenge/assets/43252661/7e67ffe0-559b-4df0-9a19-fd97cfd867e7)

## Modelagem de Dados

![image](https://github.com/fellipySaldanha/Phase2-TC/assets/43252661/71b46bbd-4e17-45d8-9831-e107799d4faf)

## Iniciar Aplicação

### Deployment dependencies

<img src="https://github.com/kubernetes/minikube/raw/master/images/logo/logo.png" width="100" alt="minikube logo">

### Installation

https://minikube.sigs.k8s.io/docs/start/
https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/

### Documentation

https://minikube.sigs.k8s.io/docs/
https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands

### Getting started:

-> minikube start

<img src="https://raw.githubusercontent.com/kubernetes/minikube/master/site/static/images/screenshot.png" width="575" height="322" alt="screenshot">

-> Check if minikube started:

- `minikube status`

-> Check if there are services running:

- `kubectl get service`

-> Deploy the application using minikube cluster:

- `kubectl apply -f k8s`

-> Check the status of the pods:

- `kubectl get pod`

-> Check the status of the services:

- `kubectl get service`

-> Give an external IP to the API Service (Get the api service name from the get service command):

- `minikube service api-service`

## Documentação de APIs

Após iniciar a aplicação no minikube, acessar o link exibido no terminal e adicionar ao final `/api-docs`
![image](https://github.com/fellipySaldanha/Phase2-TC/assets/43252661/5dc8cbe3-b9ce-4afe-8cf0-c1202ff47b9b)

![image](https://github.com/fellipySaldanha/Phase2-TC/assets/43252661/cc96d1ff-27fb-4aaa-81e2-53872a3cc51b)
