# 프로젝트 구조 설정 계획

## 목표

- FSD 아키텍처에 따른 프로젝트 구조 설정
- 필요한 디렉토리 및 파일 구조 생성
- 기본 설정 파일 구성
- 맡은 기능에 대한 세그먼트 정의

## 작업 항목

1. 기본 디렉토리 구조 설정

   - app/
   - features/
   - entities/
   - shared/
   - widgets/
   - config/

2. 설정 파일 구성

   - tsconfig.json
   - tailwind.config.js
   - next.config.js
   - .env.development

3. 기본 컴포넌트 구조 설정

   - shared/ui/
   - shared/hooks/
   - shared/api/

4. 세그먼트 정의

   - 맡은 기능 분석
   - 세그먼트 구조 설계
   - 세그먼트 문서화

5. Feed 엔티티 UI 개선

   - 2열 그리드 레이아웃 구현 (한 행에 2개씩, 총 6개 표시)
   - 이미지 위에 정보 오버레이 추가
     - 별점
     - 대표 리뷰 텍스트
     - 음식점 이름
   - 그라데이션 오버레이로 텍스트 가독성 개선
   - 메인 페이지 레이아웃 정리
     - 순수 main 태그 사용
     - 스타일은 컨테이너에서 관리

6. 문서화
   - README.md 업데이트
   - 각 레이어별 설명 문서 작성
   - 세그먼트 구조 문서 작성

## 엔티티 구조 정의

### Feed

- 책임: 피드의 기본 정보와 표시를 담당
- 구조:
  ```
  feed/
  ├── model/
  │   ├── types.ts         # Feed 타입 정의
  │   ├── feed-model.ts    # Feed 관련 모델 함수
  │   └── index.ts         # Public API
  └── ui/
      ├── feed-item.tsx    # 피드 아이템 컴포넌트
      └── index.ts         # Public API
  ```
- 데이터 구조:
  - Feed
    - id: string
    - content: string
    - createdAt: string
    - userId: string
    - imageUrl: string
    - rating: number
    - reviewText: string
    - restaurantName: string

### Favorite (예정)

- 책임: 피드의 좋아요 기능을 담당
- 구조: TBD

## 파일 추적 규칙

- plan.md: 작업 계획 및 변경사항 정의
- progress.md: 작업 진행 상황 및 완료된 작업 기록
- TODO.txt: 다음 작업 목록 관리
- context-summary.md: 컨텍스트 리셋 백업
- docs/[component].md: 기능별 문서화

## 파일 네이밍 컨벤션

1. 파일 및 디렉토리 이름

   - 모든 파일과 디렉토리 이름은 케밥 케이스(kebab-case) 사용
   - 예: `feed-item.tsx`, `auth-button.tsx`, `external-link.tsx`

2. 컴포넌트 이름

   - 컴포넌트는 파스칼 케이스(PascalCase) 사용
   - 예: `FeedItem`, `AuthButton`, `ExternalLink`

3. 변수 및 함수 이름

   - 카멜 케이스(camelCase) 사용
   - 예: `getFeedList`, `useAuthState`

4. 타입 및 인터페이스
   - 파스칼 케이스(PascalCase) 사용
   - 예: `FeedProps`, `AuthState`

## 작업 진행 규칙

1. 계획 단계

   - plan.md에 작업 계획 작성
   - 작업 항목 및 예상 소요 시간 정의
   - 필요한 파일 추적 규칙 정의

2. 실행 단계

   - progress.md에 현재 작업 상태 기록
   - 작업 완료 시 progress.md 업데이트
   - 다음 작업 항목 확인

3. 문서화 단계
   - 작업 완료 후 관련 문서 업데이트
   - 변경사항 기록
   - 다음 작업을 위한 TODO.txt 업데이트

## 예상 소요 시간

- 기본 구조 설정: 1시간
- 설정 파일 구성: 30분
- 기본 컴포넌트 구조: 1시간
- 세그먼트 정의: 2시간
- 문서화: 30분

총 예상 시간: 5시간

## FeedImage 컴포넌트 최적화 계획

### 목표

- 클라이언트 상태 관리 최소화
- Next.js의 Suspense와 Error Boundary 활용
- 이미지 로딩/에러 처리의 선언적 구현

### 작업 항목

1. 컴포넌트 구조 개선

   - FeedImage 래퍼 컴포넌트를 서버 컴포넌트로 변경
   - 클라이언트 상태(useState) 제거
   - Suspense와 Error Boundary 적용

2. 로딩 처리

   - Suspense fallback으로 스켈레톤 UI 구현
   - 이미지 로딩 상태를 Suspense에 위임

3. 에러 처리
   - Error Boundary로 이미지 로드 실패 처리
   - 폴백 이미지 표시 로직 개선

### 예상 소요 시간

- 컴포넌트 구조 변경: 20분
- Suspense 통합: 20분
- Error Boundary 구현: 20분

총 예상 시간: 1시간

## 절대 경로(Absolute Imports) 설정 계획

### 목표

- TypeScript와 Next.js에서 절대 경로 임포트 지원
- 일관된 임포트 경로 규칙 수립
- 더 나은 코드 가독성과 유지보수성 확보

### 작업 항목

1. TypeScript 설정

   - tsconfig.json에 baseUrl 설정
   - paths 별칭 설정 (@/_ -> src/_)
   - 컴파일러 옵션 확인 및 수정

2. Next.js 설정

   - next.config.js 확인
   - 필요한 경우 추가 설정 적용

3. 기존 코드 리팩토링

   - 상대 경로를 절대 경로로 변경
   - 일관된 import 문 스타일 적용
   - 영향받는 파일들 확인 및 수정

4. 문서화
   - 절대 경로 사용 가이드라인 추가
   - 팀 컨벤션 업데이트

### 예상 소요 시간

- TypeScript/Next.js 설정: 15분
- 코드 리팩토링: 30분
- 문서화: 15분

총 예상 시간: 1시간

## Next.js 14 최적화된 에러 처리 계획

### 목표

- Next.js 14의 최신 기능 활용
- 서버 컴포넌트 기반 에러 처리
- 클래스 컴포넌트 의존성 제거

### 작업 항목

1. 에러 처리 아키텍처 변경

   - error.tsx를 사용한 서버 사이드 에러 처리
   - React Suspense와 통합
   - 클라이언트 상태 최소화

2. 컴포넌트 구조 개선

   - 이미지 컴포넌트를 서버 컴포넌트로 변경
   - error.tsx로 에러 처리 위임
   - loading.tsx 추가로 로딩 상태 처리

3. 성능 최적화
   - 서버 사이드 렌더링 활용
   - 클라이언트 번들 크기 감소
   - 하이드레이션 최적화

### 예상 소요 시간

- 아키텍처 변경: 30분
- 컴포넌트 재구현: 30분
- 테스트 및 최적화: 30분

총 예상 시간: 1.5시간
