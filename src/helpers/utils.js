import { getDollarPrice } from "./storage";

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

export function calculateDropValue(finalPrice) {
  const initialPrice = getDollarPrice();
  const drop = initialPrice - finalPrice;
  const percentageDrop = (drop / initialPrice) * 100;
  return {
    percentage: `${percentageDrop.toFixed(2)}%`,
    drop,
  };
}

export function calculateIncreaseValue(finalPrice) {
  const initialPrice = getDollarPrice();
  const increase = finalPrice - initialPrice;
  const percentageIncrease = (increase / initialPrice) * 100;
  return {
    percentage: `${percentageIncrease.toFixed(2)}%`,
    increase,
  };
}
