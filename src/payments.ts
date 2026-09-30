import type { PaymentHandles } from "./api";

export const EMPTY_PAYMENT_HANDLES: PaymentHandles = {
  cash_app: "",
  venmo: "",
  cash_note: "",
  monero: "",
};

export const PAYMENT_RAILS = [
  { id: "cash_app", label: "Cash App" },
  { id: "venmo", label: "Venmo" },
  { id: "cash", label: "Cash" },
  { id: "monero", label: "Monero" },
] as const;

export function paymentRailLabel(rail: string | undefined | null): string {
  return PAYMENT_RAILS.find((r) => r.id === rail)?.label ?? "";
}

/** Lines an invoice appends under "Pay with:". Empty when nothing is saved. */
export function payWithLines(handles: PaymentHandles): string[] {
  const lines: string[] = [];
  if (handles.cash_app.trim()) lines.push(`Cash App: ${handles.cash_app.trim()}`);
  if (handles.venmo.trim()) lines.push(`Venmo: ${handles.venmo.trim()}`);
  if (handles.cash_note.trim()) lines.push(`Cash: ${handles.cash_note.trim()}`);
  if (handles.monero.trim()) lines.push(`Monero: ${handles.monero.trim()}`);
  return lines;
}
