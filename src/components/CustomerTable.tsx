import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronUp, ChevronDown, Filter, X } from 'lucide-react';
import { Customer, CustomerStatus, SortDirection } from '../types';
import { customers } from '../data/mockData';

type SortKey = 'name' | 'company' | 'plan' | 'mrr' | 'status' | 'lastActive';

const statusColors: Record<CustomerStatus, string> = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  trial: 'bg-blue-50 text-blue-700 border-blue-200',
  churned: 'bg-rose-50 text-rose-700 border-rose-200',
  paused: 'bg-amber-50 text-amber-700 border-amber-200',
};

const statusFilters: { value: CustomerStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'trial', label: 'Trial' },
  { value: 'churned', label: 'Churned' },
  { value: 'paused', label: 'Paused' },
];

export default function CustomerTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');
  const [showFilters, setShowFilters] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(c => c.status === statusFilter);
    }

    result.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name': cmp = a.name.localeCompare(b.name); break;
        case 'company': cmp = a.company.localeCompare(b.company); break;
        case 'plan': cmp = a.plan.localeCompare(b.plan); break;
        case 'mrr': cmp = a.mrr - b.mrr; break;
        case 'status': cmp = a.status.localeCompare(b.status); break;
        case 'lastActive': cmp = a.lastActive.localeCompare(b.lastActive); break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [search, statusFilter, sortKey, sortDir]);

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ChevronUp size={12} className="text-slate-300" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-violet-600" />
      : <ChevronDown size={12} className="text-violet-600" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-slate-200"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 flex-1 sm:max-w-xs">
              <Search size={14} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none w-full"
                aria-label="Search customers"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600" aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg border transition-colors ${showFilters ? 'border-violet-300 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              aria-label="Toggle filters"
              aria-expanded={showFilters}
            >
              <Filter size={16} />
            </button>
          </div>
          <p className="text-xs text-slate-500">{filteredCustomers.length} customers</p>
        </div>

        {/* Filter chips */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-1.5 pt-3">
                {statusFilters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setStatusFilter(f.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                      ${statusFilter === f.value
                        ? 'bg-violet-100 text-violet-700 border-violet-200'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="border-b border-slate-100">
              {[
                { key: 'name' as SortKey, label: 'Customer' },
                { key: 'company' as SortKey, label: 'Company' },
                { key: 'plan' as SortKey, label: 'Plan' },
                { key: 'mrr' as SortKey, label: 'MRR' },
                { key: 'status' as SortKey, label: 'Status' },
                { key: 'lastActive' as SortKey, label: 'Last Active' },
              ].map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 text-xs font-medium text-slate-500 cursor-pointer hover:text-slate-700 select-none"
                  onClick={() => handleSort(col.key)}
                  role="columnheader"
                  aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    <SortIcon column={col.key} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <p className="text-slate-500 text-sm">No customers match your filters.</p>
                  <button
                    onClick={() => { setSearch(''); setStatusFilter('all'); }}
                    className="mt-2 text-sm text-violet-600 hover:text-violet-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </td>
              </tr>
            ) : (
              filteredCustomers.slice(0, 20).map((customer, i) => (
                <motion.tr
                  key={customer.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, delay: i * 0.02 }}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-900">{customer.name}</p>
                      <p className="text-xs text-slate-500">{customer.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{customer.company}</td>
                  <td className="px-4 py-3 text-slate-700">{customer.plan}</td>
                  <td className="px-4 py-3 text-slate-900 font-medium">${customer.mrr}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[customer.status]}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{customer.lastActive}</td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {filteredCustomers.length > 20 && (
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing 20 of {filteredCustomers.length}</p>
          <button className="text-xs text-violet-600 font-medium hover:text-violet-700">View all</button>
        </div>
      )}
    </motion.div>
  );
}
