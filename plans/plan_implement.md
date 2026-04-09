# Implementation Plan (Step-by-Step)

Goal: implement MVP aligned with `spec-draft.md` and all files in `plans/`.

## Step 1 - Project setup and conventions
Checklist:
- [x] Create directory structure: `backend/`, `frontend/`
- [x] Confirm stack: FastAPI + SQLModel + SQLite, React + Tailwind
- [x] Create `.env.example` (API keys, DB URL, auth secret)
- [x] Write `README` section "Run local" for team

Done when:
- [x] Every team member can clone repo and run app locally

Note: Use UV for BE and bun for react vite typescript + react compiler

## Step 2 - Database schema and migration
Checklist:
- [ ] Create SQLModel models per `plans/database.md`
- [ ] Create first migration for: `patients`, `medications`, `reminders`, `symptom_logs`, `correction_logs`, `facility_cache`
- [ ] Add status enums (`PENDING`, `TAKEN`, `SNOOZED`, `PENDING_REVIEW`, ...)
- [ ] Seed sample data (3-5 patients) + seed 5 Vinmec locations into `facility_cache`

Done when:
- [ ] Migration runs successfully on a fresh machine
- [ ] Script exists to reset db and re-seed

## Step 3 - Auth (MVP simple)
Checklist:
- [ ] Middleware reads `X-Patient-ID` header, returns 401 if missing
- [ ] Reviewer role uses `X-Reviewer-Token` (hardcoded secret in `.env`)
- [ ] Mask PII/PHI in logs

Done when:
- [ ] Patient route without header is blocked with 401
- [ ] Reviewer-only endpoint for approving corrections works correctly

## Step 4 - API scaffolding (contracts)
Checklist:
- [ ] Scaffold endpoints per `plans/api_spec.md`
- [ ] Use Pydantic schemas with correct field names for request/response
- [ ] Add unified error response format (`code`, `message`, `details`)
- [ ] Write short OpenAPI descriptions

Done when:
- [ ] Swagger shows all MVP endpoints
- [ ] Contract tests pass for main endpoints

## Step 5 - OCR + Medication extraction
Checklist:
- [ ] Pipeline: `image -> OCR text -> extraction prompt -> JSON`
- [ ] Parse strict JSON output, reject output with wrong schema
- [ ] Rule: `confidence < 0.8` => `status=UNCLEAR`, `ask_human=true`
- [ ] Save result to `medications` with status `DRAFT`

Done when:
- [ ] Uploading a prescription image returns a valid draft
- [ ] Blurry/unreadable image returns `UNCLEAR` per rule

## Step 6 - Patient review + activate medication
Checklist:
- [ ] Endpoint to activate medication (`approved_by_patient=true`)
- [ ] Frontend review modal: show source + confidence + editable fields
- [ ] Save correction if user edits AI output
- [ ] Medication correction => `PENDING_REVIEW` (never auto-apply)

Done when:
- [ ] User can preview before enabling reminders
- [ ] Every medication correction goes through approval workflow

## Step 7 - Reminder engine (every 5 minutes)
Checklist:
- [ ] Use APScheduler inside FastAPI process, check due reminders every 5 minutes
- [ ] On reminder creation: `window_end_at = scheduled_time + 15 min`; retry until `TAKEN` or `now > window_end_at` (then mark `MISSED`)
- [ ] Endpoints: `confirm` and `snooze 15 minutes`
- [ ] Idempotency key for confirm/snooze events

Done when:
- [ ] "Confirmed taken" flow stops retry immediately
- [ ] "Snooze 15 min" flow reschedules next notification correctly
- [ ] Past `window_end_at` without confirm => status `MISSED`, retry stops

## Step 8 - Daily check + symptom triage
Checklist:
- [ ] Triage prompt with hard rules per `plans/ai_prompts.md`
- [ ] If uncertain, escalate risk level (never downplay)
- [ ] Daily check logic: vague input => ask severity score 1-10
- [ ] Save to `symptom_logs` with `source=DAILY_CHECK` (level, confidence, reason, action, severity_score)

Done when:
- [ ] Red-flag input returns `RED` + `GO_TO_EMERGENCY`
- [ ] Follow-up questions triggered when information is insufficient

## Step 9 - Emergency nearby facilities
Checklist:
- [ ] Endpoint `POST /api/emergency/nearby`
- [ ] Filter by location + open status + specialty (fallback: skip specialty filter if no match)
- [ ] Prioritize Vinmec in top results
- [ ] UI panel: `Call emergency`, `Update location`, `Find another location`

Done when:
- [ ] `RED` case shows top 3 nearest facilities with required info

## Step 10 - UI/UX complete mandatory flows
Checklist:
- [ ] `MedicationReminderCard` (Confirmed taken, Snooze, Wrong dosage)
- [ ] Cross-check checkbox before confirming taken
- [ ] `CorrectionStatusBanner` for `PENDING_REVIEW/APPROVED/REJECTED`
- [ ] `DailyCheckChat` + `EmergencyPanel` per defined states

Done when:
- [ ] Can demo all 3 main features with full happy/low-confidence/failure/correction paths

## Step 11 - Metrics + observability
Checklist:
- [ ] Collect metrics: `clinical_precision`, `low_confidence_reject_rate`, `cross_check_adherence`, `high_confidence_failure_rate`
- [ ] Dashboard/log query for team review
- [ ] Alert thresholds per spec:
  - `clinical_precision` < 98% => alert; any single dangerous wrong-dose incident => stop system immediately
  - `high_confidence_failure_rate` > 0.5% => alert
  - `cross_check_adherence` < 60% => alert, trigger UI/UX review
- [ ] Track correction volume by type

Done when:
- [ ] Metrics endpoint/report is usable for demo and safety review

## Step 12 - Testing and hardening
Checklist:
- [ ] Unit tests for critical business rules (unclear, escalate, approval)
- [ ] Integration tests for end-to-end API flows
- [ ] Safety test cases: missing auth, wrong role, invalid JSON, duplicate retry
- [ ] Dry-run demo script 2-3 times

Done when:
- [ ] Tests pass on all critical flows
- [ ] No blockers for MVP demo

## Step 13 - Demo release
Checklist:
- [ ] Finalize sample data + sample prescription images
- [ ] Finalize 7-10 minute demo script
- [ ] Backup plan if OCR/LLM fails (mock responses)
- [ ] Tag internal release `mvp-demo-v1`

Done when:
- [ ] Team can demo end-to-end: Extract -> Reminder -> Daily Check -> Emergency -> Correction Review

---

## Global Definition of Done (MVP)
- [ ] 3 prompts work with strict JSON format
- [ ] Medication correction requires doctor/pharmacist approval
- [ ] Reminder has snooze 15 min and cross-check checkbox
- [ ] Triage has hard rules + uncertain escalation
- [ ] Emergency suggestion shows nearest facilities (Vinmec priority)
- [ ] Safety metrics available to monitor thresholds
