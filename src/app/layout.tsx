import React from "react";
import NextTopLoader from 'nextjs-toploader'
import {Theme} from "@radix-ui/themes";

import '@/styles/_index.scss'

import styles from './layout.module.scss'

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <NextTopLoader color={'#397df6'}>
            {/*добавить компонент Providers*/}
            {/*<Providers>*/}
            <Theme className={styles.bodyContainer}>
                <h1>Header</h1>
            </Theme>
            {/*</Providers>*/}
        </NextTopLoader>
        </body>
        </html>
    );
}
