/**
 * Hook: Task completion notification
 * Executes actions when Claude finishes a task
 */

const { execSync } = require('child_process');
const os = require('os');

// Configuration
const NOTIFY_SOUND = true;        // Play sound
const NOTIFY_SYSTEM = true;       // System notification
const LOG_COMPLETION = true;      // Log to file

const platform = os.platform();

// System notification function
function sendNotification(title, message) {
  if (!NOTIFY_SYSTEM) return;

  try {
    if (platform === 'darwin') {
      // macOS
      execSync(`osascript -e 'display notification "${message}" with title "${title}"'`);
    } else if (platform === 'linux') {
      // Linux
      execSync(`notify-send "${title}" "${message}"`);
    } else if (platform === 'win32') {
      // Windows PowerShell
      const ps = `
        [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
        $template = [Windows.UI.Notifications.ToastNotificationManager]::GetTemplateContent([Windows.UI.Notifications.ToastTemplateType]::ToastText02)
        $textNodes = $template.GetElementsByTagName("text")
        $textNodes.Item(0).AppendChild($template.CreateTextNode("${title}")) | Out-Null
        $textNodes.Item(1).AppendChild($template.CreateTextNode("${message}")) | Out-Null
        $toast = [Windows.UI.Notifications.ToastNotification]::new($template)
        [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier("Claude Code").Show($toast)
      `;
      execSync(`powershell -command "${ps.replace(/\n/g, ' ')}"`, { stdio: 'ignore' });
    }
  } catch (e) {
    // Ignore notification errors
  }
}

// Play sound function
function playSound() {
  if (!NOTIFY_SOUND) return;

  try {
    if (platform === 'darwin') {
      execSync('afplay /System/Library/Sounds/Glass.aiff &');
    } else if (platform === 'linux') {
      execSync('paplay /usr/share/sounds/freedesktop/stereo/complete.oga 2>/dev/null || aplay /usr/share/sounds/sound-icons/prompt.wav 2>/dev/null &');
    } else if (platform === 'win32') {
      execSync('powershell -c "(New-Object Media.SoundPlayer \'C:\\Windows\\Media\\notify.wav\').PlaySync()"', { stdio: 'ignore' });
    }
  } catch (e) {
    // Ignore sound errors
  }
}

// Log completion function
function logCompletion() {
  if (!LOG_COMPLETION) return;

  const fs = require('fs');
  const logFile = '.claude/task-completions.log';
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - Task completed\n`;

  try {
    fs.appendFileSync(logFile, logEntry);
  } catch (e) {
    // Ignore log errors
  }
}

// Execute
sendNotification('Claude Code', 'Task completed');
playSound();
logCompletion();

console.log(JSON.stringify({ block: false }));
