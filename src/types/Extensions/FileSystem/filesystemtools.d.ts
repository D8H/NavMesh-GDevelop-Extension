declare namespace gdjs {
  namespace fileSystem {
    let _path: any;
    let _fs: any;
    /** Get the Node.js path module, or null if it can't be loaded */
    const _getPath: () => any;
    /** Get the Node.js fs module, or null if it can't be loaded */
    const _getFs: () => any;
    const getDirectoryName: (fileOrFolderPath: string) => any;
    const getFileName: (filePath: string) => any;
    const getExtensionName: (filePath: string) => any;
    /**
     * Get the path to 'Desktop' folder.
     * @param instanceContainer The current container
     * @return The path to the desktop folder
     */
    const getDesktopPath: (
      instanceContainer: gdjs.RuntimeInstanceContainer
    ) => string;
    /**
     * Get the path to 'Documents' folder.
     * @param instanceContainer The current container
     * @return The path to the documents folder
     */
    const getDocumentsPath: (
      instanceContainer: gdjs.RuntimeInstanceContainer
    ) => string;
    /**
     * Get the path to 'Pictures' folder.
     * @param instanceContainer The current container
     * @return The path to the pictures folder
     */
    const getPicturesPath: (
      instanceContainer: gdjs.RuntimeInstanceContainer
    ) => string;
    /**
     * Get the path to this application 'Executable' file.
     * @param instanceContainer The current container
     * @return The path to this applications executable file
     */
    const getExecutablePath: (
      instanceContainer: gdjs.RuntimeInstanceContainer
    ) => string;
    /**
     * Get the path to this application 'Executable' folder.
     * @param instanceContainer The current container
     * @return The path to this applications executable folder
     */
    const getExecutableFolderPath: (
      instanceContainer: gdjs.RuntimeInstanceContainer
    ) => string;
    /**
     * Get the path to 'UserData' folder.
     * @param instanceContainer The current container
     * @return The path to userdata folder
     */
    const getUserdataPath: (
      instanceContainer: gdjs.RuntimeInstanceContainer
    ) => string;
    /**
     * Get the path to the user's home folder (on Windows `C:\Users\<USERNAME>\` for example).
     * @return The path to user's "home" folder
     */
    const getUserHomePath: (
      instanceContainer: gdjs.RuntimeInstanceContainer
    ) => string;
    /**
     * Get the path to 'Temp' folder.
     * @param instanceContainer The current container
     * @return The path to temp folder
     */
    const getTempPath: (
      instanceContainer: gdjs.RuntimeInstanceContainer
    ) => string;
    /**
     * Get the path delimiter specific to the operating system.
     * @return The path delimiter
     */
    const getPathDelimiter: () => string;
    /**
     * Create a new directory at the given path.
     * @param directory The path to create a new directory
     * @param resultVar The variable where to store the result of the operation
     */
    const makeDirectory: (directory: string, resultVar: gdjs.Variable) => void;
    /**
     * Save a string into a file, asynchronously.
     * @param text The string to be saved
     * @param savePath Path to the file
     * @param resultVar The variable where to store the result of the operation
     */
    const saveStringToFileAsync: (
      text: string,
      savePath: string,
      resultVar: gdjs.Variable
    ) => void;
    /**
     * Save a string into a file.
     * @param text The string to be saved
     * @param savePath Path to the file
     * @param resultVar The variable where to store the result of the operation
     */
    const saveStringToFile: (
      text: string,
      savePath: string,
      resultVar: gdjs.Variable
    ) => void;
    /**
     * Save a variable into a file in JSON format.
     * @param variable The variable to be saved
     * @param savePath Path to the file
     * @param resultVar The variable where to store the result of the operation
     */
    const saveVariableToJSONFile: (
      variable: gdjs.Variable,
      savePath: string,
      resultVar: gdjs.Variable
    ) => void;
    /**
     * Save a variable into a file in JSON format, asynchronously.
     * @param variable The variable to be saved
     * @param savePath Path to the file
     * @param resultVar The variable where to store the result of the operation
     */
    const saveVariableToJSONFileAsync: (
      variable: gdjs.Variable,
      savePath: string,
      resultVar: gdjs.Variable
    ) => void;
    /**
     * Load a string from a file into a scene variable.
     * @param stringVar Variable where to store the content
     * @param loadPath Path to the file
     * @param resultVar The variable where to store the result of the operation
     * @param removeCRCharacters If true, will remove \r characters usually added by Windows when editing files
     */
    const loadStringFromFile: (
      stringVar: gdjs.Variable,
      loadPath: string,
      resultVar: gdjs.Variable,
      removeCRCharacters: boolean
    ) => void;
    /**
     * Load a JSON file and convert it into a variable.
     * @param variable Variable to store the variable
     * @param loadPath Path to the file
     * @param resultVar The variable where to store the result of the operation
     * @param removeCRCharacters If true, will remove \r characters usually added by Windows when editing files
     */
    const loadVariableFromJSONFile: (
      variable: gdjs.Variable,
      loadPath: string,
      resultVar: gdjs.Variable,
      removeCRCharacters: boolean
    ) => void;
    /**
     * Load a JSON file and convert it into a variable, asynchronously.
     * @param variable Variable to store the variable
     * @param loadPath Path to the file
     * @param resultVar The variable where to store the result of the operation
     * @param removeCRCharacters If true, will remove \r characters usually added by Windows when editing files
     */
    const loadVariableFromJSONFileAsync: (
      variable: gdjs.Variable,
      loadPath: string,
      resultVar: gdjs.Variable,
      removeCRCharacters: boolean
    ) => void;
    /**
     * Load a string from a file into a scene variable, asynchronously.
     * @param stringVar Variable where to store the content
     * @param loadPath Path to the file
     * @param resultVar The variable where to store the result of the operation
     * @param removeCRCharacters If true, will remove \r characters usually added by Windows when editing files
     */
    const loadStringFromFileAsync: (
      stringVar: gdjs.Variable,
      loadPath: string,
      resultVar: gdjs.Variable,
      removeCRCharacters: boolean
    ) => void;
    /**
     * Delete a file from the filesystem.
     * @param filePath Path to the file
     * @param resultVar The variable where to store the result of the operation
     */
    const deleteFile: (filePath: string, resultVar: gdjs.Variable) => void;
    /**
     * Delete a file from the filesystem, asynchronously.
     * @param filePath Path to the file
     * @param resultVar The variable where to store the result of the operation
     */
    const deleteFileAsync: (filePath: string, resultVar: gdjs.Variable) => void;
    /**
     * Check if the file or directory exists.
     * @param filePath The path to the file or directory
     * @return true if fhe file or directory exists
     */
    const pathExists: (filePath: string) => boolean;
  }
}
