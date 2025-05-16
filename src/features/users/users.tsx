'use client'
import {SortDirection, useGetUsersQuery, UserBlockStatus} from "@/generated/graphql";
import styles from "./users.module.scss"
import DropdownSelect from "@/components/DropdownSelect/DropdownSelect";

import {Button} from "@/components/Button/Button";

import {Block} from "@/assets/icons/components";


const Users = () => {

        const {data, loading, error, refetch} = useGetUsersQuery({
            variables: {
                pageSize: 10,
                pageNumber: 1,
                sortBy: "createdAt",
                sortDirection: SortDirection.Desc,
                searchTerm: "",
                statusFilter: UserBlockStatus.All
            }
        });


        if (loading) return <div>Loading...</div>;
       if (error) return <div>Error: {error.message}</div>;

        return (
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Profile link</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.getUsers.users.map((user) => (
                        <tr key={user.id} style={{color: "wheat"}} className={styles.users}>
                            <td>{user.id}</td>
                            {user.userBan ? (
                                <td>
                                <Block/>
                                {user.userName}</td>
                            ) : <td>{user.userName}</td>}
                            <td>{user.userName}</td>
                            <td>{user.userName}</td>
                            <td> {new Date(user.createdAt).toLocaleDateString('ru-RU')}</td>
                            <td><DropdownSelect user={user} refetch={refetch}/></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className={styles.pagination}>
                    <Button variant={"primary"}>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                    <span>...</span>
                    <Button>55</Button>
                    <select>
                        <option>Show 100 on page</option>
                    </select>
                </div>
            </div>
        );

    }
;
export default Users
