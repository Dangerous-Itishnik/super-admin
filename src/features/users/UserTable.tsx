import { User} from '@/generated/graphql'
import React from 'react'
import {useUsersTableConfig} from "@/features/UserDetails/configs";
import {Table, TableContext} from "@/components/Table/Table";
import {useAction} from "@/libs/hooks/useAction";



type UsersTableProps = {
    data: User[];
    context: TableContext;
    icon: (key: string) => React.ReactNode
    onChangeSortBy: (key: string) => void;
};

export const UsersTable = React.memo(
    React.forwardRef<HTMLTableElement, UsersTableProps>(({ data, context, icon, onChangeSortBy }, ref) => {
        const { columns } = useUsersTableConfig();
        const { activeKey, sort, sortBy } = useAction();

        return (
            <div ref={ref}>
                <Table
                    data={data}
                    columns={columns}
                    sortIcon={icon}
                    onSortChange={onChangeSortBy}
                    activeKey={activeKey}
                    sortBy={sortBy}
                    sortDirection={sort}
                    context={context}
                />
            </div>
        );
    })
);