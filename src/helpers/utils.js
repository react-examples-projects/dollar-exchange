export function dollarsToBs(bos, dollar) {
  const n = bos * Number.parseFloat(dollar);
  const bs = parseFloat(n).toFixed(2);
  return bs;
}

export function bolivaresToDollar(bs, dollar) {
  const n = bs / Number.parseFloat(dollar);
  const dollars = parseFloat(n).toFixed(2);
  return dollars;
}
