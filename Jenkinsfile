pipeline {
  agent {
    docker {
      image 'node:14'
    }
  }
  environment {
    DOCKER_CREDENTIALS_ID = 'dockerhub'
   GITHUB_CREDENTIALS = credentials('github') 
    DOCKER_IMAGE = 'labbtest/nodejs-postgres-app'
  }
  stages {
    stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/lab-testt/Node.js-project.git'
            }
        }
    stage('Build') {
      steps {
        script {
          docker.build(DOCKER_IMAGE)
        }
      }
    }
    stage('Push') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
            docker.image(DOCKER_IMAGE).push('latest')
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
