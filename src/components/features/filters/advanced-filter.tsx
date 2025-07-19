"use client";

import { useState } from "react";
import { FilterLines, ChevronDown, X } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { BadgeWithDot } from "@/components/base/badges/badges";

interface FilterOption {
    id: string;
    label: string;
    type: 'select' | 'input' | 'date';
    options?: Array<{ value: string; label: string }>;
    value?: string;
}

interface AdvancedFilterProps {
    filters: FilterOption[];
    onFiltersChange: (filters: Record<string, string>) => void;
    activeFilters: Record<string, string>;
}

export const AdvancedFilter = ({ filters, onFiltersChange, activeFilters }: AdvancedFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState(activeFilters);

    const activeFilterCount = Object.keys(activeFilters).filter(key => activeFilters[key]).length;

    const handleFilterChange = (filterId: string, value: string) => {
        const newFilters = { ...localFilters, [filterId]: value };
        setLocalFilters(newFilters);
    };

    const applyFilters = () => {
        onFiltersChange(localFilters);
        setIsOpen(false);
    };

    const clearFilters = () => {
        const clearedFilters = Object.keys(localFilters).reduce((acc, key) => {
            acc[key] = '';
            return acc;
        }, {} as Record<string, string>);
        setLocalFilters(clearedFilters);
        onFiltersChange(clearedFilters);
    };

    const removeFilter = (filterId: string) => {
        const newFilters = { ...activeFilters, [filterId]: '' };
        onFiltersChange(newFilters);
    };

    return (
        <div className="relative">
            <Button
                size="md"
                color="secondary"
                iconLeading={FilterLines}
                iconTrailing={ChevronDown}
                onClick={() => setIsOpen(!isOpen)}
            >
                Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(activeFilters).map(([key, value]) => {
                        if (!value) return null;
                        const filter = filters.find(f => f.id === key);
                        return (
                            <BadgeWithDot
                                key={key}
                                color="gray"
                                size="sm"
                                className="flex items-center gap-1"
                            >
                                {filter?.label}: {value}
                                <button
                                    onClick={() => removeFilter(key)}
                                    className="ml-1 hover:text-error-600"
                                >
                                    <X className="size-3" />
                                </button>
                            </BadgeWithDot>
                        );
                    })}
                    <Button
                        size="sm"
                        color="tertiary"
                        onClick={clearFilters}
                    >
                        Clear all
                    </Button>
                </div>
            )}

            {/* Filter Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 z-50 mt-2 w-96 rounded-xl border border-secondary bg-primary p-6 shadow-lg">
                    <div className="space-y-4">
                        {filters.map((filter) => (
                            <div key={filter.id}>
                                <label className="block text-sm font-medium text-secondary mb-2">
                                    {filter.label}
                                </label>
                                {filter.type === 'select' && filter.options && (
                                    <select
                                        className="w-full rounded-lg border border-secondary bg-primary px-3 py-2 text-sm text-secondary focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                                        value={localFilters[filter.id] || ''}
                                        onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                                    >
                                        <option value="">All</option>
                                        {filter.options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {filter.type === 'input' && (
                                    <Input
                                        value={localFilters[filter.id] || ''}
                                        onChange={(e) => handleFilterChange(filter.id, e?.target?.value || '')}
                                        placeholder={`Enter ${filter.label.toLowerCase()}`}
                                    />
                                )}
                                {filter.type === 'date' && (
                                    <Input
                                        type="date"
                                        value={localFilters[filter.id] || ''}
                                        onChange={(e) => handleFilterChange(filter.id, e?.target?.value || '')}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-secondary">
                        <Button
                            size="sm"
                            color="tertiary"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="sm"
                            color="primary"
                            onClick={applyFilters}
                        >
                            Apply Filters
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};