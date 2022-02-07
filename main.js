const response = [
    {
        id: 1293487,
        name: 'KCRW', // radio station callsign
        tracks: [{ timestp: '2021-04-08', trackName: 'Peaches' }],
    },
    {
        id: 12923,
        name: 'KQED',
        tracks: [
            { timestp: '2021-04-09', trackName: 'Savage' },
            { timestp: '2021-04-09', trackName: 'Savage (feat. Beyonce)' },
            { timestp: '2021-04-08', trackName: 'Savage' },
            { timestp: '2021-04-08', trackName: 'Savage' },
            { timestp: '2021-04-08', trackName: 'Savage' },
        ],
    },
    {
        id: 4,
        name: 'WNYC',
        tracks: [
            { timestp: '2021-04-09', trackName: 'Captain Hook' },
            { timestp: '2021-04-08', trackName: 'Captain Hook' },
            { timestp: '2021-04-07', trackName: 'Captain Hook' },
        ],
    },
];

const transformResponse = (res) => {
    /* 
        Function that takes in API response and transforms it into expected output.

        N = # of radio stations in response
        M = maximum number of tracks in a station 

        Runtime: O(NM + M) 
    */

    const dict = {};

    /* O(NM) */
    for (let i = 0; i < res.length; i++) {
        parseResponse(dict, res[i]);
    }

    /* O(M) */
    return transformMap(dict);
};

const parseResponse = (dict, obj) => {
    /* 
        Mutates dictionary to hold (timestamp, tracks) pairs.
    */

    const tracks = obj['tracks'];

    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        const timestp = track['timestp'];
        const trackName = track['trackName'];

        if (timestp in dict) {
            const tracksPlayed = dict[timestp];
            tracksPlayed.push(trackName);
            dict[timestp] = tracksPlayed;
        } else {
            dict[timestp] = [trackName];
        }
    }
};

const transformMap = (dict) => {
    /* 
        Transforms dictionary into a properly formatted data object. 
    */

    const data = [];

    const keys = Object.keys(dict);

    for (let i = 0; i < keys.length; i++) {
        const timestp = keys[i];
        const tracks = dict[timestp];
        const spins = tracks.length;

        const obj = {
            x: timestp,
            y: spins,
            tooltip: transformTracks(tracks),
        };

        data.push(obj);
    }

    return data;
};

const transformTracks = (tracks) => {
    /*
        Helper method that transforms an array of tracks into a String.
        Example input: [ 'Peaches', 'Savage', 'Savage', 'Savage', 'Captain Hook' ]
        Example output: 'Peaches (1), Savage (3), Captain Hook (1)'
    */

    const counter = {};

    for (let i = 0; i < tracks.length; i++) {
        if (tracks[i] in counter) {
            counter[tracks[i]] = counter[tracks[i]] + 1;
        } else {
            counter[tracks[i]] = 1;
        }
    }

    let transformed = '';

    const keys = Object.keys(counter);
    for (let i = 0; i < keys.length; i++) {
        transformed += keys[i] + ` (` + `${counter[keys[i]]}` + `), `;
    }

    return transformed.slice(0, -2);
};

console.log(transformResponse(response));
