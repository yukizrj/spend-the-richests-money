CREATE TABLE IF NOT EXISTS daily_scores (
  day TEXT NOT NULL,
  player_id TEXT NOT NULL,
  name TEXT NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  purchase_count INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (day, player_id)
);

CREATE INDEX IF NOT EXISTS idx_daily_scores_ranking
ON daily_scores (day, score DESC, updated_at ASC);
