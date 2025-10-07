import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import {
  getFormById,
  getNextFormNumber,
  saveForm,
  updateForm,
  todayISO,
  RequisitionForm,
  RequisitionItem,
  UnitOption,
} from '@/lib/storage';
import { exportRequisitionPDF } from '@/lib/pdf';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const UNIT_OPTIONS: UnitOption[] = ['Nos', 'Kg', 'L', 'Bags', 'Tons'];

export default function RequisitionPage() {
  const query = useQuery();
  const navigate = useNavigate();

  const [id, setId] = useState<number>(getNextFormNumber());
  const [date, setDate] = useState<string>(todayISO());
  const [requestedBy, setRequestedBy] = useState<string>('');
  const [storeIncharge, setStoreIncharge] = useState<string>('');
  const [items, setItems] = useState<RequisitionItem[]>([
    { itemName: '', quantity: 1, unit: UNIT_OPTIONS[0], purpose: '', remarks: '' },
  ]);

  const isEditingExisting = useMemo(() => {
    const idParam = query.get('id');
    return idParam ? Number(idParam) : undefined;
  }, [query]);

  useEffect(() => {
    if (isEditingExisting) {
      const existing = getFormById(isEditingExisting);
      if (existing) {
        setId(existing.id);
        setDate(existing.date);
        setRequestedBy(existing.requestedBy);
        setStoreIncharge(existing.storeIncharge);
        setItems(existing.items);
      } else {
        toast.error('Form not found, starting a new one.');
        setId(getNextFormNumber());
      }
    } else {
      setId(getNextFormNumber());
      setDate(todayISO());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingExisting]);

  const addRow = () => {
    setItems((prev) => [...prev, { itemName: '', quantity: 1, unit: UNIT_OPTIONS[0], purpose: '', remarks: '' }]);
  };

  const removeRow = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, patch: Partial<RequisitionItem>) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  };

  const validate = (): string[] => {
    const errors: string[] = [];
    if (!requestedBy.trim()) errors.push('Requested By is required.');
    if (!date) errors.push('Date is required.');
    items.forEach((it, idx) => {
      if (!it.itemName.trim()) errors.push(`Row ${idx + 1}: Item Name is required.`);
      if (it.quantity === undefined || Number.isNaN(Number(it.quantity)) || Number(it.quantity) <= 0) {
        errors.push(`Row ${idx + 1}: Quantity must be a positive number.`);
      }
      if (!String(it.unit).trim()) errors.push(`Row ${idx + 1}: Unit is required.`);
      if (!it.purpose.trim()) errors.push(`Row ${idx + 1}: Purpose is required.`);
    });
    if (!storeIncharge.trim()) errors.push('Store In-charge is required.');
    return errors;
  };

  const buildForm = (): RequisitionForm => ({
    id,
    date,
    requestedBy: requestedBy.trim(),
    storeIncharge: storeIncharge.trim(),
    items: items.map((it) => ({
      itemName: it.itemName.trim(),
      quantity: Number(it.quantity),
      unit: String(it.unit).trim(),
      purpose: it.purpose.trim(),
      remarks: (it.remarks || '').trim(),
    })),
  });

  const onSave = () => {
    const errors = validate();
    if (errors.length) {
      errors.slice(0, 4).forEach((e) => toast.error(e));
      if (errors.length > 4) toast.error(`+${errors.length - 4} more issues`);
      return;
    }
    const form = buildForm();
    if (isEditingExisting) {
      updateForm(form);
      toast.success(`Requisition ${form.id} updated`);
    } else {
      saveForm(form);
      toast.success(`Requisition ${form.id} saved`);
      setId(getNextFormNumber());
    }
  };

  const onExport = async (share = false) => {
    const errors = validate();
    if (errors.length) {
      errors.slice(0, 4).forEach((e) => toast.error(e));
      if (errors.length > 4) toast.error(`+${errors.length - 4} more issues`);
      return;
    }
    const form = buildForm();
    saveForm(form);
    await exportRequisitionPDF(form, share ? 'share' : 'download');
    toast.success(share ? 'Shared PDF' : 'Exported PDF');
  };

  const onNewForm = () => {
    navigate('/', { replace: true });
    setId(getNextFormNumber());
    setDate(todayISO());
    setRequestedBy('');
    setStoreIncharge('');
    setItems([{ itemName: '', quantity: 1, unit: UNIT_OPTIONS[0], purpose: '', remarks: '' }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-6 transition-colors">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Requisition Form</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onNewForm}>New</Button>
            <Button onClick={onSave}>Save</Button>
            <Button variant="secondary" onClick={() => onExport(false)}>Export</Button>
            <Button variant="ghost" onClick={() => onExport(true)}>Share</Button>
          </div>
        </div>

        <Card className="p-4 bg-white dark:bg-neutral-900 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="reqNo">Requisition No</Label>
              <Input id="reqNo" value={id} disabled className="mt-1" />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="requestedBy">Requested By</Label>
              <Input
                id="requestedBy"
                placeholder="In-charge Name"
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Items</h2>
              <Button onClick={addRow} title="Add Row">Add row</Button>
            </div>
            <Table>
              <TableCaption>Required: Item Name, Quantity, Unit, Purpose. Quantity must be &gt; 0.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead className="w-[120px]">Quantity</TableHead>
                  <TableHead className="w-[140px]">Unit</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Remarks</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((it, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Input
                        placeholder="e.g., Cement"
                        value={it.itemName}
                        onChange={(e) => updateItem(idx, { itemName: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min={1}
                        value={String(it.quantity)}
                        onChange={(e) => updateItem(idx, { quantity: Number(e.target.value) })}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={String(it.unit)}
                        onValueChange={(val) => updateItem(idx, { unit: val })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {UNIT_OPTIONS.map((u) => (
                            <SelectItem key={u} value={u}>
                              {u}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Purpose"
                        value={it.purpose}
                        onChange={(e) => updateItem(idx, { purpose: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Remarks"
                        value={it.remarks || ''}
                        onChange={(e) => updateItem(idx, { remarks: e.target.value })}
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="destructive" onClick={() => removeRow(idx)} aria-label={`Remove row ${idx + 1}`}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storeIncharge">Store In-charge</Label>
              <Input
                id="storeIncharge"
                placeholder="Store In-charge Name"
                value={storeIncharge}
                onChange={(e) => setStoreIncharge(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        <p className="text-xs text-muted-foreground text-center">
          Developed by <span className="font-medium">Aditya Pratap Singh</span>
        </p>
      </div>
    </div>
  );
}