export function messageParser(msg: string, sentenceNumber: number): string {
  const sentence: string[] = msg.split(". ");

  switch (sentenceNumber) {
    case 0:
      return sentence.join(". ");
    case -1:
      return sentence.slice(1, sentence.length).join(". ");
    default:
      return sentence[sentenceNumber - 1];
  }
}
