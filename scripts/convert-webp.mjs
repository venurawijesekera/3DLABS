import sharp from 'sharp';
import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const IMG_DIR = 'public/assets/img';
const SEARCH_DIRS = ['app', 'components', 'data', 'public/assets/css'];

async function convertImages() {
    console.log('--- Phase 1: Converting Images ---');
    const files = await glob(`${IMG_DIR}/**/*.{png,jpg,jpeg,JPG,PNG}`);
    let convertedCount = 0;

    for (const file of files) {
        const ext = path.extname(file);
        const webpPath = file.replace(ext, '.webp');

        try {
            // Skip if already exists and we don't want to re-process
            // But for now, let's process all to ensure consistency
            await sharp(file)
                .webp({ quality: 80 })
                .toFile(webpPath);

            const oldSize = (await fs.stat(file)).size;
            const newSize = (await fs.stat(webpPath)).size;
            const saving = Math.round(((oldSize - newSize) / oldSize) * 100);

            console.log(`Converted: ${path.basename(file)} -> .webp (${saving}% size reduction)`);
            convertedCount++;
        } catch (err) {
            console.error(`Error converting ${file}:`, err.message);
        }
    }
    console.log(`\nSuccessfully converted ${convertedCount} images.`);
}

async function updateReferences() {
    console.log('\n--- Phase 2: Updating Code References ---');
    let filesUpdated = 0;
    let totalReplacements = 0;

    for (const dir of SEARCH_DIRS) {
        const files = await glob(`${dir}/**/*.{ts,tsx,css,js,mjs}`);

        for (const file of files) {
            try {
                const content = await fs.readFile(file, 'utf8');
                // Regex to find image extensions inside quotes or css urls
                const updatedContent = content.replace(/\.(png|jpg|jpeg|JPG|PNG)(?=["')])/g, '.webp');

                if (content !== updatedContent) {
                    await fs.writeFile(file, updatedContent, 'utf8');
                    const diff = (content.match(/\.(png|jpg|jpeg|JPG|PNG)/g) || []).length;
                    console.log(`Updated refs in: ${file} (${diff} refs)`);
                    filesUpdated++;
                    totalReplacements += diff;
                }
            } catch (err) {
                console.error(`Error processing refs in ${file}:`, err.message);
            }
        }
    }
    console.log(`\nUpdated ${totalReplacements} references across ${filesUpdated} files.`);
}

async function run() {
    try {
        await convertImages();
        await updateReferences();
        console.log('\nSUCCESS! Your site is now optimized with WebP.');
        console.log('NOTE: Original images were kept as backups. You can delete them later to save space.');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

run();
