const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const TrackManager = require('../src/trackManager');

function readSampleData(sample) {
  const sampleDataPath = path.resolve(__dirname, `./sample/${sample}.json`);
  const sampleData = JSON.parse( fs.readFileSync( sampleDataPath ) );
  return sampleData;
}

describe('Track Manager', () => {
  describe('Allocate Talks', () => {

    it('Initial Sample Data', () => {
      /* Seed Data */
      const sampleData = readSampleData('sample-data-1');

      /* Allocate Conference Tracks */
      const allocatedTracks = TrackManager.allocateTracks( sampleData.seed );

      /* Assertion */
      assert.isObject( allocatedTracks );
      assert.deepEqual( allocatedTracks, sampleData.expected );
    });

    it('Full Slot Time Talks', () => {
      /* Seed Data */
      const sampleData = readSampleData('sample-data-2');

      /* Allocate Conference Tracks */
      const allocatedTracks = TrackManager.allocateTracks( sampleData.seed );

      /* Assertion */
      assert.isObject( allocatedTracks );
      assert.deepEqual( allocatedTracks, sampleData.expected );
    });

  });
});
