#!/bin/groovy
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
              sh 'npm i'
            }
          }
        }
        stage('Test') {
          steps {
            script {
              sh 'npm test'
            }
          }
        }
    }
}
