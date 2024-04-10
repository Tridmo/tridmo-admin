export default function getTimeDifference(created_at: string): string {
    const currentTime = new Date();
    const createdAtTime = new Date(created_at);
    const differenceInSeconds = Math.floor((currentTime.getTime() - createdAtTime.getTime()) / 1000);

    if (differenceInSeconds < 60) {
        return differenceInSeconds < 1
            ? `just now`
            : `${differenceInSeconds} second${differenceInSeconds === 1 ? '' : 's'} ago`
    } else if (differenceInSeconds < 3600) {
        const minutes = Math.floor(differenceInSeconds / 60);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (differenceInSeconds < 86400) {
        const hours = Math.floor(differenceInSeconds / 3600);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (differenceInSeconds < 2592000) { // 30 days
        const days = Math.floor(differenceInSeconds / 86400);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (differenceInSeconds < 31536000) { // 365 days
        const months = Math.floor(differenceInSeconds / 2592000);
        return `${months} month${months === 1 ? '' : 's'} ago`;
    } else {
        const years = Math.floor(differenceInSeconds / 31536000);
        return `${years} year${years === 1 ? '' : 's'} ago`;
    }
}
