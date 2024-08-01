import { Parser } from './parser';

describe('Parser', () => {
  const p = Parser.parseMusicVideoTrack
  it('should create an instance', () => {
    expect(new Parser()).toBeTruthy();
  });

  it ('should not track', () => {
    expect(p('Test Track.mkv')).toEqual({})
  })

  it ('should parse track', () => {
    expect(p('01 Test Track.mkv')).toEqual({'title': 'Test Track'})
  })

  it ('should parse track with artist', () => {
    expect(p('01 Genesis - Test Track.mkv')).toEqual({'artistName': 'Genesis', 'title': 'Test Track'})
  })

  it ('should not parse track with artist', () => {
    expect(p('Genesis - Test Track.mkv')).toEqual({})
  })

});


