export function PageShell({ title, subtitle, actions, children }) {
  return (
    <main className="mx-auto max-w-container px-4 py-12 sm:px-6">
      {(title || actions) && (
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            {title && <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-ink-900 to-ink-600 bg-clip-text text-transparent">{title}</h1>}
            {subtitle && <p className="mt-4 text-lg text-ink-500 leading-relaxed font-medium">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      )}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {children}
      </div>
    </main>
  );
}

export function Spinner({ label = 'Setting the stage…' }) {
  return (
    <div className="grid place-items-center py-24">
      <div className="flex flex-col items-center gap-4 text-sm text-ink-500">
        <div className="relative">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-100 border-t-accent-600" />
          <div className="absolute inset-0 h-10 w-10 animate-pulse rounded-full bg-accent-600/10" />
        </div>
        <span className="font-bold uppercase tracking-widest text-[10px]">{label}</span>
      </div>
    </div>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="grid place-items-center rounded-[2rem] border-2 border-dashed border-ink-200 bg-white/50 backdrop-blur py-20 px-8 text-center shadow-inner">
      <div className="h-16 w-16 rounded-2xl bg-ink-50 grid place-items-center mb-6">
        <svg className="w-8 h-8 text-ink-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
      </div>
      <div className="font-display text-2xl text-ink-900 font-bold">{title}</div>
      {description && <p className="mt-2 max-w-sm text-ink-500 font-medium">{description}</p>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-red-100 bg-red-50/50 backdrop-blur p-6 text-sm text-red-900 max-w-lg mx-auto">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-red-100 grid place-items-center text-red-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </div>
        <div>
          <div className="font-bold uppercase tracking-wider text-[10px]">Attention Required</div>
          <div className="mt-0.5 text-red-800 font-medium">{message}</div>
        </div>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="mt-4 btn-danger w-full">
          Retry Action
        </button>
      )}
    </div>
  );
}

export function StatusBadge({ status, labels, tones }) {
  return (
    <span className={`badge ${tones?.[status] || 'bg-ink-100 text-ink-700'}`}>
      {labels?.[status] || status}
    </span>
  );
}

export function FieldError({ children }) {
  if (!children) return null;
  return <p className="mt-1 text-xs text-red-600">{children}</p>;
}
