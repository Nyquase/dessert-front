const DEFAULT_THRESHOLD = 150;

const ellipsis = (s: string, threshold?: number): string => {
  const t = (threshold === undefined ? DEFAULT_THRESHOLD : threshold);

  if (s.length <= t) {
    return s;
  }

  let spaceOffset = 0;
  while (DEFAULT_THRESHOLD + spaceOffset < s.length && s[DEFAULT_THRESHOLD + spaceOffset] !== ' ') {
    // We try to find the nearest space
    // In case of a very long word, this will be useless but we
    // still need to stop the loop
    spaceOffset += 1;
  }

  // We are in the edge case of a very long word so let's just
  // truncate it
  if (DEFAULT_THRESHOLD + spaceOffset === s.length) {
    spaceOffset = 0;
  }

  return `${s.substr(0, DEFAULT_THRESHOLD + spaceOffset)}...`;
};

export default ellipsis;
