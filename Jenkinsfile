properties properties: [
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
  [$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/hypery2k/galenframework-cli'],
]

@Library('mare-build-library')
def nodeJS = new de.mare.ci.jenkins.NodeJS()

node {
  def buildNumber = env.BUILD_NUMBER
  def branchName = env.BRANCH_NAME
  def workspace = env.WORKSPACE
  def buildUrl = env.BUILD_URL

  // PRINT ENVIRONMENT TO JOB
  echo "workspace directory is $workspace"
  echo "build URL is $buildUrl"
  echo "build Number is $buildNumber"
  echo "branch name is $branchName"
  echo "PATH is $env.PATH"

  try {
    stage('Checkout') {
      checkout scm
    }

    stage('Build') {
      sh "cd core && npm install"
      sh "cd cli && npm install"
    }

    stage('Test') {
      sh "cd core && npm run test"
      sh "cd cli && npm run test"
      junit '*/target/tests.js.xml'
    }

    stage('Publish NPM snapshot') {
      nodeJS.publishSnapshot('core', buildNumber, branchName)
      nodeJS.publishSnapshot('cli', buildNumber, branchName)
    }

  } catch (e) {
    mail subject: "${env.JOB_NAME} (${env.BUILD_NUMBER}): Error on build", to: 'github@martinreinhardt-online.de', body: "Please go to ${env.BUILD_URL}."
    throw e
  }
}
