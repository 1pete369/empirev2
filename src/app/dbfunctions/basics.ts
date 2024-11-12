export function formatDate(dateInput: string | Date): string {
  // Ensure dateInput is a Date object
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  
  // Log to verify the input is correct
  console.log("dateInput", dateInput);

  // Format the date in "MM/DD/YYYY" format
  const dateCreated = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);

  // Log formatted date
  console.log("DateCreated at basic date", dateCreated);

  return dateCreated;
}