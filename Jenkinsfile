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
        bat 'npm install'
      }
    }
    stage ('test'){
      steps{
        bat 'ng test --browsers Chrome_no_sandbox'
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
        bat 'az storage blob upload-batch -d $web -s .\dist\homekeep --connection-string "DefaultEndpointsProtocol=https;AccountName=homekeep;AccountKey=8saB1puIu/8NiiTcVktIQhzQ2cgk2uqlm1Hh29tWW3/vWa5HQMAX1Lwk6wdFtRrDCei8has24WUNWj8Anrec0g==;EndpointSuffix=core.windows.net"'
      }
    }
  }
}
