import { generateSurahData, generateJuzData } from './fetch-data';

async function main() {
  try {
    await generateSurahData();
    await generateJuzData();
    console.log('Data fetch complete!');
  } catch (err) {
    console.error('Error fetching data:', err);
    process.exit(1);
  }
}

main();
