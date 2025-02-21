import type { IncomingHttpHeaders } from 'http';

import { UAParser } from 'ua-parser-js';

import type { MetricsProps } from '@/constants';

import customFetch from './customFetch';
import getIp from './getIp';
import getLanguageCode from './getLanguageCode';

/**
 * Updates metrics data based on incoming HTTP headers and remote address.
 *
 * This function extracts relevant information from incoming headers, such as browser, OS,
 * language code, and more. It then uses this data to update the metrics provided.
 *
 * @example
 * ```typescript
 * await updateMetricsData(metrics, req.headers, req.socket.remoteAddress);
 * ```
 *
 * @param {MetricsProps[]} metrics - The array of metrics to update.
 * @param {IncomingHttpHeaders} headers - The incoming HTTP headers from the request.
 * @param {string} remoteAddress - The remote address of the request sender.
 */

const updateMetricsData = async (metrics: MetricsProps[], headers: IncomingHttpHeaders, remoteAddress: string) => {
  const parser = new UAParser(headers['user-agent']);
  const { browser, os, device } = parser.getResult();

  const { country } = await customFetch(`http://ip-api.com/json/${getIp(remoteAddress)}?fields=message,country`);

  const metricFields = [
    { title: 'Browsers clicks', field: browser.name },
    { title: 'System clicks', field: os.name },
    { title: 'Languages clicks', field: getLanguageCode(headers) },
    { title: 'Devices clicks', field: device.type || 'Desktop' },
    { title: 'Country clicks', field: country },
  ];

  metricFields.forEach(({ title, field }) => {
    const existingMetric = metrics.find(metric => metric.title === title);

    if (existingMetric) {
      existingMetric.data = { ...existingMetric.data, [field]: (existingMetric.data[field] || 0) + 1 };
      return;
    }

    metrics.push({ title, data: { [field]: 1 } });
  });
};

export default updateMetricsData;
