/**
 * Local storage utilities for requisition forms.
 * Persistence: device-only via localStorage.
 */

export type UnitOption = 'Nos' | 'Kg' | 'L' | 'Bags' | 'Tons';

export interface RequisitionItem {
  itemName: string;
  quantity: number;
  unit: UnitOption | string;
  purpose: string;
  remarks?: string;
}

export interface RequisitionForm {
  id: number; // Requisition No
  date: string; // YYYY-MM-DD
  requestedBy: string;
  storeIncharge: string;
  items: RequisitionItem[];
}

const STORAGE_KEY = 'requisition_forms';

function readStorage(): RequisitionForm[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Basic shape validation
      return parsed.filter((f) => typeof f?.id === 'number' && Array.isArray(f?.items));
    }
    return [];
  } catch {
    return [];
  }
}

function writeStorage(forms: RequisitionForm[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
}

/**
 * Get all saved forms.
 */
export function getForms(): RequisitionForm[] {
  return readStorage();
}

/**
 * Compute next requisition number starting at 1.
 */
export function getNextFormNumber(): number {
  const forms = readStorage();
  if (forms.length === 0) return 1;
  const maxId = Math.max(...forms.map((f) => f.id));
  return maxId + 1;
}

/**
 * Save a new form. If a form with same id exists, it will be replaced.
 */
export function saveForm(form: RequisitionForm): void {
  const forms = readStorage();
  const existingIndex = forms.findIndex((f) => f.id === form.id);
  if (existingIndex >= 0) {
    forms[existingIndex] = form;
  } else {
    forms.push(form);
  }
  writeStorage(forms);
}

/**
 * Get a form by requisition number.
 */
export function getFormById(id: number): RequisitionForm | undefined {
  const forms = readStorage();
  return forms.find((f) => f.id === id);
}

/**
 * Update an existing form.
 */
export function updateForm(form: RequisitionForm): void {
  saveForm(form);
}

/**
 * Utility: format date as DD-MMM-YYYY (e.g., 03-Oct-2025)
 */
export function formatDisplayDate(isoDate: string): string {
  const d = new Date(isoDate);
  const day = String(d.getDate()).padStart(2, '0');
  const monthShort = d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();
  return `${day}-${monthShort}-${year}`;
}

/**
 * Utility: today's date in YYYY-MM-DD
 */
export function todayISO(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}