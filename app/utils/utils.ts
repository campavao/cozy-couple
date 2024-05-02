export function formatDate(date: Date) {
  return date.toLocaleDateString();
}

export function formatDateForInput(date: Date) {
    return date.toISOString().split('T')[0]
}
