export function formattedDate(originalDate: any) {
    let formatted = new Date(originalDate);
    return formatted.toLocaleString("pt-br", { weekday:"long", year:"numeric", month:"short", day:"numeric"});
  }