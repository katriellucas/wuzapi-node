// System endpoints types

export interface MemoryStats {
  alloc_mb: number;
  total_alloc_mb: number;
  sys_mb: number;
  num_gc: number;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime?: string;
  active_connections?: number;
  total_users?: number;
  connected_users?: number;
  logged_in_users?: number;
  memory_stats?: MemoryStats;
  goroutines?: number;
  version?: string;
}
