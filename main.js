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
    const dict = {};

    for (let i = 0; i < res.length; i++) {
        parseResponse(dict, res[i]);
    }

    return transformMap(dict);
};

const parseResponse = (dict, obj) => {
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
    const counter = {};

    for (let i = 0; i < tracks.length; i++) {
        if (tracks[i] in counter) {
            counter[tracks[i]] = counter[tracks[i]] + 1;
        } else {
            counter[tracks[i]] = 1;
        }
    }

    let transformed = '';

    for (let i = 0; i < tracks.length; i++) {
        transformed += tracks[i] + ` (` + `${counter[tracks[i]]}` + `), `;
    }

    return transformed.slice(0, -2);
};

console.log(transformResponse(response));
