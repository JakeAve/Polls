export default async function postPoll(payload) {
  try {
    const response = await fetch('/api/polls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    if (response.ok) {
      return { successful: true, data: json };
    } else return { successful: false, data: json };
  } catch (e) {
    console.error(e);
    return { successful: false, data: e };
  }
}
