pipeline {
agent any


environment {
    BACKEND_IMAGE = "percyjone/coursetracker-backend"
    S3_BUCKET = "course-tracker"
    EC2_IP = "13.233.71.54"
}

stages {

    stage('Checkout') {
        steps {
            git branch: 'main',
                url: 'https://github.com/percyjone/course-tracker.git'
        }
    }

    stage('Install Backend Dependencies') {
        steps {
            dir('backend') {
                bat 'npm install'
            }
        }
    }

    stage('Install Frontend Dependencies') {
        steps {
            dir('frontend') {
                bat 'npm install'
            }
        }
    }

    stage('Build Frontend') {
        steps {
            dir('frontend') {
                bat 'npm run build'
            }
        }
    }

    stage('Upload Frontend to S3') {
        steps {
            dir('frontend') {
                bat 'aws s3 sync dist s3://%S3_BUCKET% --delete'
            }
        }
    }

    stage('Build Backend Docker Image') {
        steps {
            bat 'docker build --no-cache -t %BACKEND_IMAGE%:latest ./backend'
        }
    }

    stage('Docker Hub Login') {
        steps {
            withCredentials([
                usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )
            ]) {
                bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
            }
        }
    }

    stage('Push Backend Image') {
        steps {
            bat 'docker push %BACKEND_IMAGE%:latest'
        }
    }

    stage('Deploy Backend to EC2') {
        steps {
            sshagent(credentials: ['ec2-ssh-key']) {
                bat '''
                ssh -o StrictHostKeyChecking=no ubuntu@%EC2_IP% "docker pull %BACKEND_IMAGE%:latest && docker stop backend-container || true && docker rm backend-container || true && docker run -d --name backend-container --network course-network -p 8000:8000 -e DATABASE_URL=postgresql://postgres:postgres@course-db:5432/course_tracker %BACKEND_IMAGE%:latest"
                '''
            }
        }
    }
}

post {
    success {
        echo 'Deployment Successful'
    }

    failure {
        echo 'Pipeline Failed'
    }
}


}
