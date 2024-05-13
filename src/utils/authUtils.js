function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
} // если такого куки нет, возвращает undefined

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
} // устанавливает истекшую дату данному куки

function getTokenPayload(name) {

  const token = getCookie(name);
  if (token === undefined ) return undefined;
  const tokenParts = token.split('.');
  const payload = JSON.parse(atob(tokenParts[1])); 

  return payload;
}

function getFormattedCookie(name, value) {
  return `${name}=${value}; path=/;`;
}

function isAuthenticated() {
  const payload = getTokenPayload('access-token');
  if (payload === undefined) return false;
  const expirationDate = new Date(payload.exp * 1000); // Срок годности указан в секундах
  const currentDate = new Date();

  if (!(currentDate < expirationDate)) {

  }

  return currentDate < expirationDate;
}

export {
  getCookie,
  deleteCookie,
  isAuthenticated,
  getFormattedCookie,
  getTokenPayload,
}
