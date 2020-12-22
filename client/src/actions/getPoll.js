export default async function getPoll(id) {
  try {
    const response = await fetch(`/api/polls/${id}`);
    const json = await response.json();
    return json;
  } catch (e) {
    return null;
  }
}
