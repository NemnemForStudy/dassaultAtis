
/*
* @quickreview kgq 12:09:2016  IR-486650-3DEXPERIENCER2017x path name begins with '/'
* @quickreview rke17 22:07:2022 IR-801699-3DEXPERIENCER2023x
*/


require.config({
    paths: { 'Minizip': 'GEO7zip/nodejs/node_modules/minizip-asm.js/lib/minizip-asm.min' /*'https://rawgit.com/rf00/minizip-asm.js/master/lib/minizip-asm.min' en evitant les exceptions :-)*/ }
});

define('DS/GEO7zip/GEO7zip',
	['Minizip'],
	function (Minizip) {

		"use strict";
		var ZipEnCryptDecrypt = { "2": "abc", "3": "def", "4": "ghi", "5": "jkl", "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz", "phrase": "614362327423423231834332913273", "suffix": "2012" }

		let i = 0;
		let dec = "";
		while (i < ZipEnCryptDecrypt.phrase.length) {
			var tmp = ZipEnCryptDecrypt[ZipEnCryptDecrypt.phrase[i]];
			tmp = tmp[ZipEnCryptDecrypt.phrase[i + 1] - 1];
			dec = dec + tmp;
			i = i + 2;
		}
		ZipEnCryptDecrypt.pass = dec + ZipEnCryptDecrypt.suffix;

		var GEO7zip = function (arraybuffer) {

			var that = this;

			if (!that.mz) {
				var uint8 = new Uint8Array(arraybuffer);
				that.mz = new Minizip(uint8);
			}
			if (!that.listEntries) {
				that.listEntries = that.mz.list({ encoding: 'buffer' });
			}

			that.decryptMineschedAnimation = function (arraybuffer, doneCallback) {


				var uint8 = new Uint8Array(arraybuffer);
				var mz = new Minizip(uint8);
				var uncryptMz = new Minizip();

				var listEntries = mz.list(/*{ encoding: 'buffer' }*/);

				listEntries.forEach(function (element) {
					var bufferEntry = mz.extract(element.filepath, { password: ZipEnCryptDecrypt.pass });
					uncryptMz.append(element.filepath, bufferEntry);
				});

				var buffuncryptMz = uncryptMz.zip();
				doneCallback(buffuncryptMz);
			};

			that.unzipMineschedAnimation = function (arraybuffer, entryCallback) {

				var uint8 = new Uint8Array(arraybuffer);
				var mz = new Minizip(uint8);


				var listEntries = mz.list({ encoding: /*'buffer'*/"utf8" });

				var promisesMSUnzipped = [];

				listEntries.forEach(function (element) {
					var promiseEntryTreated = new Promise(function (resolve, reject) {
						var bufferEntry = mz.extract(element.filepath, { password: ZipEnCryptDecrypt.pass, encoding: "utf8" });
						resolve({ filepath: element.filepath, data: bufferEntry });
					});
					promiseEntryTreated['then'](function (data) {
						return entryCallback(data, listEntries);
					});

					promisesMSUnzipped.push(promiseEntryTreated);
				});

				return Promise.all(promisesMSUnzipped);
			};

			that.unzipEntry = function (name, arraybuffer) {


				if (!that.mz) {
					var uint8 = new Uint8Array(arraybuffer);
					that.mz = new Minizip(uint8);
				}
				if (!that.listEntries) {
					that.listEntries = that.mz.list({ encoding: 'buffer' });
				}

				/*var result3DEntry = that.listEntries.find(function (entry) {
					var fp = new TextDecoder("utf-8").decode(entry.filepath);
					return fp.includes(name);
				});*/
				//KGQ : for performance issues, it is better not to search for entries. We have to consider the list is ordered

				var result3DEntry;
				if (name === "results3d.xml") {
					result3DEntry = that.listEntries[that.listEntries.length - 1];
				} else {
					var meshNum = name.match(/\d+/)[0];
					result3DEntry = that.listEntries[meshNum - 1];

				}
				



	            var promiseEntryTreated = new Promise(function (resolve, reject) {
					var bufferEntry = that.mz.extract(result3DEntry.filepath, { password: ZipEnCryptDecrypt.pass, encoding: "utf8" });
	                resolve({ filepath: result3DEntry.filepath, data: bufferEntry , name: name});
	            });

	            return promiseEntryTreated;
	        };
	        


	    };
	    return GEO7zip;
	});
