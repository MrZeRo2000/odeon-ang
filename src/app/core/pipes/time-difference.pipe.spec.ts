import { TimeDifferencePipe } from './time-difference.pipe';

describe('TimeDifferencePipe', () => {
  let pipe = new TimeDifferencePipe();

  beforeEach(() => {
    pipe = new TimeDifferencePipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('end less than start', () => {
    expect(pipe.transform(
      new Date(2000, 1, 2, 0, 0, 0),
      new Date(2000, 1, 1, 0, 1, 1)
    )).toEqual("00:00:00")
  })

  it('2 seconds', () => {
    expect(pipe.transform(
      new Date(2000, 1, 1, 0, 0, 59),
      new Date(2000, 1, 1, 0, 1, 1)
      )).toEqual("00:00:02")
  })

  it('7 minutes 5 seconds', () => {
    expect(pipe.transform(
      new Date(2000, 1, 1, 0, 0, 0),
      new Date(2000, 1, 1, 0, 7, 5)
      )).toEqual("00:07:05")
  })

  it('1 hour 33 minutes 5 seconds', () => {
    expect(pipe.transform(
      new Date(2000, 1, 1, 0, 0, 0),
      new Date(2000, 1, 1, 1, 33, 5)
      )).toEqual("01:33:05")
  })

});
