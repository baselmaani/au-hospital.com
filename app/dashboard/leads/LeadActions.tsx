"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LEAD_STATUSES } from "@/lib/utils";
import { deleteLeadAction, updateLeadStatusAction, updateLeadNotesAction } from "./actions";
import { Trash2, StickyNote, Check, X } from "lucide-react";

export function LeadActions({
  id,
  currentStatus,
  currentNotes,
}: {
  id: string;
  currentStatus: string;
  currentNotes?: string | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();
  const [editingNotes, setEditingNotes] = React.useState(false);
  const [notes, setNotes] = React.useState(currentNotes ?? "");

  const onChange = (status: string) => {
    const fd = new FormData();
    fd.set("id", id);
    fd.set("status", status);
    startTransition(async () => {
      try {
        await updateLeadStatusAction(fd);
        toast.success("Status updated");
        router.refresh();
      } catch {
        toast.error("Failed to update status");
      }
    });
  };

  const onSaveNotes = () => {
    const fd = new FormData();
    fd.set("id", id);
    fd.set("notes", notes);
    startTransition(async () => {
      try {
        await updateLeadNotesAction(fd);
        toast.success("Notes saved");
        setEditingNotes(false);
        router.refresh();
      } catch {
        toast.error("Failed to save notes");
      }
    });
  };

  const onDelete = () => {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    const fd = new FormData();
    fd.set("id", id);
    startTransition(async () => {
      try {
        await deleteLeadAction(fd);
        toast.success("Lead deleted");
        router.refresh();
      } catch {
        toast.error("Failed to delete lead");
      }
    });
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <div className="w-40">
          <Select defaultValue={currentStatus} onValueChange={onChange} disabled={pending}>
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LEAD_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Add / edit notes"
          onClick={() => setEditingNotes((v) => !v)}
          disabled={pending}
        >
          <StickyNote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-destructive"
          onClick={onDelete}
          disabled={pending}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {editingNotes && (
        <div className="mt-2 flex flex-col gap-1.5">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Internal notes about this lead…"
            className="text-sm"
          />
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onSaveNotes} disabled={pending}>
              <Check className="mr-1 h-3.5 w-3.5" /> Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setNotes(currentNotes ?? "");
                setEditingNotes(false);
              }}
              disabled={pending}
            >
              <X className="mr-1 h-3.5 w-3.5" /> Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

