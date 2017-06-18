const CONFERENCE_DAYS = 2;
const THREE_HOURS = (3 * 60);
const FOUR_HOURS = (4 * 60);

function buildConferenceStructure() {
  return { track1: [], track2: [] };
}

function sanitizeTalks(talks) {
  const sanitizedTalks = talks.map((talk) => {
    /* replace lightning for 5 */
    if (talk.time === 'lightning') {
      talk.time = 5;
    }
    return talk;
  });
  return sanitizedTalks;
}

function buildTrack(talks, trackStartTime, sessionDuration) {
  const sessionTracks = [];
  let trackTimeLeft = sessionDuration;
  let talkScheduleTime = trackStartTime;

  talks.forEach((talk, index) => {

    const talkFitsWithinTrack = (talk.time <= trackTimeLeft);
    if ( talkFitsWithinTrack ) {

      talkFormattedTime = talkScheduleTime.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

      console.log(`${talkFormattedTime} - ${talk.title} (Duration: ${talk.time})`);

      sessionTracks.push({
        start: talkFormattedTime,
        title: talk.title,
        duration: talk.time
      });

      talkScheduleTime = new Date(talkScheduleTime.getTime() + (talk.time * 60000));
      trackTimeLeft -= talk.time;

      // remove track from backlog
      delete talks[index];
    }
  });

  return sessionTracks;
}

function buildMorningTrack(talks) {
  const trackStartTime = new Date('1/1/2017 09:00');
  const morningTracks = buildTrack(talks, trackStartTime, THREE_HOURS);

  console.log('\n12:00 PM - Lunch (Duration: 60) \n');

  morningTracks.push({
    start: '12:00 PM',
    title: 'Lunch',
    duration: 60
  });

  return morningTracks;
}

function buildAfternoonTrack(talks) {
  const trackStartTime = new Date('1/1/2017 13:00');
  const afternoonTracks = buildTrack(talks, trackStartTime, FOUR_HOURS);

  console.log('\n5:00 PM - Networking Event (Duration: 60) \n');

  afternoonTracks.push({
    start: '5:00 PM',
    title: 'Networking Event',
    duration: 60
  });

  return afternoonTracks;
}

/* Main Facade API */
function allocateTracks(talks) {
  const conference = buildConferenceStructure();

  console.log('----------- Started Allocating Conference Tracks -----------');

  for (let currentConfDay = 1; currentConfDay <= CONFERENCE_DAYS; currentConfDay++) {

    console.log(`\n ------------------------ Track ${currentConfDay} ------------------------- \n`)

    const morningTracks = buildMorningTrack( talks );
    const afternoonTracks = buildAfternoonTrack( talks );

    conference[`track${currentConfDay}`] = [ ...morningTracks, ...afternoonTracks ];
  }

  return conference;
}

/* exports APIs */
module.exports = {
  allocateTracks: allocateTracks
}
