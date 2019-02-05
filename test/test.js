var assert = require('assert');
var MidiWriter = require('..');

describe('MidiWriterJS', function() {
	describe('#NoteEvent()', function () {
		describe('#getTickDuration()', function () {
			it('should create a dotted half note if passed three quarter notes.', function () {
				var track = new MidiWriter.Track(); // Need to instantiate to build note object
				var note = new MidiWriter.NoteEvent({pitch: 'C4', duration: ['4', '4', '4']});
				track.addEvent(note);
				var write = new MidiWriter.Writer(track);
				assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAADQCQPECDAIA8QAD/LwA=', write.base64());
			});

			it('should create a note with duration of 50 ticks if passed T50', function () {
				var track = new MidiWriter.Track(); // Need to instantiate to build note object
				var note = new MidiWriter.NoteEvent({pitch: 'C4', duration: 'T50'});
				track.addEvent(note);
				var write = new MidiWriter.Writer(track);
				assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAADACQPEAygDxAAP8vAA==', write.base64());
			});
		});
	});

	describe('#Track()', function() {
		describe('#Time Signature', function() {
			it('should return specific base64 string when time signature is 4/4', function() {
				var track = new MidiWriter.Track();
				track.setTimeSignature(4, 4);
				var write = new MidiWriter.Writer(track);
				assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAADAD/WAQEAhgIAP8vAA==', write.base64());
			});

			it('should return specific base64 string when time signature is 2/2', function() {
				var track = new MidiWriter.Track();
				track.setTimeSignature(2, 2);
				var write = new MidiWriter.Writer(track);
				assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAADAD/WAQCARgIAP8vAA==', write.base64());
			});

			it('should return specific base64 string when time signature is 2/8', function() {
				var track = new MidiWriter.Track();
				track.setTimeSignature(2, 8);
				var write = new MidiWriter.Writer(track);
				assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAADAD/WAQCAxgIAP8vAA==', write.base64());
			});
		});

		it('should return specific base64 string when setting C major key signature', function() {
			var track = new MidiWriter.Track();
			track.setKeySignature('C');
			var write = new MidiWriter.Writer(track);
			assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAACgD/WQIAAAD/LwA=', write.base64());
		});

		it('should return specific base64 string when adding copyright', function() {
			var track = new MidiWriter.Track();
			track.addCopyright('2018 Garrett Grimm');
			var write = new MidiWriter.Writer(track);
			assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAAGgD/AhIyMDE4IEdhcnJldHQgR3JpbW0A/y8A', write.base64());
		});

		it('should return specific base64 string when adding text', function() {
			var track = new MidiWriter.Track();
			track.addText('MidiWriterJS is the bomb!');
			var write = new MidiWriter.Writer(track);
			assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAAIQD/ARlNaWRpV3JpdGVySlMgaXMgdGhlIGJvbWIhAP8vAA==', write.base64());
		});

		it('should return specific base64 string when adding a track name', function() {
			var track = new MidiWriter.Track();
			track.addTrackName('Name of a cool track');
			var write = new MidiWriter.Writer(track);
			assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAAHAD/AxROYW1lIG9mIGEgY29vbCB0cmFjawD/LwA=', write.base64());
		});

		it('should return specific base64 string when adding an instrument name', function() {
			var track = new MidiWriter.Track();
			track.addInstrumentName('Alto Saxophone');
			var write = new MidiWriter.Writer(track);
			assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAAFgD/BA5BbHRvIFNheG9waG9uZQD/LwA=', write.base64());
		});

		it('should return specific base64 string when adding a marker', function() {
			var track = new MidiWriter.Track();
			track.addMarker('This is my favorite part of the song.');
			var write = new MidiWriter.Writer(track);
			assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAALQD/BiVUaGlzIGlzIG15IGZhdm9yaXRlIHBhcnQgb2YgdGhlIHNvbmcuAP8vAA==', write.base64());
		});

		it('should return specific base64 string when adding a cue point', function() {
			var track = new MidiWriter.Track();
			track.addCuePoint('Here is a cue point.');
			var write = new MidiWriter.Writer(track);
			assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAAHAD/BxRIZXJlIGlzIGEgY3VlIHBvaW50LgD/LwA=', write.base64());
		});

		it('should return specific base64 string when adding a lyric', function() {
			var track = new MidiWriter.Track();
			track.addLyric('Oh say can you see.');
			var write = new MidiWriter.Writer(track);
			assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAAGwD/BRNPaCBzYXkgY2FuIHlvdSBzZWUuAP8vAA==', write.base64());
		});
	});

	describe('#Writer()', function() {
		describe('#base64()', function() {
			it('should return specific base64 string when a single C4 quarter note is created.', function () {
				var track = new MidiWriter.Track();
				var note = new MidiWriter.NoteEvent({pitch: 'C4', duration: '4'});
				track.addEvent(note);
				var write = new MidiWriter.Writer(track);
				assert.equal('TVRoZAAAAAYAAAABAIBNVHJrAAAADQCQPECBAIA8QAD/LwA=', write.base64());
			});
		});

		describe('#Hot Cross Buns', function() {
			it('should return specific base64 string when hot cross buns is created.', function () {
				var hcb = require('../examples/hot-cross-buns.js');
				assert.equal('data:audio/midi;base64,TVRoZAAAAAYAAAABAIBNVHJrAAAAlQCQQECBAIBAQACQPkCBAIA+QACQPECCAIA8QACQQECBAIBAQACQPkCBAIA+QACQPECCAIA8QACQPEBAgDxAAJA8QECAPEAAkDxAQIA8QACQPEBAgDxAAJA+QECAPkAAkD5AQIA+QACQPkBAgD5AAJA+QECAPkAAkEBAgQCAQEAAkD5AgQCAPkAAkDxAggCAPEAA/y8A', hcb);
			});
		});

		describe('#Maruo Giuliani', function() {
			it('should return specific base64 string when Maruo Giuliani example is created.', function () {
				var hcb = require('../examples/mauro.giuliani-op.47-main-theme.js');
				assert.equal('data:audio/midi;base64,TVRoZAAAAAYAAQADAIBNVHJrAAAAEwD/WAQDAhgIAP9RAwknwAD/LwBNVHJrAAACFwCQSUAAkExAggCASUAAgExAAJBJQACQTECBAIBJQACATEAAkElAAJBMQIIAgElAAIBMQACQRUAAkElAgQCARUAAgElAAJBHQACQSkCCAIBHQACASkAAkERAAJBMQIEAgERAAIBMQACQRUAAkElAggCARUAAgElAAJBFQIEAgEVAAJBJQACQTECCAIBJQACATEAAkElAAJBMQIEAgElAAIBMQACQSUAAkExAggCASUAAgExAAJBFQACQSUCBAIBFQACASUAAkEdAAJBKQIIAgEdAAIBKQACQREAAkExAgQCAREAAgExAAJBFQACQSUCCAIBFQACASUCBAJBMQACQTECBAIBMQACATEAAkEtAAJBOQIEAgEtAAIBOQACQSkAAkFBAgQCASkAAgFBAAJBJQACQUUCCAIBJQACAUUAAkExAgQCATEAAkExAAJBMQIEAgExAAIBMQACQS0AAkE5AgQCAS0AAgE5AAJBKQACQUECBAIBKQACAUEAAkElAAJBRQIIAgElAAIBRQIEAkElAAJBMQIIAgElAAIBMQACQSUAAkExAgQCASUAAgExAAJBJQACQTECBAIBJQACATEAAkFFAgQCAUUAAkEVAAJBJQIEAgEVAAIBJQACQSUAAkExAgQCASUAAgExAAJBHQACQSkCBAIBHQACASkAAkERAAJBHQIEAgERAAIBHQACQRUCCAIBFQAD/LwBNVHJrAAAAowCQOUCCAIA5QIEAkDlAggCAOUCBAJA0QIIAgDRAgQCQOUCCAIA5QIEAkDlAggCAOUCBAJA5QIIAgDlAgQCQNECCAIA0QIEAkDlAggCAOUCBAJA0QIIAgDRAgQCQOUCCAIA5QIEAkDRAggCANECBAJA5QIIAgDlAgQCQOUCCAIA5QIEAkDlAggCAOUCBAJA0QIIAgDRAgQCQOUCCAIA5QAD/LwA=', hcb);
			});
		});

		describe('#Chopin Prelude', function() {
			it('should return specific base64 string when chopin prelude is created.', function () {
				var hcb = require('../examples/chopin-prelude-e-minor.js');
				assert.equal('data:audio/midi;base64,TVRoZAAAAAYAAQACAIBNVHJrAAAC3gD/UQMPQkAAwAEAkEd/gwCAR38AkEh/gQCASH8AkEd/gwCAR38AkEh/gQCASH8AkEd/gwCAR38AkEh/gQCASH8AkEd/gwCAR38AkEZ/gQCARn8AkEV/gwCARX8AkEd/gQCAR38AkEV/gwCARX8AkEd/gQCAR38AkEV/gwCARX8AkEd/YIBHfwCQRX8ggEV/AJBFf4MAgEV/AJBEf4IAgER/AJBFf0CARX8AkEd/QIBHfwCQSn9AgEp/AJBIf0CASH8AkEB/QIBAfwCQRX9AgEV/AJBCf4MAgEJ/AJBFf4EAgEV/AJBCf4MAgEJ/AJBFf4EAgEV/AJBDf0CAQ38AkEJ/QIBCfwCQPH9AgDx/AJA7f0CAO38AkD9/QIA/fwCQQn9AgEJ/AJBKfyqASn8AkEh/KoBIfwCQR38qgEd/AJBHf4MAgEd/AJBIf4EAgEh/AJBHf4MAgEd/AJBIf4EAgEh/AJBHf4MAgEd/AJBIf4EAgEh/AJBHf2CAR38AkEZ/IIBGfwCQRn+BAIBGfwCQT3+BAIBPfwCQTn9ggE5/AJBMfyCATH8AkEx/QIBMfwCQS39AgEt/AJBUf0CAVH8AkEt/QIBLfwCQS39AgEt/AJBMf0CATH8AkE9/QIBPfwCQR39AgEd/AJBKf0CASn8AkEh/QIBIfwCQTH8qgEx/AJBAfyqAQH8AkEV/KoBFfwCQQn+BQIBCfwCQRX9AgEV/AJBCf4MAgEJ/AJBFf4EAgEV/AJBCf4MAgEJ/AJBCf2CAQn8AkEB/IIBAfwCQQH+DAIBAfwCQQn+BAIBCfwCQQH+DAIBAfwCQQn+BAIBCfwCQQH+CAIBAf4IAkFR/AJBPfwCQSn8AkEh/ggCAVH8AgE9/AIBKfwCASH8AkFR/AJBPfwCQSn8AkEh/ggCAVH8AgE9/AIBKfwCASH8AkFR/AJBPfwCQTH8AkEh/gQCAVH8AgE9/AIBMfwCASH8A/y8ATVRyawAAED4AwAEAkEBAAJA7QACQN0BAgEBAAIA7QACAN0AAkEBAAJA7QACQN0BAgEBAAIA7QACAN0AAkEBAAJA7QACQN0BAgEBAAIA7QACAN0AAkEBAAJA7QACQN0BAgEBAAIA7QACAN0AAkEBAAJA7QACQN0BAgEBAAIA7QACAN0AAkEBAAJA7QACQN0BAgEBAAIA7QACAN0AAkEBAAJA7QACQN0BAgEBAAIA7QACAN0AAkEBAAJA7QACQN0BAgEBAAIA7QACAN0AAkEBAAJA5QACQNkBAgEBAAIA5QACANkAAkEBAAJA5QACQNkBAgEBAAIA5QACANkAAkEBAAJA5QACQNkBAgEBAAIA5QACANkAAkEBAAJA5QACQNkBAgEBAAIA5QACANkAAkD9AAJA5QACQNkBAgD9AAIA5QACANkAAkD9AAJA5QACQNkBAgD9AAIA5QACANkAAkD9AAJA5QACQNkBAgD9AAIA5QACANkAAkD9AAJA5QACQNkBAgD9AAIA5QACANkAAkD9AAJA5QACQNUBAgD9AAIA5QACANUAAkD9AAJA5QACQNUBAgD9AAIA5QACANUAAkD9AAJA5QACQNUBAgD9AAIA5QACANUAAkD9AAJA5QACQNUBAgD9AAIA5QACANUAAkD5AAJA5QACQNUBAgD5AAIA5QACANUAAkD5AAJA5QACQNUBAgD5AAIA5QACANUAAkD5AAJA4QACQNUBAgD5AAIA4QACANUAAkD5AAJA4QACQNUBAgD5AAIA4QACANUAAkD5AAJA4QACQNEBAgD5AAIA4QACANEAAkD5AAJA4QACQNEBAgD5AAIA4QACANEAAkD5AAJA4QACQNEBAgD5AAIA4QACANEAAkD5AAJA4QACQNEBAgD5AAIA4QACANEAAkD5AAJA3QACQNEBAgD5AAIA3QACANEAAkD5AAJA3QACQNEBAgD5AAIA3QACANEAAkD1AAJA3QACQNEBAgD1AAIA3QACANEAAkD1AAJA3QACQNEBAgD1AAIA3QACANEAAkDxAAJA3QACQNEBAgDxAAIA3QACANEAAkDxAAJA3QACQNEBAgDxAAIA3QACANEAAkDxAAJA3QACQNEBAgDxAAIA3QACANEAAkDxAAJA3QACQNEBAgDxAAIA3QACANEAAkDxAAJA2QACQNEBAgDxAAIA2QACANEAAkDxAAJA2QACQNEBAgDxAAIA2QACANEAAkDxAAJA2QACQNEBAgDxAAIA2QACANEAAkDxAAJA2QACQNEBAgDxAAIA2QACANEAAkDxAAJA2QACQNEBAgDxAAIA2QACANEAAkDxAAJA2QACQNEBAgDxAAIA2QACANEAAkDxAAJA2QACQNEBAgDxAAIA2QACANEAAkDxAAJA2QACQNEBAgDxAAIA2QACANEAAkDxAAJA2QACQM0BAgDxAAIA2QACAM0AAkDxAAJA2QACQM0BAgDxAAIA2QACAM0AAkDxAAJA2QACQM0BAgDxAAIA2QACAM0AAkDxAAJA2QACQM0BAgDxAAIA2QACAM0AAkDxAAJA2QACQMkBAgDxAAIA2QACAMkAAkDxAAJA2QACQMkBAgDxAAIA2QACAMkAAkDxAAJA2QACQMkBAgDxAAIA2QACAMkAAkDxAAJA2QACQMkBAgDxAAIA2QACAMkAAkDxAAJA2QACQMkBAgDxAAIA2QACAMkAAkDxAAJA2QACQMkBAgDxAAIA2QACAMkAAkDxAAJA2QACQMkBAgDxAAIA2QACAMkAAkDxAAJA2QACQMkBAgDxAAIA2QACAMkAAkDxAAJA1QACQMkBAgDxAAIA1QACAMkAAkDxAAJA1QACQMkBAgDxAAIA1QACAMkAAkDxAAJA1QACQMkBAgDxAAIA1QACAMkAAkDxAAJA1QACQMkBAgDxAAIA1QACAMkAAkEdAAJA1QACQMkBAgEdAAIA1QACAMkAAkEdAAJA1QACQMkBAgEdAAIA1QACAMkAAkEdAAJA1QACQMkBAgEdAAIA1QACAMkAAkEdAAJA1QACQMkBAgEdAAIA1QACAMkAAkEdAAJA0QACQMEBAgEdAAIA0QACAMEAAkEdAAJA0QACQMEBAgEdAAIA0QACAMEAAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJA0QACQO0BAgEVAAIA0QACAO0AAkEVAAJA0QACQO0BAgEVAAIA0QACAO0AAkEVAAJAzQACQO0BAgEVAAIAzQACAO0AAkEVAAJAzQACQO0BAgEVAAIAzQACAO0AAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJAzQACQO0BAgEVAAIAzQACAO0AAkEVAAJAzQACQO0BAgEVAAIAzQACAO0AAkEVAAJAzQACQO0BAgEVAAIAzQACAO0AAkEVAAJAzQACQO0BAgEVAAIAzQACAO0AAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJA0QACQMEBAgEVAAIA0QACAMEAAkEVAAJAzQACQO0CBAIBFQACAM0AAgDtAgwCQQEAAkDtAAJA3QECAQEAAgDtAAIA3QACQQEAAkDtAAJA3QECAQEAAgDtAAIA3QACQQEAAkDtAAJA3QECAQEAAgDtAAIA3QACQQEAAkDtAAJA3QECAQEAAgDtAAIA3QACQQEAAkDtAAJA3QECAQEAAgDtAAIA3QACQQEAAkDtAAJA3QECAQEAAgDtAAIA3QACQQEAAkDtAAJA3QECAQEAAgDtAAIA3QACQQEAAkDtAAJA3QECAQEAAgDtAAIA3QACQQEAAkDlAAJA2QECAQEAAgDlAAIA2QACQQEAAkDlAAJA2QECAQEAAgDlAAIA2QACQQEAAkDlAAJA2QECAQEAAgDlAAIA2QACQQEAAkDlAAJA2QECAQEAAgDlAAIA2QACQP0AAkDlAAJA1QECAP0AAgDlAAIA1QACQP0AAkDlAAJA1QECAP0AAgDlAAIA1QACQP0AAkDlAAJA1QECAP0AAgDlAAIA1QACQP0AAkDlAAJA1QECAP0AAgDlAAIA1QACQP0AAkDhAAJA1QECAP0AAgDhAAIA1QACQP0AAkDhAAJA1QECAP0AAgDhAAIA1QACQPkAAkDhAAJA1QECAPkAAgDhAAIA1QACQPkAAkDhAAJA1QECAPkAAgDhAAIA1QACQPkAAkDdAAJA0QECAPkAAgDdAAIA0QACQPkAAkDdAAJA0QECAPkAAgDdAAIA0QACQPkAAkDdAAJA0QECAPkAAgDdAAIA0QACQPkAAkDdAAJA0QECAPkAAgDdAAIA0QACQPkAAkDdAAJA0QECAPkAAgDdAAIA0QACQPkAAkDdAAJA0QECAPkAAgDdAAIA0QACQPUAAkDdAAJA0QECAPUAAgDdAAIA0QACQPUAAkDdAAJA0QECAPUAAgDdAAIA0QACQRkAAkDRAAJAxQECARkAAgDRAAIAxQACQRkAAkDRAAJAxQECARkAAgDRAAIAxQACQRUAAkDRAAJAwQECARUAAgDRAAIAwQACQRUAAkDRAAJAwQECARUAAgDRAAIAwQACQO0AAkC9AQIA7QACAL0AAkFFAAJBOQACQPEAAkEVAQIBRQACATkAAgDxAAIBFQACQUUAAkE5AAJA8QACQRUBAgFFAAIBOQACAPEAAgEVAAJBRQACQTkAAkDxAAJBFQECAUUAAgE5AAIA8QACARUAAkE5AAJBLQACQR0AAkENAQIBOQACAS0AAgEdAAIBDQACQTEAAkEdAAJBDQECATEAAgEdAAIBDQACQTEAAkEdAAJBDQECATEAAgEdAAIBDQACQTEAAkEdAAJBDQECATEAAgEdAAIBDQACQTEAAkDxAAJBFQECATEAAgDxAAIBFQACQTEAAkDxAAJBFQECATEAAgDxAAIBFQACQOUBAgDlAAJA8QACQNkAAkDRAQIA8QACANkAAgDRAAJBHQACQNEAAkDtAQIBHQACANEAAgDtAAJBHQACQNEAAkDtAQIBHQACANEAAgDtAAJBFQACQNEAAkDBAQIBFQACANEAAgDBAAJBFQACQNEAAkDBAQIBFQACANEAAgDBAAJA7QACQNEAAkC9AQIA7QACANEAAgC9AAJA7QACQNEAAkC9AQIA7QACANEAAgC9AAJA7QACQNEAAkC9AQIA7QACANEAAgC9AAJA7QACQNEAAkC9AQIA7QACANEAAgC9AAJA5QACQNEAAkDBAQIA5QACANEAAgDBAAJA5QACQNEAAkDBAQIA5QACANEAAgDBAAJA5QACQNEAAkDBAQIA5QACANEAAgDBAAJA5QACQNEAAkDBAQIA5QACANEAAgDBAAJA7QACQNEAAkC9AQIA7QACANEAAgC9AAJA7QACQNEAAkC9AQIA7QACANEAAgC9AAJA7QACQNEAAkC9AQIA7QACANEAAgC9AAJA7QACQNEAAkC9AQIA7QACANEAAgC9AAJA7QACQM0AAkDtAQIA7QACAM0AAgDtAAJA7QACQM0AAkDtAQIA7QACAM0AAgDtAAJA5QACQM0AAkDtAQIA5QACAM0AAgDtAAJA5QACQM0AAkDtAQIA5QACAM0AAgDtAAJA3QACQNEAAkDBAQIA3QACANEAAgDBAAJA3QACQNEAAkDBAQIA3QACANEAAgDBAAJA3QACQNEAAkDBAQIA3QACANEAAgDBAAJA3QACQNEAAkDBAQIA3QACANEAAgDBAAJA6QACQNEAAkDBAQIA6QACANEAAgDBAAJA6QACQNEAAkDBAQIA6QACANEAAgDBAAJA5QACQNEAAkDBAQIA5QACANEAAgDBAAJA5QACQNEAAkDBAQIA5QACANEAAgDBAAJA5QACQNEAAkDtAQIA5QACANEAAgDtAAJA5QACQNEAAkDtAQIA5QACANEAAgDtAAJA4QACQNEAAkDtAQIA4QACANEAAgDtAAJA4QACQNEAAkDtAQIA4QACANEAAgDtAAJA3QACQNEAAkDtAQIA3QACANEAAgDtAAJA3QACQNEAAkDtAQIA3QACANEAAgDtAAJA3QACQNEAAkDtAQIA3QACANEAAgDtAAJA3QACQNEAAkDtAQIA3QACANEAAgDtAAJA3QACQMEAAkDpAggCAN0AAgDBAAIA6QIIAkDtAAJAvQIIAgDtAAIAvQACQO0AAkDZAAJAvQIIAgDtAAIA2QACAL0AAkChAAJAcQIQAgChAAIAcQAD/LwA=', hcb);
			});
		});

		describe('#Zelda Theme', function() {
			it('should return specific base64 string when zelda theme is created.', function () {
				var hcb = require('../examples/zelda-main-theme.js');
				assert.equal('data:audio/midi;base64,TVRoZAAAAAYAAQACAIBNVHJrAAADoQDAAQCQRn+CAIBGfwCQRn9AgEZ/AJBBf0CAQX8AkEF/QIBBfwCQRn9AgEZ/AJBEfyCARH8AkEJ/IIBCfwCQRH+DAIBEf0CQRn+CAIBGfwCQRn9AgEZ/AJBBf0CAQX8AkEF/QIBBfwCQRn9AgEZ/AJBFfyCARX8AkEN/IIBDfwCQRX+BQIBFf4IAkEUBhACARQGEAJBGf4EAgEZ/AJBBf4FAgEF/AJBGf0CARn8AkEZ/IIBGfwCQSH8ggEh/AJBKfyCASn8AkEt/IIBLfwCQTX+CAIBNf0CQTX9AgE1/AJBNf0CATX8AkE5/IIBOfwCQUH8ggFB/AJBSf4IAgFJ/QJBSf0CAUn8AkFJ/QIBSfwCQUH8ggFB/AJBOfyCATn8AkFB/YIBQfwCQTn8ggE5/AJBNf4IAgE1/AJBNf4EAgE1/AJBLf2CAS38AkE1/IIBNfwCQTn+CAIBOfwCQTX9AgE1/AJBLf0CAS38AkEl/YIBJfwCQS38ggEt/AJBNf4IAgE1/AJBLf0CAS38AkEl/QIBJfwCQSH9ggEh/AJBKfyCASn8AkEx/ggCATH8AkE9/gQCAT38AkE1/QIBNfwCQQX8ggEF/AJBBfyCAQX8AkEF/QIBBfwCQQX8ggEF/AJBBfyCAQX8AkEF/QIBBfwCQQX8ggEF/AJBBfyCAQX8AkEF/QIBBfwCQQX9AgEF/AJBGf4EAgEZ/AJBBf4FAgEF/AJBGf0CARn8AkEZ/IIBGfwCQSH8ggEh/AJBKfyCASn8AkEt/IIBLfwCQTX+CAIBNf0CQTX9AgE1/AJBNf0CATX8AkE5/IIBOfwCQUH8ggFB/AJBSf4MAgFJ/AJBVf4EAgFV/AJBUf4EAgFR/AJBRf4IAgFF/AJBNf4EAgE1/AJBOf4MAgE5/AJBSf4EAgFJ/AJBRf4EAgFF/AJBNf4IAgE1/AJBNf4EAgE1/AJBOf4MAgE5/AJBSf4EAgFJ/AJBRf4EAgFF/AJBNf4IAgE1/AJBKf4EAgEp/AJBLf4MAgEt/AJBOf4EAgE5/AJBNf4EAgE1/AJBJf4IAgEl/AJBGf4EAgEZ/AJBIf2CASH8AkEp/IIBKfwCQTH+CAIBMfwCQT3+BAIBPfwCQTX9AgE1/AJBBfyCAQX8AkEF/IIBBfwCQQX9AgEF/AJBBfyCAQX8AkEF/IIBBfwCQQX9AgEF/AJBBfyCAQX8AkEF/IIBBfwCQQX9AgEF/AJBBf0CAQX8A/y8ATVRyawAACUMAwAEAkCpAgQCAKkAAkDVAgQCANUAAkDpAggCAOkAAkClAgQCAKUAAkDNAgQCAM0AAkDhAggCAOEAAkCdAgQCAJ0AAkDFAgQCAMUAAkDpAggCAOkAAkCpAgQCAKkAAkDVAgQCANUAAkDpAggCAOkAAkC5AQIAuQACQLkAggC5AAJApQCCAKUAAkC5AQIAuQACQLkAggC5AAJApQCCAKUAAkC5AQIAuQACQLkAggC5AAJApQCCAKUAAkC5AIIAuQACQKUAggClAAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkAggC5AAJApQCCAKUAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQCCALkAAkClAIIApQACQLkAggC5AAJApQCCAKUAAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAIIAsQACQJ0AggCdAAJAsQCCALEAAkCdAIIAnQACQKkBAgCpAAJAqQCCAKkAAkCVAIIAlQACQKkBAgCpAAJAqQCCAKkAAkCVAIIAlQACQKkBAgCpAAJAqQCCAKkAAkCVAIIAlQACQKkAggCpAAJAlQCCAJUAAkCpAIIAqQACQJUAggCVAAJAxQECAMUAAkDFAIIAxQACQLEAggCxAAJAxQECAMUAAkDFAIIAxQACQLEAggCxAAJAxQECAMUAAkDFAIIAxQACQLEAggCxAAJAxQCCAMUAAkCxAIIAsQACQMUAggDFAAJAsQCCALEAAkC9AQIAvQACQL0AggC9AAJAqQCCAKkAAkC9AQIAvQACQL0AggC9AAJAqQCCAKkAAkC9AQIAvQACQL0AggC9AAJAqQCCAKkAAkC9AIIAvQACQKkAggCpAAJAvQCCAL0AAkCpAIIAqQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkBAgC5AAJAuQCCALkAAkClAIIApQACQLkAggC5AAJApQCCAKUAAkC5AIIAuQACQKUAggClAAJAwQECAMEAAkDBAIIAwQACQK0AggCtAAJAwQECAMEAAkDBAIIAwQACQK0AggCtAAJAwQECAMEAAkDBAIIAwQACQK0AggCtAAJAwQCCAMEAAkCtAIIArQACQMEAggDBAAJArQCCAK0AAkClAQIApQACQOUAggDlAAJA5QCCAOUAAkDhAQIA4QACQOEAggDhAAJA4QCCAOEAAkDdAQIA3QACQN0AggDdAAJA3QCCAN0AAkDZAQIA2QACQKUBAgClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQECALkAAkC5AIIAuQACQKUAggClAAJAuQCCALkAAkClAIIApQACQLkAggC5AAJApQCCAKUAAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAQIAsQACQLEAggCxAAJAnQCCAJ0AAkCxAIIAsQACQJ0AggCdAAJAsQCCALEAAkCdAIIAnQACQKkBAgCpAAJAqQCCAKkAAkCpAIIAqQACQKkBAgCpAAJAqQCCAKkAAkCpAIIAqQACQKkBAgCpAAJAqQCCAKkAAkCpAIIAqQACQKkAggCpAAJAqQCCAKkAAkCpAIIAqQACQKkAggCpAAJApQECAKUAAkClAIIApQACQKUAggClAAJApQECAKUAAkClAIIApQACQKUAggClAAJApQECAKUAAkClAIIApQACQKUAggClAAJApQCCAKUAAkClAIIApQACQKUAggClAAJApQCCAKUAAkChAQIAoQACQKEAggChAAJAoQCCAKEAAkChAQIAoQACQKEAggChAAJAoQCCAKEAAkChAQIAoQACQKEAggChAAJAoQCCAKEAAkChAIIAoQACQKEAggChAAJAoQCCAKEAAkChAIIAoQACQKUBAgClAAJApQCCAKUAAkClAIIApQACQKUBAgClAAJApQCCAKUAAkClAIIApQACQKUBAgClAAJApQCCAKUAAkClAIIApQACQKUAggClAAJApQCCAKUAAkClAIIApQACQKUAggClAAJAoQECAKEAAkChAIIAoQACQKEAggChAAJAoQECAKEAAkChAIIAoQACQKEAggChAAJAoQECAKEAAkChAIIAoQACQKEAggChAAJAoQCCAKEAAkChAIIAoQACQKEAggChAAJAoQCCAKEAAkClAQIApQACQKUAggClAAJApQCCAKUAAkClAQIApQACQKUAggClAAJApQCCAKUAAkClAQIApQACQKUAggClAAJApQCCAKUAAkClAIIApQACQKUAggClAAJApQCCAKUAAkClAIIApQACQL0BAgC9AAJAvQCCAL0AAkC9AIIAvQACQL0BAgC9AAJAvQCCAL0AAkC9AIIAvQACQL0BAgC9AAJAvQCCAL0AAkC9AIIAvQACQL0AggC9AAJAvQCCAL0AAkC9AIIAvQACQL0AggC9AAJAuQECALkAAkC5AIIAuQACQLkAggC5AAJAuQECALkAAkC5AIIAuQACQLkAggC5AAJAuQECALkAAkC5AIIAuQACQLkAggC5AAJAuQCCALkAAkC5AIIAuQACQLkAggC5AAJAuQCCALkAAkDBAQIAwQACQMEAggDBAAJAwQCCAMEAAkDBAQIAwQACQMEAggDBAAJAwQCCAMEAAkDBAQIAwQACQMEAggDBAAJAwQCCAMEAAkDBAIIAwQACQMEAggDBAAJAwQCCAMEAAkDBAIIAwQACQKUBAgClAAJA5QCCAOUAAkDlAIIA5QACQOEBAgDhAAJA4QCCAOEAAkDhAIIA4QACQN0BAgDdAAJA3QCCAN0AAkDdAIIA3QACQNkBAgDZAAJApQECAKUAA/y8A', hcb);
			});
		});

		describe('#Notes by Start Tick', function() {
			it('should return specific base64 string when notes by start tick example is created.', function () {
				var hcb = require('../examples/notes-by-start-tick.js');
				assert.equal('data:audio/midi;base64,TVRoZAAAAAYAAAABAIBNVHJrAAAAPACQPEAygDxAAJBAQDKAQEAAkENAMoBDQACQR0AygEdAAJBKQDKASkAAkE1AMoBNQACQUUAygFFAAP8vAA==', hcb);
			});
		});
	});

	describe('#Utils()', function() {
		describe('#stringToBytes()', function () {
			it('should return [116, 101, 115, 116] when "test" is passed.', function () {
				assert.equal([116, 101, 115, 116].toString(), MidiWriter.Utils.stringToBytes('test').toString());
			});
		});

		describe('#isNumeric()', function () {
			it('should return false when "t" is passed.', function () {
				assert.equal(false, MidiWriter.Utils.isNumeric('t'));
			});
		});

		describe('#getPitch()', function () {
			it('should return 101 when "F7" is passed.', function () {
				assert.equal(101, MidiWriter.Utils.getPitch('F7'));
			});
		});

		describe('#getPitch()', function () {
			it('should return 72 (C5) when "B#4" is passed.', function () {
				assert.equal(72, MidiWriter.Utils.getPitch('B#4'));
			});
		});

		describe('#stringByteCount()', function () {
			it('should return 7 when "Garrett" is passed.', function () {
				assert.equal(7, MidiWriter.Utils.stringByteCount('Garrett'));
			});
		});

		describe('#numberFromBytes()', function () {
			it('should return 8463 when [0x21, 0x0f] is passed.', function () {
				assert.equal(8463, MidiWriter.Utils.numberFromBytes([0x21, 0x0f]));
			});
		});

		describe('#numberToBytes()', function () {
			it('should return [0, 5] when converting the number 5 into two bytes.', function() {
				assert.equal([0, 5].toString(), MidiWriter.Utils.numberToBytes(5,2));
			});
		});

		describe('#getDurationMultiplier()', function () {
			it('should return 1 for a quarter note.', function () {
				var note = new MidiWriter.NoteEvent({pitch: 'C4', duration: '4'});
				assert.equal(MidiWriter.Utils.getDurationMultiplier(note.duration), 1);
			});
		});

	});

	describe('#VexFlow()', function () {
		it('should instantiate', function() {
			var v = new MidiWriter.VexFlow();
			assert.notEqual(typeof v, 'undefined');
			assert.equal(v instanceof MidiWriter.VexFlow, true);
		});

		it('should trackFromVoice', function() {
			var v = new MidiWriter.VexFlow();
			var mockVoice = {
				tickables: []
			}
			var track = v.trackFromVoice(mockVoice);
			assert.notEqual(typeof track, 'undefined');
			assert.equal(track instanceof MidiWriter.Track, true);
		});

		it('should convertPitch', function() {
			var v = new MidiWriter.VexFlow();
			var p = 'pit/ch';
			p = v.convertPitch(p);
			assert.equal(p, 'pitch');
		});

		it('should convertDuration', function () {
			var v = new MidiWriter.VexFlow();
			var mockNote = {
				duration: 'w',
				isDotted: () => true,
			}
			assert.equal(v.convertDuration(mockNote), '1');
			mockNote.duration = 'h';
			assert.equal(v.convertDuration(mockNote), 'd2');
			mockNote.duration = 'q';
			assert.equal(v.convertDuration(mockNote), 'd4');
			mockNote.duration = '8';
			assert.equal(v.convertDuration(mockNote), 'd8');
			mockNote.isDotted = () => false;
			mockNote.duration = 'h';
			assert.equal(v.convertDuration(mockNote), '2');
			mockNote.duration = 'q';
			assert.equal(v.convertDuration(mockNote), '4');
			mockNote.duration = '8';
			assert.equal(v.convertDuration(mockNote), '8');

			mockNote.duration = 'some stuff'
			assert.equal(v.convertDuration(mockNote), 'some stuff');
		})
	})

});