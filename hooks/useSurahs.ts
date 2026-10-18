import { useEffect, useState } from 'react';
import { fetchSurahList } from '@/lib/api';

export function useSurahs() {
  const [surahs, setSurahs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSurahList()
      .then(setSurahs)
      .catch((err) => {
        console.error('Error fetching surahs:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { surahs, loading, error };
}
