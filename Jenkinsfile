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
        bat 'npm install --verbose -d'
        bat 'npm install --save classlist.js'
      }
    }
    stage ('test'){
      steps{
        bat 'ng test --single-run --browsers Chrome_no_sandbox'
      }
    }
    stage ('code quality'){
      steps{
        bat 'ng lint'
      }
    }
    stage ('build') {
      steps{
        bat 'ng build --prod --build-optimizer'
      }
    }
    stage ('deploy to azure') {
      steps{
        bat 'echo ok'
      }
    }
  }
}
