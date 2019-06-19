// interface
// 1. 인터페이스란 사양에 맞는 값과 연결된 속성키의 셋트
// 2. 어떤 Object라도 인터페이스의 정의를 충족시킬 수 있다.
// 3. 하나의 Object는 여러개의 인터페이스를 충족시킬 수 있다.
// ex) interface test
// 		1. test라는 키를 갖고
// 		2. 값으로 문자열 인자를 1개 받아 boolean결과를 반환하는 함수가 온다.
{
	test(str){return true;}
}

// iterator interface
// 1. next라는 키를 갖고
// 2. 값으로 인자를 받지 않고 IteratorResultObject를 반환하느 함수가 온다.
// 3. IteratorResultObject는 value와 done이라는 키를 갖고 있다.
// 4. 이 중 done은 계속 반복할 수 있을지 없을지에 따라 boolean값을 반환한다.
{
	next () {
		return {value:1, done:false};
	}
}

{
 	data:[1,2,3,4],
 	next () {
 		return {
 			done:this.data.length == 0,
 			value:console.log(this.data.pop())
 		}
	}
}
// iterable interface
// 1. Symbol.iterator라는 키를 갖고
// 2. 값으로 인자를 받지 않고 iterator Object를 반환하는 함수가 온다.
{
	[Symbol.iterator] () {
		return {
			next () {
				return {value:1, done:false};
			}
		};
	}
}

// 문의 특징: 실행이 끝나면 메모리에서 사라진다.
// 따라서, 문을 식으로 바꾸어 저장가능하게 만들자!
// 
// while문으로 살펴보는 iterator

let arr = [1,2,3,4];
while (arr.length > 0) {
	console.log(arr.pop());
}
// while( 계속 반복할지 판단 ) {
// 		반복시마다 처리할 것
// }
//			||
//			\/
		
//   iterator interface
{
	arr:[1,2,3,4],
	next () {
		return {
			done:this.arr.length == 0, // 계속 반복할지 판단 (값으로 봄)
			value:console.log(this.arr.pop()) // 반복시마다 처리할 것
		};
	}
}

// 사용자 반복처리기
// 직접 iterator 반복처리기를 구현

const loop = (iter, f) => {

	// iterable이라면 iterator를 얻음
	if (typeof iter[Symbol.iterator] == 'function') {
		iter = iter[Symbol.iterator]();
	} else return;

	if (typeof iter.next != 'function') return;

	do {
		const v = iter.next();
		if (v.done) return; // 종료처리
		f(v.value);
	} while (true);
}

const iter = {
	arr:[1,2,3,4],
	[Symbol.iterator] () {return this;},
	next () {
		return {
			done:this.arr.length == 0,
			value:this.arr.pop()
		};
	}
};

loop(iter, console.log);

// 내장반복처리기
 
// Array destructuring (배열해체)
const [a,...b] = iter;
console.log(a, b);
// 4, [3,2,1]

// Spread (펼치기)
const a = [...iter];
console.log(a);
// [4,3,2,1]

// Rest Parameter (나머지 인자)
const test = (...args) => console.log(args);
test(...iter);
// [4,3,2,1]

const N2 = class {
	constructor (max) {
		this.max = max;
	}
	[Symbol.iterator] () {
		let cursor = 0, max = this.max;
		return {
			done:false,
			next () {
				if (cursor > max) {
					this.done = true;
				} else {
					this.value = cursor * cursor;
					cursor++;
				}
				return this;
			}
		};
	}
};

console.log([...new N2(4)]);

const generator = function* (max) {
	let cursor = 0;
	while (cursor < max) {
		yield cursor * cursor; // 서스펜션이 일어남
		cursor++;
	}
};
