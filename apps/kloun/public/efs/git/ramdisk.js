const child_process = require("child_process");
const fs = require("fs");

function getDirSize(directory) {
  const command = `du -sb ${directory}`;
  const output = child_process.execSync(command, { encoding: "utf8" }).trim();
  const sizeInBytes = output.split(/\s+/)[0];
  console.log(sizeInBytes);
  return Math.round(sizeInBytes * 0.5);
}

function createRamdisk(size, name) {
  const ramdiskPath = "/tmp/" + name;
  if (fs.existsSync(ramdiskPath)) {
    child_process.execSync(
      `sudo umount ${ramdiskPath} && sudo rm -rf ${ramdiskPath} && mkdir -p ${ramdiskPath}`
    );
    child_process
      .execSync(`sudo chmod 777 ${ramdiskPath}`, { encoding: "utf8" })
      .trim();
    child_process
      .execSync(`sudo mount -t tmpfs -o size=${size} tmpfs ${ramdiskPath}`, {
        encoding: "utf8",
      })
      .trim();
    return null;
  } else {
    child_process.execSync(`mkdir -p ${ramdiskPath}`);
    child_process
      .execSync(`sudo chmod 777 ${ramdiskPath}`, { encoding: "utf8" })
      .trim();
    child_process
      .execSync(`sudo mount -t tmpfs -o size=${size} tmpfs ${ramdiskPath}`, {
        encoding: "utf8",
      })
      .trim();
    return null;
  }
}

function copyDirectoryToRamdisk(directory) {
  const ramdiskPath = "/tmp/" + directory.split("/").reverse()[1];
  child_process
    .execSync(`sudo rsync -a --delete ${directory} /tmp/`, { encoding: "utf8" })
    .trim();
  child_process
    .execSync(`sudo chmod -R 755  ${ramdiskPath}`, { encoding: "utf8" })
    .trim();

  child_process
    .execSync(`rm -rf ${directory} && ln -s ${ramdiskPath} ${directory}`, {
      encoding: "utf8",
    })
    .trim();

  child_process
    .execSync(`rm -rf ${directory} && ln -s ${ramdiskPath} ${directory}`, {
      encoding: "utf8",
    })
    .trim();
  return null;
}

function createRamdiskFromDirectory(directory) {
  const name = directory.split("/").reverse()[1];
  const size = getDirSize(directory);
  const ramdiskPath = createRamdisk(size, name);
  copyDirectoryToRamdisk(directory);
  return ramdiskPath;
}
module.exports = {
  createRamdiskFromDirectory,
};
