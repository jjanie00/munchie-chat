# Munchie Chat

Next.js App Router와 Supabase를 사용한 채팅 애플리케이션 프로젝트입니다.

## 기술 스택

- **Next.js 15.5.6** - App Router, Turbopack
- **React 19.1.0**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Supabase** - 백엔드 및 데이터베이스
- **ESLint** - 코드 품질 관리

## 프로젝트 구조

```
munchie-chat/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈 페이지
│   └── globals.css        # 전역 스타일
├── components/            # 재사용 가능한 React 컴포넌트
├── lib/                   # 유틸리티 및 헬퍼 함수
│   └── supabase.ts       # Supabase 클라이언트 초기화
├── types/                 # TypeScript 타입 정의
├── public/                # 정적 파일
├── .env.example          # 환경변수 템플릿
├── .env.local            # 환경변수 (git ignored)
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.example` 파일을 `.env.local`로 복사하고 실제 Supabase 프로젝트 정보를 입력합니다:

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열어 다음 값을 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Supabase 프로젝트 생성 방법:**

1. [Supabase](https://supabase.com)에 접속하여 계정 생성
2. 새 프로젝트 생성
3. Project Settings > API에서 URL과 anon key 확인
4. `.env.local` 파일에 값 입력

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

## 사용 가능한 스크립트

```bash
npm run dev      # 개발 서버 실행 (Turbopack 사용)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

## Supabase 클라이언트 사용 예시

```typescript
import { supabase } from "@/lib/supabase";

// 데이터 조회
const { data, error } = await supabase.from("table_name").select("*");

// 데이터 삽입
const { data, error } = await supabase
  .from("table_name")
  .insert({ column: "value" });
```

## 다음 단계

- [ ] Supabase 데이터베이스 테이블 스키마 설계
- [ ] 인증 기능 구현 (회원가입/로그인)
- [ ] 채팅 UI 컴포넌트 개발
- [ ] 실시간 메시지 기능 구현
- [ ] 사용자 프로필 관리 기능

## 배포

Vercel을 사용하여 쉽게 배포할 수 있습니다:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/munchie-chat)

배포 시 환경변수를 Vercel 프로젝트 설정에서 추가해야 합니다.

## 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 라이선스

MIT
