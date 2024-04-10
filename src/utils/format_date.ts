export default function formatDate(date: Date | string, include_time: boolean = false): string {

    const dt = new Date(date)

    const dd = dt.getDate()
    const mm = dt.getMonth() + 1
    const yyyy = dt.getFullYear()
    const hour = dt.getHours()
    const minutes = dt.getMinutes()

    let formatted = `${dd < 10 ? '0' + dd : dd}.${mm < 10 ? '0' + mm : mm}.${yyyy}`

    if (include_time) formatted += ` ${hour < 10 ? '0' + hour : hour}:${minutes < 10 ? '0' + minutes : minutes}`

    return formatted;
}