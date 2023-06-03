export class CheckRequest {
  testDirectories: string[] | string;
  refDirectories: string[] | string;
  reportOutput: string;
  noiseThreshold?: number;
  guaranteeThreshold?: number;
  displayThreshold?: number;
  removeImports: boolean = false;
  skipPunctuation: boolean = false;
  truncate: boolean = false;
  disableFilter: boolean = false;

  constructor(
    testDirectories: string[],
    refDirectories: string[],
    reportOutput: string,
    removeImports: boolean,
    skipPunctuation: boolean,
    truncate: boolean,
    disableFilter: boolean,
    noiseThreshold?: number,
    guaranteeThreshold?: number,
    displayThreshold?: number
  ) {
    this.testDirectories = testDirectories;
    this.refDirectories = refDirectories;
    this.reportOutput = reportOutput;
    this.noiseThreshold = noiseThreshold;
    this.guaranteeThreshold = guaranteeThreshold;
    this.displayThreshold = displayThreshold;
    this.removeImports = removeImports;
    this.skipPunctuation = skipPunctuation;
    this.truncate = truncate;
    this.disableFilter = disableFilter;
  }
}
