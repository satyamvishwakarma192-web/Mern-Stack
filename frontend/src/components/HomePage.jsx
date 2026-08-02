import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [index, setIndex] = useState(0);
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const startY = useRef(null);
  const lock = useRef(false);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    // fetch public feed
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/food/public');
        if (!mounted) return;
        const items = res.data.foodItems || [];
        // normalize items to expected shape
        const normalized = items.map((it) => ({
          id: it._id,
          partner: it.foodPartner?.Name || it.foodPartner?.OwnerName || 'Partner',
          title: it.name || '',
          description: it.description || '',
          imageUrl: it.imageUrl || '',
          video: it.video || '',
          likes: it.likes || 0,
          comments: it.comments || 0,
        }));
        setFeedItems(normalized.length ? normalized : []);
      } catch (err) {
        console.error('Failed to load feed', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const total = feedItems.length || 1;

  useEffect(() => {
    // handle keyboard navigation
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') next();
      if (e.key === 'ArrowUp' || e.key === 'PageUp') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, feedItems]);

  useEffect(() => {
    // play current video, pause others
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === index) {
        el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [index, feedItems]);

  function clamp(i) {
    if (feedItems.length === 0) return 0;
    if (i < 0) return feedItems.length - 1;
    if (i >= feedItems.length) return 0;
    return i;
  }

  function next() {
    if (lock.current) return;
    lock.current = true;
    setIndex((i) => clamp(i + 1));
    setTimeout(() => (lock.current = false), 400);
  }
  function prev() {
    if (lock.current) return;
    lock.current = true;
    setIndex((i) => clamp(i - 1));
    setTimeout(() => (lock.current = false), 400);
  }

  function onWheel(e) {
    if (Math.abs(e.deltaY) < 10) return;
    if (e.deltaY > 0) next();
    else prev();
  }

  function onTouchStart(e) {
    startY.current = e.touches[0].clientY;
  }
  function onTouchEnd(e) {
    if (startY.current == null) return;
    const endY = e.changedTouches[0].clientY;
    const diff = startY.current - endY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    startY.current = null;
  }

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">Loading feed…</div>
    );
  }

  if (!feedItems.length) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">No reels available</div>
    );
  }

  return (
    <div className="h-screen w-screen bg-black text-white overflow-hidden">
      <div
        ref={containerRef}
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="h-full w-full relative"
      >
        <div
          className="absolute inset-0 transition-transform duration-400"
          style={{ transform: `translateY(-${index * 100}vh)` }}
        >
          {feedItems.map((item, i) => (
            <section key={item.id} className="h-screen w-screen snap-start relative flex items-end justify-start">
              <div className="absolute inset-0">
                {item.video ? (
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    src={item.video}
                    className="h-full w-full object-cover"
                    playsInline
                    muted
                    loop
                    controls={false}
                    preload="auto"
                  />
                ) : (
                  <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              <div className="relative z-10 p-6 pb-12 max-w-lg">
                <p className="text-xs uppercase tracking-wider text-orange-300">{item.partner}</p>
                <h2 className="mt-2 text-3xl font-bold">{item.title}</h2>
                <p className="mt-3 text-sm text-white/90 max-w-md">{item.description}</p>
                <div className="mt-6 flex items-center gap-3">
                  <button className="rounded-full bg-white/10 px-3 py-2 text-sm">{item.likes.toLocaleString()} ♥</button>
                  <button className="rounded-full bg-white/10 px-3 py-2 text-sm">{item.comments} comments</button>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex flex-col gap-3">
          <button onClick={prev} className="rounded-full bg-black/40 p-3">↑</button>
          <button onClick={next} className="rounded-full bg-black/40 p-3">↓</button>
        </div>

        <div className="absolute left-4 top-6 z-20">
          <div className="rounded-full bg-black/40 px-4 py-2 text-sm">Reels</div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-sm text-white/80">
          {index + 1} / {feedItems.length}
        </div>
      </div>
    </div>
  );
}

