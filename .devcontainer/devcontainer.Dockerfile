FROM alpine AS downloads
ADD https://github.com/bencherdev/bencher/releases/download/v0.5.10/bencher-v0.5.10-linux-x86-64 /bencher
COPY sha512sum.txt sha512sum.txt
RUN sha512sum -c sha512sum.txt

FROM mcr.microsoft.com/devcontainers/base:ubuntu

COPY --from=downloads --chown=vscode:vscode /bencher /home/vscode/.local/bin/bencher
RUN chmod +x /home/vscode/.local/bin/bencher
