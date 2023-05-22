
export enum ComparisonResult {
  CR_EQUAL,
  CR_MINOR_DIFFERENCE,
  CR_MAJOR_DIFFERENCE
}

export function compareVersions(currentVersion: string, backendVersion: string): ComparisonResult {
  if (currentVersion === backendVersion) {
    return ComparisonResult.CR_EQUAL;
  } else {
    const cv = currentVersion.split(".")
    const bv = backendVersion.split(".")

    const k = Math.min(cv.length, bv.length)
    for (let i = 0; i < k; i++) {
      const ncv = parseInt(cv[i], 10)
      const nbv = parseInt(bv[i], 10)

      if (ncv !== nbv) {
        if ((i === k - 1) && (ncv > nbv)) {
          return ComparisonResult.CR_MINOR_DIFFERENCE
        } else {
          return ComparisonResult.CR_MAJOR_DIFFERENCE
        }
      }
    }
    // should not get here
    return ComparisonResult.CR_EQUAL;
  }
}
