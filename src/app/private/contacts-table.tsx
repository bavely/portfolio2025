"use client";

import type { ContactRecord } from "@/lib/contact-input";
import { columns } from "./columns";
import { DataTable } from "./data-table";

/**
 * Client boundary for the table.
 *
 * Keeps `columns` (which needs to live in a client module) out of the server
 * component, so the page only has to pass plain serialisable rows.
 */
export function ContactsTable({ data }: { data: ContactRecord[] }) {
  return <DataTable columns={columns} data={data} />;
}
