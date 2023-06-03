export class Directory {
  name?: string;
  files?: string[] = [];
  subdirectories?: Directory[] = [];
}

export function getDirectoryPaths(directory: Directory, currentPath: string = '', skipFirstDirectory: boolean = true): string[] {
  const paths: string[] = [];

  if (skipFirstDirectory) {
    skipFirstDirectory = false;
    if (directory.subdirectories) {
      for (const subdirectory of directory.subdirectories) {
        const subdirectoryPaths = getDirectoryPaths(subdirectory, currentPath, skipFirstDirectory);
        paths.push(...subdirectoryPaths);
      }
    }
  } else {
    if (directory.name) {
      currentPath += `/${directory.name}`;
      paths.push(currentPath);
    }

    if (directory.subdirectories) {
      for (const subdirectory of directory.subdirectories) {
        const subdirectoryPaths = getDirectoryPaths(subdirectory, currentPath, skipFirstDirectory);
        paths.push(...subdirectoryPaths);
      }
    }
  }

  return paths;
}
