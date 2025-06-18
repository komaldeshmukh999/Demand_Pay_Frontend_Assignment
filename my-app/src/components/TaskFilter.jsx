import React from 'react';

export default function TaskFilter({ filter, onFilterChange }) {
  return (
    <div className="filter-group">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>
      <button
       className={filter === 'pending' ? 'active' : ''}
        onClick={() => onFilterChange('pending')}
      >
        Pending
      </button>
    </div>
  );
}
