export default function fetchPasswordPolicy() {
  return {
    requireUpper: true,
    requireNumber: true,
    requireSymbol: true,
    minLength: 8,
  };
}
