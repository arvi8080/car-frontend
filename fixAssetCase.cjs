const fs = require("fs");
const path = require("path");

// Assets folder path relative to client directory
const assetsFolder = path.join(__dirname, "src", "assets");

const filesToCheck = [
  "logo.svg",
  "gmail_logo.svg",
  "facebook_logo.svg",
  "instagram_logo.svg",
  "twitter_logo.svg",
  "menu_icon.svg",
  "search_icon.svg",
  "close_icon.svg",
  "users_icon.svg",
  "car_icon.svg",
  "location_icon.svg",
  "fuel_icon.svg",
  "addIcon.svg",
  "carIcon.svg",
  "carIconColored.svg",
  "dashboardIcon.svg",
  "dashboardIconColored.svg",
  "addIconColored.svg",
  "listIcon.svg",
  "listIconColored.svg",
  "cautionIconColored.svg",
  "arrow_icon.svg",
  "star_icon.svg",
  "check_icon.svg",
  "tick_icon.svg",
  "delete_icon.svg",
  "eye_icon.svg",
  "eye_close_icon.svg",
  "filter_icon.svg",
  "edit_icon.svg",
  "calendar_icon_colored.svg",
  "location_icon_colored.svg",
  "upload_icon.svg",
  "testimonial_image_1.png",
  "testimonial_image_2.png",
  "main_car.png",
  "banner_car_image.png",
  "user_profile.png",
  "car_image1.png",
  "car_image2.png",
  "car_image3.png",
  "car_image4.png"
];

console.log(`🔍 Checking assets in: ${assetsFolder}\n`);

// Read actual files in the assets folder
const actualFiles = fs.readdirSync(assetsFolder);

let renamedFiles = [];
let missingFiles = [];

filesToCheck.forEach(file => {
  const exactPath = path.join(assetsFolder, file);

  if (!fs.existsSync(exactPath)) {
    const match = actualFiles.find(f => f.toLowerCase() === file.toLowerCase());
    if (match) {
      // Rename file to match exact import
      const oldPath = path.join(assetsFolder, match);
      fs.renameSync(oldPath, exactPath);
      renamedFiles.push({ from: match, to: file });
    } else {
      missingFiles.push(file);
    }
  }
});

// Report
if (renamedFiles.length > 0) {
  console.log("✅ Renamed files to match imports exactly:");
  renamedFiles.forEach(f => console.log(` - ${f.from} ➡ ${f.to}`));
}

if (missingFiles.length > 0) {
  console.log("\n❌ Missing files:");
  missingFiles.forEach(f => console.log(` - ${f}`));
}

if (renamedFiles.length === 0 && missingFiles.length === 0) {
  console.log("🎉 All asset files are correct and case matches!");
}
