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
