export function formatDate(dateInput : string) {
    // Parse the input date if it's a string, otherwise use it directly
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    console.log("dateInput", dateInput)
    // Format the date in "MM/DD/YYYY" format (customize as needed)
    return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }).format(date);
}

