export function getDollarPrice() {
  return Number.parseFloat(localStorage.getItem("dollar"));
}

export function removeDollarPrice() {
  localStorage.removeItem("dollar");
}

export function setDollarPrice(dollar) {
  localStorage.setItem("dollar", dollar);
}
