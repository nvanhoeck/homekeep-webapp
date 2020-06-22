pipeline{
  agent any
  tools {nodejs "nodejs8"}
  stages{
    stage ('checkout'){
      steps{
        checkout scm
      }
    }
    stage ('install modules'){
      steps{
      //nodejs('nodejs8')
        sh 'npm install --verbose -d'
        sh 'npm install --save classlist.js'
      }
    }
    stage ('test'){
      steps{
        sh 'ng test --single-run --browsers Chrome_no_sandbox'
      }
    }
    stage ('code quality'){
      steps{
        sh 'ng lint'
      }
    }
    stage ('build') {
      steps{
        sh 'ng build --prod --build-optimizer'
      }
    }
    stage ('deploy to azure') {
      steps{
        sh 'echo ok'
      }
    }
  }
}
