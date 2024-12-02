# Use a lightweight Ubuntu image as the base
FROM ubuntu:20.04

# Disable interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install required languages and tools
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    nodejs \
    npm \
    openjdk-11-jdk \
    g++ \
    && apt-get clean

# Set the working directory inside the container
WORKDIR /code

# Copy the current directory into the container
COPY . /code

# Default command to keep the container running (can be overridden)
CMD ["tail", "-f", "/dev/null"]
