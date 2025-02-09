import Link from 'next/link';

import styles from './not-found.module.css';
import { BLOG_TITLE } from '@/constants';

export const metadata = {
    title: `404 Not Found • ${BLOG_TITLE}`,
    description: '404 Not Found'
}

export default function NotFound() {
    return (
        <div className={styles.wrapper}>
            <h2>404 Not Found </h2>
            < p > Could not find requested resource </p>
            < Link href="/" >Return Home</Link>
        </div>
    )
}