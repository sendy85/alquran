import { useEffect, useState } from 'react';
import { fetchJuzDetail } from '@/lib/api';

export function useJuzDetail(juz: number) {
  const [juzData, setJuzData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!juz || juz < 1 || juz > 30) {
      setError('Juz tidak valid');
      setLoading(false);
      return;
    }

    fetchJuzDetail(juz)
      .then(setJuzData)
      .catch((err) => {
        console.error(`Error fetching juz ${juz}:`, err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [juz]);

  return { juzData, loading, error };
}
