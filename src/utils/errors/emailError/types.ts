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

export const emailErrorCodes: EmailErrorCode[] = [
  'EAUTH',
  'ECONNECTION',
  'EENVELOPE',
  'EMESSAGE',
  'ETIMEDOUT',
  'ESOCKET',
  'EDNS',
  'ESTREAM',
  'EPARSE',
  'EALREADYSENT',
  'EALREADYCLOSED',
  'EUNKNOWN'
];
