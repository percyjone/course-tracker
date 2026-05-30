pipeline {
agent any

environment {
    FRONTEND_IMAGE = "coursetracker-frontend"
    BACKEND_IMAGE = "coursetracker-backend"
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

    stage('Build Backend Image') {
        steps {
            bat 'docker build --no-cache -t %BACKEND_IMAGE% ./backend'
        }
    }

    stage('Build Frontend Image') {
        steps {
            bat 'docker build --no-cache -t %FRONTEND_IMAGE% ./frontend'
        }
    }

    stage('Remove Old Containers') {
        steps {
            bat '''
            docker stop backend-container 2>nul
            docker rm backend-container 2>nul

            docker stop frontend-container 2>nul
            docker rm frontend-container 2>nul
            '''
        }
    }

    stage('Deploy Backend') {
        steps {
            bat '''
            docker run -d ^
            --name backend-container ^
            --network course-network ^
            -p 8000:8000 ^
            -e DATABASE_URL=postgresql://postgres:postgres@course-db:5432/course_tracker ^
            %BACKEND_IMAGE%
            '''
        }
    }

    stage('Deploy Frontend') {
        steps {
            bat '''
            docker run -d ^
            --name frontend-container ^
            --network course-network ^
            -p 5173:5173 ^
            %FRONTEND_IMAGE%
            '''
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
