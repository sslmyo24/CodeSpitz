why did you do that?
철학 : 합리주의 vs 상대주의
가치 - 의사소통
	 - 단순함
	 - 유연함
원칙 (원칙의 가치는 예외에서 발생, 예외가 생길 시 바로 알 수 있다)
	 - 지역화
	 - 중복제거
	 - 대칭성
패턴 (선배들의 말은 귀담아 들을만 하다)
	 - 개발론
	 - 설계론
	 - 각종 적용 패턴
동기 : 돈, 시간


PROGRAM & TIMING

COMPILE 언어 생명 주기                      TIMING
LANGUAGE CODE                             LINT TIME
(프로그래밍 언어로 짜여진 텍스트 파일을 만듬)
MACHINE LANGUAGE 						 COMPILE TIME
(컴파일하여 기계어로 바뀜)
FILE
LOAD
(메모리에 로드됨,
이 시점에서 메모리에 적제된 것이 프로그램이다)
RUN 										 RUN TIME
TERMINATE (종료)

SCRIPT 언어 생명 주기          TIMING
LANGUAGE CODE                LINT TIME
FILE
LOAD
MACHINE LANGUAGE
RUN 						    RUN TIME
TERMINATE

RUNTIME

COMPILE 언어
ESSENTIAL DEFINTION LOADING
VTABLE MAPPING
LOADING (메모리에 명령과 값이 나눠져서 적재됨)
RUN {
	INSSTRUCTION FETCH & DECODING
	외부 인터페이스에서 명령을 cpu에 성능에 맞게 패치하고
	제어유닛에서 디코더가 cpu가 알아 들을 수 있는 언어로 디코딩함
	값은 데어터유닛에 적재된다
	EXECUTION
	디코딩된 명령이 연산유닛으로 가서 실행햐고
	결과로 나온 값은 데어터유닛에 적재되었다가 메모리가 간다
	명령을 다 소비할 때까지 반복 된다	
}
RUNTIME DEFINTION LOADING

SCRIPT 언어 (RUNTIME을 레이어로 나누어서 관리)
RUN {
	DECLARE BASE FUNCTION, CLASS
	        STATIC TIME
    ----------------------------
	         RUN TIME
  DECLARE EXTENDED FUNCTION, CLASS
	        STATIC TIME
    ----------------------------
	         RUN TIME
	    USE RUNCTION, CLASS
}

LANGUAGE ELEMENT
STATEMENTS 문 (메모리에서 처리하고 나면 사라짐, 실행기한테 주는 힌트)
공문, 식문, 제어문, 선언문         단문, 중문

EXPRESSION 식 (값이다)
값식, 연산식, 호출식

IDENTIFIER 식별자 (대부분 변수)
기본형, 참조형                 변수, 상수