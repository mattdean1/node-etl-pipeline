// from https://github.com/enb/enb-stylus/blob/master/test/lib/mock-fs-helper.js

import fs from 'fs'
import path from 'path'

    /**
     * Duplicate of the real file system for passed dir, used for mock fs for tests
     * @param {String} dir – filename of directory (full path to directory)
     * @returns {Object} - object with duplicating fs
     */
    export const duplicateFSInMemory = (dir) => {
        var obj = {};

        fs.readdirSync(dir).forEach(function (basename) {
            var filename = path.join(dir, basename),
                stat = fs.statSync(filename);

            if (stat.isDirectory()) {
                process(obj, dir, basename);
            } else {
                obj[basename] = readFile(filename);
            }
        });

        return obj;
    }

/**
 * Function to traverse the directory tree
 * @param {Object} obj  - model of fs
 * @param {String} root - root dirname
 * @param {String} dir  - dirname
 */
function process(obj, root, dir) {
    var dirname = dir ? path.join(root, dir) : root,
        name = dir || root,
        additionObj = obj[name] = {};

    fs.readdirSync(dirname).forEach(function (basename) {
        var filename = path.join(dirname, basename),
            stat = fs.statSync(filename);

        if (stat.isDirectory()) {
            process(additionObj, dirname, basename);
        } else {
            additionObj[basename] = readFile(filename);
        }
    });
}

/**
 * Helper for reading file.
 * For text files calls a function to delete /r symbols
 * @param {String} filename - filename
 * @returns {*}
 */
export function readFile(filename) {
    var ext = path.extname(filename);

    if (['.gif', '.png', '.jpg', '.jpeg', '.svg', '.mmdb'].indexOf(ext) !== -1) {
        return fs.readFileSync(filename);
    }

    return fs.readFileSync(filename, 'utf-8');
}