"use client"; // Mark this component as a Client Component

import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';
import { useState } from 'react'; // Import useState to manage state

export default function Page() {
  const [updateStatus, setUpdateStatus] = useState<string>(''); // State to track update status

  const handleUpdateCheck = async () => {
    try {
      const update = await check();
      if (update) {
        console.log(`Found update ${update.version} from ${update.date} with notes ${update.body}`);
        setUpdateStatus(`Found update ${update.version}`);

        let downloaded = 0;
        let contentLength: number | undefined = 0;

        await update.downloadAndInstall((event) => {
          switch (event.event) {
            case 'Started':
              contentLength = event.data.contentLength;
              console.log(`Started downloading ${event.data.contentLength} bytes`);
              setUpdateStatus('Download started...');
              break;
            case 'Progress':
              downloaded += event.data.chunkLength;
              console.log(`Downloaded ${downloaded} from ${contentLength}`);
              setUpdateStatus(`Downloading... ${downloaded} / ${contentLength} bytes`);
              break;
            case 'Finished':
              console.log('Download finished');
              setUpdateStatus('Download finished. Installing update...');
              break;
          }
        });

        console.log('Update installed');
        setUpdateStatus('Update installed. Relaunching...');
        await relaunch();
      } else {
        console.log('No update found');
        setUpdateStatus('No update found.');
      }
    } catch (error) {
      console.error('Error during update check:', error);
      setUpdateStatus('Error during update check.');
    }
  };

  return (
    <div>
      <h1>Update Checker</h1>
      <button onClick={handleUpdateCheck}>Check for Updates 2</button>
      <p>{updateStatus}</p>
    </div>
  );
}