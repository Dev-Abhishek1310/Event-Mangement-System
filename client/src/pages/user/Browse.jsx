import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, errorMessage } from '../../api/client';
import { PageShell, Spinner, EmptyState, ErrorState } from '../../components/ui';
import { CATEGORY_LABELS, UNIT_LABELS, formatINR } from '../../lib/format';
import { useCart } from '../../lib/cart';
import { useToast } from '../../context/ToastContext';

export default function Browse() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [q, setQ] = useState('');
  const { add } = useCart();
  const toast = useToast();

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const params = {};
      if (category) params.category = category;
      if (q) params.q = q;
      const { data } = await api.get('/api/products', { params });
      setItems(data.items);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [category]);

  const onAdd = (product) => {
    if (add(product, 1)) toast.success(`Added ${product.name}`);
  };

  return (
    <PageShell
      title="Plan your perfect event"
      subtitle="Discover top-tier catering, decor, photography, and venues. Curated excellence for every occasion."
    >
      {/* Filters & Search */}
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[2rem] shadow-premium border border-ink-100">
        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={!category} onClick={() => setCategory('')}>Explore All</FilterChip>
          {Object.entries(CATEGORY_LABELS).map(([val, label]) => (
            <FilterChip key={val} active={category === val} onClick={() => setCategory(val)}>
              {label}
            </FilterChip>
          ))}
        </div>
        
        <form
          className="flex items-center gap-2"
          onSubmit={e => { e.preventDefault(); load(); }}
        >
          <div className="relative group flex-1 md:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 group-focus-within:text-accent-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="What are you looking for?"
              className="input pl-10 bg-slate-50 border-transparent hover:bg-white hover:border-ink-200 transition-all"
            />
          </div>
          <button type="submit" className="btn-primary">Search</button>
        </form>
      </div>

      {loading && <Spinner />}
      {error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && items.length === 0 && (
        <EmptyState
          title="We couldn't find any matches"
          description="Try adjusting your search filters or browse other categories."
        />
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(p => (
            <article key={p._id} className="card card-hover group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                {/* Fallback image style */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-50 to-indigo-50">
                   <span className="font-display text-4xl opacity-10">{p.name[0]}</span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="badge bg-white/90 backdrop-blur text-ink-900 shadow-sm">
                    {CATEGORY_LABELS[p.category]}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col p-6 flex-1">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-display text-2xl text-ink-900 leading-tight group-hover:text-accent-600 transition-colors">{p.name}</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink-500 uppercase tracking-widest text-[10px]">
                      <div className="h-4 w-4 rounded-full bg-accent-100 grid place-items-center">
                        <svg className="w-2.5 h-2.5 text-accent-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>
                      </div>
                      {p.vendor?.businessName || p.vendor?.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl text-accent-700 font-bold">{formatINR(p.price)}</div>
                    <div className="text-[10px] font-bold uppercase tracking-tighter text-ink-400">{UNIT_LABELS[p.unit]}</div>
                  </div>
                </div>

                <p className="line-clamp-2 text-sm text-ink-600 leading-relaxed">{p.description}</p>

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-ink-100/50">
                  <Link to={`/products/${p._id}`} className="text-sm font-bold text-ink-400 hover:text-ink-900 transition-colors flex items-center gap-2">
                    Details 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </Link>
                  <button onClick={() => onAdd(p)} className="btn-primary px-8">Book Now</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </PageShell>
  );
}

function FilterChip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-full border px-3 py-1 text-sm transition-colors ' +
        (active
          ? 'border-ink-900 bg-ink-900 text-white'
          : 'border-ink-200 bg-white text-ink-700 hover:border-ink-300')
      }
    >
      {children}
    </button>
  );
}
