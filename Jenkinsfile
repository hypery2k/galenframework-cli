node {
  def buildNumber = env.BUILD_NUMBER
  def workspace = env.WORKSPACE
  def buildUrl = env.BUILD_URL

  // PRINT ENVIRONMENT TO JOB
  echo "workspace directory is $workspace"
  echo "build URL is $buildUrl"
  echo "build Number is $buildNumber"
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
      def newVersionCore = "${currentVersionCore}-${buildNumber}"
      sh "cd core && npm version ${newVersionCore} --no-git-tag-version && npm publish --tag next"
      def currentVersionCli = sh(returnStdout: true, script: "cd cli && npm version | grep \"{\" | tr -s ':'  | cut -d \"'\" -f 4").trim()
      def newVersionCli = "${currentVersionCli}-${buildNumber}"
      sh "cd cli && npm version ${newVersionCli} --no-git-tag-version && npm publish --tag next"
    }

  } catch (e) {
    mail subject: 'Error on build', to: 'contact@martinreinhardt-online.de'
    throw e
  }
}
