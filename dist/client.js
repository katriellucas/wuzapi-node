"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
class KyError extends Error {
  name = "KyError";
  get isKyError() {
    return true;
  }
}
class HTTPError extends KyError {
  name = "HTTPError";
  response;
  request;
  options;
  data;
  constructor(response, request, options) {
    const code = response.status || response.status === 0 ? response.status : "";
    const title = response.statusText ?? "";
    const status = `${code} ${title}`.trim();
    const reason = status ? `status code ${status}` : "an unknown error";
    super(`Request failed with ${reason}: ${request.method} ${request.url}`);
    this.response = response;
    this.request = request;
    this.options = options;
  }
}
class NetworkError extends KyError {
  name = "NetworkError";
  request;
  constructor(request, options) {
    super(`Request failed due to a network error: ${request.method} ${request.url}`, options);
    this.request = request;
  }
}
class NonError extends Error {
  name = "NonError";
  value;
  constructor(value) {
    let message = "Non-error value was thrown";
    try {
      if (typeof value === "string") {
        message = value;
      } else if (value && typeof value === "object" && "message" in value && typeof value.message === "string") {
        message = value.message;
      }
    } catch {
    }
    super(message);
    this.value = value;
  }
}
class ForceRetryError extends KyError {
  name = "ForceRetryError";
  customDelay;
  code;
  customRequest;
  constructor(options) {
    const cause = options?.cause ? options.cause instanceof Error ? options.cause : new NonError(options.cause) : void 0;
    super(options?.code ? `Forced retry: ${options.code}` : "Forced retry", cause ? { cause } : void 0);
    this.customDelay = options?.delay;
    this.code = options?.code;
    this.customRequest = options?.request;
  }
}
class SchemaValidationError extends Error {
  name = "SchemaValidationError";
  issues;
  constructor(issues) {
    super("Response schema validation failed");
    this.issues = issues;
  }
}
class TimeoutError extends KyError {
  name = "TimeoutError";
  request;
  constructor(request) {
    super(`Request timed out: ${request.method} ${request.url}`);
    this.request = request;
  }
}
const supportsRequestStreams = (() => {
  let duplexAccessed = false;
  let hasContentType = false;
  const supportsReadableStream = typeof globalThis.ReadableStream === "function";
  const supportsRequest = typeof globalThis.Request === "function";
  if (supportsReadableStream && supportsRequest) {
    try {
      hasContentType = new globalThis.Request("https://empty.invalid", {
        body: new globalThis.ReadableStream(),
        method: "POST",
        // @ts-expect-error - Types are outdated.
        get duplex() {
          duplexAccessed = true;
          return "half";
        }
      }).headers.has("Content-Type");
    } catch (error) {
      if (error instanceof Error && error.message === "unsupported BodyInit type") {
        return false;
      }
      throw error;
    }
  }
  return duplexAccessed && !hasContentType;
})();
const supportsAbortController = typeof globalThis.AbortController === "function";
const supportsAbortSignal = typeof globalThis.AbortSignal === "function" && typeof globalThis.AbortSignal.any === "function";
const supportsResponseStreams = typeof globalThis.ReadableStream === "function";
const supportsFormData = typeof globalThis.FormData === "function";
const requestMethods = ["get", "post", "put", "patch", "head", "delete", "query"];
const responseTypes = {
  json: "application/json",
  text: "text/*",
  formData: "multipart/form-data",
  arrayBuffer: "*/*",
  blob: "*/*",
  // Supported in modern Fetch implementations (for example, browsers and recent Node.js/undici).
  // We still feature-check at runtime before exposing the shortcut.
  bytes: "*/*"
};
const maxSafeTimeout = 2147483647;
const usualFormBoundarySize = 40;
const stop = /* @__PURE__ */ Symbol("stop");
class RetryMarker {
  options;
  constructor(options) {
    this.options = options;
  }
}
const retry = (options) => new RetryMarker(options);
const kyOptionKeys = {
  json: true,
  parseJson: true,
  stringifyJson: true,
  searchParams: true,
  baseUrl: true,
  prefix: true,
  retry: true,
  timeout: true,
  totalTimeout: true,
  hooks: true,
  throwHttpErrors: true,
  onDownloadProgress: true,
  onUploadProgress: true,
  fetch: true,
  context: true
};
const requestOptionsRegistry = {
  method: true,
  headers: true,
  body: true,
  mode: true,
  credentials: true,
  cache: true,
  redirect: true,
  referrer: true,
  referrerPolicy: true,
  integrity: true,
  keepalive: true,
  signal: true,
  window: true,
  duplex: true
};
const encoder = new TextEncoder();
const getBodySize = (body) => {
  if (!body) {
    return 0;
  }
  if (body instanceof FormData) {
    let size = 0;
    for (const [key, value] of body) {
      size += usualFormBoundarySize;
      size += encoder.encode(`Content-Disposition: form-data; name="${key}"`).byteLength;
      size += typeof value === "string" ? encoder.encode(value).byteLength : value.size;
    }
    return size;
  }
  if (body instanceof Blob) {
    return body.size;
  }
  if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) {
    return body.byteLength;
  }
  if (typeof body === "string") {
    return encoder.encode(body).byteLength;
  }
  if (body instanceof URLSearchParams) {
    return encoder.encode(body.toString()).byteLength;
  }
  return 0;
};
const withProgress = (stream, totalBytes, onProgress) => {
  let previousChunk;
  let transferredBytes = 0;
  return stream.pipeThrough(new TransformStream({
    transform(currentChunk, controller) {
      controller.enqueue(currentChunk);
      if (previousChunk) {
        transferredBytes += previousChunk.byteLength;
        let percent = totalBytes === 0 ? 0 : transferredBytes / totalBytes;
        if (percent >= 1) {
          percent = 1 - Number.EPSILON;
        }
        onProgress?.({ percent, totalBytes: Math.max(totalBytes, transferredBytes), transferredBytes }, previousChunk);
      }
      previousChunk = currentChunk;
    },
    flush() {
      const finalChunk = previousChunk ?? new Uint8Array();
      transferredBytes += finalChunk.byteLength;
      onProgress?.({ percent: 1, totalBytes: Math.max(totalBytes, transferredBytes), transferredBytes }, finalChunk);
    }
  }));
};
const streamResponse = (response, onDownloadProgress) => {
  if (!response.body) {
    return response;
  }
  const responseInit = {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers
  };
  if (response.status === 204) {
    return new Response(null, responseInit);
  }
  const totalBytes = Math.max(0, Number(response.headers.get("content-length")) || 0);
  return new Response(withProgress(response.body, totalBytes, onDownloadProgress), responseInit);
};
const streamRequest = (request, onUploadProgress, originalBody) => {
  if (!request.body) {
    return request;
  }
  const totalBytes = getBodySize(originalBody ?? request.body);
  return new Request(request, {
    // @ts-expect-error - Types are outdated.
    duplex: "half",
    body: withProgress(request.body, totalBytes, onUploadProgress)
  });
};
const isObject = (value) => value !== null && typeof value === "object";
const replaceSymbol = /* @__PURE__ */ Symbol("replaceOption");
const getReplaceState = (value) => isObject(value) && value[replaceSymbol] === true ? {
  isReplace: true,
  value: value.value
} : {
  isReplace: false,
  value
};
const validateAndMerge = (...sources) => {
  for (const source of sources) {
    if ((!isObject(source) || Array.isArray(source)) && source !== void 0) {
      throw new TypeError("The `options` argument must be an object");
    }
  }
  return deepMerge({}, ...sources);
};
const mergeHeaders = (source1 = {}, source2 = {}) => {
  const result = new globalThis.Headers(source1);
  const isHeadersInstance = source2 instanceof globalThis.Headers;
  const source = new globalThis.Headers(source2);
  for (const [key, value] of source.entries()) {
    if (isHeadersInstance && value === "undefined" || value === void 0) {
      result.delete(key);
    } else {
      result.set(key, value);
    }
  }
  return result;
};
const isPlainObject = (value) => {
  if (!isObject(value) || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};
const cloneShallow = (value) => {
  if (value instanceof URLSearchParams) {
    const copy = new URLSearchParams(value);
    const deleted = value[deletedParametersSymbol];
    if (deleted) {
      copy[deletedParametersSymbol] = new Set(deleted);
    }
    return copy;
  }
  if (value instanceof globalThis.Headers) {
    return new globalThis.Headers(value);
  }
  if (Array.isArray(value)) {
    return [...value];
  }
  if (isPlainObject(value)) {
    const copy = { ...value };
    return copy;
  }
  return value;
};
const normalizeHeaderObject = (headers) => Object.fromEntries(Object.entries(headers).filter((entry) => entry[1] !== void 0));
const mergeHeaderContainers = (source1, source2) => {
  if (isPlainObject(source1) && isPlainObject(source2)) {
    return normalizeHeaderObject({ ...source1, ...source2 });
  }
  return mergeHeaders(source1, source2);
};
function newHookValue(original, incoming, property) {
  return Object.hasOwn(incoming, property) && incoming[property] === void 0 ? [] : deepMerge(original[property] ?? [], incoming[property] ?? []);
}
const mergeHooks = (original = {}, incoming = {}) => ({
  init: newHookValue(original, incoming, "init"),
  beforeRequest: newHookValue(original, incoming, "beforeRequest"),
  beforeRetry: newHookValue(original, incoming, "beforeRetry"),
  beforeError: newHookValue(original, incoming, "beforeError"),
  afterResponse: newHookValue(original, incoming, "afterResponse")
});
const deletedParametersSymbol = /* @__PURE__ */ Symbol("deletedParameters");
const appendSearchParameters = (target, source) => {
  const result = new URLSearchParams();
  const deleted = /* @__PURE__ */ new Set();
  for (const input of [target, source]) {
    if (input === void 0) {
      continue;
    }
    if (input instanceof URLSearchParams) {
      for (const [key, value] of input.entries()) {
        result.append(key, value);
        deleted.delete(key);
      }
      const inputDeleted = input[deletedParametersSymbol];
      if (inputDeleted) {
        for (const key of inputDeleted) {
          result.delete(key);
          deleted.add(key);
        }
      }
    } else if (Array.isArray(input)) {
      for (const pair of input) {
        if (!Array.isArray(pair) || pair.length !== 2) {
          throw new TypeError("Array search parameters must be provided in [[key, value], ...] format");
        }
        result.append(String(pair[0]), String(pair[1]));
        deleted.delete(String(pair[0]));
      }
    } else if (isObject(input)) {
      for (const [key, value] of Object.entries(input)) {
        if (value === void 0) {
          result.delete(key);
          deleted.add(key);
        } else {
          result.append(key, String(value));
          deleted.delete(key);
        }
      }
    } else {
      const parameters = new URLSearchParams(input);
      for (const [key, value] of parameters.entries()) {
        result.append(key, value);
        deleted.delete(key);
      }
    }
  }
  if (deleted.size > 0) {
    result[deletedParametersSymbol] = deleted;
  }
  return result;
};
const deepMergeInternal = (isRoot, ...sources) => {
  let returnValue = {};
  let headers = {};
  let hooks = {};
  let searchParameters;
  const signals = [];
  for (const source of sources) {
    if (Array.isArray(source)) {
      if (!Array.isArray(returnValue)) {
        returnValue = [];
      }
      returnValue = [...returnValue, ...source];
    } else if (isObject(source)) {
      for (let [key, value] of Object.entries(source)) {
        const replaceState = getReplaceState(value);
        const { isReplace } = replaceState;
        value = replaceState.value;
        const isRootSignal = isRoot && key === "signal";
        if (isRootSignal && (isReplace || value === void 0)) {
          signals.length = 0;
        }
        if (isRootSignal && value instanceof globalThis.AbortSignal) {
          signals.push(value);
          continue;
        }
        if (key === "context") {
          if (value !== void 0 && value !== null && (!isObject(value) || Array.isArray(value))) {
            throw new TypeError("The `context` option must be an object");
          }
          returnValue = {
            ...returnValue,
            context: value === void 0 || value === null ? {} : isReplace ? { ...value } : { ...returnValue.context, ...value }
          };
          continue;
        }
        if (key === "searchParams") {
          if (value === void 0 || value === null) {
            searchParameters = void 0;
          } else if (isReplace) {
            searchParameters = value;
          } else {
            searchParameters = searchParameters === void 0 ? value : appendSearchParameters(searchParameters, value);
          }
          continue;
        }
        if (isRoot && key === "retry" && isObject(value) && !isReplace && typeof returnValue[key] === "number") {
          returnValue = { ...returnValue, [key]: { limit: returnValue[key] } };
        }
        if (isObject(value) && !isReplace && key in returnValue) {
          value = deepMergeInternal(false, returnValue[key], value);
        }
        returnValue = { ...returnValue, [key]: value };
      }
      if (isObject(source.hooks)) {
        const { value: hookValue, isReplace } = getReplaceState(source.hooks);
        hooks = isReplace ? mergeHooks({}, hookValue) : mergeHooks(hooks, hookValue);
        returnValue.hooks = hooks;
      }
      if (isObject(source.headers)) {
        const { value: headerValue, isReplace } = getReplaceState(source.headers);
        headers = isReplace ? cloneShallow(headerValue) : mergeHeaderContainers(headers, headerValue);
        returnValue.headers = headers;
      }
    }
  }
  if (searchParameters !== void 0) {
    returnValue.searchParams = searchParameters;
  }
  if (signals.length > 0) {
    if (signals.length === 1) {
      returnValue.signal = signals[0];
    } else if (supportsAbortSignal) {
      returnValue.signal = AbortSignal.any(signals);
    } else {
      returnValue.signal = signals.at(-1);
    }
  }
  return returnValue;
};
const deepMerge = (...sources) => deepMergeInternal(true, ...sources);
const normalizeRequestMethod = (input) => requestMethods.includes(input) ? input.toUpperCase() : input;
const retryMethods = ["get", "put", "head", "delete", "options", "trace", "query"];
const retryStatusCodes = [408, 413, 429, 500, 502, 503, 504];
const retryAfterStatusCodes = [413, 429, 503];
const invalidRetryLimitErrorMessage = "`retry.limit` must be a finite, non-negative integer";
const defaultRetryOptions = {
  limit: 2,
  methods: retryMethods,
  statusCodes: retryStatusCodes,
  afterStatusCodes: retryAfterStatusCodes,
  maxRetryAfter: Number.POSITIVE_INFINITY,
  backoffLimit: Number.POSITIVE_INFINITY,
  delay: (attemptCount) => 0.3 * 2 ** (attemptCount - 1) * 1e3,
  jitter: void 0,
  retryOnTimeout: false
};
const getDefaultRetryOptions = () => ({
  ...defaultRetryOptions,
  methods: [...defaultRetryOptions.methods],
  statusCodes: [...defaultRetryOptions.statusCodes],
  afterStatusCodes: [...defaultRetryOptions.afterStatusCodes]
});
const normalizeRetryLimit = (retryLimit) => {
  if (retryLimit === void 0) {
    return defaultRetryOptions.limit;
  }
  if (typeof retryLimit !== "number" || !Number.isInteger(retryLimit) || retryLimit < 0) {
    throw new TypeError(invalidRetryLimitErrorMessage);
  }
  return retryLimit;
};
const normalizeRetryOptions = (retry2 = {}) => {
  if (typeof retry2 === "number") {
    return {
      ...getDefaultRetryOptions(),
      limit: normalizeRetryLimit(retry2)
    };
  }
  if (retry2 === null || typeof retry2 !== "object" || Array.isArray(retry2)) {
    throw new TypeError("`retry` must be a number or an object");
  }
  const normalizedRetry = Object.fromEntries(Object.entries(retry2).filter(([, value]) => value !== void 0));
  const retryLimit = normalizeRetryLimit(normalizedRetry.limit);
  if (normalizedRetry.methods !== void 0 && !Array.isArray(normalizedRetry.methods)) {
    throw new Error("retry.methods must be an array");
  }
  if (normalizedRetry.statusCodes !== void 0 && !Array.isArray(normalizedRetry.statusCodes)) {
    throw new Error("retry.statusCodes must be an array");
  }
  if (normalizedRetry.afterStatusCodes !== void 0 && !Array.isArray(normalizedRetry.afterStatusCodes)) {
    throw new Error("retry.afterStatusCodes must be an array");
  }
  if (normalizedRetry.methods !== void 0) {
    normalizedRetry.methods = normalizedRetry.methods.map((method) => method.toLowerCase());
  }
  if (normalizedRetry.statusCodes !== void 0) {
    normalizedRetry.statusCodes = [...normalizedRetry.statusCodes];
  }
  if (normalizedRetry.afterStatusCodes !== void 0) {
    normalizedRetry.afterStatusCodes = [...normalizedRetry.afterStatusCodes];
  }
  return {
    ...getDefaultRetryOptions(),
    ...normalizedRetry,
    limit: retryLimit
  };
};
async function timeout(request, init, abortController, options) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (abortController) {
        abortController.abort();
      }
      reject(new TimeoutError(request));
    }, options.timeout);
    void options.fetch(request, init).then(resolve).catch(reject).then(() => {
      clearTimeout(timeoutId);
    });
  });
}
async function delay(ms2, { signal }) {
  return new Promise((resolve, reject) => {
    if (signal) {
      signal.throwIfAborted();
      signal.addEventListener("abort", abortHandler, { once: true });
    }
    function abortHandler() {
      clearTimeout(timeoutId);
      reject(signal.reason);
    }
    const timeoutId = setTimeout(() => {
      signal?.removeEventListener("abort", abortHandler);
      resolve();
    }, ms2);
  });
}
const findUnknownOptions = (options) => {
  const unknownOptions = {};
  for (const key in options) {
    if (!Object.hasOwn(options, key)) {
      continue;
    }
    if (!(key in requestOptionsRegistry) && !(key in kyOptionKeys)) {
      unknownOptions[key] = options[key];
    }
  }
  return unknownOptions;
};
const hasSearchParameters = (search) => {
  if (search === void 0) {
    return false;
  }
  if (Array.isArray(search)) {
    return search.length > 0;
  }
  if (search instanceof URLSearchParams) {
    return search.size > 0 || Boolean(search[deletedParametersSymbol]?.size);
  }
  if (typeof search === "object") {
    return Object.keys(search).length > 0;
  }
  if (typeof search === "string") {
    return search.trim().length > 0;
  }
  return Boolean(search);
};
const objectToString$1 = Object.prototype.toString;
const isError = (value) => objectToString$1.call(value) === "[object Error]";
const errorMessages = /* @__PURE__ */ new Set([
  "network error",
  // Chrome
  "NetworkError when attempting to fetch resource.",
  // Firefox
  "The Internet connection appears to be offline.",
  // Safari 16
  "Network request failed",
  // `cross-fetch`
  "fetch failed",
  // Undici (Node.js)
  "terminated",
  // Undici (Node.js)
  " A network error occurred.",
  // Bun (WebKit) - leading space is intentional
  "Network connection lost"
  // Cloudflare Workers (fetch)
]);
function isRawNetworkError(error) {
  const isValid = error && isError(error) && error.name === "TypeError" && typeof error.message === "string";
  if (!isValid) {
    return false;
  }
  const { message, stack } = error;
  if (message === "Load failed" || message.startsWith("Load failed (") && message.endsWith(")")) {
    return stack === void 0 || "__sentry_captured__" in error;
  }
  if (message.startsWith("error sending request for url")) {
    return true;
  }
  if (message === "Failed to fetch" || message.startsWith("Failed to fetch (") && message.endsWith(")")) {
    return true;
  }
  return errorMessages.has(message);
}
const isErrorType = (error, cls) => error instanceof cls || error?.name === cls.name;
function isHTTPError(error) {
  return isErrorType(error, HTTPError);
}
function isNetworkError(error) {
  return isErrorType(error, NetworkError);
}
function isTimeoutError(error) {
  return isErrorType(error, TimeoutError);
}
const timestampThreshold = Date.parse("2024-01-01");
const delayPattern = /^\d+$/;
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const imfDatePattern = /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{2}):(\d{2}):(\d{2}) GMT$/;
const rfc850DatePattern = /^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{2}):(\d{2}):(\d{2}) GMT$/;
const asctimeDatePattern = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{2}| \d) (\d{2}:\d{2}:\d{2}) (\d{4})$/;
const getRetryTimingHeader = (headers) => {
  const retryAfter = headers.get("Retry-After");
  if (retryAfter !== null) {
    return { value: retryAfter, allowTimestamp: false };
  }
  const rateLimitReset = headers.get("RateLimit-Reset");
  if (rateLimitReset !== null) {
    return { value: rateLimitReset, allowTimestamp: true };
  }
  const rateLimitRetryAfter = headers.get("X-RateLimit-Retry-After");
  if (rateLimitRetryAfter !== null) {
    return { value: rateLimitRetryAfter, allowTimestamp: false };
  }
  const rateLimitResetAlias = headers.get("X-RateLimit-Reset") ?? headers.get("X-Rate-Limit-Reset");
  if (rateLimitResetAlias !== null) {
    return { value: rateLimitResetAlias, allowTimestamp: true };
  }
  return void 0;
};
const createTimestamp = ({ year, month, day, hours, minutes, seconds }) => {
  const monthIndex = months.indexOf(month);
  const dayNumber = Number(day);
  const hoursNumber = Number(hours);
  const minutesNumber = Number(minutes);
  const secondsNumber = Number(seconds);
  if (monthIndex === -1 || hoursNumber > 23 || minutesNumber > 59 || secondsNumber > 60) {
    return void 0;
  }
  const normalizedSeconds = Math.min(secondsNumber, 59);
  const date = new Date(Date.UTC(year, monthIndex, dayNumber, hoursNumber, minutesNumber, normalizedSeconds));
  date.setUTCFullYear(year);
  const timestamp = date.getTime();
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== monthIndex || date.getUTCDate() !== dayNumber || date.getUTCHours() !== hoursNumber || date.getUTCMinutes() !== minutesNumber || date.getUTCSeconds() !== normalizedSeconds) {
    return void 0;
  }
  return secondsNumber === 60 ? timestamp + 1e3 : timestamp;
};
const getCapture = (match, index) => match[index];
const parseDate = (value) => {
  const imfDate = imfDatePattern.exec(value);
  if (imfDate) {
    return createTimestamp({
      year: Number(getCapture(imfDate, 3)),
      month: getCapture(imfDate, 2),
      day: getCapture(imfDate, 1),
      hours: getCapture(imfDate, 4),
      minutes: getCapture(imfDate, 5),
      seconds: getCapture(imfDate, 6)
    });
  }
  const rfc850Date = rfc850DatePattern.exec(value);
  if (rfc850Date) {
    const now = /* @__PURE__ */ new Date();
    const twoDigitYear = Number(getCapture(rfc850Date, 3));
    const currentCenturyYear = Math.floor(now.getUTCFullYear() / 100) * 100 + twoDigitYear;
    const fiftyYearsFromNow = Date.UTC(now.getUTCFullYear() + 50, now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    let timestamp;
    for (const year of [
      currentCenturyYear - 100,
      currentCenturyYear,
      currentCenturyYear + 100
    ]) {
      const candidateTimestamp = createTimestamp({
        year,
        month: getCapture(rfc850Date, 2),
        day: getCapture(rfc850Date, 1),
        hours: getCapture(rfc850Date, 4),
        minutes: getCapture(rfc850Date, 5),
        seconds: getCapture(rfc850Date, 6)
      });
      if (candidateTimestamp !== void 0 && candidateTimestamp <= fiftyYearsFromNow) {
        timestamp = candidateTimestamp;
      }
    }
    return timestamp;
  }
  const asctimeDate = asctimeDatePattern.exec(value);
  if (asctimeDate) {
    const time = getCapture(asctimeDate, 4);
    const [hours, minutes, seconds] = time.split(":");
    return createTimestamp({
      year: Number(getCapture(asctimeDate, 5)),
      month: getCapture(asctimeDate, 2),
      day: getCapture(asctimeDate, 3).trim(),
      hours,
      minutes,
      seconds
    });
  }
  return void 0;
};
const calculateRetryTimingDelay = ({ value, allowTimestamp }) => {
  if (delayPattern.test(value)) {
    let delay3 = Number(value) * 1e3;
    if (allowTimestamp && delay3 >= timestampThreshold) {
      delay3 -= Date.now();
    }
    return Math.max(0, delay3);
  }
  const timestamp = parseDate(value);
  if (timestamp === void 0) {
    return void 0;
  }
  const delay2 = timestamp - Date.now();
  return Number.isFinite(delay2) ? Math.max(0, delay2) : void 0;
};
const maxErrorResponseBodySize = 10 * 1024 * 1024;
const prefixUrlRenamedErrorMessage = "The `prefixUrl` option has been renamed `prefix` in v2 and enhanced to allow slashes in input. See also the new `baseUrl` option for improved flexibility with standard URL resolution: https://github.com/sindresorhus/ky#baseurl";
const timedOutResponseData = /* @__PURE__ */ Symbol("timedOutResponseData");
const timedOutOperation = /* @__PURE__ */ Symbol("timedOutOperation");
const createTextDecoder = (contentType) => {
  const match = /;\s*charset\s*=\s*(?:"([^"]+)"|([^;,\s]+))/i.exec(contentType);
  const charset = match?.[1] ?? match?.[2];
  if (charset) {
    try {
      return new TextDecoder(charset);
    } catch {
    }
  }
  return new TextDecoder();
};
const invalidSchemaMessage = "The `schema` argument must follow the Standard Schema specification";
const cloneRetryOptions = (retry2) => {
  if (retry2 === null || typeof retry2 !== "object" || Array.isArray(retry2)) {
    return retry2;
  }
  const clonedRetry = { ...retry2 };
  if (Array.isArray(clonedRetry.methods)) {
    clonedRetry.methods = [...clonedRetry.methods];
  }
  if (Array.isArray(clonedRetry.statusCodes)) {
    clonedRetry.statusCodes = [...clonedRetry.statusCodes];
  }
  if (Array.isArray(clonedRetry.afterStatusCodes)) {
    clonedRetry.afterStatusCodes = [...clonedRetry.afterStatusCodes];
  }
  return clonedRetry;
};
const objectToString = Object.prototype.toString;
const leadingC0ControlOrSpacePattern = /^[\0-\u0020]+/g;
const asciiTabOrNewLinePattern = /[\t\n\r]/g;
const schemePattern = /^[a-z][\d+.a-z-]*:/i;
const malformedHttpProtocolPattern = /^https?:(?!\/\/)/i;
const isRequestInstance = (value) => value instanceof globalThis.Request || objectToString.call(value) === "[object Request]";
const isResponseInstance = (value) => value instanceof globalThis.Response || objectToString.call(value) === "[object Response]";
const isAbsoluteInput = (input) => schemePattern.test(input);
const normalizeInputForProtocolCheck = (input) => input.replaceAll(leadingC0ControlOrSpacePattern, "").replaceAll(asciiTabOrNewLinePattern, "");
const cloneSearchParametersForInitHook = (searchParameters) => {
  if (Array.isArray(searchParameters)) {
    return searchParameters.map((parameter) => [...parameter]);
  }
  return cloneShallow(searchParameters);
};
function cloneInitHookOptions(options) {
  const clonedOptions = {
    ...options,
    json: cloneShallow(options.json),
    context: cloneShallow(options.context),
    headers: cloneShallow(options.headers),
    searchParams: cloneSearchParametersForInitHook(options.searchParams)
  };
  if (options.retry !== void 0) {
    clonedOptions.retry = cloneRetryOptions(options.retry);
  }
  return clonedOptions;
}
const validateJsonWithSchema = async (jsonValue, schema) => {
  if (typeof schema !== "object" && typeof schema !== "function" || schema === null) {
    throw new TypeError(invalidSchemaMessage);
  }
  const standardSchema = schema["~standard"];
  if (typeof standardSchema !== "object" || standardSchema === null || typeof standardSchema.validate !== "function") {
    throw new TypeError(invalidSchemaMessage);
  }
  const validationResult = await standardSchema.validate(jsonValue);
  if (validationResult.issues) {
    throw new SchemaValidationError(validationResult.issues);
  }
  return validationResult.value;
};
class Ky {
  static create(input, options) {
    const initHooks = options.hooks?.init ?? [];
    const initHookOptions = initHooks.length > 0 ? cloneInitHookOptions(options) : options;
    for (const hook of initHooks) {
      hook(initHookOptions);
    }
    const ky2 = new Ky(input, initHookOptions);
    const function_ = async () => {
      if (typeof ky2.#options.timeout === "number" && ky2.#options.timeout > maxSafeTimeout) {
        throw new RangeError(`The \`timeout\` option cannot be greater than ${maxSafeTimeout}`);
      }
      if (typeof ky2.#options.totalTimeout === "number" && ky2.#options.totalTimeout > maxSafeTimeout) {
        throw new RangeError(`The \`totalTimeout\` option cannot be greater than ${maxSafeTimeout}`);
      }
      await Promise.resolve();
      const beforeRequestResponse = await ky2.#runBeforeRequestHooks();
      if (beforeRequestResponse !== void 0) {
        ky2.#retryLimit = normalizeRetryOptions(ky2.#options.retry).limit;
      }
      let response = beforeRequestResponse ?? await ky2.#retry(async () => ky2.#fetch());
      let responseFromHook = beforeRequestResponse !== void 0 || ky2.#consumeReturnedResponseFromBeforeRetryHook();
      for (; ; ) {
        if (response === void 0) {
          return response;
        }
        if (isResponseInstance(response)) {
          try {
            response = await ky2.#runAfterResponseHooks(response);
          } catch (error) {
            if (!(error instanceof ForceRetryError)) {
              throw error;
            }
            const retriedResponse = await ky2.#retryFromError(error, async () => ky2.#fetch());
            if (retriedResponse === void 0) {
              return retriedResponse;
            }
            response = retriedResponse;
            responseFromHook = ky2.#consumeReturnedResponseFromBeforeRetryHook();
            continue;
          }
        }
        const currentResponse = response;
        if (!currentResponse.ok && currentResponse.type !== "opaque" && (typeof ky2.#options.throwHttpErrors === "function" ? ky2.#options.throwHttpErrors(currentResponse.status) : ky2.#options.throwHttpErrors)) {
          const httpError = new HTTPError(currentResponse, ky2.#getResponseRequest(currentResponse), ky2.#getNormalizedOptions());
          const errorToThrow = httpError;
          httpError.data = await ky2.#getResponseData(currentResponse);
          if (responseFromHook) {
            throw errorToThrow;
          }
          const retriedResponse = await ky2.#retryFromError(httpError, async () => ky2.#fetch());
          if (retriedResponse === void 0) {
            return retriedResponse;
          }
          response = retriedResponse;
          responseFromHook = ky2.#consumeReturnedResponseFromBeforeRetryHook();
          continue;
        }
        break;
      }
      if (!isResponseInstance(response)) {
        return response;
      }
      ky2.#decorateResponse(response);
      if (ky2.#options.onDownloadProgress) {
        if (typeof ky2.#options.onDownloadProgress !== "function") {
          throw new TypeError("The `onDownloadProgress` option must be a function");
        }
        if (!supportsResponseStreams) {
          throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");
        }
        const progressResponse = response.clone();
        ky2.#cancelResponseBody(response);
        return streamResponse(progressResponse, ky2.#options.onDownloadProgress);
      }
      return response;
    };
    const result = (async () => {
      try {
        return await function_();
      } catch (error) {
        await ky2.#throwProcessedError(error);
      } finally {
        const originalRequest = ky2.#originalRequest;
        ky2.#cancelBody(originalRequest?.body ?? void 0);
        if (ky2.request !== originalRequest) {
          ky2.#cancelBody(ky2.request.body ?? void 0);
        }
      }
    })();
    for (const [type, mimeType] of Object.entries(responseTypes)) {
      if (type === "bytes" && typeof globalThis.Response?.prototype?.bytes !== "function") {
        continue;
      }
      result[type] = async (schema) => {
        ky2.request.headers.set("accept", ky2.request.headers.get("accept") || mimeType);
        const response = await result;
        if (type !== "json") {
          return ky2.#raceBodyRead(async () => response[type](), response);
        }
        const text = await ky2.#raceBodyRead(async () => response.text(), response);
        const request = ky2.#getResponseRequest(response);
        const parsedResult = await ky2.#raceWithTotalTimeout(async () => {
          const jsonValue = initHookOptions.parseJson ? await initHookOptions.parseJson(text, { request, response }) : text === "" && schema !== void 0 ? void 0 : JSON.parse(text);
          return schema === void 0 ? jsonValue : validateJsonWithSchema(jsonValue, schema);
        });
        if (parsedResult === timedOutOperation) {
          await ky2.#throwProcessedError(new TimeoutError(request));
        }
        return parsedResult;
      };
    }
    return result;
  }
  // eslint-disable-next-line unicorn/prevent-abbreviations
  static #normalizeSearchParams(searchParams) {
    if (searchParams && typeof searchParams === "object" && !Array.isArray(searchParams) && !(searchParams instanceof URLSearchParams)) {
      return Object.fromEntries(Object.entries(searchParams).filter(([, value]) => value !== void 0));
    }
    return searchParams;
  }
  request;
  #abortController;
  #retryCount = 0;
  #retryLimit;
  #input;
  #options;
  #originalRequest;
  #userProvidedAbortSignal;
  #beforeRetryHookErrors = /* @__PURE__ */ new WeakSet();
  #cachedNormalizedOptions;
  #startTime;
  #returnedResponseFromBeforeRetryHook = false;
  #responseRequests = /* @__PURE__ */ new WeakMap();
  // eslint-disable-next-line complexity
  constructor(input, options = {}) {
    this.#input = input;
    if (Object.hasOwn(options, "prefixUrl")) {
      throw new Error(prefixUrlRenamedErrorMessage);
    }
    this.#options = {
      ...options,
      headers: mergeHeaders(this.#input.headers, options.headers),
      hooks: mergeHooks({}, options.hooks),
      method: normalizeRequestMethod(options.method ?? this.#input.method ?? "GET"),
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      prefix: String(options.prefix || ""),
      retry: normalizeRetryOptions(options.retry),
      throwHttpErrors: options.throwHttpErrors ?? true,
      timeout: options.timeout ?? 1e4,
      totalTimeout: options.totalTimeout ?? false,
      fetch: options.fetch ?? globalThis.fetch.bind(globalThis),
      context: options.context ?? {}
    };
    this.#retryLimit = this.#options.retry.limit;
    if (typeof this.#input !== "string" && !(this.#input instanceof URL || this.#input instanceof globalThis.Request)) {
      throw new TypeError("`input` must be a string, URL, or Request");
    }
    if (typeof this.#input === "string") {
      if (this.#options.prefix) {
        const normalizedPrefix = this.#options.prefix.replace(/\/+$/, "");
        const normalizedInput = this.#input.replace(/^\/+/, "");
        this.#input = `${normalizedPrefix}/${normalizedInput}`;
      }
      if (this.#options.baseUrl) {
        const normalizedInput = normalizeInputForProtocolCheck(this.#input);
        if (malformedHttpProtocolPattern.test(normalizedInput)) {
          throw new TypeError("`input` url protocol must be followed by `//` when using `baseUrl`");
        }
        if (!isAbsoluteInput(normalizedInput)) {
          this.#input = new URL(this.#input, new Request(this.#options.baseUrl).url);
        }
      }
    }
    if (supportsAbortController && supportsAbortSignal) {
      this.#userProvidedAbortSignal = this.#options.signal ?? this.#input.signal;
      this.#abortController = new globalThis.AbortController();
      this.#options.signal = this.#createManagedSignal();
    }
    if (supportsRequestStreams) {
      this.#options.duplex = "half";
    }
    if (this.#options.json !== void 0) {
      this.#options.body = this.#options.stringifyJson?.(this.#options.json) ?? JSON.stringify(this.#options.json);
      this.#options.headers.set("content-type", this.#options.headers.get("content-type") ?? "application/json");
    }
    const userProvidedContentType = options.headers && new globalThis.Headers(options.headers).has("content-type");
    if (this.#input instanceof globalThis.Request && (supportsFormData && this.#options.body instanceof globalThis.FormData || this.#options.body instanceof URLSearchParams) && !userProvidedContentType) {
      this.#options.headers.delete("content-type");
    }
    this.request = new globalThis.Request(this.#input, this.#options);
    if (hasSearchParameters(this.#options.searchParams)) {
      const url = new URL(this.request.url);
      const deleted = this.#options.searchParams?.[deletedParametersSymbol];
      if (deleted) {
        for (const key of deleted) {
          url.searchParams.delete(key);
        }
      }
      if (typeof this.#options.searchParams === "string") {
        const stringSearchParameters = this.#options.searchParams.replace(/^\?/, "");
        if (stringSearchParameters !== "") {
          url.search = url.search ? `${url.search}&${stringSearchParameters}` : `?${stringSearchParameters}`;
        }
      } else {
        const optionsSearchParameters = new URLSearchParams(Ky.#normalizeSearchParams(this.#options.searchParams));
        for (const [key, value] of optionsSearchParameters.entries()) {
          url.searchParams.append(key, value);
        }
      }
      if (this.#options.searchParams && typeof this.#options.searchParams === "object" && !Array.isArray(this.#options.searchParams) && !(this.#options.searchParams instanceof URLSearchParams)) {
        for (const [key, value] of Object.entries(this.#options.searchParams)) {
          if (value === void 0) {
            url.searchParams.delete(key);
          }
        }
      }
      this.request = new globalThis.Request(url, this.#options);
    }
    if (this.#options.onUploadProgress && typeof this.#options.onUploadProgress !== "function") {
      throw new TypeError("The `onUploadProgress` option must be a function");
    }
    this.#startTime = typeof this.#options.totalTimeout === "number" ? this.#getCurrentTime() : void 0;
  }
  #calculateDelay(retry2) {
    const retryDelay = retry2.delay(this.#retryCount + 1);
    let jitteredDelay = retryDelay;
    if (retry2.jitter === true) {
      jitteredDelay = Math.random() * retryDelay;
    } else if (typeof retry2.jitter === "function") {
      jitteredDelay = retry2.jitter(retryDelay);
      if (!Number.isFinite(jitteredDelay) || jitteredDelay < 0) {
        jitteredDelay = retryDelay;
      }
    }
    return Math.min(retry2.backoffLimit, jitteredDelay);
  }
  async #calculateRetryDelay(error) {
    const retry2 = normalizeRetryOptions(this.#options.retry);
    if (this.#retryCount >= Math.min(retry2.limit, this.#retryLimit)) {
      throw error;
    }
    const errorObject = error instanceof Error ? error : new NonError(error);
    if (errorObject instanceof ForceRetryError) {
      return errorObject.customDelay ?? this.#calculateDelay(retry2);
    }
    if (!retry2.methods.includes(this.request.method.toLowerCase())) {
      throw error;
    }
    const { shouldRetry } = retry2;
    if (shouldRetry !== void 0) {
      const result = await this.#raceWithTotalTimeout(async () => shouldRetry({ error: errorObject, retryCount: this.#retryCount + 1 }));
      if (result === timedOutOperation) {
        throw new TimeoutError(this.request);
      }
      if (result === false) {
        throw error;
      }
      if (result === true) {
        return this.#calculateDelay(retry2);
      }
    }
    if (isTimeoutError(error)) {
      if (!retry2.retryOnTimeout) {
        throw error;
      }
      return this.#calculateDelay(retry2);
    }
    if (isHTTPError(error)) {
      if (!retry2.statusCodes.includes(error.response.status)) {
        throw error;
      }
      const retryTimingHeader = getRetryTimingHeader(error.response.headers);
      if (retryTimingHeader && retry2.afterStatusCodes.includes(error.response.status)) {
        const after = calculateRetryTimingDelay(retryTimingHeader);
        if (after === void 0) {
          return this.#calculateDelay(retry2);
        }
        return Math.min(retry2.maxRetryAfter, after);
      }
      if (error.response.status === 413) {
        throw error;
      }
      return this.#calculateDelay(retry2);
    }
    if (!isNetworkError(error)) {
      throw error;
    }
    return this.#calculateDelay(retry2);
  }
  #decorateResponse(response) {
    const request = this.#getResponseRequest(response);
    if (this.#options.parseJson) {
      response.json = async () => {
        const text = await response.text();
        return this.#options.parseJson(text, { request, response });
      };
    }
    return response;
  }
  async #throwProcessedError(error) {
    if (!(error instanceof Error)) {
      throw error;
    }
    if (this.#beforeRetryHookErrors.has(error)) {
      throw error;
    }
    let processedError = error;
    for (const hook of this.#options.hooks.beforeError) {
      const hookResult = await hook({
        request: this.request,
        options: this.#getNormalizedOptions(),
        error: processedError,
        retryCount: this.#retryCount
      });
      if (hookResult instanceof Error) {
        processedError = hookResult;
      }
    }
    throw processedError;
  }
  async #getResponseData(response) {
    const readTimeout = this.#getErrorDataTimeout();
    const text = await this.#readResponseText(response, readTimeout.milliseconds);
    if (text === timedOutResponseData) {
      if (readTimeout.fromTotalTimeout) {
        throw new TimeoutError(this.request);
      }
      this.#throwIfTotalTimeoutExhausted();
      return void 0;
    }
    if (!text) {
      return void 0;
    }
    if (!this.#isJsonContentType(response.headers.get("content-type") ?? "")) {
      return text;
    }
    const parseTimeout = this.#getErrorDataTimeout();
    const data = await this.#parseJson(text, response, parseTimeout.milliseconds, this.#getResponseRequest(response));
    if (data === timedOutResponseData) {
      if (parseTimeout.fromTotalTimeout) {
        throw new TimeoutError(this.request);
      }
      this.#throwIfTotalTimeoutExhausted();
      return void 0;
    }
    return data;
  }
  #getErrorDataTimeout() {
    const errorDataTimeout = this.#options.timeout === false ? 1e4 : this.#options.timeout;
    const remainingTotal = this.#getRemainingTotalTimeout();
    if (remainingTotal === void 0) {
      return {
        milliseconds: errorDataTimeout,
        fromTotalTimeout: false
      };
    }
    if (remainingTotal <= 0) {
      throw new TimeoutError(this.request);
    }
    return {
      milliseconds: Math.min(errorDataTimeout, remainingTotal),
      fromTotalTimeout: remainingTotal <= errorDataTimeout
    };
  }
  #getBodyReadTimeout() {
    const remainingTotal = this.#getRemainingTotalTimeout();
    if (remainingTotal !== void 0) {
      if (remainingTotal <= 0) {
        throw new TimeoutError(this.request);
      }
      return this.#options.timeout === false ? remainingTotal : Math.min(this.#options.timeout, remainingTotal);
    }
    return this.#options.timeout === false ? void 0 : this.#options.timeout;
  }
  // Unlike error bodies (`#getResponseData`), a successful body read has no fallback value to return -
  // the caller's `.json()`/`.text()`/etc. promise must settle, so a timeout here always rejects.
  async #raceBodyRead(createBodyPromise, response) {
    let timeoutMs;
    try {
      timeoutMs = this.#getBodyReadTimeout();
    } catch (error) {
      await this.#throwProcessedError(error);
    }
    const bodyPromise = createBodyPromise();
    if (timeoutMs === void 0) {
      return bodyPromise;
    }
    const result = await Promise.race([
      bodyPromise,
      new Promise((resolve) => {
        const timeoutId = setTimeout(() => {
          resolve(timedOutResponseData);
        }, timeoutMs);
        void bodyPromise.finally(() => {
          clearTimeout(timeoutId);
        }).catch(() => void 0);
      })
    ]);
    if (result === timedOutResponseData) {
      this.#abortController?.abort();
      await this.#throwProcessedError(new TimeoutError(this.#getResponseRequest(response)));
    }
    return result;
  }
  async #raceWithTotalTimeout(operation) {
    const remainingTotal = this.#getRemainingTotalTimeout();
    if (remainingTotal === void 0) {
      return operation();
    }
    if (remainingTotal <= 0) {
      this.#abortController?.abort();
      return timedOutOperation;
    }
    let timeoutId;
    try {
      const timeoutPromise = new Promise((resolve) => {
        timeoutId = setTimeout(() => {
          resolve(timedOutOperation);
        }, remainingTotal);
      });
      const operationResult = Promise.resolve().then(operation).then((value) => ({ status: "fulfilled", value })).catch((error) => ({ status: "rejected", error }));
      const result = await Promise.race([operationResult, timeoutPromise]);
      const remainingAfterOperation = this.#getRemainingTotalTimeout();
      const didTimeOut = result === timedOutOperation || remainingAfterOperation !== void 0 && remainingAfterOperation <= 0;
      if (didTimeOut) {
        this.#abortController?.abort();
        if (result === timedOutOperation) {
          void operationResult.then((result2) => {
            if (result2.status === "fulfilled") {
              this.#cancelReturnedBody(result2.value);
            }
          });
        } else if (result.status === "fulfilled") {
          this.#cancelReturnedBody(result.value);
        }
        return timedOutOperation;
      }
      if (result.status === "rejected") {
        throw result.error;
      }
      return result.value;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  #isJsonContentType(contentType) {
    const mimeType = (contentType.split(";", 1)[0] ?? "").trim().toLowerCase();
    return /\/(?:.*[.+-])?json$/.test(mimeType);
  }
  async #readResponseText(response, timeoutMs) {
    const { body } = response;
    if (!body) {
      try {
        return await response.text();
      } catch {
        return void 0;
      }
    }
    let reader;
    try {
      reader = body.getReader();
    } catch {
      return void 0;
    }
    const decoder = createTextDecoder(response.headers.get("content-type") ?? "");
    const chunks = [];
    let totalBytes = 0;
    const readAll = (async () => {
      try {
        for (; ; ) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          totalBytes += value.byteLength;
          if (totalBytes > maxErrorResponseBodySize) {
            void reader.cancel().catch(() => void 0);
            return void 0;
          }
          chunks.push(decoder.decode(value, { stream: true }));
        }
      } catch {
        return void 0;
      }
      chunks.push(decoder.decode());
      return chunks.join("");
    })();
    const timeoutPromise = new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        resolve(timedOutResponseData);
      }, timeoutMs);
      void readAll.finally(() => {
        clearTimeout(timeoutId);
      });
    });
    const result = await Promise.race([readAll, timeoutPromise]);
    if (result === timedOutResponseData) {
      void reader.cancel().catch(() => void 0);
    }
    return result;
  }
  async #parseJson(text, response, timeoutMs, request) {
    let timeoutId;
    try {
      return await Promise.race([
        Promise.resolve().then(() => this.#options.parseJson ? this.#options.parseJson(text, { request, response }) : JSON.parse(text)),
        new Promise((resolve) => {
          timeoutId = setTimeout(() => {
            resolve(timedOutResponseData);
          }, timeoutMs);
        })
      ]);
    } catch {
      return void 0;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  #cancelBody(body) {
    if (!body) {
      return;
    }
    void body.cancel().catch(() => void 0);
  }
  #cancelResponseBody(response) {
    this.#cancelBody(response.body ?? void 0);
  }
  #cancelReturnedBody(value) {
    if (isResponseInstance(value)) {
      this.#cancelResponseBody(value);
    } else if (isRequestInstance(value)) {
      this.#cancelBody(value.body ?? void 0);
    }
  }
  #createManagedSignal() {
    return this.#userProvidedAbortSignal ? AbortSignal.any([this.#userProvidedAbortSignal, this.#abortController.signal]) : this.#abortController.signal;
  }
  #throwIfTotalTimeoutExhausted() {
    const remaining = this.#getRemainingTotalTimeout();
    if (remaining !== void 0 && remaining <= 0) {
      throw new TimeoutError(this.request);
    }
  }
  async #runBeforeRequestHooks() {
    for (const hook of this.#options.hooks.beforeRequest) {
      const result = await this.#raceWithTotalTimeout(async () => hook({
        request: this.request,
        options: this.#getNormalizedOptions(),
        retryCount: 0
      }));
      if (result === timedOutOperation) {
        throw new TimeoutError(this.request);
      }
      if (isRequestInstance(result)) {
        this.#assignRequest(result);
      } else if (isResponseInstance(result)) {
        return result;
      }
    }
    return void 0;
  }
  async #runAfterResponseHooks(response) {
    const responseRequest = this.#getResponseRequest(response);
    for (const hook of this.#options.hooks.afterResponse) {
      const hookResponse = this.#setResponseRequest(response.clone(), responseRequest);
      this.#decorateResponse(hookResponse);
      let modifiedResponse;
      try {
        modifiedResponse = await this.#raceWithTotalTimeout(async () => hook({
          request: this.request,
          options: this.#getNormalizedOptions(),
          response: hookResponse,
          retryCount: this.#retryCount
        }));
        if (modifiedResponse === timedOutOperation) {
          throw new TimeoutError(this.request);
        }
      } catch (error) {
        if (hookResponse !== response) {
          this.#cancelResponseBody(hookResponse);
        }
        this.#cancelResponseBody(response);
        throw error;
      }
      if (modifiedResponse instanceof RetryMarker) {
        if (hookResponse !== response) {
          this.#cancelResponseBody(hookResponse);
        }
        this.#cancelResponseBody(response);
        throw new ForceRetryError(modifiedResponse.options);
      }
      const nextResponse = isResponseInstance(modifiedResponse) ? this.#setResponseRequest(modifiedResponse, responseRequest) : response;
      if (hookResponse !== response && hookResponse !== nextResponse && hookResponse.body !== nextResponse.body) {
        this.#cancelResponseBody(hookResponse);
      }
      if (response !== nextResponse && response.body !== nextResponse.body) {
        this.#cancelResponseBody(response);
      }
      response = nextResponse;
    }
    return response;
  }
  async #retry(function_) {
    try {
      return await function_();
    } catch (error) {
      return this.#retryFromError(error, function_);
    }
  }
  async #retryFromError(error, function_) {
    this.#returnedResponseFromBeforeRetryHook = false;
    const retryDelay = Math.min(await this.#calculateRetryDelay(error), maxSafeTimeout);
    const delayOptions = { signal: this.#userProvidedAbortSignal };
    const remainingTimeout = this.#getRemainingTotalTimeout();
    if (remainingTimeout !== void 0) {
      if (remainingTimeout <= 0) {
        throw new TimeoutError(this.request);
      }
      if (retryDelay >= remainingTimeout) {
        await delay(remainingTimeout, delayOptions);
        throw new TimeoutError(this.request);
      }
    }
    await delay(retryDelay, delayOptions);
    this.#throwIfTotalTimeoutExhausted();
    if (error instanceof ForceRetryError && error.customRequest) {
      const customRequest = new globalThis.Request(error.customRequest, this.#options.signal ? { signal: this.#options.signal } : void 0);
      this.#assignRequest(customRequest);
    }
    for (const hook of this.#options.hooks.beforeRetry) {
      let hookResult;
      try {
        hookResult = await this.#raceWithTotalTimeout(async () => hook({
          request: this.request,
          options: this.#getNormalizedOptions(),
          error,
          retryCount: this.#retryCount + 1
        }));
      } catch (hookError) {
        if (hookError instanceof Error && hookError !== error) {
          this.#beforeRetryHookErrors.add(hookError);
        }
        throw hookError;
      }
      if (hookResult === timedOutOperation) {
        throw new TimeoutError(this.request);
      }
      if (isRequestInstance(hookResult)) {
        this.#assignRequest(hookResult);
        break;
      }
      if (isResponseInstance(hookResult)) {
        this.#returnedResponseFromBeforeRetryHook = true;
        this.#retryCount++;
        return hookResult;
      }
      if (hookResult === stop) {
        return;
      }
    }
    this.#throwIfTotalTimeoutExhausted();
    this.#retryCount++;
    return this.#retry(function_);
  }
  #consumeReturnedResponseFromBeforeRetryHook() {
    const value = this.#returnedResponseFromBeforeRetryHook;
    this.#returnedResponseFromBeforeRetryHook = false;
    return value;
  }
  async #fetch() {
    if (this.#abortController?.signal.aborted) {
      this.#abortController = new globalThis.AbortController();
      this.#options.signal = this.#createManagedSignal();
      this.request = new globalThis.Request(this.request, { signal: this.#options.signal });
    }
    const nonRequestOptions = findUnknownOptions(this.#options);
    this.#retryLimit = normalizeRetryOptions(this.#options.retry).limit;
    const retryRequest = this.#retryLimit > 0 ? this.request.clone() : void 0;
    const request = this.#wrapRequestWithUploadProgress(this.request, this.#options.body ?? void 0);
    this.#originalRequest = request;
    if (retryRequest) {
      this.request = retryRequest;
    }
    try {
      const remainingTotal = this.#getRemainingTotalTimeout();
      if (remainingTotal !== void 0 && remainingTotal <= 0) {
        throw new TimeoutError(this.request);
      }
      const effectiveTimeout = this.#options.timeout === false ? remainingTotal : remainingTotal === void 0 ? this.#options.timeout : Math.min(this.#options.timeout, remainingTotal);
      const response = effectiveTimeout === void 0 ? await this.#options.fetch(request, nonRequestOptions) : await timeout(request, nonRequestOptions, this.#abortController, {
        timeout: effectiveTimeout,
        fetch: this.#options.fetch
      });
      return this.#setResponseRequest(response, request);
    } catch (error) {
      if (isRawNetworkError(error)) {
        throw new NetworkError(this.request, { cause: error });
      }
      throw error;
    }
  }
  #getRemainingTotalTimeout() {
    if (this.#startTime === void 0) {
      return void 0;
    }
    const elapsed = this.#getCurrentTime() - this.#startTime;
    return Math.max(0, this.#options.totalTimeout - elapsed);
  }
  #getCurrentTime() {
    return globalThis.performance?.now() ?? Date.now();
  }
  #getNormalizedOptions() {
    if (!this.#cachedNormalizedOptions) {
      const { hooks, json, parseJson, stringifyJson, searchParams, timeout: timeout2, totalTimeout, throwHttpErrors, fetch, ...normalizedOptions } = this.#options;
      this.#cachedNormalizedOptions = Object.freeze(normalizedOptions);
    }
    return this.#cachedNormalizedOptions;
  }
  #assignRequest(request) {
    this.#cachedNormalizedOptions = void 0;
    this.request = request;
  }
  #getResponseRequest(response) {
    return this.#responseRequests.get(response) ?? this.request;
  }
  #setResponseRequest(response, request) {
    this.#responseRequests.set(response, request);
    return response;
  }
  #wrapRequestWithUploadProgress(request, originalBody) {
    if (!this.#options.onUploadProgress || !request.body || !supportsRequestStreams) {
      return request;
    }
    return streamRequest(request, this.#options.onUploadProgress, originalBody ?? this.#options.body ?? void 0);
  }
}
const createInstance = (defaults) => {
  const ky2 = (input, options) => Ky.create(input, validateAndMerge(defaults, options));
  for (const method of requestMethods) {
    ky2[method] = (input, options) => Ky.create(input, validateAndMerge(defaults, options, { method }));
  }
  ky2.create = (newDefaults) => createInstance(validateAndMerge(newDefaults));
  ky2.extend = (newDefaults) => {
    if (typeof newDefaults === "function") {
      newDefaults = newDefaults(defaults ?? {});
    }
    return createInstance(validateAndMerge(defaults, newDefaults));
  };
  ky2.stop = stop;
  ky2.retry = retry;
  return ky2;
};
const ky = createInstance();
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var browser = { exports: {} };
var ms;
var hasRequiredMs;
function requireMs() {
  if (hasRequiredMs) return ms;
  hasRequiredMs = 1;
  var s = 1e3;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;
  ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
    );
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "weeks":
      case "week":
      case "w":
        return n * w;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms2) {
    var msAbs = Math.abs(ms2);
    if (msAbs >= d) {
      return Math.round(ms2 / d) + "d";
    }
    if (msAbs >= h) {
      return Math.round(ms2 / h) + "h";
    }
    if (msAbs >= m) {
      return Math.round(ms2 / m) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms2 / s) + "s";
    }
    return ms2 + "ms";
  }
  function fmtLong(ms2) {
    var msAbs = Math.abs(ms2);
    if (msAbs >= d) {
      return plural(ms2, msAbs, d, "day");
    }
    if (msAbs >= h) {
      return plural(ms2, msAbs, h, "hour");
    }
    if (msAbs >= m) {
      return plural(ms2, msAbs, m, "minute");
    }
    if (msAbs >= s) {
      return plural(ms2, msAbs, s, "second");
    }
    return ms2 + " ms";
  }
  function plural(ms2, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms2 / n) + " " + name + (isPlural ? "s" : "");
  }
  return ms;
}
var common;
var hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon) return common;
  hasRequiredCommon = 1;
  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = requireMs();
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key) => {
      createDebug[key] = env[key];
    });
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace) {
      let hash = 0;
      for (let i = 0; i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function createDebug(namespace) {
      let prevTime;
      let enableOverride = null;
      let namespacesCache;
      let enabledCache;
      function debug2(...args) {
        if (!debug2.enabled) {
          return;
        }
        const self = debug2;
        const curr = Number(/* @__PURE__ */ new Date());
        const ms2 = curr - (prevTime || curr);
        self.diff = ms2;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if (match === "%%") {
            return "%";
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        createDebug.formatArgs.call(self, args);
        const logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }
      debug2.namespace = namespace;
      debug2.useColors = createDebug.useColors();
      debug2.color = createDebug.selectColor(namespace);
      debug2.extend = extend;
      debug2.destroy = createDebug.destroy;
      Object.defineProperty(debug2, "enabled", {
        enumerable: true,
        configurable: false,
        get: () => {
          if (enableOverride !== null) {
            return enableOverride;
          }
          if (namespacesCache !== createDebug.namespaces) {
            namespacesCache = createDebug.namespaces;
            enabledCache = createDebug.enabled(namespace);
          }
          return enabledCache;
        },
        set: (v) => {
          enableOverride = v;
        }
      });
      if (typeof createDebug.init === "function") {
        createDebug.init(debug2);
      }
      return debug2;
    }
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.namespaces = namespaces;
      createDebug.names = [];
      createDebug.skips = [];
      const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const ns of split) {
        if (ns[0] === "-") {
          createDebug.skips.push(ns.slice(1));
        } else {
          createDebug.names.push(ns);
        }
      }
    }
    function matchesTemplate(search, template) {
      let searchIndex = 0;
      let templateIndex = 0;
      let starIndex = -1;
      let matchIndex = 0;
      while (searchIndex < search.length) {
        if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
          if (template[templateIndex] === "*") {
            starIndex = templateIndex;
            matchIndex = searchIndex;
            templateIndex++;
          } else {
            searchIndex++;
            templateIndex++;
          }
        } else if (starIndex !== -1) {
          templateIndex = starIndex + 1;
          matchIndex++;
          searchIndex = matchIndex;
        } else {
          return false;
        }
      }
      while (templateIndex < template.length && template[templateIndex] === "*") {
        templateIndex++;
      }
      return templateIndex === template.length;
    }
    function disable() {
      const namespaces = [
        ...createDebug.names,
        ...createDebug.skips.map((namespace) => "-" + namespace)
      ].join(",");
      createDebug.enable("");
      return namespaces;
    }
    function enabled(name) {
      for (const skip of createDebug.skips) {
        if (matchesTemplate(name, skip)) {
          return false;
        }
      }
      for (const ns of createDebug.names) {
        if (matchesTemplate(name, ns)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    function destroy() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  }
  common = setup;
  return common;
}
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser.exports;
  hasRequiredBrowser = 1;
  (function(module2, exports2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports2.storage.getItem("debug") || exports2.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = requireCommon()(exports2);
    const { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  })(browser, browser.exports);
  return browser.exports;
}
var browserExports = requireBrowser();
const debug = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
const logger = {
  request: debug("wuzapi:request"),
  response: debug("wuzapi:response"),
  error: debug("wuzapi:error"),
  info: debug("wuzapi:info")
};
function resolveErrorMessage(body, fallback) {
  if (typeof body !== "object" || body === null) return fallback;
  const { error, message, data } = body;
  if (typeof error === "string") return error;
  if (typeof message === "string") return message;
  if (typeof data === "string") return data;
  return fallback;
}
function toWuzapiError(error) {
  if (error instanceof HTTPError) {
    return new WuzapiError(
      error.response.status,
      resolveErrorMessage(
        error.data,
        `API request failed with status ${error.response.status}`
      ),
      error.data
    );
  }
  return new WuzapiError(0, `Network error: ${error.message}`, error);
}
class WuzapiError extends Error {
  constructor(code, message, details) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = "WuzapiError";
  }
  code;
  details;
}
class BaseClient {
  constructor(config) {
    this.config = config;
    this.http = ky.create({
      prefix: config.apiUrl,
      retry: 0,
      timeout: false,
      hooks: {
        beforeError: [
          ({ error }) => toWuzapiError(error)
        ]
      }
    });
  }
  config;
  http;
  /**
   * Which credential this module's endpoints authenticate with. Overridden to
   * `"admin"` by `AdminModule`; every other module is on user auth.
   */
  authScheme = "user";
  /**
   * Build the authentication headers required by the request.
   */
  buildHeaders(options) {
    if (options?.auth === false) return {};
    const isAdmin = this.authScheme === "admin";
    const token = options?.token ?? (isAdmin ? this.config.adminToken : this.config.token);
    if (!token) {
      throw new WuzapiError(
        401,
        isAdmin ? "No admin token provided. Set `adminToken` in the client config, or pass `{ token }` in the request options." : "No user token provided. Set `token` in the client config, or pass `{ token }` in the request options."
      );
    }
    return {
      [isAdmin ? "Authorization" : "token"]: token
    };
  }
  /**
   * Execute an HTTP request and return its parsed response body without
   * interpreting it as a WuzAPI response envelope.
   */
  requestRaw(method, endpoint, data, options) {
    const headers = this.buildHeaders(options);
    if (this.config.debug) {
      logger.request(`[${method}] ${endpoint}`, {
        headers,
        params: options?.params,
        data
      });
    }
    return this.http(endpoint, {
      method,
      headers,
      searchParams: options?.params,
      ...data === void 0 ? {} : { json: data }
    }).json();
  }
  /**
   * Execute a WuzAPI request, validate its response envelope, and unwrap
   * its `.data` value.
   */
  async request(method, endpoint, data, options) {
    const response = await this.requestRaw(
      method,
      endpoint,
      data,
      options
    );
    const validCode = typeof response.code !== "number" || response.code >= 200 && response.code < 300;
    if (response.success && validCode) {
      return response.data;
    }
    throw new WuzapiError(
      response.code ?? 500,
      resolveErrorMessage(response, "API request failed"),
      response
    );
  }
  get(endpoint, options) {
    return this.request("GET", endpoint, void 0, options);
  }
  post(endpoint, data, options) {
    return this.request("POST", endpoint, data, options);
  }
  put(endpoint, data, options) {
    return this.request("PUT", endpoint, data, options);
  }
  delete(endpoint, options) {
    return this.request("DELETE", endpoint, void 0, options);
  }
}
exports.BaseClient = BaseClient;
exports.WuzapiError = WuzapiError;
//# sourceMappingURL=client.js.map
