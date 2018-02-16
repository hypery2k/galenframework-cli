declare interface GridSettings {
  browser: string;
  browserVersion: string;
  platform: string;
  size: string;
  desiredCapabilities: { key: string, value: string }
}

declare interface WebDriver {

}

export declare function load(jsFilePath: string): void

export declare function createDriver(url: string, browserSize: string, browserType: string): WebDriver

export declare function createGridDriver(gridHubUrl: string, settings: GridSettings): WebDriver

export declare function resize(driver: WebDriver, size: string): void

export declare function checkLayout(driver: WebDriver, specFile: String, tagsToInclude?: [string], tagsToExclude?: [string]): void

export declare function checkLayout({}): void

export declare function checkPageSpecLayout(driver: WebDriver, pageSpec: String, tagsToInclude?: [string], tagsToExclude?: [string]): void

export declare function parsePageSpec({}): void

export declare function loadProperties(filePath: String): Map<string, string>

export declare function readFile(filePath: String): string

export declare function listDirectory(dirPath: String): [string]

export declare function makeDirectory(dirPath: String): void

export declare function fileExists(filePath: String): boolean

export declare function isDirectory(dirPath: String): boolean

export declare function retry(tries: number, callback: Function): void

export declare function takeScreenshot(driver: WebDriver): string

export declare function cookie(driver: WebDriver, cookieValue: string): void

export declare function inject(driver: WebDriver, script: string): void

export declare function createTestDataProvider(varableName: string): any

export declare function dumpPage({}): void

export declare function logged(text: string, callback: Function): void

export declare function loggedFunction(textExpression: string, callback: Function): void
