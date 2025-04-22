

export type EmailErrorCode =
  | 'EAUTH'       // Authentication error
  | 'ECONNECTION' // Connection error
  | 'EENVELOPE'   // Envelope error (invalid recipients)
  | 'EMESSAGE'    // Message processing error
  | 'ETIMEDOUT'   // Connection timeout
  | 'ESOCKET'     // Socket error
  | 'EDNS'        // DNS lookup error
  | 'ESTREAM'     // Stream error
  | 'EPARSE'      // Message parsing error
  | 'EALREADYSENT' // Message already sent
  | 'EALREADYCLOSED' // Connection already closed
  | 'EUNKNOWN';   // Catch-all for unknown errors

type EmailErrorStatusCode = Record<EmailErrorCode, number>;

export const statusMap: EmailErrorStatusCode = {
  EAUTH: 401,
  ECONNECTION: 502,
  EENVELOPE: 400,
  EMESSAGE: 400,
  ETIMEDOUT: 504,
  ESOCKET: 503,
  EDNS: 502,
  ESTREAM: 500,
  EPARSE: 400,
  EALREADYSENT: 400,
  EALREADYCLOSED: 503,
  EUNKNOWN: 500
};
