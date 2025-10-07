import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getForms, RequisitionForm } from '@/lib/storage';
import { exportRequisitionPDF } from '@/lib/pdf';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function FormList() {
  const [forms, setForms] = useState<RequisitionForm[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setForms(getForms());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-6 transition-colors">
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">Saved Requisition Forms</h1>

        <Card className="p-4 bg-white dark:bg-neutral-900 shadow-sm">
          {forms.length === 0 ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="text-sm text-muted-foreground">No forms saved yet.</div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate('/')}>New Form</Button>
              </div>
            </div>
          ) : (
            <Table>
              <TableCaption>Re-open and export any saved requisition.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Requisition No</TableHead>
                  <TableHead className="w-[160px]">Date</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forms.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-medium">{f.id}</TableCell>
                    <TableCell>{f.date}</TableCell>
                    <TableCell>{f.requestedBy}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => navigate(`/?id=${f.id}`)}
                          title="Open"
                        >
                          Open
                        </Button>
                        <Button
                          onClick={() => exportRequisitionPDF(f, 'download')}
                          title="Export PDF"
                        >
                          Export
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>

        <p className="text-xs text-muted-foreground text-center">
          Developed by <span className="font-medium">Aditya Pratap Singh</span>
        </p>
      </div>
    </div>
  );
}