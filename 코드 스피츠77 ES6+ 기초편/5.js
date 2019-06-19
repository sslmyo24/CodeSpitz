// block & nonblock / sync & async

// flow is blacking
for (const of (function* (){
	let i = 0;
	while (true) yield i++;
})()) console.log(i);

// blocking function : 점유하는 시간만큼 블록을 일으키는 함수
const f = v => {
	let i = 0;
	while (i++ < v);
	return i;
};
f(10); // 블로킹이 일어나지 않음
f(1000000000000000); // 블로킹이 일어남
// 인자 등에 의해 블로킹이 일어날 가능성이 있는 함수를 블로킹 함수라고 한다
// 배열순회, 정열 - 배열크기에 따라
// DOM순회 - DOM의 하위구조에 따라
// 이미지프로세싱 - 이미지크기에 따라
// 
// blocking evasion (블로킹 피하기)
// 독점적인 cpu점유로 인해 모든 동작이 정지됨
// 타임아웃체크에 의해 프로그램이 강제 중단됨
// 블록킹의 조합을 예측할 수 없음
const f = v => other(some(v), v * 2);
f(10);

// 시분할 운영체제의 동시 실행
// 1 2 3 => 1 2 1 2 3 1 2 1
// 
// time slicing
const looper (n, f) => {
	for (let i = 0; i < n; i++) f(i);
}
looper(10, console.log);
looper(10000000000000000000000000000, console.log); // 블로킹 함수

// time slicing manual
const looper = (n, f, slice = 3) => {
	let i = 0, limit = 0;
	const runner = _ => {
		while (i < n) {
			if (limit++ < slice) f(i++);
			else {
				limit = 0;
				requestAnimationFrame(runner);
				break;
			}
		}
	};
	requestAnimationFrame(runner);
}

// time slicing auto
const looper (n, f, ms = 5000, i = 0) => {
	let old = performance.now(), curr;
	const runner = _ => {
		while (i < n) {
			curr = performance.now();
			if (curr - old < ms) f(i++);
			else {
				old = curr;
				requestAnimationFrame(runner);
				break;
			}
		}
	};
	requestAnimationFrame(runner);
}

// web worker
const backRun = (f, end, ...arg) => {
	const blob = new Blob([`
		onmessage = e => postMessage((${f})(e.data));
	`], {type: 'text/javascript'});
	const url = URL.createObjectURL(blob);
	const worker = new Worker(url);
	worker.onmessage = e => end(e.data);
	worker.onerror = e => end(null);
}