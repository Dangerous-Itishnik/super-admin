import React, {useState} from 'react'
import {Dropdown, DropdownItem} from '@/components/Dropdown/Dropdown'
import {Button} from '@/components/Button/Button'

import styles from './dps.module.scss'
import {InfoModal} from '@/components/InfoModal/InfoModal'
import {Typography} from '@/components/Typography'
import {SelectCustom} from '@/components/select/select'
import {
    useBanUserMutation,
    User,
    useRemoveUserMutation,
    useUnBanUserMutation,
} from '@/generated/graphql'
import {useModal} from '@/libs/hooks/useModal'
import Block from '@/assets/icons/components/Block'
import MoreHorizontal from '@/assets/icons/components/MoreHorizontal'
import {Input} from '@/components/Input'
import PersonRemove from "@/assets/icons/components/PersonRemove";


type Props = {
    user: User
    refetch: () => void
    onUserDetails: (userId: number) => void
}

const DropdownSelect = ({user, refetch, onUserDetails}: Props) => {
    const [customReason, setCustomReason] = useState<string>('')
    const [selectedReason, setSelectedReason] = useState<string>('')
    const {openModal: openBanModel, isOpen: isBanOpen, closeModal: closeBanModel} = useModal()
    const {
        openModal: openDeleteModal,
        isOpen: deleteIsOpen,
        closeModal: closeDeleteModal,
    } = useModal()
    const [deleteUser] = useRemoveUserMutation()
    const [banUser] = useBanUserMutation()
    const [unbanUser] = useUnBanUserMutation()


    const userBan = async (userId: number) => {
        try {
            const banReason = selectedReason === 'other' ? customReason : selectedReason

            await banUser({
                variables: {
                    userId,
                    banReason,
                },
            })
            refetch()
            closeBanModel()
        } catch (error) {
            console.log(error)
        }
    }

    const userUnBan = async (userId: number) => {
        try {
            await unbanUser({
                variables: {
                    userId,
                },
            })
            refetch()
        } catch (error) {
            console.error('Error unbanning user:', error)
        }
    }

    const handleBan = async () => {
        if (user.userBan) {
            await userUnBan(user.id)
            closeBanModel()
        } else {
            await userBan(user.id)
            closeBanModel()
        }
    }

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

    const options = [
        {value: 'bad_behavior', label: 'Bad behavior'},
        {value: 'advertising', label: 'Advertising placement'},
        {value: 'other', label: 'Another reason'},
    ]
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
                        <Button onClick={openBanModel} variant={'link'}>
                            <div className={styles.icon}>
                            {!user.userBan ?
                                (<>
                                    <Block/> Ban User
                                </>)
                                : 'Un-ban User'}
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

            <InfoModal  modalTitle={'DELETE USER '} onClose={closeDeleteModal} open={deleteIsOpen}>
                <div  className={styles.delete}>
                <Typography variant={'body2'}>Are you sure you want to delete {user.userName}?</Typography>
                <div className={styles.btn}>
                <Button onClick={() => userDelete(user.id)}>YES</Button>
                <Button  variant={'outline'} onClick={closeDeleteModal}>NO</Button>
                </div>
                </div>
            </InfoModal>

            <InfoModal modalTitle={'BAN USER '} onClose={closeBanModel} open={isBanOpen}>
                <div className={styles.ban}>
                {user.userBan ? (
                    <Typography>Are you sure want to un-ban {user.userName}?</Typography>
                ) : (
                    <Typography variant={'body2'}>Are you sure you want to ban {user.userName}?</Typography>
                )}
                {!user.userBan && (
                    <div>
                        <SelectCustom
                            options={options}
                            value={selectedReason}
                            onValueChange={setSelectedReason}
                            placeHolder={'Select a reason'}
                        />
                        {selectedReason === 'other' && (
                            <Input
                                className={styles.input}
                                value={customReason}
                                type={'text'}
                                label={'Another reason'}
                                onChange={e => setCustomReason(e.currentTarget.value)}
                            />
                        )}
                    </div>
                )}
                    <div className={styles.btn}>
                <Button onClick={() => handleBan()}>YES</Button>
                <Button variant={'outline'} onClick={closeBanModel}>NO</Button>
                    </div>
                </div>
            </InfoModal>
        </>
    )
}

export default DropdownSelect
