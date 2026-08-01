import { useNavigate } from 'react-router-dom';
import { Scroller } from '@/components/ui/scroller-1';
import ProfileCard from '@/components/ui/profile-card';

const feedItems = [
  {
    id: 1,
    partner: 'Spice Route Kitchen',
    title: 'Homemade Tandoori Wrap',
    description: 'Freshly grilled paneer tucked into warm flatbread with house chutney.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    likes: 430,
    comments: 28,
  },
  {
    id: 2,
    partner: 'GreenLeaf Meals',
    title: 'Seasonal Salad Bowl',
    description: 'Crisp greens, roasted veggies and tahini dressing served in a reusable bowl.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    likes: 298,
    comments: 16,
  },
  {
    id: 3,
    partner: 'Urban Bites',
    title: 'Street Style Burger',
    description: 'Juicy plant-based patty with caramelized onions and smoky sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1555992336-03a23c4a0369?auto=format&fit=crop&w=1200&q=80',
    likes: 512,
    comments: 42,
  },
  {
    id: 4,
    partner: 'Sweet Tooth',
    title: 'Mango Cheesecake',
    description: 'Silky no-bake cheesecake topped with fresh mango slices.',
    imageUrl: 'https://images.unsplash.com/photo-1498579809087-ef1e558fd1ef?auto=format&fit=crop&w=1200&q=80',
    likes: 360,
    comments: 21,
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-6 sm:px-6">
      <header className="mx-auto flex max-w-6xl flex-col gap-5 px-2 sm:px-0">
        <div className="flex flex-col gap-4 rounded-[32px] bg-white/90 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Welcome back</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl text-slate-900">Your Food Reels</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Scroll through newly uploaded reels from food partners. Each reel shows what is available now, with smooth snap scrolling and clean card detail.
            </p>
          </div>

          <div className="grid gap-3 sm:auto-cols-fr sm:grid-flow-col sm:grid">
            <button
              type="button"
              onClick={() => navigate('/user/login')}
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Back to login
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-6xl px-2 sm:px-0">
        <section className="rounded-[32px] bg-white/90 p-4 shadow-xl shadow-slate-200/60 backdrop-blur-xl sm:p-6 relative overflow-hidden">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
            <div className="rounded-[28px] bg-slate-950/5 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Live stats</p>
              <div className="mt-4 space-y-4">
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Reels served</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">680</p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Food partners</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">42+</p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Happy users</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">1,920</p>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Featured feed</p>
                  <h2 className="text-2xl font-semibold text-slate-900">Food partner reel stream</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {feedItems.length} reels
                </span>
              </div>
              <div className="mb-6">
                <ProfileCard />
              </div>
            </div>
          </div>

          <Scroller overflow="y" height="calc(100vh - 220px)" withButtons childrenContainerClassName="gap-6 snap-y snap-mandatory">
            {feedItems.map((item) => (
              <article
                key={item.id}
                className="snap-start overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950/5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="relative h-[480px] overflow-hidden bg-slate-900">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-700 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent px-5 py-4 text-white">
                    <p className="text-sm font-medium uppercase tracking-[0.32em] text-orange-300">{item.partner}</p>
                    <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-2 max-w-xl text-sm text-slate-100/90">{item.description}</p>
                  </div>
                </div>
                <div className="space-y-3 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
                    <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-800">{item.likes.toLocaleString()} likes</span>
                    <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-800">{item.comments} comments</span>
                  </div>
                  <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">
                    Food partner uploaded this reel to showcase the latest menu item and help users discover daily specials.
                  </div>
                </div>
              </article>
            ))}
          </Scroller>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
