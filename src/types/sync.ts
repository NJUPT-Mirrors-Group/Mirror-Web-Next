export type MirrorSyncData = {
  name: string;
  is_master: boolean;
  status: string;
  last_update: string;
  last_update_ts: number;
  last_started: string;
  last_started_ts: number;
  last_ended: string;
  last_ended_ts: number;
  next_schedule: string;
  next_schedule_ts: number;
  upstream: string;
  size: string;
};
export type MirrorSyncList = MirrorSyncData[];
