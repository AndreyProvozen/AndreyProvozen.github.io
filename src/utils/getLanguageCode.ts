import type { IncomingHttpHeaders } from 'http';

/**
 * Get the language code from the provided HTTP headers.
 *
 * This function extracts the primary language code from the 'accept-language' header
 * of the incoming HTTP headers. If the language code cannot be determined, it returns
 * 'Unknown'.
 *
 * @example
 * ```typescript
 * const languageCode = getLanguageCode(req.headers);
 * ```
 *
 * @param {IncomingHttpHeaders} headers - The incoming HTTP headers from the request.
 * @returns {string} - The determined language code or 'Unknown' if not available.
 */

const getLanguageCode = (headers: IncomingHttpHeaders): string => {
  const acceptLanguage = headers['accept-language'] || '';

  return acceptLanguage.split(',')[0]?.split('-')[0].trim().toUpperCase() || 'Unknown';
};

export default getLanguageCode;
