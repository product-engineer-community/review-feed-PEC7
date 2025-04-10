# 🧑‍🏭 Coding Preferences – "Write Code Like This"

## Design Principles

- ✅ **Simplicity First** – Start with the simplest possible approach.
- ✅ **Respect FSD Structure** – Do not create folders outside `features`, `entities`, `shared`, `widgets`, `app`.
- ✅ **Separation of Concerns** – Place UI in `ui/`, logic in `model/`, and API calls in `api/`.
- ✅ **DRY** – Extract duplicate code into `shared` or `entities`.
- ✅ **Modular** – Keep files under 200–300 lines when possible.
- ✅ **Public API Only via `index.ts`** – All external access must go through `index.ts`.
- ✅ **Documentation** – Summarize major components in `/docs/[component].md`.
- ✅ **Naming Convention** – Use kebab-case for folder and file names.
- ✅ **App Structure** – Manage both app and pages within the app directory.
- ✅ **Configuration** – Use `config` folder for constants and configurations.
- ✅ **Shared Resources** – Place shared hooks in `shared/hooks`.
- ✅ **UI Components** – Use `ui` instead of `components` for component folders.
- ✅ **Feature Structure** – Each feature should have api, model, query, hook, and ui folders.
- ✅ **Business Logic Separation** – React-related business logic in hooks, other business logic in models.

### FSD Structure

#### 1. Layer Structure Principles

- **Upward Dependencies**: Upper layers can only depend on lower layers (app → widgets → features → entities → shared)
- **Lower Layer Independence**: Lower layers don't know about upper layers
- **No Horizontal Dependencies**: Different slices within the same layer cannot depend on each other
- app: This layer integrates both the traditional app layer and pages layer into a single structure. When using the Next.js App Router, it helps avoid folder name conflicts by containing both the app and pages layers (as defined in F.S.D) within the app directory.
- widgets: A layer that composes reusable UI blocks by combining features, entities, and shared components, focusing on layout and presentation rather than logic.
- features: A layer that implements domain-specific actions and business logic, often tightly coupled to a specific use case and less reusable.(Create, Update, Delete)
- entities: This layer is responsible for Read operations. It includes data interfaces that must remain stable and unchanged despite external modifications. It typically contains logic for fetching data from APIs or databases, along with the UI components that display that data. It does not handle user interaction — it only presents the data. This layer is similar to Entities in Clean Architecture.(Read)

#### 2. Slice Structure

Each feature consists of the following segments:

```
feature/
├── api/ # External communication logic
│ ├── index.ts
│ └── [feature-name].ts
├── model/ # Business logic
│ ├── index.ts
│ └── types.ts
├── ui/ # Components
│ ├── index.ts
│ └── [ComponentName].tsx
└── index.ts # Public API
```

#### 3. Feature Implementation Guidelines

1. **Public API Design**

   - Each slice is exposed only through `index.ts`
   - Internal implementations remain private

2. **Business Logic Separation**

   - Concentrate business logic in models(model/)
   - UI components contain minimal logic

3. **Naming Conventions**
   - File names clearly express functionality
   - Components: PascalCase
   - Utilities/hooks: camelCase
   - Types/interfaces: PascalCase + `.types.ts`

#### 4. Adding New Features Procedure

1. **Layer Decision**

   - Choose appropriate layer based on feature characteristics
   - Consider reusability potential

2. **Slice Creation**

   - Follow domain structure based on planning framework

3. **Dependency Management**
   - Adhere to layer structure principles
   - Prevent circular dependencies

#### References

- For detailed information about FSD architecture, refer to the [official documentation](https://feature-sliced.design/)
- For Supabase configuration and usage, refer to [Supabase documentation](https://supabase.com/docs)

## Advanced Constraints

- ❌ Never use mock data outside of tests.
- ✅ Include test suggestions for major features.
- ✅ Apply SOLID principles selectively.
- 🔁 When token context exceeds 100k, generate `context-summary.md` and restart.

## Commit Message Rules

### Basic Rules
- 제목과 본문을 빈 행으로 구분
- 제목은 50글자 이내로 제한
- 제목의 첫 글자는 대문자로 작성
- 제목 끝에는 마침표를 넣지 않음
- 제목은 명령문으로 사용하며 과거형을 사용하지 않음
- 본문의 각 행은 72글자 내로 제한
- 어떻게 보다는 무엇과 왜를 설명

### Commit Message Structure
```
type(scope): subject

body

footer
```

### Types
| Type      | Description                                    |
|-----------|------------------------------------------------|
| feat      | 새로운 기능 추가                               |
| fix       | 버그 수정                                      |
| build     | 빌드 관련 파일 수정 / 모듈 설치 또는 삭제      |
| chore     | 그 외 자잘한 수정                              |
| ci        | CI 관련 설정 수정                              |
| docs      | 문서 수정                                      |
| style     | 코드 스타일 혹은 포맷 등에 관한 수정           |
| refactor  | 코드 리팩토링                                  |
| test      | 테스트 코드 수정                               |
| perf      | 성능 개선                                      |

### Structure Details
- **Header**: 필수이며 `type(scope): subject` 형식
  - type: 커밋의 성격을 나타내는 타입 (위 표 참조)
  - scope: 선택사항, 변경사항의 범위
  - subject: 변경사항의 간단한 설명

- **Body**: 선택사항
  - Header에서 표현할 수 없는 상세한 내용
  - 변경사항의 이유와 영향 설명

- **Footer**: 선택사항
  - 참조 정보 (예: Issues #1234)
  - Breaking Changes 등 추가 정보

### Examples
```
feat(auth): Add Google OAuth login

Implement Google OAuth authentication using Supabase.
- Add Google OAuth provider configuration
- Create login button component
- Handle OAuth callback

Closes #123
```

```
fix(ui): Resolve button alignment in header

Fix the misaligned buttons in the header component by adjusting
the flex container properties.

Fixes #456
```
