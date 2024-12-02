import { exec } from "child_process";

export class DockerService {
  static executeInDocker(cmd: string): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
      exec(cmd, { timeout: 10000 }, (error, stdout, stderr) => {
        if (error) {
          return reject({ stderr: stderr || error.message });
        }
        resolve({ stdout, stderr });
      });
    });
  }
}
