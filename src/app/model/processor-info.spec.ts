import {ProcessorType, PROCESSOR_TYPE_NAMES} from './process-info';

describe('ProcessorType', () => {
  it('should resolve to string', () => {
    expect(ProcessorType[ProcessorType.MP3_VALIDATOR]).toEqual("MP3_VALIDATOR");
  });

  it('resolve MP3 loader to string', () => {
    expect(PROCESSOR_TYPE_NAMES[ProcessorType.MP3_LOADER]).toEqual("MP3 Load")
  })
});
