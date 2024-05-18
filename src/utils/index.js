export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

export const formatVoteAverage = (vote) => {
    return vote.toFixed(1);
};

export const formatCurrency = (amount, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
};