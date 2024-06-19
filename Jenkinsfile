pipeline {
  agent any 

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub') // Ensure 'dockerhub' matches your Docker Hub credentials ID in Jenkins
    GITHUB_CREDENTIALS = credentials('github') 
    DOCKER_IMAGE = 'labbtest/nodejs'
  }

  stages {
    stage('Clone Repository') {
      steps {
        git branch: 'main', credentialsId: 'github', url: 'https://github.com/lab-testt/Node.js-project.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          dockerImage = docker.build("${DOCKER_IMAGE}:latest")
        }
      }
    }

    stage('Push Docker Image') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
            dockerImage.push('latest')
          }
        }
      }
    }

    stage('Deploy') {
      steps {
        sh 'docker-compose -f docker-compose.yml up -d'
      }
    }
  }
}
