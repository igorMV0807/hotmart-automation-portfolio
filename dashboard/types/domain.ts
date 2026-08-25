export type PurchaseJourney = {
  id: number;
  buyer_email: string | null;
  buyer_name: string | null;
  product_id: number | null;
  offer_code: string | null;
  transaction_id: string | null;
  current_status: string | null;
  recovery_allowed: boolean | null;
  recovery_flow: string | null;
  last_step_sent: number | null;
  next_step_at: string | null;
  approved_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  expired_at: string | null;
  overdue_at: string | null;
  refund_requested_at: string | null;
  refunded_at: string | null;
  chargeback_at: string | null;
  recovered: boolean | null;
  recovered_step: number | null;
  recovered_revenue: number | null;
  currency: string | null;
  first_event_id: string | null;
  last_event_id: string | null;
  last_event_created_at: number | null;
  created_at: string | null;
  updated_at: string | null;
};

export type RecoveryEmailLog = {
  id: number;
  journey_id: number;
  recovery_flow: string | null;
  step: number | null;
  buyer_email: string | null;
  subject: string | null;
  gmail_message_id: string | null;
  status: string | null;
  sent_at: string | null;
  created_at: string | null;
};

export type HotmartEvent = {
  id: number;
  event_id: string | null;
  event_type: string | null;
  event_created_at: number | null;
  transaction_id: string | null;
  buyer_email: string | null;
  buyer_name: string | null;
  product_id: number | null;
  offer_code: string | null;
  purchase_status: string | null;
  price: number | null;
  currency: string | null;
  processed: boolean | null;
  processed_at: string | null;
  processing_error: string | null;
  created_at: string | null;
};

export type Period = "7d" | "30d" | "90d" | "all";
