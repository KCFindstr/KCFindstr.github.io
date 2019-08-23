import config from './config.js';
import bgcreate from './bgcreate.js';
import game from './index.js';
import TrackManager from './track.js';
import chartLoader from './chartloader.js';
import TouchManager from './touch.js';
import ScoreManager from './score.js';

export default {
	preload: function() {
		game.scene = this;
		// Init Chart
		game.chart = this.cache.json.get('chart_data');
		chartLoader(game.chart);
		game.chart.range = config.MAXRANGE / config.speed;
		// tap sound
		game.tapse = game.scene.sound.add('se_tap');
		// Track Manager
		game.trackManager = new TrackManager(this);
		// Touch Manager
		game.touchManager = new TouchManager(this);
		// Score Manager
		game.scoreManager = new ScoreManager(this);
	},
	create: function() {
		bgcreate.apply(this);
		game.bgm = this.sound.add('bgm');
	},
	update: function() {
		game.trackManager.updateVisibleNotes();
		game.scoreManager.update();
	}
};