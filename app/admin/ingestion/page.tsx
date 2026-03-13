import { revalidatePath } from "next/cache";
import { approveRecord } from "@/services/ingestion/approveRecord";
import { getRawRecords } from "@/services/ingestion/getRawRecords";
import { rejectRecord } from "@/services/ingestion/rejectRecord";
import { RawPayloadViewer } from "@/components/admin/RawPayloadViewer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

async function approveAction(formData: FormData) {
  "use server";
  const rawId = formData.get("rawId");
  if (typeof rawId !== "string" || rawId.length === 0) {
    return;
  }
  await approveRecord(rawId);
  revalidatePath("/admin/ingestion");
}

async function rejectAction(formData: FormData) {
  "use server";
  const rawId = formData.get("rawId");
  if (typeof rawId !== "string" || rawId.length === 0) {
    return;
  }
  await rejectRecord(rawId);
  revalidatePath("/admin/ingestion");
}

export default async function AdminIngestionPage() {
  const records = await getRawRecords();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending RFP Ingestion Records</CardTitle>
      </CardHeader>
      <CardContent>
        {records.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pending ingestion records.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Source URL</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Agency</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.sourceName}</TableCell>
                  <TableCell>
                    <a
                      className="max-w-[220px] truncate text-primary underline-offset-4 hover:underline"
                      href={record.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {record.sourceUrl}
                    </a>
                  </TableCell>
                  <TableCell>{record.title}</TableCell>
                  <TableCell>{record.agency ?? "N/A"}</TableCell>
                  <TableCell>{record.deadline ?? "N/A"}</TableCell>
                  <TableCell>{new Date(record.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <form action={approveAction}>
                        <input type="hidden" name="rawId" value={record.id} />
                        <Button type="submit" size="sm">
                          Approve
                        </Button>
                      </form>
                      <form action={rejectAction}>
                        <input type="hidden" name="rawId" value={record.id} />
                        <Button type="submit" size="sm" variant="secondary">
                          Reject
                        </Button>
                      </form>
                      <RawPayloadViewer payload={record.rawPayload} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
