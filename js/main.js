const main = document.querySelector('main');
const numbers = main.querySelectorAll('.screen span');
const [am, pm] = main.querySelectorAll('.screen em');
const menus = document.querySelectorAll('.nav li');
let isAuto = true;
let timer;

if (isAuto) {
	timer = setInterval(() => {
		changeTheme();
		const times = getTime();
		times.forEach((num, idx) => setTime(num, idx));
	}, 1000);
} else {
	clearInterval(timer);
}

menus.forEach((menu) => {
	menu.addEventListener('click', (e) => {
		menus.forEach((menu) => menu.classList.remove('on'));
		e.target.classList.add('on');
		main.className = '';
		main.classList.add(e.target.innerText.toLowerCase());
		isAuto = false;
		clearInterval(timer);
	});
});

function changeTheme() {
	const hr = new Date().getHours();

	const data = [
		{ cond: hr >= 5 && hr < 12, name: 'morning' },
		{ cond: hr >= 12 && hr < 16, name: 'afternoon' },
		{ cond: hr >= 16 && hr < 19, name: 'evening' },
		{ cond: hr >= 19 || hr < 5, name: 'night' },
	];

	data.forEach((item) => {
		if (item.cond) {
			main.className = '';
			main.classList.add(item.name);
			main.querySelector('h1 strong').innerText =
				item.name.charAt(0).toUpperCase() + item.name.slice(1);
		}
	});
	let isDark = main.classList.contains('afternoon');
	main.classList.add(isDark ? 'dark' : null);
}

function getTime() {
	const now = new Date();
	let hr = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();

	if (hr > 12) {
		am.classList.remove('on');
		pm.classList.add('on');
		hr = hr - 12;
	} else {
		am.classList.add('on');
		pm.classList.remove('on');
	}
	return [hr, min, sec];
}

function setTime(num, index) {
	if (num < 10) num = '0' + num;
	else num = num;
	numbers[index].innerText = num;
}
