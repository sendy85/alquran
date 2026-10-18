import { useEffect, useState } from 'react';

interface Bookmark {
  surah: number;
  ayat: number;
  teksArab: string;
  teksIndonesia: string;
  timestamp: number;
}

const BOOKMARKS_KEY = 'alquran_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error loading bookmarks:', err);
    }
    setLoaded(true);
  }, []);

  const addBookmark = (bookmark: Omit<Bookmark, 'timestamp'>) => {
    try {
      const newBookmark = { ...bookmark, timestamp: Date.now() };
      const updated = [...bookmarks, newBookmark];
      setBookmarks(updated);
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error adding bookmark:', err);
    }
  };

  const removeBookmark = (surah: number, ayat: number) => {
    try {
      const updated = bookmarks.filter((b) => !(b.surah === surah && b.ayat === ayat));
      setBookmarks(updated);
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Error removing bookmark:', err);
    }
  };

  const isBookmarked = (surah: number, ayat: number) => {
    return bookmarks.some((b) => b.surah === surah && b.ayat === ayat);
  };

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, loaded };
}
