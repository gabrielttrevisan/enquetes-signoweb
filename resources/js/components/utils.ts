export const dateMask = (date) => {
    if (date && date !== '')
        return date.replace(/(\d{4})\-(\d{2})\-(\d{2})([a-zA-Z0-9\:\.]*)/i, '$3/$2/$1');
    return '';
}
