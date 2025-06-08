import {Dropdown, DropdownItem} from '@/components/Dropdown/Dropdown'
import {Button} from '@/components/Button/Button'
import styles from './dps.module.scss'
import {InfoModal} from '@/components/InfoModal/InfoModal'
import {Typography} from '@/components/Typography'

import {
    User,
    useRemoveUserMutation,
} from '@/generated/graphql'
import {useModal} from '@/libs/hooks/useModal'
import Block from '@/assets/icons/components/Block'
import MoreHorizontal from '@/assets/icons/components/MoreHorizontal'
import PersonRemove from "@/assets/icons/components/PersonRemove";
import UserBan from "@/features/BanAndUnban/UserBan";
import UnBlock from "@/assets/icons/components/UnBlock";
import {useState} from "react";


type Props = {
    user: User
    refetch: () => void
    onUserDetails: (userId: number) => void
}

const DropdownSelect = ({user, refetch, onUserDetails}: Props) => {
    const [banModalOpen, setBanModalOpen] = useState(false);
    const {
        openModal: openDeleteModal,
        isOpen: deleteIsOpen,
        closeModal: closeDeleteModal,
    } = useModal()
    const [deleteUser] = useRemoveUserMutation()

    const userDelete = async (userId: number) => {
        try {
            await deleteUser({variables: {userId}})
            closeDeleteModal()
        } catch (error) {
            console.log(error)
        }
    }

    const handleMoreInfo = () => {
        onUserDetails(user.id)

    }
    return (
        <>
            <div className={styles.menu}>
                <Dropdown align={'end'} trigger={<div className={styles.ellipse}>...</div>}>
                    <DropdownItem>
                        <Button variant={'link'} onClick={openDeleteModal}>
                            <div className={styles.icon}>
                                <PersonRemove/>
                                Delete User
                            </div>
                        </Button>
                    </DropdownItem>
                    <DropdownItem>
                        <Button
                            variant={'link'}
                            onClick={() => setBanModalOpen(true)}
                        >
                            <div className={styles.icon}>
                                {user.userBan ? <Block /> : <UnBlock />}
                                {user.userBan ? 'Unban User' : 'Ban User'}
                            </div>
                        </Button>
                    </DropdownItem>
                    <DropdownItem>
                        <Button variant={'link'} onClick={handleMoreInfo}>
                            <div className={styles.icon}>
                                <MoreHorizontal/>
                                More Information
                            </div>
                        </Button>
                    </DropdownItem>
                </Dropdown>
            </div>

            <InfoModal modalTitle={'DELETE USER '} onClose={closeDeleteModal} open={deleteIsOpen}>
                <div className={styles.delete}>
                    <Typography variant={'body2'}>Are you sure you want to delete {user.userName}?</Typography>
                    <div className={styles.btn}>
                        <Button onClick={() => userDelete(user.id)}>YES</Button>
                        <Button variant={'outline'} onClick={closeDeleteModal}>NO</Button>
                    </div>
                </div>
            </InfoModal>

            <UserBan
                user={user}
                refetch={refetch}
                isExternallyControlled={true}
                externalIsOpen={banModalOpen}
                onExternalClose={() => setBanModalOpen(false)}
            />
        </>
    )
}

export default DropdownSelect
