import {PROCESSING_STATUS_NAMES, ProcessingStatus, PROCESSOR_TYPE_NAMES, ProcessorType} from './process-info';

describe('ProcessorType', () => {
  it('should resolve to string', () => {
    expect(ProcessorType[ProcessorType.MP3_VALIDATOR]).toEqual("MP3_VALIDATOR");
  });

  it('should resolve from string to number', () => {
    expect(ProcessorType["MP3_VALIDATOR"]).toEqual(ProcessorType.MP3_VALIDATOR);
  });

  it('resolve MP3 loader to string', () => {
    expect(PROCESSOR_TYPE_NAMES[ProcessorType.MP3_LOADER]).toEqual("MP3 Load")
  })

  it ('resolve processing status', () => {
    expect(ProcessingStatus["FAILURE"]).toEqual(ProcessingStatus.FAILURE);
    expect(PROCESSING_STATUS_NAMES[ProcessingStatus["FAILURE"]]).toEqual("Failure");
  })

  it('erroneous processing status', () => {
    const ps = "STUFF";
    expect(ProcessingStatus[ps as keyof typeof ProcessingStatus]).toBeUndefined();
  })
});
