import jsPDF from 'jspdf';
import autoTable, { type ColumnInput } from 'jspdf-autotable';
import { RequisitionForm, formatDisplayDate } from './storage';

type JsPDFWithAutoTable = jsPDF & { lastAutoTable?: { finalY: number } };

/**
 * Generate and either download or share the requisition PDF.
 * Clean layout with header, table, and footer.
 */
export async function exportRequisitionPDF(
  form: RequisitionForm,
  action: 'download' | 'share' = 'download'
): Promise<void> {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  let cursorY = margin;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  const title = 'REQUISITION FORM';
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, cursorY);
  cursorY += 16;

  // Separator line
  doc.setLineWidth(0.5);
  doc.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += 18;

  // Header info: Requisition No and Date
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  const headerLeft = `Requisition No: ${form.id}`;
  const headerRight = `Date: ${formatDisplayDate(form.date)}`;
  doc.text(headerLeft, margin, cursorY);
  const rightTextWidth = doc.getTextWidth(headerRight);
  doc.text(headerRight, pageWidth - margin - rightTextWidth, cursorY);
  cursorY += 20;

  // Requested By
  doc.text(`Requested By: ${form.requestedBy || '_______________________'}`, margin, cursorY);
  cursorY += 18;

  // Items table
  const columns: ColumnInput[] = [
    { header: 'Item Name', dataKey: 'itemName' },
    { header: 'Quantity', dataKey: 'quantity' },
    { header: 'Unit', dataKey: 'unit' },
    { header: 'Purpose', dataKey: 'purpose' },
    { header: 'Remarks', dataKey: 'remarks' },
  ];

  const rows = form.items.map((it) => ({
    itemName: it.itemName,
    quantity: String(it.quantity),
    unit: it.unit,
    purpose: it.purpose,
    remarks: it.remarks || '-',
  }));

  autoTable(doc, {
    startY: cursorY,
    columns,
    body: rows,
    styles: { fontSize: 11, cellPadding: 6 },
    headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
    margin: { left: margin, right: margin },
    theme: 'grid',
  });

  const finalY = (doc as JsPDFWithAutoTable).lastAutoTable?.finalY ?? cursorY + 20;

  // Footer: Store In-charge and Signature
  let footerY = finalY + 24;
  // If close to bottom, add a new page
  const bottomLimit = doc.internal.pageSize.getHeight() - margin - 60;
  if (footerY > bottomLimit) {
    doc.addPage();
    footerY = margin;
  }

  doc.text(
    `Store In-charge: ${form.storeIncharge || '_______________________'}`,
    margin,
    footerY
  );
  footerY += 20;
  doc.text(`Signature: _____________________________`, margin, footerY);

  const filename = `requisition_${form.id}.pdf`;

  if (action === 'download') {
    doc.save(filename);
    return;
  }

  // Share via Web Share API with Files if supported; fallback to download
  try {
    const blob = doc.output('blob');
    const file = new File([blob], filename, { type: 'application/pdf' });
    const shareData: ShareData = {
      title: 'Requisition Form',
      text: `Requisition No: ${form.id}`,
      files: [file],
    };
    // @ts-expect-error Optional chaining for experimental API
    if (navigator.canShare && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      return;
    }
    // Fallback: download
    doc.save(filename);
  } catch {
    doc.save(filename);
  }
}