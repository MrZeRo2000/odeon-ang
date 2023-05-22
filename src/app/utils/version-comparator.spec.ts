import {compareVersions, ComparisonResult} from './version-comparator';

describe('compareVersions', () => {
  it('equal', () => {
    expect(compareVersions('1.2.3', '1.2.3')).toBe(ComparisonResult.CR_EQUAL);
  });

  it('last number - minor', () => {
    expect(compareVersions('0.0.3', '0.0.2')).toBe(ComparisonResult.CR_MINOR_DIFFERENCE);
  });

  it('last number - major', () => {
    expect(compareVersions('0.0.2', '0.0.3')).toBe(ComparisonResult.CR_MAJOR_DIFFERENCE);
  });

  it('first number - major', () => {
    expect(compareVersions('0.0.2', '1.0.2')).toBe(ComparisonResult.CR_MAJOR_DIFFERENCE);
    expect(compareVersions('1.0.2', '0.0.2')).toBe(ComparisonResult.CR_MAJOR_DIFFERENCE);
  });

  it('second number - major', () => {
    expect(compareVersions('0.2.2', '0.3.2')).toBe(ComparisonResult.CR_MAJOR_DIFFERENCE);
    expect(compareVersions('0.3.2', '0.2.2')).toBe(ComparisonResult.CR_MAJOR_DIFFERENCE);
  });


});
