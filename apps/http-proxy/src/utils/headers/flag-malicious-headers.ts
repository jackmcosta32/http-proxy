// Common malicious patterns in headers
const MALICIOUS_PATTERNS = [
  // SQL injection patterns
  "'",
  '"',
  '/*',
  '*/',
  '/**',
  '*/',
  'union select',
  'select * from',
  'drop table',
  'delete from',
  'insert into',
  'update set',
  
  // XSS patterns
  '<script>',
  'javascript:',
  'onerror=',
  'onload=',
  'onmouseover=',
  'onmouseout=',
  'onclick=',
  'onfocus=',
  'onblur=',
  'eval(',
  'document.cookie',
  'window.location',
  
  // Command injection patterns
  ';',
  '&&',
  '||',
  '|',
  '`',
  '$(',
  '${',
  'exec(',
  'system(',
  'shell_exec(',
  
  // Directory traversal patterns
  '../',
  '..\\',
  '~/',
  '/etc/passwd',
  '/etc/shadow',
  'c:\\windows\\',
  'c:\\winnt\\',
  
  // Common attack patterns
  'alert(',
  'confirm(',
  'prompt(',
  'document.write',
  'innerHTML',
  'outerHTML',
  'setTimeout',
  'setInterval',
  'fetch(',
  'XMLHttpRequest',
  'WebSocket'
];

// Common malicious patterns in user agents
const MALICIOUS_USER_AGENT_PATTERNS = [
  // Common web scraping tools
  'scraper',
  'crawler',
  'spider',
  'bot',
  'wget',
  'curl',
  'python-requests',
  'java/',
  'perl',
  'ruby',
  'php',
  'go-http-client',
  
  // Known malicious tools
  'sqlmap',
  'nikto',
  'nmap',
  'metasploit',
  'burpsuite',
  'zap',
  'dirbuster',
  'gobuster',
  'wfuzz',
  
  // Suspicious patterns
  '() { :; };',
  'eval(',
  'base64_decode',
  'union select',
  'sleep(',
  'benchmark(',
  'waitfor delay',
  
  // Common attack tools
  'sql injection',
  'xss',
  'csrf',
  'lfi',
  'rfi',
  
  // Empty or suspiciously short user agents
  '',
  ' ',
  '-',
  'none',
  'unknown',
  
  // Common proxy/VPN indicators
  'proxy',
  'vpn',
  'tor',
  'anonymizer',
  
  // Common vulnerability scanners
  'acunetix',
  'nessus',
  'openvas',
  'qualys',
  'rapid7',
  'tenable'
];

const inspectHeaderValue = (value: string) => {
  const lowerValue = value.toLowerCase();

  return MALICIOUS_PATTERNS.some(pattern => lowerValue.includes(pattern));
}

const inspectUserAgent = (userAgent: string) => {
  const lowerUserAgent = userAgent.toLowerCase();

  return MALICIOUS_USER_AGENT_PATTERNS.some(pattern => lowerUserAgent.includes(pattern));
}

export const flagMaliciousHeaders = (headers: Record<string, string>) => {
  const userAgent = headers['user-agent'];

  if (userAgent && inspectUserAgent(userAgent)) {
    return `Malicious User-Agent detected: ${userAgent}`;
  }

  for (const header in headers) {
    if (inspectHeaderValue(header)) {
      return `Malicious header name detected: ${header}`;
    }
  }

  return false;
}