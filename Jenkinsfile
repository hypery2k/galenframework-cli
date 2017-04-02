properties properties: [
  [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
  [$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/hypery2k/galenframework-cli'],
]

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
      def currentVersionCore = sh(returnStdout: true, script: "cd core && npm version | grep \"{\" | tr -s ':'  | cut -d \"'\" -f 2").trim()
      def newVersionCore = "${currentVersionCore}-${branchName}-${buildNumber}"
      sh "cd core && npm version ${newVersionCore} --no-git-tag-version && npm publish --tag next"
      def currentVersionCli = sh(returnStdout: true, script: "cd cli && npm version | grep \"{\" | tr -s ':'  | cut -d \"'\" -f 4").trim()
      def newVersionCli = "${currentVersionCli}-${branchName}-${buildNumber}"
      sh "cd cli && npm version ${newVersionCli} --no-git-tag-version && npm publish --tag next"
    }

  } catch (e) {
    mail subject: "${env.JOB_NAME} (${env.BUILD_NUMBER}): Error on build", to: 'github@martinreinhardt-online.de', body: "Please go to ${env.BUILD_URL}."
    throw e
  }
}
