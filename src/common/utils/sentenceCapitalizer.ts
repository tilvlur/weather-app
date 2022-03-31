export function sentenceCapitalizer(sentence: string) {
  return `${sentence[0].toUpperCase()}${sentence.slice(1)}`;
}
