# Codex Session Brief

ใช้ไฟล์นี้เป็น onboarding summary สำหรับทุก Codex terminal session ของโปรเจกต์นี้

## Priority Order

ถ้าข้อมูลในไฟล์นี้ขัดกับไฟล์อื่น ให้ยึดลำดับนี้:

1. `/Users/martinfranck/Documents/HR-Management-System/AGENTS.md`
2. `/Users/martinfranck/Documents/HR-Management-System/docs/superpowers/specs/2026-06-05-hr-core-employee-database-design.md`
3. `/Users/martinfranck/Documents/HR-Management-System/docs/superpowers/plans/2026-06-06-hr-core-employee-database-plan.md`
4. ไฟล์นี้ `/Users/martinfranck/Documents/HR-Management-System/docs/codex-session-brief.md`

ห้ามใช้ไฟล์นี้เพื่อ override `AGENTS.md`

## Mandatory Session Rules

- ตอบผู้ใช้เป็นภาษาไทยทั้งหมด ไม่ว่าผู้ใช้จะพิมพ์ภาษาอะไร
- ก่อนเริ่ม task, feature, หรือ code generation ใหม่ทุกครั้ง ต้องถามคำถามเจาะจง 3-4 ข้อก่อนเสมอ
- ก่อนลงมือทำงานต่อ ต้องสรุป current state ของโปรเจกต์ก่อนทุกครั้ง
- ถ้ามี requirement ใหม่เข้ามา ต้องตรวจความขัดแย้งกับของเดิมก่อน
- ห้าม assume เรื่องสำคัญเองถ้ายังมี data gap ที่กระทบ logic, permission, UX flow, หรือ data model
- อธิบาย flow ตามลำดับนี้เมื่ออธิบายระบบ: User -> UI -> API -> Server -> Database -> Response -> UI
- แยกให้ชัดว่าอะไรคือ MVP, nice-to-have, และ future scale

## Product Summary

โปรเจกต์นี้คือระบบ HR Management สำหรับใช้งานทั้งบริษัท โดยแบ่งพื้นที่ใช้งานแยกจากกันชัดเจน 3 ฝั่ง:

1. HR Officer
2. Management
3. Employee

แนวคิดหลัก:

- HR ใช้จัดการข้อมูลพนักงาน, เพิ่ม/ลด/แก้ไขข้อมูล, และประกาศข่าวสาร
- Management ใช้ approve การลาและเซ็นเอกสาร
- Employee ใช้เป็นทั้ง self-service profile และ company community/feed
- Employee side มีลักษณะ social/community board คล้าย feed รวมของบริษัท + feed ระดับแผนก
- พนักงานโพสต์ได้เฉพาะ feed รวมและ/หรือแผนกตัวเอง แต่ข้ามแผนกไม่ได้
- HR และ Management เข้าดูทุกแผนกได้
- ระบบเอกสารเป็นส่วนสำคัญในภาพรวม แต่ยังไม่ใช่แกนแรกของ MVP ปัจจุบัน

## Locked MVP Direction

MVP ปัจจุบันที่เลือกแล้วคือ:

`Core HR Employee Database + Profile Management`

ขอบเขต MVP ที่ล็อกแล้ว:

- ระบบ employee directory
- employee profile management
- org structure พื้นฐาน
- login ผ่าน company email
- HR เป็นคนสร้าง account ให้
- มี temp password
- บังคับเปลี่ยนรหัสผ่านครั้งแรก
- มี forgot password flow
- ไม่มี hard delete
- employee self-service แก้ไขได้เฉพาะบาง field
- management เห็นข้อมูลแบบ read-only และต้องถูก redaction ตามความเหมาะสม
- public employee profile ห้าม expose ที่อยู่และ emergency contact

## Current Stack Direction

เทคโนโลยีที่เลือกไว้ตอนนี้:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase วางแผนใช้ภายหลังเป็น backend/data/auth layer
- Vercel วางแผนใช้ภายหลังสำหรับ deployment

ข้อเท็จจริงสำคัญ:

- auth ตอนนี้ยังเป็น mock/scaffold เพื่อเดินงาน product และ role flow
- ยังไม่ใช่ production authentication

## Current Project State

สิ่งที่ทำเสร็จแล้วใน repo:

1. วาง foundation ของแอป
2. วาง employee schema / migration / seed ระดับต้น
3. วาง roles และ route guards แบบ proxy/scaffold
4. วางหน้า HR directory และ employee detail scaffold
5. วาง employee profile flow และ self-service protection ระดับต้น
6. แก้ management redaction issue พร้อม regression test
7. สร้าง CSV import validation scaffold สำหรับ HR โดยยังไม่ persist ลง database

สถานะ task ล่าสุด:

- Task 6: Complete
- Task 7: Complete
- Task 8: Not started

งานล่าสุดที่เพิ่งทำ:

- เพิ่ม regression test สำหรับ management status redaction
- เพิ่ม HR import page ที่ validate CSV headers และ row schema
- ตรวจ duplicate company email และ employee code
- แสดง validation summary ใน UI
- build ผ่าน, type check ผ่าน, test ผ่าน

## Important Files To Read First

ก่อนเริ่ม task ใหม่ ให้ Codex อ่านไฟล์เหล่านี้ก่อน:

- `/Users/martinfranck/Documents/HR-Management-System/AGENTS.md`
- `/Users/martinfranck/Documents/HR-Management-System/docs/superpowers/specs/2026-06-05-hr-core-employee-database-design.md`
- `/Users/martinfranck/Documents/HR-Management-System/docs/superpowers/plans/2026-06-06-hr-core-employee-database-plan.md`

ถ้างานเกี่ยวข้องกับ implementation ล่าสุดของ employee/module เหล่านี้ ให้ inspect เพิ่ม:

- `/Users/martinfranck/Documents/HR-Management-System/src/features/employees/management-view.ts`
- `/Users/martinfranck/Documents/HR-Management-System/src/features/employees/management-view.test.ts`
- `/Users/martinfranck/Documents/HR-Management-System/src/features/employees/schemas/import.ts`
- `/Users/martinfranck/Documents/HR-Management-System/src/features/employees/lib/import-validation.ts`
- `/Users/martinfranck/Documents/HR-Management-System/src/features/employees/actions/import-employees.ts`
- `/Users/martinfranck/Documents/HR-Management-System/src/features/employees/actions/import-employees.test.ts`
- `/Users/martinfranck/Documents/HR-Management-System/src/features/employees/components/import-dropzone.tsx`
- `/Users/martinfranck/Documents/HR-Management-System/src/app/(portal)/hr/import/page.tsx`

## External Design / Skill References

ถ้างานเกี่ยวข้องกับ UX/UI, frontend quality, spacing, visual system, หรือ Figma handoff ให้พิจารณาไฟล์อ้างอิงนอก repo เหล่านี้ด้วย:

- `/Users/martinfranck/Desktop/all-about-ai /figma skill/uxui-pro-max.md`
- `/Users/martinfranck/Desktop/all-about-ai /figma skill/frontend-design.md`
- `/Users/martinfranck/Desktop/all-about-ai /figma skill/rad-spacing.md`
- `/Users/martinfranck/Desktop/all-about-ai /figma skill/uui-style.md`

ถ้า user ระบุให้ใช้ skill โดยตรง เช่น `using-superpowers` ต้องเปิดและทำตาม skill นั้นก่อน

## Working Style For This Repo

เวลาตอบ user:

- เริ่มจาก current state summary ก่อน
- ถาม 3-4 targeted clarification questions ก่อนเริ่ม significant work
- ถ้าจะ generate code ก้อนใหญ่หรือ feature ซับซ้อน ให้สรุป simplified logic flow ก่อน
- สำหรับ user ที่ไม่มีพื้นฐานโค้ด ต้องอธิบายคำศัพท์เทคนิคแบบเข้าใจง่าย
- เวลาบอกให้รัน command ต้องบอกว่าคำสั่งนั้นทำอะไร และใช้เมื่อไร
- ต้องเตือนเรื่อง security, permission boundaries, privacy risk, และ production gaps แบบตรงไปตรงมา

## Security And Privacy Baseline

ข้อมูล HR ถือเป็น sensitive data โดย default

ต้องระวังเป็นพิเศษเรื่อง:

- authorization ของ role แต่ละฝั่ง
- public profile exposure
- employee self-edit scope
- document access control
- auditability ของการแก้ไขข้อมูล
- การแยก dev/staging/prod config
- การไม่ hardcode secret ใด ๆ ลง source code

## Recommended Prompt For New Terminal Sessions

ใช้ prompt นี้ใน Codex terminal session ใหม่:

```text
ตอบฉันเป็นภาษาไทยทั้งหมด

อ่านไฟล์เหล่านี้ก่อน:
- /Users/martinfranck/Documents/HR-Management-System/AGENTS.md
- /Users/martinfranck/Documents/HR-Management-System/docs/codex-session-brief.md
- /Users/martinfranck/Documents/HR-Management-System/docs/superpowers/specs/2026-06-05-hr-core-employee-database-design.md
- /Users/martinfranck/Documents/HR-Management-System/docs/superpowers/plans/2026-06-06-hr-core-employee-database-plan.md

จากนั้น:
1. สรุป current state ของโปรเจกต์
2. บอกสิ่งที่ build แล้ว vs pending
3. ถามฉัน 3-4 คำถามที่จำเป็นก่อนเริ่ม task ใหม่
4. ถ้ามีงาน UX/UI หรือ frontend ให้พิจารณา external design references ที่ระบุไว้ใน codex-session-brief.md ด้วย
```

## Git Snapshot

commit ล่าสุดที่ควรรู้:

- `2724da45` `feat: add csv import validation scaffold`
- `d9d71158` `test: add management status redaction regression coverage`
- `e4c8b911` `docs: add hr core implementation spec and plan`
