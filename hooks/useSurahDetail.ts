import { useEffect, useState } from 'react';
import { fetchSurahDetail } from '@/lib/api';

export function useSurahDetail(nomor: number) {
  const [surah, setSurah] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nomor) return;
    
    fetchSurahDetail(nomor)
      .then(setSurah)
      .catch((err) => {
        console.error(`Error fetching surah ${nomor}:`, err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [nomor]);

  return { surah, loading, error };
}
