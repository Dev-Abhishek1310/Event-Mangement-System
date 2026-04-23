import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../lib/cart';

const linkCls = ({ isActive }) =>
  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors ' +
  (isActive ? 'bg-ink-100 text-ink-900' : 'text-ink-600 hover:text-ink-900 hover:bg-ink-50');

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/50 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-500 to-accent-700 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-accent-600 font-bold text-white text-lg">E</span>
          </div>
          <span className="font-display text-2xl tracking-tighter bg-gradient-to-br from-ink-900 to-ink-600 bg-clip-text text-transparent font-bold">Eventix</span>
        </Link>
        <a href="https://shorturl.at/fghsw" target="_blank" rel="noreferrer" className="text-[10px] bg-gold-50 text-gold-700 px-2 py-1 rounded-full border border-gold-200 font-bold ml-2 transition-all hover:bg-gold-100 uppercase tracking-wider">System Map</a>

        <nav className="hidden items-center gap-2 sm:flex">
          {(!user || user.role === 'user') && (
            <>
              <NavLink to="/" end className={linkCls}>Services</NavLink>
              <NavLink to="/orders" className={linkCls}>My Bookings</NavLink>
              <NavLink to="/guest-list" className={linkCls}>Guests</NavLink>
            </>
          )}
          {user?.role === 'vendor' && (
            <>
              <NavLink to="/vendor" end className={linkCls}>Dashboard</NavLink>
              <NavLink to="/vendor/products" className={linkCls}>Inventory</NavLink>
              <NavLink to="/vendor/orders" className={linkCls}>Orders</NavLink>
            </>
          )}
          {user?.role === 'admin' && (
            <>
              <NavLink to="/admin" end className={linkCls}>Control Center</NavLink>
              <NavLink to="/admin/maintain-users" className={linkCls}>Users</NavLink>
              <NavLink to="/admin/maintain-vendors" className={linkCls}>Vendors</NavLink>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {(!user || user.role === 'user') && (
            <Link
              to="/cart"
              className="relative group p-2 text-ink-600 hover:text-accent-600 transition-colors"
              aria-label="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent-600 px-1.5 text-[10px] font-bold text-white shadow-lg shadow-accent-500/30">
                  {count}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-ink-100">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-ink-400 font-bold uppercase tracking-widest leading-none">Logged as</span>
                <span className="text-xs text-ink-900 font-semibold">{user.name}</span>
              </div>
              <button 
                onClick={logout} 
                className="px-4 py-2 bg-ink-900 hover:bg-accent-700 text-white rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-ink-900/10 active:scale-95"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-semibold text-ink-600 hover:text-ink-900 px-4 py-2">Login</Link>
              <Link to="/signup" className="px-5 py-2.5 bg-accent-600 hover:bg-accent-700 text-white rounded-full text-sm font-bold shadow-lg shadow-accent-600/20 transition-all hover:-translate-y-0.5 active:translate-y-0">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
