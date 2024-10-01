pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/KTB-Sixmen/gitfolio_front.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
