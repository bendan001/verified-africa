export function createToken(payload: object) {
  const raw = JSON.stringify(payload);
  return `demo. ${raw}`;
}
