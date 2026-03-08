# Think Trail LMS (Frontend + Backend Workflow Guide)

This document is written for new contributors so they can understand the project quickly, run it locally, and continue incomplete work without guessing.

## 1. Project Snapshot

Think Trail is a role-based Learning Management System (LMS) with separate dashboards and workflows for:

- `superAdmin`
- `admin`
- `instructor`
- `student`
- `admitted`

Current workspace contains two codebases:

- Frontend: `Frontend-fixed` (Next.js + TypeScript + RTK Query)
- Backend: `Backend-ThinkTrail/Think-Trail-v2` (Express + TypeScript + MongoDB)

## 2. High-Level Architecture

### Frontend

- Framework: Next.js (App Router style pages)
- State: Redux Toolkit + RTK Query
- Styling: Tailwind CSS
- Auth guard: `templates/PrivateTemplate.tsx`
- Role guard: `templates/AccessTemplate.tsx`
- API clients:
	- `feature/api/authApi.ts`
	- `feature/api/dashboardApi.ts`
	- `feature/api/userApi.ts`
	- `feature/api/mediaUploadApi.ts`

### Backend

- Runtime: Express + TypeScript
- DB: MongoDB/Mongoose
- Auth: JWT + cookie-based session flow
- Route mount root: `/api/v1`
- Main route registry: `Backend-ThinkTrail/Think-Trail-v2/src/app/routes/index.ts`

## 3. Run Locally

## Frontend

Path: `Frontend-fixed`

```bash
npm install
npm run dev
```

Default URL: `http://localhost:3000`

## Backend

Path: `Backend-ThinkTrail/Think-Trail-v2`

```bash
npm install
npm run start:dev
```

Default API pattern: `http://localhost:<PORT>/api/v1/...`

## 4. Environment Variables

## Frontend (`Frontend-fixed/.env.local`)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Use your actual backend port.

## Backend (`Backend-ThinkTrail/Think-Trail-v2/.env`)

Minimum required (from `src/app/config/index.ts`):

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=<mongodb-connection-string>

BCRYPT_SALT_ROUNDS=12
DEFAULT_PASS=<default-password>

JWT_ACCESS_SECRET=<secret>
JWT_REFRESH_SECRET=<secret>
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=30d

RESET_PASS_UI_LINK=http://localhost:3000/reset-password

CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>

SUPER_ADMIN_PASSWORD=<seed-password>

MINIO_ACCESS_KEY=<optional>
MINIO_SECRET_KEY=<optional>

EMAIL_HOST=<smtp-host>
EMAIL_PORT=<smtp-port>
EMAIL_USERNAME=<smtp-user>
EMAIL_PASSWORD=<smtp-password>
EMAIL_FROM=<sender-email>

OPENAI_API_KEY=<optional>
```

## 5. Role-Based Product Workflows

## A. Super Admin Workflow

1. Login.
2. Manage admins (`assign admin`, `department assignment`).
3. Manage academic structure (`semester`, `faculty`, `department`).
4. Create/manage courses and assignments.
5. Review admission requests and accept/reject.

## B. Admin Workflow

1. Login.
2. Create course, module, quiz, assignment.
3. View/manage assignment submissions.
4. Support admission operations and academic entities (based on access).

## C. Instructor Workflow

1. Login.
2. Access assigned courses.
3. Manage assignment and quiz-related teaching operations.
4. Review student submissions and progress features available in UI.

## D. Student Workflow

1. Register/Login.
2. Submit admission request (if not admitted).
3. Access enrolled/my-course pages.
4. Attempt quizzes and submit assignments.
5. View grades/progress pages where integrated.

## 6. Implemented Modules (Verified in Backend v2)

Mounted modules in backend route index:

- `users`
- `auth`
- `course`
- `assignment`
- `quiz`
- `module`
- `module-video`
- `admission`
- `admins`
- `students`
- `faculties`
- `academic-semesters`
- `academic-faculties`
- `academic-departments`
- `enrolled-courses`
- `offered-courses`
- `semester-registrations`

## 7. Important Integration Note (Read Before New Feature Work)

The frontend API file `feature/api/dashboardApi.ts` includes endpoints from a broader/older backend contract. Some endpoints used by frontend are not currently mounted in `Think-Trail-v2` backend.

Common mismatch patterns:

- Frontend uses `/courses` while backend exposes `/course`.
- Frontend uses `/enrollments` while backend exposes `/enrolled-courses`.
- Frontend forgot/reset path differs from backend naming.
- Frontend expects modules like chat/message/group/pages/reviews/files/announcements/meets, but these are not mounted in current backend route registry.

Before building new features, first align API contracts.

## 8. Recommended Next Steps (For New Contributor)

## Step 1: Stabilize Existing Core Flows

1. Auth (login/logout/me/refresh/reset)
2. Role access and dashboard navigation
3. Course create/list/detail
4. Assignment create/submit/mark
5. Quiz create/submit/list

## Step 2: API Contract Alignment

1. Audit each endpoint in `feature/api/dashboardApi.ts`.
2. Mark as:
	 - `Matched`
	 - `Needs URL rename`
	 - `Backend missing`
3. Fix naming mismatch first (fastest wins).

## Step 3: Re-enable/Build Missing Modules One by One

Suggested order:

1. Messaging and real-time layer
2. Announcements and pages
3. Reviews and files
4. Mentoring/optimization/contact extras

## 9. Workflow For Continuing Incomplete Features

Use this checklist per feature:

1. Confirm route exists in backend module route file.
2. Confirm controller/service logic exists.
3. Confirm frontend RTK Query endpoint matches exact backend path.
4. Confirm role middleware permits expected roles.
5. Test with one role account end-to-end.
6. Add/update this README if behavior changed.

## 10. Known Technical Debt

- Mixed API naming conventions across frontend/backend (`course` vs `courses`).
- Legacy endpoints still present in frontend API layer.
- Socket client exists in frontend, but backend socket bootstrap is not present in current v2 server startup.
- Project currently has no automated tests.

## 11. Useful File Map

Frontend:

- `feature/api/dashboardApi.ts`: Main API integration map.
- `components/layouts/Admin/AsideBar.tsx`: Role-based menu and route exposure.
- `templates/PrivateTemplate.tsx`: Authentication guard.
- `templates/AccessTemplate.tsx`: Role authorization guard.

Backend:

- `src/app/routes/index.ts`: All mounted module routes.
- `src/server.ts`: App bootstrapping.
- `src/app/config/index.ts`: Env variable contract.
- `src/app/modules/**`: Domain modules (route/controller/service/model).

## 12. Contributor Handover Summary

If you are new to this codebase:

1. Run backend and frontend.
2. Verify auth and one dashboard role first.
3. Align APIs before adding new features.
4. Build features only after contract mismatch list is cleared.

This project already has strong LMS foundations. The fastest progress now comes from integration cleanup, then incremental module completion.
