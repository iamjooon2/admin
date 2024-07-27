## 스트림
- 데이터 처리 연산을 지원하도록 소스에서 추출된 연속된 요소
- 스트림의 중요 특징?
  - 파이프라이닝 → 대부분의 스트림 연산은 스트림 연산끼리 연결할 수 있도록 스트림 자신을 반환한다
  - 내부 반복

### 필터링
- `filter()` → `Predicate`를 받아 필터링
- `distinct()` → 중복 필터링 가능

### 스트림 슬라이싱
- `takeWhile()`, `dropWhile()` → 요소 선택
- `limit()` → 축소
- `skip()` → 요소를 건너뛴다

### 매칭
- 매칭의 경우 스트림 쇼트서킷 기법을 사용
- `anyMatch()` → 적어도 한 요소와 일치하는지 확인
- `allMatch()` → 모든 요소가 일치하는지 확인한다
- `nonMatch()` → 일치하는 요소가 없는지 확인한다

### 매핑

- `map()` → 요소를 변환
- `flatMap()` → 스트림 평면화 - Stream<>을 제거

> 쇼트서킷
전체 스트림을 처리하지 않았더라도 결과를 반환하는 것이다. ||, && 연산인 셈.

### 검색

- `findAny()` → 현재 스트림에서 임의의 요소를 반환
- `findFirst()` → 첫번째 요소를 반환

> 병렬 실행에서는 순서를 찾아 첫번째 요소를 찾기 어렵다. 때문에 제약이 비교적 적은 `findAny()`를 사용한다.


### 리듀싱

- `reduce()` → 모든 스트림 요소를 처리해서 값으로 도출하는 연산

### 컬렉터(Collectors)

- `minBy(),` `maxBy()` → 최소, 최대값을 반환
- `toList()`, `toMap()`, `toSet()` 각각의 컬렉션 타입을 반환
- `summeringInt()`, `averagingInt()`, `summarizingInt()`→ 합, 평균, 요약 연산
    - Int, Long, Double 연산 존재
- `joining()` → 문자열을 연결한다 연결
- `reducing()` → 범용 리듀싱 요약 연산
    - 첫 번째 인수 → 리듀싱 연산의 시작값이거나, 스트림에 인수가 없는 경우 반환값
    - 두 번째 인수 → 변환 함수
    - 세 번째 인수 → 같은 종류의 두 항목을 하나의 값으로 더하는 op
- Java 16부터는 Stream.toList()가 생겼다. `Collectors.toUnmodifableList()`와 동일

> collect와 reduce
가변 컨테이너 관련 작업인 동시에 병렬성을 확보하려면, collect 메서드로 리듀싱 연산을 구현하는 것이 바람직

> 
- `groupingBy()` → 그룹화, 메서드 참조나 람다 표현식으로 구현 가능
    - + filtering → Predicate를 인수로 받아 각 그룹의 요소와 필터링 된 요소를 재그룹화 가능
    - + mapping → 요소를 변환하는 작업 가능
    - + flatMapping → 평면화한다
- `partitioningBy()` → Predicate를 받아 분할
