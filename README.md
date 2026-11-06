# 🍳 오늘의 레시피

요리 레시피를 검색하고, 인분에 맞춰 재료를 계산하고, 단계별 타이머로 따라 만들 수 있는 웹앱입니다.

## 주요 기능
- **검색 & 카테고리 필터** — 요리 이름, 재료, 태그로 검색하고 한식·양식·중식·일식·디저트로 분류
- **즐겨찾기** — 하트를 눌러 저장 (브라우저 `localStorage`에 보관)
- **인분 조절** — 1~10인분에 맞춰 재료 양 자동 계산 (g/ml는 정수, 그 외는 ¼ 단위 분수)
- **조리 단계 & 타이머** — 단계 완료 체크, 시간이 필요한 단계마다 시작/일시정지/리셋 타이머와 완료 알림음

## 실행 방법
```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm test         # 테스트
npm run build    # 배포용 빌드 (dist/)
```

## 레시피 추가하기
`src/data/recipes.ts`의 `recipes` 배열에 항목을 추가하면 됩니다. 타입은 `src/types.ts`를 참고하세요.

## 기술 스택
React 18 · TypeScript · Vite · React Router · Vitest + Testing Library
