# 프로젝트 구조 문서

## 디렉토리 구조

```
.
├── app
│   ├── (feed)
│   │   ├── [id]
│   │   │   ├── @modal
│   │   │   │   └── share
│   │   │   │       └── page.tsx
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── _providers
│   │   └── index.ts
│   ├── _styles
│   │   └── index.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── profile
│       ├── layout.tsx
│       └── page.tsx
├── entities
│   ├── auth
│   │   └── index.ts
│   ├── favorite
│   │   └── index.ts
│   ├── feed
│   │   └── index.ts
│   ├── geolocation
│   │   └── index.ts
│   ├── profile
│   │   └── index.ts
│   ├── restaurant
│   │   └── index.ts
│   ├── review
│   │   └── index.ts
│   └── share
│       └── index.ts
├── features
│   ├── auth
│   │   └── index.ts
│   ├── favorite
│   │   └── index.ts
│   └── search
│       └── index.ts
├── shared
│   ├── api
│   │   └── index.ts
│   ├── config
│   │   ├── constants.ts
│   │   ├── http-client.ts
│   │   └── index.ts
│   ├── hooks
│   │   └── index.ts
│   ├── lib
│   │   └── index.ts
│   ├── types
│   │   └── index.ts
│   └── ui
│       └── index.ts
└── widgets
    ├── bottom-navagation
    │   └── index.ts
    └── header
        └── index.ts
```

## 레이어 설명

### app

- Next.js App Router 기반의 페이지 및 레이아웃
- 라우팅 설정
- 글로벌 레이아웃
- 페이지별 레이아웃
- 모달 페이지

### entities

- 비즈니스 엔티티 정의
- 데이터 모델
- 타입 정의
- 각 엔티티는 독립적으로 존재하며 재사용 가능

### features

- 사용자 인터랙션과 관련된 기능
- 비즈니스 로직 처리
- 상태 관리
- 인증, 즐겨찾기, 검색 등의 기능

### shared

- 공통으로 사용되는 유틸리티
- API 통신 로직
- 설정 및 상수
- 공통 훅
- 공통 타입
- 공통 UI 컴포넌트

### widgets

- 복합 컴포넌트
- 페이지 레이아웃 구성요소
- 독립적인 기능 블록
- 하단 네비게이션, 헤더 등의 위젯

## 맡은 기능 세그먼트 구조

### 리뷰 피드 기능 (features/review-feed)

```
review-feed/
├── api/                # API 통신 로직
│   ├── index.ts
│   └── review-feed.ts
├── model/              # 비즈니스 로직
│   ├── index.ts
│   └── types.ts
├── ui/                 # UI 컴포넌트
│   ├── index.ts
│   ├── ReviewFeed.tsx
│   └── ReviewCard.tsx
└── index.ts            # Public API
```

### 리뷰 작성 기능 (features/review-create)

```
review-create/
├── api/                # API 통신 로직
│   ├── index.ts
│   └── review-create.ts
├── model/              # 비즈니스 로직
│   ├── index.ts
│   └── types.ts
├── ui/                 # UI 컴포넌트
│   ├── index.ts
│   ├── ReviewForm.tsx
│   └── ReviewEditor.tsx
└── index.ts            # Public API
```

### 리뷰 상세 보기 기능 (features/review-detail)

```
review-detail/
├── api/                # API 통신 로직
│   ├── index.ts
│   └── review-detail.ts
├── model/              # 비즈니스 로직
│   ├── index.ts
│   └── types.ts
├── ui/                 # UI 컴포넌트
│   ├── index.ts
│   ├── ReviewDetail.tsx
│   └── ReviewContent.tsx
└── index.ts            # Public API
```

### 리뷰 수정/삭제 기능 (features/review-edit)

```
review-edit/
├── api/                # API 통신 로직
│   ├── index.ts
│   └── review-edit.ts
├── model/              # 비즈니스 로직
│   ├── index.ts
│   └── types.ts
├── ui/                 # UI 컴포넌트
│   ├── index.ts
│   ├── ReviewEditForm.tsx
│   └── ReviewDeleteConfirm.tsx
└── index.ts            # Public API
```

## 공통 엔티티 (entities/review)

```
review/
├── api/                # API 통신 로직
│   ├── index.ts
│   └── review.ts
├── model/              # 비즈니스 로직
│   ├── index.ts
│   └── types.ts
├── ui/                 # UI 컴포넌트
│   ├── index.ts
│   └── ReviewItem.tsx
└── index.ts            # Public API
```

## 공통 위젯 (widgets/review-list)

```
review-list/
├── api/                # API 통신 로직
│   ├── index.ts
│   └── review-list.ts
├── model/              # 비즈니스 로직
│   ├── index.ts
│   └── types.ts
├── ui/                 # UI 컴포넌트
│   ├── index.ts
│   └── ReviewList.tsx
└── index.ts            # Public API
```
