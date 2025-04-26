# Http Proxy Challenge

## Requirement Analysis

### Functional Requirements

### Non-Functional Requirements

## How to run this project

To execute this project, first copy the `.env.example` file and rename it to `.env`:

```sh
$ cp .env.example .env
```

Then, if you have docker installed on your machine, build the application containers with:

```sh
docker compose up
```

**P.S.**: If necessary, use the --build flag to enforce docker compose to rebuild the image

Finally, access the application by opening the following URL in your browser:

```
http://localhost:3000
```

## References

- [Rate Limiting Algorithms explained with code](https://blog.algomaster.io/p/rate-limiting-algorithms-explained-with-code);
- [Rate Limiting Design System Interview](https://www.youtube.com/watch?v=dpEOhfEEoyw);
- [Reverse Proxy vs API Gateway vs Load Balancer](https://www.youtube.com/watch?v=RqfaTIWc3LQ);
- [Microservices Correlation Id](https://hilton.org.uk/blog/microservices-correlation-id); 
- [Dockerizing PNPM Workspaces](https://pnpm.io/next/docker);