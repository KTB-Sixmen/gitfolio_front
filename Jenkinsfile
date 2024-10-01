pipeline {
  agent any
  stages {
    stage('repo test') {
      steps {
        sh 'sh \'git clone https://github.com/KTB-Sixmen/gitfolio_front.git\''
        sh 'sh \'npm install\''
        sh 'sh \'npm test\''
      }
    }

  }
}