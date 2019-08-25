const fs = require('fs');
let content = fs.readFileSync('chart.json', 'utf8');
let chart = JSON.parse(content);
let output = { meta: {}, notes: [], bpm: [] };
let id = 0;

function convert(time) {
	return time[0] + time[1] / time[2];
}

function equal(t1, t2) {
	return Math.abs(convert(t1) - convert(t2)) <= 1e-3;
}

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
	if (note.endbeat) {
		let duration = convert(note.endbeat) - convert(note.beat);
		if (duration <= 0.2) {
			newnote.type = 1;
		} else {
			newnote.type = 2;
			newnote.endtime = note.endbeat;
			newnote.endtime[0]++;
			newnote.endtrack = newnote.track;
			newnote.headtype = 0;
			newnote.tailtype = 0; 
		}
	}
	newnote.time[0]++;
	output.notes.push(newnote);
}

let notesToRemove = {};
for (let note of output.notes) {
	if (note.type != 2 || note.next)
		continue;
	let suc = false;
	for (let nxt of output.notes) {
		if (!equal(note.endtime, nxt.time))
			continue;
		if (nxt.type != 2 && !notesToRemove[nxt.id]) {
			if (Math.abs(note.track - nxt.track) <= 1) {
				note.endtrack = nxt.track;
				note.tailtype = nxt.type;
				notesToRemove[nxt.id] = true;
				suc = true;
				break;
			}
		}
	}
	if (suc) continue;
		
	for (let nxt of output.notes) {
		if (nxt.prev || !equal(note.endtime, nxt.time))
			continue;
		if (nxt.type == 2) {
			if (note.track <= 3 && nxt.track <= 3 ||
				note.track >= 3 && nxt.track >= 3) {
				note.tailtype = 2;
				nxt.headtype = 2;
				note.endtrack = nxt.track;
				note.next = nxt.id;
				nxt.prev = note.id;
				break;
			}
		}
	}
}

output.notes = output.notes.filter((note) => { return !notesToRemove[note.id]; });

for (let bpm of chart.time) {
	let newbpm = {
		value: bpm.bpm,
		time: bpm.beat
	};
	newbpm.time[0]++;
	output.bpm.push(newbpm);
}

console.log(JSON.stringify(output));