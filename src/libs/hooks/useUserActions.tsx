import {useBanUserMutation, useRemoveUserMutation, useUnBanUserMutation} from "@/generated/graphql";
import {useState} from "react";

interface User {
    id: number;
    userBan: boolean;
}

interface UseUserActionsProps {
    onSuccess?: () => void;
}

export const useUserActions = ({ onSuccess }: UseUserActionsProps = {}) => {
    const [customReason, setCustomReason] = useState<string>('')
    const [selectedReason, setSelectedReason] = useState<string>('')
    const [deleteUser] = useRemoveUserMutation()
    const [banUser] = useBanUserMutation()
    const [unbanUser] = useUnBanUserMutation()

    const userDelete = async (userId: number) => {
        try {
            await deleteUser({ variables: { userId } })
            onSuccess?.();
            return { success: true };
        } catch (error) {
            return { success: false, error }
        }
    };

    const toggleUserBan = async (user: User) => {
        try {
            if (user.userBan) {
                await unbanUser({ variables: { userId: user.id } })
            } else {
                const banReason = selectedReason === 'other' ? customReason : selectedReason
                await banUser({ variables: { userId: user.id ,banReason} })
            }
            onSuccess?.()
            return { success: true }
        } catch (error) {
            return { success: false, error }
        }
    }

    return {
        userDelete,
        toggleUserBan,
        setCustomReason,
        setSelectedReason
    }
}