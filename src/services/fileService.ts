import fs from "fs/promises";
import path from "path";

export class FileService {
  static async createTempFile(code: string, ext: string): Promise<string> {
    const filePath = path.join(process.cwd(), `temp${ext}`);
    await fs.writeFile(filePath, code);
    return filePath;
  }

  static async cleanupFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Failed to delete file: ${filePath}`, error);
    }
  }
}
