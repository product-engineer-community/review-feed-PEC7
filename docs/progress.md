# 작업 진행 상황

## 2024-04-10

### 시작

- [x] docs 폴더 생성
- [x] plan.md 생성
- [x] progress.md 생성
- [x] project-structure.md 생성
- [x] plan.md 업데이트 (세그먼트 정의 작업 추가)
- [x] progress.md 업데이트
- [x] project-structure.md 업데이트 (팀 구조 반영)
- [x] segment-structure.md 삭제 (project-structure.md에 통합)
- [x] plan.md 업데이트 (파일 추적 규칙 및 작업 진행 규칙 추가)
- [x] plan.md 업데이트 (feed 엔티티 구조 정의)
- [x] src/entities/feed 구조 생성 및 기본 파일 구현
- [x] pnpm 패키지 매니저 설정 및 의존성 설치
- [x] project-structure.md 기반 기본 디렉토리 구조 생성
- [x] 빈 디렉토리에 .gitkeep 파일 추가
- [x] Next.js 기본 설정 파일 추가 (next.config.js, app 디렉토리)
- [x] ESLint, Prettier 설정 추가
- [x] Tailwind CSS 설정 추가
- [x] Supabase MCP 서버 설정 (.cursor/mcp.json)
- [x] Logo 컴포넌트 텍스트 버전으로 수정
- [x] Feed 엔티티 기본 구현
  - Feed 타입 정의 (model/types.ts)
  - FeedItem 컴포넌트 구현 (ui/feed-item.tsx)
  - Feed 모델 함수 구현 (model/feed-model.ts)
- [x] Feed UI 개선
  - 2열 그리드 레이아웃 구현
  - 이미지 위 정보 오버레이 추가 (별점, 리뷰, 식당명)
  - 그라데이션 오버레이 적용
  - 메인 페이지 레이아웃 정리
- [x] 메인 페이지 UI 정리
  - 타이틀 및 배경색 제거
  - 불필요한 스타일링 제거
  - 그리드 레이아웃 최적화
- [x] Feed 아이템 스타일 개선
  - 텍스트 색상 흰색으로 복원
  - 가독성 향상을 위한 투명도 조정
- [x] 네비게이션 구현
  - Nav 컴포넌트 생성
  - 남색 배경색 적용
  - 레이아웃에 네비게이션 추가

### 진행 중

- [ ] 맡은 기능 분석
- [ ] 세그먼트 구조 설계
- [ ] 기본 디렉토리 구조 설정
- [ ] 설정 파일 구성
- [ ] 기본 컴포넌트 구조 설정
- [ ] 문서화

### 완료

- [x] 프로젝트 구조 문서화
- [x] 파일 추적 규칙 정의
- [x] 작업 진행 규칙 정의
- [x] feed 엔티티 구조 정의
- [x] feed 엔티티 기본 구현
  - Feed 인터페이스 정의
  - FeedItem 컴포넌트 구현
  - 피드 데이터 모델 구현
- [x] 패키지 매니저 설정
- [x] 기본 디렉토리 구조 생성
- [x] 빈 디렉토리 git 관리 설정
- [x] 프로젝트 기본 설정 완료
- [x] Supabase MCP 설정
- [x] Logo 컴포넌트 수정
- [x] Feed UI 개선
  - 2열 그리드 레이아웃
  - 이미지 오버레이 디자인
  - 메인 페이지 구조 개선

### Feed 이미지 컴포넌트 개선

- [x] Next.js Image 컴포넌트 적용

  - next.config.js에 외부 이미지 도메인 설정 추가
  - img 태그를 Next/Image 컴포넌트로 교체
  - 이미지 크기 및 최적화 설정 적용
  - sizes 속성으로 반응형 이미지 설정

- [x] 에러 처리 구현

  - 이미지 로딩 실패 시 대체 이미지 표시
  - 이미지 URL이 없는 경우 기본 이미지 표시
  - 스켈레톤 UI로 로딩 상태 표시
  - 에러 메시지 오버레이 추가

- [x] 성능 최적화
  - lazy loading 설정 (priority: false)
  - 로딩 중 스켈레톤 UI
  - 부드러운 페이드 인 효과
  - sizes 속성으로 반응형 최적화

### 절대 경로 설정 구현

- [x] TypeScript 설정 확인

  - baseUrl과 paths가 이미 올바르게 설정되어 있음 확인
  - @/_ -> src/_ 별칭 설정 확인

- [x] 코드 리팩토링
  - feed-item.tsx의 상대 경로를 절대 경로로 변경
  - Feed 타입과 FeedImage 컴포넌트 import 경로 수정
  - index.ts의 export 문을 절대 경로로 변경
  - 일관된 import/export 문 스타일 적용

### 다음 작업

1. 다른 컴포넌트들의 import 문도 절대 경로로 통일 (필요한 경우)
2. import 경로 스타일 가이드 문서화

## 2024-03-XX

### Feed 엔티티 업데이트

- Feed 엔티티의 책임을 명확히 분리
  - 좋아요 관련 기능을 Favorite 엔티티로 이동 예정
  - Feed 엔티티는 피드의 기본 정보와 표시만 담당

#### 변경사항

1. `model/types.ts`

   - Feed 인터페이스에서 좋아요 관련 필드 제거 (likeCount, isLiked)
   - FeedLikeResponse 인터페이스 제거 (Favorite 엔티티로 이동 예정)

2. `ui/feed-item.tsx`
   - 좋아요 버튼 및 관련 로직 제거
   - 피드 아이템의 기본 레이아웃 유지
   - 이미지, 별점, 리뷰 텍스트, 식당 이름 표시 기능 유지

### Feed 엔티티 구현

- [x] Feed 타입 정의
  - id, title, image_url, created_at 필드 포함
  - rating, review_text, restaurant_name 필드 추가
- [x] Feed UI 구현
  - 이미지 오버레이에 별점, 리뷰, 레스토랑 이름 표시
  - 그라데이션 효과로 텍스트 가독성 향상
- [x] Feed 데이터 조회 API 구현
  - Supabase에서 feeds 테이블 데이터 조회
  - created_at 기준 내림차순 정렬
  - 에러 핸들링 추가

### 파일 네이밍 컨벤션 적용

- [x] UI 컴포넌트 파일명 케밥 케이스로 통일
  - Logo.tsx -> logo.tsx
  - ExternalLink.tsx -> external-link.tsx
- [x] import 경로 수정
  - nav.tsx와 layout.tsx의 import 경로 업데이트

### FeedImage 컴포넌트 최적화

- [x] 컴포넌트 구조 개선

  - 클라이언트 상태(useState) 제거
  - 컴포넌트를 더 작은 단위로 분리
  - Error Boundary 컴포넌트 구현
  - 스켈레톤 UI 컴포넌트 분리

- [x] Suspense 통합

  - 이미지 로딩 상태를 Suspense로 처리
  - FeedImageSkeleton을 fallback으로 사용
  - 불필요한 상태 관리 제거

- [x] Error Boundary 적용
  - FeedImageErrorBoundary 컴포넌트 구현
  - 이미지 로드 실패 시 폴백 UI 표시
  - 선언적 에러 처리 구현

### 다음 작업

1. 다른 컴포넌트들의 import 문도 절대 경로로 통일 (필요한 경우)
2. import 경로 스타일 가이드 문서화
3. 이미지 로딩 성능 모니터링
