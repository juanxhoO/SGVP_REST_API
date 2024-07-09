const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    token: "new_generated_token",
    options: {
      "sonar.projectKey": "your_project_key",
      "sonar.projectName": "Your Project Name",
      "sonar.projectVersion": "1.0",
      "sonar.sources": "./src",
      "sonar.exclusions": "**/node_modules/**,**/*.spec.js",
      "sonar.language": "js",
      "sonar.sourceEncoding": "UTF-8"
    }
  },
  () => process.exit()
);
