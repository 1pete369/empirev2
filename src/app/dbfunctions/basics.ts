import * as ctz from "countries-and-timezones"

export function formatDate(dateInput: string | Date): string {
  // Ensure dateInput is a Date object
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput

  // Log to verify the input is correct
  console.log("dateInput", dateInput)

  // Format the date in "MM/DD/YYYY" format
  const dateCreated = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(date)

  // Log formatted date
  console.log("DateCreated at basic date", dateCreated)

  return dateCreated
}


export function getTimeZoneAndCountryCode() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the user's timezone
  console.log("timezone", timezone);
  
  const timezoneData = ctz.getTimezone(timezone); // Get timezone data from the library
  console.log("timezoneData", timezoneData);

  const data = { timezone: "", countryCode: "" }; // Initializing data object

  if (timezoneData && timezoneData.countries.length > 0) {
    data.timezone = timezone; // Set the timezone
    data.countryCode = timezoneData.countries[0]; // Set the country code based on the timezone
  } else {
    data.timezone = timezone
    data.countryCode = "US"; // Default to US if no country is found
  }

  return data; // Return the object with timezone and country code
}
