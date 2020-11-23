pipeline {
  agent {
        docker {
          image 'node:14-alpine'
        }
  }
    environment {
        HOME = '.'
        CI = 'true'
    }
    stages {
        stage('Install Dependencies') {
          steps {
            script {
              npm ci
            }
          }
        }
        stage('Test') {
          steps {
            script {
              npm run test-ci
            }
          }
        }
    }
    post {
      always {
        junit 'junit.xml'
      }
    }
}
