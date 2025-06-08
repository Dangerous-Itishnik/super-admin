
import {UserBlockStatus} from "@/generated/graphql";

export const statusOptions = [
        {label: 'All', value: UserBlockStatus.All},
        {label: 'Blocked', value: UserBlockStatus.Blocked},
        {label: 'Unblocked', value: UserBlockStatus.Unblocked},
    ]
