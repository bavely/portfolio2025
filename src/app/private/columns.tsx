"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { ContactRecord } from "@/lib/contact-input"

export type { ContactRecord }

export const columns: ColumnDef<ContactRecord>[] = [
  {
    accessorKey: "createdAt",
    header: "Received",
    cell: ({ row }) => {
      const value = row.original.createdAt
      return value ? new Date(value).toLocaleString() : "—"
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
]
