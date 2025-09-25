
## Bean이란?
- 스프링 프레임워크가 생성 및 관리하는 클래스의 인스턴스 => 객체
- 타 객체와 다르게 Bean은 생성의 책임이 사용자에게 있지 않음

### 빈 스코프?
- 스프링 빈이 스프링 컨테이너의 시작과 함께 생성돼, 스프링 컨테이너가 종료될 때까지 유지된다고 알있었으나....
- 기본적으로 *싱글톤 스코프*로 생성되기 때문이었다
	- 직역 그대로, 빈이 존재할 수 있는 범위를 뜻함


- *싱글톤 스코프*
	- 기본으로 만들면, 스프링 컨테이너의 시작과 끝까지 유지되는 가장 넓은 범위의 스코프
- *프로토타입 스코프*
	- 프로토타입 빈의 생성과 의존관계 주입까지만 관여고 더는 관리하지 않는 매우 짧은  범위의 스코프
	- 이 프로토타입 스코프를 스프링 컨테이너에 조회하면, 스프링 컨테이너는 새로운 인스턴스를 만들어서 반환한다
- *웹  관련 스코프*
	- request : 웹 요청이 들어오고 나갈때 까지 유지되는 스코프
	- session : 웹 세션이 생성되고 종료될 때까지 유지되는 스코프
	- application: 웹의 서블릿 컨텍스트와 같은 범위로 유지되는 스코프


- 싱글톤 빈은 스프링 컨테이너가 관리함

```java
// 스프링 컨테이너 생성
ApplicationContext applicatoinContext = new AnnotationConfigApplicationContext(AppConfig.class);

```

- `ApplicationContext`는 스프링 컨테이너
- `ApplicationContext`는 인터페이스
- `AnnotationConfigApplicationContext`는 인터페이스의 구현체


1. `AppConfig.class` 에서 스프링 컨테이너 생성
2. 스프링 빈 저장소에 빈 이름, 빈 객체 HashTable 형태로 저장
3. 구성 정보 활용


- 엄밀히 말하면 BeanFactory와 ApplicationContext와 구분되나, 개발자가 BeanFactory를 직접 사용하진 않아서 사실상 `ApplicationContext`는 스프링 컨테이너



# 웹 스코프
- 웹 스코프는 웹 환경에서만 동작함
- 프로토타입과 다르게 스프링이 해당 스코프의 종료시점까지 관리하로, 종료 메서드 호출된다

- `request` : HTTP 요청 하나가 들어오고 나갈 때 까지 유지되는 스코프, 각각의 HTTP 요청마다 별도의 빈 인스턴스가 생성되고, 관리된다



### 말랑 RequestScope
@requestScope를 설명하기 위해서는 우선 Bean의 Scope에 대해서,  
그리고 singleton 스코프와, 그 외의 스코프를 함께 썼을때의 문제점에 대해 알아야 하며,  
이들을 해결하기 위한 방법인 proxyMode에 대해서 알아야 합니다.

먼저 Bean의 scope에는 `singleton`, `prototype`, `request` 등이 존재하는데요,  
singleton 스코프는 스프링 컨테이너의 시작부터 끝까지 유지되며, 싱글톤을 보장해주는 스코프입니다.  
request 스코프는 웹 요청이 들어오고, 나가는 순간까지 유지되는 스코프입니다.

우선 `@Component` 사용했을 때, 기본 등록되는 스코프는 singleton입니다.

singleton 스코프를 사용하는 빈에서 request 스코프를 사용하는 빈을 사용하는 경우, 의도는 다음과 같을 것입니다.

`singleton 스코프를 사용하는 빈은 애플리케이션에서 단 하나만 만들어서 재사용하고 싶은데, 이때 내부에서 사용되는 request 스코프의 빈은 요청 마다 새로 생성하고 쓰고 싶다!`

그런데 싱글톤 빈이 초기화될 때, request 타입의 빈은 아직 요청이 들어오지 않았기 때문에 생성되지 않은 상태이고, 따라서 오류가 발생하게 됨.

이를 위한 해결 방법으로 proxyMode를 사용할 수 있으나, 이는 실제 빈을 등록하는 것이 아니라, 가짜 프록시 빈을 주입해준 뒤, 실제 로직을 호출하는 순간에 getBean()을 통해서 등록된 실제 빈을 조회하여 사용하도록 구현되어 있음

따라서 싱글톤 스코프의 빈과 request 스코프의 빈을 같이 사용하기 위해서는 다음과 같이 코드를 작성해 주어야 합니다.

```java
@Scope(value = WebApplicationContext.SCOPE_REQUEST, 
proxyMode = ScopedProxyMode.TARGET_CLASS)
```

그런데 이는 조금 귀찮기 때문에, 스프링에서는 이들을 미리 정의해둔 `@RequestScope`를 사용한다

```java
@Scope(WebApplicationContext.SCOPE_REQUEST)
public @interface RequestScope {

	ScopedProxyMode proxyMode() default ScopedProxyMode.TARGET_CLASS;
}
```

즉 @ReuqestScope를 통해서 싱글톤 스코프의 빈과 request 스코프의 빈을 의도에 맞게 간편하게 사용할 수 있습니다.

ThreadLocal는 사용 이후 처리해주어야 하는 작업이 추가로 필요
