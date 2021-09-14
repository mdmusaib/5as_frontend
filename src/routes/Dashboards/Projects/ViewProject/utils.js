export function getUrlParameter(parameter) {
  const url = window.location.href;
  parameter = parameter.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?|&]' + parameter.toLowerCase() + '=([^&#]*)');
  var results = regex.exec('?' + url.toLowerCase().split('?')[1]);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ''));
}
