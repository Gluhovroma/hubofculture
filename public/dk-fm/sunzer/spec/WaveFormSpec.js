var proxyquire = require('proxyquire').noCallThru();

var WaveForm = proxyquire('../js/synthMixins/WaveForm', {
  '../waveforms/sine': {periodicWave: true, sine: true},
  '../waveforms/sawtooth': {periodicWave: true, sawtooth: true},
  '../waveforms/square': {periodicWave: true, square: true}
});
var PitchShifter = require('../js/synthMixins/PitchShifter');

var oscillator, audioContext, note;

describe("Mixins", function() {
  beforeEach(function() {
    oscillator = jasmine.createSpyObj('oscillator', ['setPeriodicWave', 'connect', 'start', 'stop']);
    audioContext = {
      createOscillator: function() {},
    };
    spyOn(audioContext, 'createOscillator').and.returnValue(oscillator);

    synth = {
      play: function() { return oscillator; },
      stop: function() {}
    };

    note = {pitch:44, frequency:100};
  });

  describe('WaveForm', function() {
    beforeEach(function() {
      WaveForm.call(synth);
    });

    it('sets wave form', function() {
      synth.waveForm = 'square';
      synth.play(note);
      expect(oscillator.setPeriodicWave).toHaveBeenCalledWith(
        jasmine.objectContaining({periodicWave: true, square: true})
      );
    });

    it('uses sine if no wave form is set', function() {
      synth.play(note);
      expect(oscillator.setPeriodicWave).toHaveBeenCalledWith(
        jasmine.objectContaining({periodicWave: true, sine: true})
      );
    });
  });

  describe('', function() {
    beforeEach(function() {
      PitchShifter.call(synth);
    });
  });
});