import express from "express";
import { SUPPORTED_LANGUAGES } from "../config/languages";
import { FileService } from "../services/fileService";
import { DockerService } from "../services/dockerService";

const router = express.Router();

router.post("/execute", async (req:any, res:any) => {
  const { language, code }: { language: string; code: string } = req.body;

  // Validate language
  const langConfig = SUPPORTED_LANGUAGES[language];
  if (!langConfig) {
    return res.status(400).json({ error: "Unsupported language" });
  }

  const { cmd, ext } = langConfig;
  let tempFilePath: string | undefined;

  try {
    // Create temporary file
    tempFilePath = await FileService.createTempFile(code, ext);

    // Construct Docker command
    const dockerCmd = `docker run --rm -v ${process.cwd()}:/code code-executor bash -c "cd /code && ${cmd}"`;

    // Execute code in Docker
    const { stdout, stderr } = await DockerService.executeInDocker(dockerCmd);

    console.log(stdout,stderr)

    res.json({ stdout, stderr });
  } catch (error: any) {
    console.error("Execution error:", error);
    res.status(500).json({ error: error.stderr || "Code execution failed" });
  } finally {
    // Cleanup temp file
    if (tempFilePath) {
      await FileService.cleanupFile(tempFilePath);
    }
  }
});

export default router;
