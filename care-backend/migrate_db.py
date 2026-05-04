"""
CARE Database Migration
========================
Run this ONCE to add missing columns to existing care.db
Usage: python migrate_db.py
"""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "care.db")

def migrate():
    if not os.path.exists(DB_PATH):
        print(f"[MIGRATE] No database found at {DB_PATH}")
        print("[MIGRATE] Run app.py first to create the database, then run this script.")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Get existing columns
    cursor.execute("PRAGMA table_info(calls)")
    existing_cols = [row[1] for row in cursor.fetchall()]
    print(f"[MIGRATE] Existing columns: {existing_cols}")

    # Columns to add if missing
    new_columns = [
        ("agent_transcript", "TEXT"),
        ("grade",            "TEXT"),
        ("critical_fail",    "INTEGER DEFAULT 0"),
        ("sentiment_notes",  "TEXT"),
    ]

    added = []
    for col_name, col_type in new_columns:
        if col_name not in existing_cols:
            try:
                cursor.execute(f"ALTER TABLE calls ADD COLUMN {col_name} {col_type}")
                added.append(col_name)
                print(f"[MIGRATE] ✅ Added column: {col_name}")
            except Exception as e:
                print(f"[MIGRATE] ⚠ Could not add {col_name}: {e}")
        else:
            print(f"[MIGRATE] ✓ Column already exists: {col_name}")

    conn.commit()
    conn.close()

    if added:
        print(f"\n[MIGRATE] Done — added {len(added)} column(s): {', '.join(added)}")
    else:
        print("\n[MIGRATE] Done — no changes needed")

if __name__ == "__main__":
    migrate()