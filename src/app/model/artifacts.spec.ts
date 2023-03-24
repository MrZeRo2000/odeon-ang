import {getTrackConfig} from "./artifacts";

describe('getTrackConfig', () => {
  it('should get by code', () => {
    expect(getTrackConfig(101)?.code).toBe(101);
  });

  it('should not find not existing', () => {
    expect(getTrackConfig(6000)?.code).toBeUndefined()
  });

  it('should get by code and artist', () => {
    expect(getTrackConfig(101, "C")?.code).toBe(101);
  });

});
