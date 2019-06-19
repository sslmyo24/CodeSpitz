// label
// iteration set (자동 레이블 생성 O)
for (const i of [1,2,3,4]) {
	if (i === 3) break;
	log(i);
}

// label set (자동 레이블 생성 X)
abc: {
	console.log('a');
	//break; error iteration set이 아니기 때문에 자동으로 레이블이 생성 되지 않음
	if (location.href.includes('.com')) break abc;
	console.log('b');
}
console.log('c');

f:{
	f: //error 같은 함수 스코프 안에서는 같은 이름의 label을 생성할 수 없다.
	const func = () => {
		f: //label은 함수 스코프를 탄다
	}
}

k1:{
	let a = 3;
	const f = () => {
		let a = 5;
		k:{
			// break k1; error 함수 안에서는 함수 바깥의 레이블로 점프가 불가능하다
			break k;
			console.log(36);
		}
		console.log(a);
	}
	f();
}

// switch
switch (식) { // <= 특수 레이블 블럭 (중문 X)
	case 1: 식; [break]
	case 2: 식; [break]
	    :
	[default: 식]
}

// javascript에서 else if라는 문은 없다!!
if (c === 1) {

} else if (c === 2) {  // <= else 문 뒤에 if문이 들어온것

} else if (c === 3) {

}

//	   ||
//    \\//

if (c === 1) {

} else {
	if (c === 2) {

	} else {
		if (c === 3) {

		}
	}
}

// switch 와 else if 문의 차이
// switch는 병행 조건일 때
// else if는 병행 조건이 아닐 때

'', false, 0, undefined, null, NaN // falsy
for (선언식; 조건식; 증감식) {

}
선언식: 선언문, 식, 공문
조건식: 식, 공문,  truthy(falsy가 아닌 것)일 때 실행
증감식: 식, 공문

for (;;) { // <= 무한 루프가 됨  why? 공문은 falsy이지만 for안의 조건식에서는 truthy로 평가됨

}

while (a) {
	let r = other.action();
	a = act.method().c; // 조건식 안에 나오는 것은 실행문 안에 무조건 존재하게 하여라
	if (r === 'abc') a = false;
}