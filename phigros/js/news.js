const LoaderStates = {
	READY: 0,
	LOADING: 1,
	FAILED: 2,
	FULL: 3
};

function makeFakeNews(id) {
	return {
		id: id,
		title: 'Phigros将于8月31日公测！',
		abstract: '鸽游新视频发布，游戏内容更新。' + id,
		date: '2019/08/20',
		image: 'img/pigeon-logo.jpg'
	}
}

function loadNews(maxid, cnt) {
	let ret = {
		results: [],
		end: false
	};
	if (maxid <= 0) {
		ret.end = true;
		return ret;
	}
	for (let i = 0; i < cnt; i++) {
		ret.results.push(makeFakeNews(--maxid));
	}
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() <= 0.1) {
				reject({ error: 'Some random errors.' });
			}
			resolve(ret);
		}, 1000);
	});
}

async function updateNewsOnScroll(force) {
	if (vdata.loaderState != LoaderStates.READY && !force) {
		return;
	}
	let el = $('#loader');
	let position = $(window).scrollTop() + $(window).height();
	let bottom = el.offset().top + el.outerHeight(true);
	if (position >= bottom + 50 || force) {
		// trigger scroll
		vdata.loaderState = LoaderStates.LOADING;
		let maxid = vdata.maxid == undefined ? 20 : vdata.maxid;
		let news = null;
		try {
			news = await loadNews(maxid, 5);
		} catch (e) {
			vdata.loaderState = LoaderStates.FAILED;
			return;
		}
		vdata.contents = vdata.contents.concat(news.results);
		let l = vdata.contents.length;
		vdata.maxid = l ? vdata.contents[l-1].id : maxid;
		vdata.loaderState = news.end ? LoaderStates.FULL : LoaderStates.READY;
	}
}

$(document).ready(async () => {
	Vue.config.ignoredElements = ['ion-icon'];
	vdata = new Vue({
		el: '#vue-app',
		data: {
			LoaderStates: LoaderStates,
			loaderState: LoaderStates.READY,
			contents: []
		}
	});
	// infinite scroll listener
	window.onscroll = () => updateNewsOnScroll(false);
	await updateNewsOnScroll(true);
});