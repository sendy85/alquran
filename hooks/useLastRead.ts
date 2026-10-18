import { useEffect, useState } from 'react';

interface LastRead {
  surah: number;
  ayat: number;
  timestamp: number;
}

const LAST_READ_KEY = 'alquran_last_read';

export function useLastRead() {
  const [lastRead, setLastRead] = useState<LastRead | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LAST_READ_KEY);
      if (stored) {
        setLastRead(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading last read:', err);
    }
    setLoaded(true);
  }, []);

  const updateLastRead = (surah: number, ayat: number) => {
    try {
      const record: LastRead = { surah, ayat, timestamp: Date.now() };
      setLastRead(record);
      localStorage.setItem(LAST_READ_KEY, JSON.stringify(record));
    } catch (err) {
      console.error('Error updating last read:', err);
    }
  };

  return { lastRead, updateLastRead, loaded };
}
