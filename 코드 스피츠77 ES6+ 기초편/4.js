// ABSTRACT LOOP (루프 추상화) & LAZY EXECUTION (지연 실행)
// 
// 단순한 배열을 루프인 경우는 간단히 이터레이션을 작성할 수 있음.
{
	[Symbol.iterator] () {return this;},
	data:[1,2,3,4],
	next () {
		return {
			done:this.data.length == 0,
			value:this.data.shift()
		};
	}
};

// 복잡한 다층형 그래프는 어떻게 이터레이션할 것인가?
{
	[Symbol.iterator] () {return this;},
	data:[{a:[1,2,3,4], b:'-'}, [5,6,7], 8, 9],
	next () {
		return ...;
	}
}

{
	[Symbol.iterator] () {return this;},
	data:[{a:[1,2,3,4], b:'-'}, [5,6,7], 8, 9],
	next () {
		let v;
		while (v = this.data.shift()) {
			switch (true) {
				case Array.isArray(v):
					this.data.unshift(...v);
					break;
				case v && typeof v == 'object':
					for (var k in v) if (v.hasOwnProperty(v[k])) this.data.unshift(v[k]);
					break;
				default:
					return {value:v, done:false};
			}
		}
		return {done:true};
	}
}

{
	[Symbol.iterator] () {return this;},
	data:[{a:[1,2,3,4], b:'-'}, [5,6,7], 8, 9],
	next () {
		let v;
		while (v = this.data.shift()) {
			if (!v && !(v instanceof Object)) return {value:v};
			if (!Array.isArray(v)) v = Object.values(v);
			this.data.unshift(...v);
		}
		return {done:true};
	}
}

const Compx = class {
	constructor (data) {this.data = data;}
	[Symbol.iterator] () {
		const data = JSON.parse(JSON.stringify(this.data));
		return {
			next () {
				let v;
				while (v = data.shift()) {
					if (!v && !(v instanceof Object)) return {value:v};
					if (!Array.isArray(v)) v = Object.values(v);
					data.unshift(...v);
				}
				return {done:true};
			}
		}
	}
}