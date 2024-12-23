pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-northeast-2'
        ECR_REGISTRY = '727646500036.dkr.ecr.ap-northeast-2.amazonaws.com'
        DISCORD_CI_WEBHOOK = credentials('dev-discord-ci-webhook')
        DOCKER_TAG = 'prod'
        ENV_FILE = '/var/lib/jenkins/environments/.env.front.prod'
    }

    stages {
            stage('소스코드 체크아웃') {
                steps {
                    script {
                        deleteDir()
                        git branch: 'feature/cicd',
                            url: 'https://github.com/KTB-Sixmen/gitfolio-front.git'
                    }
                }
            }

        stage('환경 설정') {
                    steps {
                        script {
                            // 환경 변수 파일 복사 로직은 AI 젠킨스 파일과 동일하게 유지
                            if (fileExists(ENV_FILE)) {
                                sh """
                                    cp ${ENV_FILE} .env
                                    echo '환경 파일 복사 완료: ${ENV_FILE}'
                                """
                            } else {
                                error "환경 파일을 찾을 수 없습니다: ${ENV_FILE}"
                            }

                            // ECR 로그인도 AI 젠킨스 파일과 동일한 방식 사용
                            withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
                                            credentialsId: 'aws-credentials',
                                            accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                                            secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                                sh """
                                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}
                                    echo 'ECR 로그인 완료'
                                """
                            }
                        }
                    }
                }

        stage('Docker 이미지 빌드 및 푸시') {
            steps {
                script {
                    def imageTag = "${ECR_REGISTRY}/gitfolio/front:${DOCKER_TAG}"

                    sh """
                        docker build \
                            -f Dockerfile \
                            -t ${imageTag} \
                            --platform linux/amd64 \
                            .

                        docker push ${imageTag}
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                sh """
                    docker builder prune -f --filter until=24h
                    docker image prune -f
                    rm -f .env
                """
            }
        }
    }
}