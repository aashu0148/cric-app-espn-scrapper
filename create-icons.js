import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Purple gradient background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, "#667eea");
  gradient.addColorStop(1, "#764ba2");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Draw white circle
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  // Draw "ESPN" text or cricket ball pattern
  ctx.fillStyle = "#667eea";
  ctx.font = `bold ${Math.floor(size / 5)}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("E", size / 2, size / 2);

  // Save the icon
  const buffer = canvas.toBuffer("image/png");
  const iconPath = resolve(__dirname, "icons", filename);
  writeFileSync(iconPath, buffer);
  console.log(`✓ Created ${filename}`);
}

// Create icons
createIcon(16, "icon16.png");
createIcon(48, "icon48.png");
createIcon(128, "icon128.png");

console.log("All icons created successfully!");
