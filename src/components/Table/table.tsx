import React, {useCallback} from 'react';
import { Typography } from '@/components/Typography';
import styles from './table.module.scss';

type TableContext = {
    refetch?: () => void;
    onUserDetails?: (id: number) => void;
    onPaymentDetails?: (id: number) => void;
}

export type TableColumn<T extends Record<string, unknown>> = {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (
        item: T,
        value: T[keyof T],
        context?: TableContext
    ) => React.ReactNode;
    accessor?: string | ((item: T) => T[keyof T]);
};

export type UniversalTableProps<T extends Record<string, unknown>> = {
    data: T[];
    columns: TableColumn<T>[];
    loading?: boolean;
    error?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    onSortChange?: (column: string) => void;
    activeKey?: string | null;
    tableClassName?: string;
    headerClassName?: string;
    rowClassName?: string;
    sortIcon?: (column: string) => React.ReactNode;
    context?: TableContext;
};

export const Table = React.memo(<T extends Record<string, unknown>>({
                                                             data = [],
                                                             columns,
                                                             loading = false,
                                                             error,
                                                             sortBy,
                                                             sortDirection,
                                                             onSortChange,
                                                             activeKey,
                                                             tableClassName = '',
                                                             headerClassName = '',
                                                             rowClassName = '',
                                                             sortIcon,
                                                             context,
                                                         }: UniversalTableProps<T>) => {
    const handleSortClick = useCallback(
        (column: string, sortable: boolean) => {
            if (sortable && onSortChange) {
                onSortChange(column);
            }
        },
        [onSortChange]
    );

    const renderCellValue = useCallback(
        (item: T, column: TableColumn<T>): React.ReactNode => {
            let value: T[keyof T];


            if (typeof column.accessor === 'function') {
                value = column.accessor(item);
            } else if (column.accessor) {
                value = item[column.accessor as keyof T];
            } else {
                value = item[column.key as keyof T];
            }

            // Use custom render function if provided
            if (column.render) {
                return column.render(item, value, context);
            }

            // Format dates
            if (value instanceof Date) {
                return value.toLocaleDateString('en-US');
            }
            if (typeof value === 'string' && !isNaN(Date.parse(value))) {
                return new Date(value).toLocaleDateString('ru-RU');
            }

            if (typeof value === 'object' && value !== null) {
                try {
                    return JSON.stringify(value);
                } catch {
                    return String(value);
                }
            }

            // Final fallback for enums, symbols, or other types
            return String(value);
        },
        [context]
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <div className={`${styles.tableWrapper} ${tableClassName}`}>
                <table className={styles.table} style={{ width: '100%' }}>
                    <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={headerClassName}
                                onClick={() => handleSortClick(column.key, column.sortable || false)}
                                style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                            >
                                <Typography variant="h2">
                                    {column.label}
                                    {column.sortable && sortIcon && sortIcon(column.key)}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id} className={rowClassName}>
                            {columns.map((column) => (
                                <td key={`${item.id || index}-${column.key}`}>
                                    {renderCellValue(item, column)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});