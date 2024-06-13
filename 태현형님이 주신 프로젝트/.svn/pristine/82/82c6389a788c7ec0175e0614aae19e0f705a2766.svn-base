/* eslint complexity: ["error", 50] */
define('DS/EPSEditorCore/QuickSearchScorer', [], function () {
	'use strict';

	var QuickSearchScorer = function (query) {
		this._query = query;
		this._queryUpperCase = query.toUpperCase();
		this._dataUpperCase = '';
		this._fileNameIndex = 0;
	};

	QuickSearchScorer.prototype.score = function (data, matchIndexes) {
		if (!data || !this._query) { return 0; }
		var n = this._query.length;
		var m = data.length;
		if (!this._score || this._score.length < n * m) {
			this._score = new Int32Array(n * m * 2);
			this._sequence = new Int32Array(n * m * 2);
		}
		var score = this._score;
		var sequence = (this._sequence);
		this._dataUpperCase = data.toUpperCase();
		this._fileNameIndex = data.lastIndexOf('/');
		for (var i = 0; i < n; ++i) {
			for (var j = 0; j < m; ++j) {
				var skipCharScore = j === 0 ? 0 : score[i * m + j - 1];
				var prevCharScore = i === 0 || j === 0 ? 0 : score[(i - 1) * m + j - 1];
				var consecutiveMatch = i === 0 || j === 0 ? 0 : sequence[(i - 1) * m + j - 1];
				var pickCharScore = this._match(this._query, data, i, j, consecutiveMatch);
				if (pickCharScore && prevCharScore + pickCharScore >= skipCharScore) {
					sequence[i * m + j] = consecutiveMatch + 1;
					score[i * m + j] = (prevCharScore + pickCharScore);
				} else {
					sequence[i * m + j] = 0;
					score[i * m + j] = skipCharScore;
				}
			}
		}
		if (matchIndexes) { this._restoreMatchIndexes(sequence, n, m, matchIndexes); }
		var maxDataLength = 256;
		return score[n * m - 1] * maxDataLength + (maxDataLength - data.length);
	};

	QuickSearchScorer.prototype._testWordStart = function (data, j) {
		if (j === 0) { return true; }
		var prevChar = data.charAt(j - 1);
		return prevChar === '_' || prevChar === '-' || prevChar === '/' || (data[j - 1] !== this._dataUpperCase[j - 1] && data[j] === this._dataUpperCase[j]);
	};

	QuickSearchScorer.prototype._restoreMatchIndexes = function (sequence, n, m, out) {
		var i = n - 1;
		var j = m - 1;
		while (i >= 0 && j >= 0) {
			switch (sequence[i * m + j]) {
				case 0:
					--j;
					break;
				default:
					out.push(j);
					--i;
					--j;
					break;
			}
		}
		out.reverse();
	};

	QuickSearchScorer.prototype._singleCharScore = function (query, data, i, j) {
		var isWordStart = this._testWordStart(data, j);
		var isFileName = j > this._fileNameIndex;
		var isPathTokenStart = j === 0 || data[j - 1] === '/';
		var isCapsMatch = query[i] === data[j] && query[i] === this._queryUpperCase[i];
		var score = 10;
		if (isPathTokenStart) { score += 4; }
		if (isWordStart) { score += 2; }
		if (isCapsMatch) { score += 6; }
		if (isFileName) { score += 4; }
		if (j === this._fileNameIndex + 1 && i === 0) { score += 5; }
		if (isFileName && isWordStart) { score += 3; }
		return score;
	};

	QuickSearchScorer.prototype._sequenceCharScore = function (query, data, i, j, sequenceLength) {
		var isFileName = j > this._fileNameIndex;
		var isPathTokenStart = j === 0 || data[j - 1] === '/';
		var score = 10;
		if (isFileName) { score += 4; }
		if (isPathTokenStart) { score += 5; }
		score += sequenceLength * 4;
		return score;
	};

	QuickSearchScorer.prototype._match = function (query, data, i, j, consecutiveMatch) {
		if (this._queryUpperCase[i] !== this._dataUpperCase[j]) { return 0; }
		if (!consecutiveMatch) { return this._singleCharScore(query, data, i, j); }
		return this._sequenceCharScore(query, data, i, j - consecutiveMatch, consecutiveMatch);
	};

	QuickSearchScorer.highlightRangesWithStyleClass = function (element, resultRanges, styleClass, changes) {
		changes = changes || [];
		var highlightNodes = [];
		var textNodes = element.childTextNodes();
		var lineText = textNodes.map(function (node) {
			return node.textContent;
		}).join('');
		var ownerDocument = element.ownerDocument;
		if (textNodes.length === 0) { return highlightNodes; }
		var nodeRanges = [];
		var rangeEndOffset = 0;
		for (var j = 0; j < textNodes.length; ++j) {
			var range = {};
			range.offset = rangeEndOffset;
			range.length = textNodes[j].textContent.length;
			rangeEndOffset = range.offset + range.length;
			nodeRanges.push(range);
		}
		var startIndex = 0;
		for (var i = 0; i < resultRanges.length; ++i) {
			var startOffset = resultRanges[i].offset;
			var endOffset = startOffset + resultRanges[i].length;
			while (startIndex < textNodes.length && nodeRanges[startIndex].offset + nodeRanges[startIndex].length <= startOffset) {
				startIndex++;
			}
			var endIndex = startIndex;
			while (endIndex < textNodes.length && nodeRanges[endIndex].offset + nodeRanges[endIndex].length < endOffset) {
				endIndex++;
			}
			if (endIndex === textNodes.length) { break; }
			var highlightNode = ownerDocument.createElement('span');
			highlightNode.className = styleClass;
			highlightNode.textContent = lineText.substring(startOffset, endOffset);
			var lastTextNode = textNodes[endIndex];
			var lastText = lastTextNode.textContent;
			lastTextNode.textContent = lastText.substring(endOffset - nodeRanges[endIndex].offset);
			changes.push({
				node: lastTextNode,
				type: 'changed',
				oldText: lastText,
				newText: lastTextNode.textContent
			});
			if (startIndex === endIndex) {
				lastTextNode.parentElement.insertBefore(highlightNode, lastTextNode);
				changes.push({
					node: highlightNode,
					type: 'added',
					nextSibling: lastTextNode,
					parent: lastTextNode.parentElement
				});
				highlightNodes.push(highlightNode);
				var prefixNode = ownerDocument.createTextNode(lastText.substring(0, startOffset - nodeRanges[startIndex].offset));
				lastTextNode.parentElement.insertBefore(prefixNode, highlightNode);
				changes.push({
					node: prefixNode,
					type: 'added',
					nextSibling: highlightNode,
					parent: lastTextNode.parentElement
				});
			} else {
				var firstTextNode = textNodes[startIndex];
				var firstText = firstTextNode.textContent;
				var anchorElement = firstTextNode.nextSibling;
				firstTextNode.parentElement.insertBefore(highlightNode, anchorElement);
				changes.push({
					node: highlightNode,
					type: 'added',
					nextSibling: anchorElement,
					parent: firstTextNode.parentElement
				});
				highlightNodes.push(highlightNode);
				firstTextNode.textContent = firstText.substring(0, startOffset - nodeRanges[startIndex].offset);
				changes.push({
					node: firstTextNode,
					type: 'changed',
					oldText: firstText,
					newText: firstTextNode.textContent
				});
				for (var k = startIndex + 1; k < endIndex; k++) {
					var textNode = textNodes[k];
					var text = textNode.textContent;
					textNode.textContent = '';
					changes.push({
						node: textNode,
						type: 'changed',
						oldText: text,
						newText: textNode.textContent
					});
				}
			}
			startIndex = endIndex;
			nodeRanges[startIndex].offset = endOffset;
			nodeRanges[startIndex].length = lastTextNode.textContent.length;
		}
		return highlightNodes;
	};

	//Chrome Dev Tools search regexp
	QuickSearchScorer.filterRegex = function (query) {
		if (query) {
			var toEscape = '^[]{}()\\.^$*+?|-,';
			var regexString = '';
			for (var i = 0; i < query.length; ++i) {
				var c = query.charAt(i);
				if (toEscape.indexOf(c) !== -1) { c = '\\' + c; }
				if (i) { regexString += '[^\\0' + c + ']*'; }
				regexString += c;
			}
			return new RegExp(regexString, 'i');
		}
		return new RegExp('', 'i');
	};

	Node.prototype.childTextNodes = function () {
		var node = this.traverseNextTextNode(this);
		var result = [];
		var nonTextTags = {
			'STYLE': 1,
			'SCRIPT': 1
		};
		while (node) {
			if (!nonTextTags[node.parentElement.nodeName]) {
				result.push(node);
			}
			node = node.traverseNextTextNode(this);
		}
		return result;
	};

	Node.prototype.traverseNextTextNode = function (stayWithin) {
		var node = this.traverseNextNode(stayWithin);
		if (!node) { return null; }
		var nonTextTags = {
			'STYLE': 1,
			'SCRIPT': 1
		};
		while (node && (node.nodeType !== Node.TEXT_NODE || nonTextTags[node.parentElement.nodeName])) {
			node = node.traverseNextNode(stayWithin);
		}
		return node;
	};

	Node.prototype.traverseNextNode = function () {
		return this.firstChild ? this.firstChild : null;
	};

	return QuickSearchScorer;
});
