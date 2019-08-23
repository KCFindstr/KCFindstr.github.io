const fs = require('fs');
let content = fs.readFileSync('chart.json', 'utf8');
let chart = JSON.parse(content);
let output = { meta: {}, notes: [], bpm: [] };
let id = 0;
for (let note of chart.note) {
	if (note.sound) {
		output.offset = note.offset;
		continue;
	}
	let newnote = {
		id: ++id,
		track: note.column,
		type: 0,
		time: note.beat
	}
	newnote.time[0]++;
	if (note.endbeat) {
		newnote.type = 2;
		newnote.endtime = note.endbeat;
		newnote.endtime[0]++;
		newnote.endtrack = newnote.track;
		newnote.headtype = 0;
		newnote.tailtype = 0;
	}
	output.notes.push(newnote);
}

for (let bpm of chart.time) {
	let newbpm = {
		value: bpm.bpm,
		time: bpm.beat
	};
	newbpm.time[0]++;
	output.bpm.push(newbpm);
}

console.log(JSON.stringify(output));