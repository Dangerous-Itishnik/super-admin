import {useBanUserMutation, useUnBanUserMutation} from "@/generated/graphql";
import {useModal} from "@/libs/hooks/useModal";
import React, {useState} from "react";
import {InfoModal} from "@/components/InfoModal/InfoModal";
import styles from "@/features/users/DropdownSelect/dps.module.scss";
import {Typography} from "@/components/Typography";
import {SelectCustom} from "@/components/Select/select";
import {Input} from "@/components/Input";
import {Button} from "@/components/Button/Button";

type UserBanProps = {
    id: number;
    userName: string;
    userBan?: { createdAt: string; reason: string } | null;
}
type Props = {
    user: UserBanProps;
    refetch?: () => void;
    triggerButton?: React.ReactNode;
    isExternallyControlled?: boolean;
    externalIsOpen?: boolean;
    onExternalClose?: () => void;
}

const UserBan = ({
                     user,
                     refetch,
                     triggerButton,
                     isExternallyControlled = false,
                     externalIsOpen = false,
                     onExternalClose}:Props) => {
    const [customReason, setCustomReason] = useState<string>('')
    const [selectedReason, setSelectedReason] = useState<string>('')
    const { isOpen: internalIsOpen, openModal, closeModal } = useModal()
    const [banUser] = useBanUserMutation();
    const [unbanUser] = useUnBanUserMutation();
    const isOpen = isExternallyControlled ? externalIsOpen : internalIsOpen;
    const handleClose = isExternallyControlled ? onExternalClose : closeModal;

    const handleBan = async () => {
        try {
            if (user.userBan) {
                await unbanUser({ variables: { userId: user.id } });
            } else {
                const banReason = selectedReason === 'other' ? customReason : selectedReason;
                if (!banReason) {
                    console.error('Ban reason is required');
                    return;
                }
                await banUser({ variables: { userId: user.id, banReason }});
            }

        } catch (error) {
            console.error('Error banning/unbanning user:', error);
        } finally {
            refetch();
            handleClose();
        }
    };
    const options = [
        {value: 'bad_behavior', label: 'Bad behavior'},
        {value: 'advertising', label: 'Advertising placement'},
        {value: 'other', label: 'Another reason'},
    ]

    return (
        <>
            {triggerButton && !isExternallyControlled && (
                <div
                    role="button"
                    onClick={openModal}
                    onKeyDown={(e) => e.key === 'Enter' && openModal()}
                    tabIndex={0}
                    style={{cursor:'pointer'}}
                >
                    {triggerButton}
                </div>
            )}
            {isOpen && (
            <InfoModal modalTitle={user.userBan ? 'UNBAN USER' : 'BAN USER'} onClose={()=>handleClose} open={isOpen}>
                <div className={styles.ban}>
                    <Typography variant="body2">
                        Are you sure you want to {user.userBan ? 'un-ban' : 'ban'} {user.userName}?
                    </Typography>

                    {!user.userBan && (
                        <div>
                            <SelectCustom
                                options={options}
                                value={selectedReason}
                                onValueChange={setSelectedReason}
                                placeHolder="Select a reason"
                            />
                            {selectedReason === 'other' && (
                                <Input
                                    className={styles.input}
                                    value={customReason}
                                    type="text"
                                    label="Another reason"
                                    onChange={e => setCustomReason(e.currentTarget.value)}
                                />
                            )}
                        </div>
                    )}

                    <div className={styles.btn}>
                        <Button onClick={handleBan}>YES</Button>
                        <Button variant="outline" onClick={handleClose}>NO</Button>
                    </div>
                </div>
            </InfoModal>
                )
            }
        </>
    )
}
export default UserBan