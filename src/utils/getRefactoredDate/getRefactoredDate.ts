export default function getRefactoredDate(date?: string): string {
  if (date) {
    return new Date(date).toISOString().split("T")[0];
  }
  return new Date(Date.now()).toISOString().split("T")[0];
}
