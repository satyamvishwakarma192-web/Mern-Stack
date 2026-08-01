import { useEffect, useState } from 'react';
import axios from 'axios';
import BubbleMenu from './ui/BubbleMenu';

const FoodPartnerProfile = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoFeedback, setVideoFeedback] = useState('');
  const [foodItem, setFoodItem] = useState({ name: '', description: '', price: '', imageUrl: '' });
  const [itemFeedback, setItemFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [listError, setListError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setVideoFile(file);
    setVideoFeedback(file ? `Selected video: ${file.name}` : '');
  };

  const handleVideoUpload = (event) => {
    event.preventDefault();
    if (!videoFile) {
      setVideoFeedback('Please choose a video file before uploading.');
      return;
    }
    setVideoFeedback(`Selected video ready for upload: ${videoFile.name}`);
  };

  const handleFoodChange = (event) => {
    const { name, value } = event.target;
    setFoodItem((prev) => ({ ...prev, [name]: value }));
  };

  const fetchFoodItems = async () => {
    setLoadingItems(true);
    setListError('');

    try {
      const response = await axios.get('http://localhost:3000/api/food/', {
        withCredentials: true,
      });

      setFoodItems(response?.data?.foodItems || []);
    } catch (error) {
      setListError(error?.response?.data?.message || error?.message || 'Unable to load food items.');
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const handleFoodSubmit = async (event) => {
    event.preventDefault();
    setItemFeedback('');

    if (!foodItem.name || !foodItem.price || !videoFile) {
      setItemFeedback('Please choose a video and fill in the item name and price.');
      return;
    }

    const formData = new FormData();
    formData.append('name', foodItem.name);
    formData.append('description', foodItem.description);
    formData.append('price', foodItem.price);
    formData.append('imageUrl', foodItem.imageUrl);
    formData.append('video', videoFile);

    setIsSubmitting(true);
    setItemFeedback('Uploading food item...');

    try {
      const response = await axios.post('http://localhost:3000/api/food/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response?.data?.food) {
        setItemFeedback(`Created food item: ${response.data.food.name}`);
        setFoodItem({ name: '', description: '', price: '', imageUrl: '' });
        setVideoFile(null);
        setVideoFeedback('');
        fetchFoodItems();
      } else {
        setItemFeedback('Food item created, but unable to read response.');
      }
    } catch (error) {
      setItemFeedback(error?.response?.data?.message || error?.message || 'Upload failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    setDeletingId(itemId);
    setListError('');
    try {
      await axios.delete(`http://localhost:3000/api/food/${itemId}`, {
        withCredentials: true,
      });
      setItemFeedback('Food item deleted successfully.');
      fetchFoodItems();
    } catch (error) {
      setListError(error?.response?.data?.message || error?.message || 'Unable to delete food item.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-6 sm:px-6">
      <header className="relative mx-auto max-w-6xl">
        <BubbleMenu
          logo={<span style={{ fontWeight: 700 }}>FP</span>}
          items={[
            { label: 'video', href: '#upload', ariaLabel: 'Upload video', rotation: -8, hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' } },
            { label: 'menu', href: '#create', ariaLabel: 'Create item', rotation: 8, hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' } },
            { label: 'orders', href: '#stats', ariaLabel: 'Orders', rotation: 8, hoverStyles: { bgColor: '#f59e0b', textColor: '#111111' } },
            { label: 'profile', href: '#profile', ariaLabel: 'Profile', rotation: 8, hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' } },
            { label: 'settings', href: '#settings', ariaLabel: 'Settings', rotation: -8, hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' } }
          ]}
          menuAriaLabel="Toggle partner navigation"
          menuBg="#ffffff"
          menuContentColor="#111111"
          useFixedPosition={true}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
          className="!top-24"
        />
      </header>

      <main className="mx-auto mt-20 max-w-6xl space-y-8">
        <section className="rounded-[32px] bg-white/90 p-6 shadow-xl shadow-slate-200/60 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-500">Partner dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Food Partner Profile</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600">
                Upload your latest reels, create food items, and keep your profile fresh for customers.
              </p>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Partner tools ready
            </div>
          </div>
        </section>

        <div className="masonry-grid">
          <section id="upload" className="masonry-card rounded-[32px] bg-white/90 p-6 shadow-xl shadow-slate-200/50">
            <div className="masonry-card__media rounded-[28px] bg-slate-100 overflow-hidden">
              <div className="masonry-card__media-content text-slate-500">Video preview area</div>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-slate-900">Upload a new video reel</h2>
            <p className="mt-2 text-sm text-slate-600">
              Share a short video from your kitchen, menu prep, or featured dish.
            </p>

            <form onSubmit={handleVideoUpload} className="mt-6 space-y-4">
              <label className="flex flex-col gap-2 text-sm text-slate-700">
                Select video file
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                />
              </label>
              {videoFile ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <p className="font-medium">Selected file:</p>
                  <p>{videoFile.name}</p>
                  <p>{Math.round(videoFile.size / 1024)} KB</p>
                </div>
              ) : null}
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Prepare upload
              </button>
            </form>
          </section>

          <section id="create" className="masonry-card rounded-[32px] bg-white/90 p-6 shadow-xl shadow-slate-200/50">
            <div className="masonry-card__media rounded-[28px] bg-slate-100 overflow-hidden">
              {foodItem.imageUrl ? (
                <img
                  src={foodItem.imageUrl}
                  alt={foodItem.name || 'Food preview'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="masonry-card__media-content text-slate-500">Food item image preview</div>
              )}
            </div>
            <h2 className="mt-6 text-xl font-semibold text-slate-900">Create a food item</h2>
            <p className="mt-2 text-sm text-slate-600">
              Add a new item to your food partner menu with one click.
            </p>

            <form onSubmit={handleFoodSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm text-slate-700">
                  Item name
                  <input
                    name="name"
                    value={foodItem.name}
                    onChange={handleFoodChange}
                    placeholder="Add an item name"
                    className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-700">
                  Price
                  <input
                    name="price"
                    value={foodItem.price}
                    onChange={handleFoodChange}
                    placeholder="e.g. 12.99"
                    className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm text-slate-700">
                Description
                <textarea
                  name="description"
                  value={foodItem.description}
                  onChange={handleFoodChange}
                  placeholder="Describe the dish"
                  className="min-h-[120px] rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-700">
                Image URL
                <input
                  name="imageUrl"
                  value={foodItem.imageUrl}
                  onChange={handleFoodChange}
                  placeholder="https://example.com/image.jpg"
                  className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900"
                />
              </label>
              {itemFeedback ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {itemFeedback}
                </div>
              ) : null}
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Uploading...' : 'Create food item'}
              </button>
            </form>
          </section>

          <section className="masonry-card rounded-[32px] bg-white/90 p-6 shadow-xl shadow-slate-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">My food items</h2>
                <p className="text-sm text-slate-600">See the menu items and uploaded reels you’ve created.</p>
              </div>
              {loadingItems ? (
                <span className="text-sm text-slate-500">Loading...</span>
              ) : null}
            </div>

            {listError ? (
              <div className="mt-5 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {listError}
              </div>
            ) : null}

            {foodItems.length === 0 && !loadingItems ? (
              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                You haven’t created any food items yet. Upload a video and create your first item.
              </div>
            ) : null}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {foodItems.map((item) => (
                <article key={item._id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-sm">
                  <div className="aspect-[16/9] overflow-hidden bg-slate-200">
                    {item.video ? (
                      <video src={item.video} controls className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-500">No video available</div>
                    )}
                  </div>
                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                        <p className="text-sm text-slate-500">${item.price?.toFixed(2)}</p>
                      </div>
                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">Live</span>
                    </div>
                    <p className="text-sm text-slate-600">{item.description || 'No description provided.'}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {item.imageUrl ? (
                        <a href={item.imageUrl} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100">
                          View image
                        </a>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item._id)}
                        disabled={deletingId === item._id}
                        className="inline-flex rounded-full bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
                      >
                        {deletingId === item._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="masonry-card rounded-[32px] shadow-xl shadow-slate-200/50">
            <div className="bento-grid">
              <div className="bento-tile bento-tile--large">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Quick stats</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900">Partner insights</p>
                <p className="mt-2 text-sm text-slate-600">Everything you need to track uploads, menu activity, and order velocity at a glance.</p>
              </div>

              <div className="bento-tile">
                <p className="text-sm text-slate-500">Reels uploaded</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">12</p>
              </div>

              <div className="bento-tile">
                <p className="text-sm text-slate-500">Active menu items</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">18</p>
              </div>

              <div className="bento-tile">
                <p className="text-sm text-slate-500">Today’s orders</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">9</p>
              </div>

              <div className="bento-tile bento-tile--span2">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Help</p>
                <p className="mt-2 text-sm text-slate-600">
                  Use the menu toggle to jump between partner actions and keep your account focused on uploads and menu management.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default FoodPartnerProfile;
