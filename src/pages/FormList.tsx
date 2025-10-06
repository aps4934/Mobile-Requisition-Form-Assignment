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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 p-6 transition-colors">
      <div className="max-w-5xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Saved Requisition Forms
        </h1>

        <Card className="p-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur shadow-sm">
          {forms.length === 0 ? (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">No forms saved yet.</p>
              <Button variant="secondary" onClick={() => navigate('/')}>
                New Form
              </Button>
            </div>
          ) : (
            <Table>
              <TableCaption>Re-open and re-export any saved requisition.</TableCaption>
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
                          variant="outline"
                          onClick={() => navigate(`/?id=${f.id}`)}
                          title="Open"
                        >
                          Open
                        </Button>
                        <Button
                          onClick={() => exportRequisitionPDF(f, 'download')}
                          title="Export PDF"
                        >
                          Export PDF
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