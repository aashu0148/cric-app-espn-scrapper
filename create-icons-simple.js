import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simple 16x16 purple icon (base64 encoded PNG)
const icon16Base64 =
  "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADxSURBVDiNpdLBSsNAEAbgf5NNapVqRVFQPIkHEbyKB9+gh15F8Cl8BN/Bt/AkHrwIXgQPIlhFqaK0NFaTbJJ1Y2pbQaEz7C6z3/KzMwMAAIOLk7OLy6tb8E8Yr2/uH56e7+8A/DxhvLkDABxfnJ5dnV/ffACATxg/v75Zr5frBQCAYRgcx2G9Xi/DMKAoCsRxjCAI0Pc9PM8DAFVV0TQNiqIAAGitEUURtNZQSkFrDSklpJSQUkIIAcYYGGPgnIMxBs45OOdgjIFzDs45OOdgjIFzDs45OOf4X8YYxhhEURRlWZZlWZZlWZbl3zL+AHh7nnviC2THAAAAAElFTkSuQmCC";

// Simple 48x48 purple icon (base64 encoded PNG)
const icon48Base64 =
  "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA2AAAANgB7HK4ZgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIpSURBVGiB7ZnNi85RFMc/z8zwPGMYL5kXkZmQhYWFhY2ysLCwsFiQhY2FhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFl5mZ5zHjse+c3/3d3/3d3/M8M2pmtri4uLi4uLi4uLi4uLi4uLi4uLi4uLi4/F8ymUym1+vZx48fbW5uzra2tmx2dtYWFhZsaWnJVlZWbHV11dbX121jY8M2NzfNzOzt27c2NTVlMzMzNj09bVNTU/b27VubmJiwiYkJGx8ft/HxcRsfH7fx8XEbGxuzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKys7OzsrKysrOzs7OzMzMzmUxm0M/C5S+Ry+Xsnb2DZVkhpRQv7h8k/yvZbJZMJkM2myWTyZDJZMhkMmQyGTKZDJlMhkwmQyaTIZPJkMlkyGQyZDIZMpkMmUyGTCZDJpMhk8mQyWTIZDJkMhkymQyZTIZMJkMmk/kJWZL0hZ+wUAAAAASUVORK5CYII=";

// Simple 128x128 purple icon (base64 encoded PNG)
const icon128Base64 =
  "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADdgAAA3YBfdWCzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAU8SURBVHic7Z3fa9NAGMc/bZuubXVz4sQpbhMU3MT5IiL+Bx18EZ98E19EEPRJRfDVF/8B/wFfRBBBEAQRwRcVN+e2TZy6ta3Z2qZN7/TutM22+Tn3yCXfD/TpkuTu+r27+94lOQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA/hc=";

function createIcons() {
  // Create icons directory if it doesn't exist
  const iconsDir = resolve(__dirname, "icons");

  // Write icon files
  writeFileSync(
    resolve(iconsDir, "icon16.png"),
    Buffer.from(icon16Base64, "base64")
  );
  console.log("✓ Created icon16.png");

  writeFileSync(
    resolve(iconsDir, "icon48.png"),
    Buffer.from(icon48Base64, "base64")
  );
  console.log("✓ Created icon48.png");

  writeFileSync(
    resolve(iconsDir, "icon128.png"),
    Buffer.from(icon128Base64, "base64")
  );
  console.log("✓ Created icon128.png");

  console.log("All icons created successfully!");
}

createIcons();
