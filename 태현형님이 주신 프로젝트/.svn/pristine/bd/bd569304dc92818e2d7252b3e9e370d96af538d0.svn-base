define("DS/ZipJS2/ZipJS2",
[
	"DS/ZipJS2/zip-fs",
	"DS/Visualization/Utils",
	"DS/Visualization/ProxyAbstraction",
	"text!DS/ZipJS2/streams.polyfill.min.js"
],
function(zip2, VisuUtils, ProxyAbstraction, TEMP_web_stream_polyfill)
{
	"use strict";

	class ProxyReader extends zip2.Reader
	{
		constructor(url, options = {})
		{
			super();
			this.url = url;
			this.options = Object.assign({}, options);
			this.proxy = null;
			this.data = null;
		}

		async init()
		{
			super.init();
			this.proxy = new ProxyAbstraction();
			VisuUtils.setProxyFromSpec(this.url, this.proxy);
			const completeUrl = typeof this.url === "string" ? this.url : (this.url.serverurl || "") + (this.url.filename || "");

			this.data = await this.proxy.fetchUint8Array(completeUrl, "arraybuffer", null);
			this.size = this.data.length;
		}

		readUint8Array(index, length)
		{
			return this.data.subarray(index, index + length);
		}
	}


	// No configuration needed, everything is already done correctly
	// (including pako) in the Git repository (webvisu fork).

	function resetFS(fs) // from zipjs/zip-fs-core.js
	{
		fs.entries = [];
		fs.root = new zip2.fs.ZipDirectoryEntry(fs);
	}

	zip2.fs.FS.prototype.importHttpContent = async function(url, options = {})
	{
		resetFS(this);
		await this.root.importZip(new ProxyReader(url, options), options);
	}

	if(window._polyfill_web_streams)
	{
		async function patch(codec)
		{
			let orig = zip2.getConfiguration().workerScripts[codec][0];
			if(typeof orig === "function") orig = orig();
			const blob = await fetch(orig).then(r => r.blob());
			const text = await blob.text();
			const code = TEMP_web_stream_polyfill + "\n\n\n" + text;
			const script = URL.createObjectURL(new Blob([code], { type: "text/javascript" }));
			zip2.getConfiguration().workerScripts[codec] = [script];
		}
		patch("inflate");
		patch("deflate");
	}

	return zip2;
});
