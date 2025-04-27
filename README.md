# Http Proxy Challenge

## Description

You'll create an HTTP reverse proxy that analyzes observed HTTP transactions for suspicious client activity. For simplicity, this can be limited to HTTP/1.1 without TLS, and you may assume the traffic is encrypted upstream and may contain credentials. In your solution, focus on simplicity, flexibility, practical utility, and performance.

## Requirement Analysis

### Functional Requirements

- Implement an HTTP reverse proxy that analyzes observed HTTP transactions for suspicious client activity;
- Flags requests as potentially malicious based on two or more heuristics;
- Structure the proxy output to a log as machine-consumable data for analysis by a separate system.

### Non-Functional Requirements

- Simplicity: Focus on a simple design.
- Flexibility: The system should be flexible in how it flags malicious requests.
- Performance: Should perform reasonably well even though it’s not required to handle production-scale traffic.
- Language: You may use Python, JavaScript/TypeScript, Go, or C/C++.
- Protocol limitations:
    - Limit implementation to HTTP/1.1.
    - No TLS handling is needed.
- Logging format: Output must be structured and machine-consumable (e.g., JSON).

## How to run this project

To execute this project, first copy the `.env.example` file and rename it to `.env`:

```sh
$ cp .env.example .env
```

Then, if you have docker installed on your machine, build the application containers with:

```sh
$ docker compose up
```

**P.S.**: If necessary, use the --build flag to enforce docker compose to rebuild the image

Finally, access the application by opening the following URL in your browser:

```
http://localhost:3000
```

## TO-DO

- [] Optimize docker images;
- [X] Flags requests as potentially malicious;
- [X] Implement more heuristics for maliciousness;
- [] Increase test coverage;
- [] Move blocklist to a NoSQL solution;
- [] Move token bucket to a Redis/Mem Cache;
- [] Add E2E tests.

## References

- [Rate Limiting Algorithms explained with code](https://blog.algomaster.io/p/rate-limiting-algorithms-explained-with-code);
- [Rate Limiting Design System Interview](https://www.youtube.com/watch?v=dpEOhfEEoyw);
- [Reverse Proxy vs API Gateway vs Load Balancer](https://www.youtube.com/watch?v=RqfaTIWc3LQ);
- [Microservices Correlation Id](https://hilton.org.uk/blog/microservices-correlation-id); 
- [Dockerizing PNPM Workspaces](https://pnpm.io/next/docker).