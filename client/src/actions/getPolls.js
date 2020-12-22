export default async function getPolls() {
  try {
    const response = await fetch('/api/polls');
    const json = await response.json();
    return json;
  } catch (e) {
    return [];
  }
}
