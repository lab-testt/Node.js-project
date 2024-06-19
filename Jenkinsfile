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

    stage('Docker Login and Push') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
            sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
          }
          dockerImage.push('latest')
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
