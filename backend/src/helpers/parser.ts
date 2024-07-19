import { parseFile } from "fast-csv";

const parseCSV = (filepath: string) => {
    return parseFile(filepath)   
}

export default parseCSV;