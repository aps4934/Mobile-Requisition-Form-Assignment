MVP Plan: Requisition Form Web App (shadcn-ui, localStorage, jsPDF)
Tech: React + TypeScript + shadcn-ui + Tailwind, localStorage for persistence, jsPDF + autotable for PDF export. No backend/auth.

Files to create/update (7 files total):
1) src/lib/storage.ts
   - Types: RequisitionItem, RequisitionForm
   - Helpers: getForms(), getNextFormNumber(), saveForm(), getFormById(), updateForm()
   - Uses localStorage key "requisition_forms"

2) src/lib/pdf.ts
   - exportRequisitionPDF(form: RequisitionForm, action: 'download' | 'share'): Promise<void>
   - Generates clean PDF: header (title, requisition no, date, requested by), items table, footer (Store In-charge, Signature)
   - Uses jsPDF and jspdf-autotable; share via Web Share API when available

3) src/pages/FormList.tsx
   - Lists saved forms with requisition number, date, requestedBy
   - Actions: Open (navigate to / with ?id=), Export PDF

4) src/pages/Index.tsx (rewrite)
   - New form creation and edit existing
   - Fields: Requested By, Date (auto-filled), Items table with add/remove rows, Unit dropdown, Purpose, Remarks, Store In-charge
   - Validation: required fields, positive quantity
   - Actions: Save Form, Export PDF, Share PDF
   - Auto-increment Requisition No starting at 1
   - If ?id is present, load saved form and allow re-export/edit (updateForm)

5) src/App.tsx (update)
   - Add route: /forms -> FormList
   - Keep existing router; no global nav component to minimize files

6) index.html (update)
   - Update title to "Requisition App"

Assumptions:
- Persistence: localStorage (Supabase disabled)
- Date default to today; Unit dropdown with common units (Nos, Kg, L, Bags, Tons)
- Optional share via Web Share API; fallback to download
- Company logo optional; can be added later (nice-to-have)

After coding:
- pnpm add jspdf jspdf-autotable
- pnpm run lint
- pnpm run build
- UI validation via CheckUI.run