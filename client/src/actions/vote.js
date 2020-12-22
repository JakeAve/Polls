export default async function vote(pollId, optionId) {
  try {
    const res = await fetch(`/api/vote/${pollId}/${optionId}`, {
      method: 'POST',
    });
    const json = await res.json();
    if (res.ok) return { successful: true, data: json };
    else return { successful: false, data: json };
  } catch (e) {
    return { successful: false, data: e };
  }
}
