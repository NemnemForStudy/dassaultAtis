define('DS/EPSSchematicsCSI/EPSSchematicsCSITools', [
	'DS/EPSSchematicsModelWeb/EPSSchematicsBlockLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary',
	'DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums'
], function (BlockLibrary, TypeLibrary, Enums) {
    'use strict';

	var CSITools = {};

	CSITools.CSIGraphBlockUid = '6d004daa-6201-413e-9bde-45dbc9351cc6';

	var csiTypesByType = {};
	csiTypesByType['String'] = 'string';
	csiTypesByType['Boolean'] = 'bool';
	csiTypesByType['Integer'] = 'int32';
    csiTypesByType['Int8'] = 'int8';
	csiTypesByType['UInt8'] = 'uint8';
	csiTypesByType['Int16'] = 'int16';
	csiTypesByType['UInt16'] = 'uint16';
	csiTypesByType['Int32'] = 'int32';
	csiTypesByType['UInt32'] = 'uint32';
	csiTypesByType['Int64'] = 'int64';
	csiTypesByType['UInt64'] = 'uint64';
	csiTypesByType['Float'] = 'float';
	csiTypesByType['Double'] = 'double';
	csiTypesByType['Buffer'] = 'buffer';

	CSITools.getCSITypeByType = function (iTypeName) {
		var csiType = 'Parameters';
		if (CSITools.CSIIntrospection !== undefined && CSITools.CSIIntrospection.hasType(iTypeName)) {
			csiType = iTypeName;
		}
		else if (csiTypesByType.hasOwnProperty(iTypeName)) {
			csiType = csiTypesByType[iTypeName];
		}
		return csiType;
	};

	var typesByCSIType = {};
	typesByCSIType['string'] = 'String';
	typesByCSIType['bool'] = 'Boolean';
	typesByCSIType['int8'] = 'Int8';
	typesByCSIType['uint8'] = 'UInt8';
	typesByCSIType['int16'] = 'Int16';
	typesByCSIType['uint16'] = 'UInt16';
	typesByCSIType['int32'] = 'Int32';
	typesByCSIType['uint32'] = 'UInt32';
	typesByCSIType['int64'] = 'Int64';
	typesByCSIType['uint64'] = 'UInt64';
	typesByCSIType['float'] = 'Float';
	typesByCSIType['double'] = 'Double';
	typesByCSIType['buffer'] = 'Buffer';
	typesByCSIType['Parameters'] = 'Object';

	CSITools.getTypeByCSIType = function (iCSITypeName) {
		var type = iCSITypeName;
		if (typesByCSIType.hasOwnProperty(iCSITypeName)) {
			type = typesByCSIType[iCSITypeName];
		}
		return type;
	};

	CSITools.isCSIGraphBlockRegistered = function () {
		return BlockLibrary.hasBlock(CSITools.CSIGraphBlockUid);
	};

	var csiWriteMethodsByType = {};
	csiWriteMethodsByType['String'] = 'writeString';
	csiWriteMethodsByType['Boolean'] = 'writeBool';
	csiWriteMethodsByType['Integer'] = 'writeInt32';
    csiWriteMethodsByType['Int8'] = 'writeInt8';
	csiWriteMethodsByType['UInt8'] = 'writeUint8';
	csiWriteMethodsByType['Int16'] = 'writeInt16';
	csiWriteMethodsByType['UInt16'] = 'writeUint16';
	csiWriteMethodsByType['Int32'] = 'writeInt32';
	csiWriteMethodsByType['UInt32'] = 'writeUint32';
	csiWriteMethodsByType['Int64'] = 'writeInt64';
	csiWriteMethodsByType['UInt64'] = 'writeUint64';
	csiWriteMethodsByType['Float'] = 'writeFloat';
	csiWriteMethodsByType['Double'] = 'writeDouble';
	csiWriteMethodsByType['Buffer'] = 'writeBuffer';
	csiWriteMethodsByType['Array<String>'] = 'writeStringArray';
	csiWriteMethodsByType['Array<Boolean>'] = 'writeBoolArray';
	csiWriteMethodsByType['Array<Integer>'] = 'writeInt32Array';
    csiWriteMethodsByType['Array<Int8>'] = 'writeInt8Array';
	csiWriteMethodsByType['Array<UInt8>'] = 'writeUint8Array';
	csiWriteMethodsByType['Array<Int16>'] = 'writeInt16Array';
	csiWriteMethodsByType['Array<UInt16>'] = 'writeUint16Array';
	csiWriteMethodsByType['Array<Int32>'] = 'writeInt32Array';
	csiWriteMethodsByType['Array<UInt32>'] = 'writeUint32Array';
	csiWriteMethodsByType['Array<Int64>'] = 'writeInt64Array';
	csiWriteMethodsByType['Array<UInt64>'] = 'writeUint64Array';
	csiWriteMethodsByType['Array<Float>'] = 'writeFloatArray';
	csiWriteMethodsByType['Array<Double>'] = 'writeDoubleArray';

    CSITools.getParameters = function (iTypeName, iValue, iGraphContext) {
		var csiParameters;
		if (iValue instanceof Object && iValue.__parameters__ !== undefined) {
			csiParameters = iValue.__parameters__;
		}
		else if (iValue !== undefined) {
			csiParameters = CSITools.createParameters(iTypeName, iValue, iGraphContext);
		}
        return csiParameters;
	};

	CSITools.writePropertyParameters = function (iProperty, iTypeName, iValue, iGraphContext, oCSIParameters) {
		var result = iValue !== undefined;
		result = result && iTypeName !== undefined;
		if (result) {
			var csiWriteMethod = csiWriteMethodsByType[iTypeName];
			if (csiWriteMethod !== undefined) {
				oCSIParameters[csiWriteMethod](iProperty, iValue);
			}
			else {
				var arrayValueTypeName = TypeLibrary.getArrayValueTypeName(iTypeName);
				if (arrayValueTypeName !== undefined) {
					var csiParametersArray = [];
					for (var i = 0; i < iValue.length; i++) {
						csiParametersArray.push(CSITools.getParameters(arrayValueTypeName, iValue[i], iGraphContext));
					}
					oCSIParameters.writeParametersArray(iProperty, CSITools.getCSITypeByType(arrayValueTypeName), csiParametersArray);
				}
				else {
					oCSIParameters.writeParameters(iProperty, CSITools.getCSITypeByType(iTypeName), CSITools.getParameters(iTypeName, iValue, iGraphContext));
				}
			}
		}
		return result;
	};

	CSITools.getTypeNameFromValue = function (iValue) {
		var typeofValue = typeof iValue;
		var typeName;
		switch (typeofValue) {
			case 'boolean': {
				typeName = 'Boolean';
				break;
			}
			case 'string': {
				typeName = 'String';
				break;
			}
			case 'number': {
				typeName = 'Double';
				break;
			}
			case 'object': {
				if (Array.isArray(iValue)) {
					var firstElementValue = iValue[0];
					var typeofArrayValue = typeof firstElementValue;
					switch (typeofArrayValue) {
						case 'boolean': {
							typeName = 'Array<Boolean>';
							break;
						}
						case 'string': {
							typeName = 'Array<String>';
							break;
						}
						case 'number': {
							typeName = 'Array<Double>';
							break;
						}
						case 'object': {
							if (!Array.isArray(firstElementValue)) {
								typeName = 'Array<Object>';
							}
							break;
						}
					}
				}
				else {
					typeName = 'Object';
				}
				break;
			}
		}
		return typeName;
	};

	CSITools.createParameters = function (iTypeName, iValue, iGraphContext) {
		var CSICommandBinder = require('DS/CSICommandBinder/CSICommandBinder');
		var csiParameters = CSICommandBinder.createParameters();
		csiParameters.declareAsObject(CSITools.getCSITypeByType(iTypeName));

		var keys, key, k, value, typeName;
		if (iTypeName === 'Object' || !TypeLibrary.hasType(iGraphContext, iTypeName, Enums.FTypeCategory.fAll)) {
			keys = Object.keys(iValue);
			for (k = 0; k < keys.length; k++) {
				key = keys[k];
				value = iValue[key];
				typeName = CSITools.getTypeNameFromValue(value);
				CSITools.writePropertyParameters(key, typeName, value, iGraphContext, csiParameters);
			}
		}
		else {
			var Type = TypeLibrary.getType(iGraphContext, iTypeName);
			keys = Object.keys(Type);
			for (k = 0; k < keys.length; k++) {
				key = keys[k];
				value = iValue[key];
				typeName = Type[key].type;
				CSITools.writePropertyParameters(key, typeName, value, iGraphContext, csiParameters);
			}
		}
        return csiParameters;
	};

	var csiReadMethodsByCSIType = {};
	csiReadMethodsByCSIType['string'] = 'readString';
	csiReadMethodsByCSIType['bool'] = 'readBool';
	csiReadMethodsByCSIType['int8'] = 'readIn8';
	csiReadMethodsByCSIType['uint8'] = 'readUint8';
	csiReadMethodsByCSIType['int16'] = 'readInt16';
	csiReadMethodsByCSIType['uint16'] = 'readUint16';
	csiReadMethodsByCSIType['int32'] = 'readInt32';
	csiReadMethodsByCSIType['uint32'] = 'readUint32';
	csiReadMethodsByCSIType['int64'] = 'readInt64';
	csiReadMethodsByCSIType['uint64'] = 'readUin64';
	csiReadMethodsByCSIType['float'] = 'readFloat';
	csiReadMethodsByCSIType['double'] = 'readDouble';
	csiReadMethodsByCSIType['buffer'] = 'readBuffer';
	csiReadMethodsByCSIType['string[]'] = 'readStringArray';
	csiReadMethodsByCSIType['bool[]'] = 'readBoolArray';
	csiReadMethodsByCSIType['int8[]'] = 'readInt8Array';
	csiReadMethodsByCSIType['uint8[]'] = 'readUint8Array';
	csiReadMethodsByCSIType['int16[]'] = 'readInt16Array';
	csiReadMethodsByCSIType['uint16[]'] = 'readUint16Array';
	csiReadMethodsByCSIType['int32[]'] = 'readInt32Array';
	csiReadMethodsByCSIType['uint32[]'] = 'readUint32Array';
	csiReadMethodsByCSIType['int64[]'] = 'readInt64Array';
	csiReadMethodsByCSIType['uint64[]'] = 'readUin64Array';
	csiReadMethodsByCSIType['float[]'] = 'readFloatArray';
	csiReadMethodsByCSIType['double[]'] = 'readDoubleArray';

	var readPropertyParameters = function (iName) {
        var value;
        var type = this.exists(iName);
		var csiReadMethod = csiReadMethodsByCSIType[type];
		if (csiReadMethod !== undefined) {
			value = this[csiReadMethod](iName);
			if (ArrayBuffer.isView(value)) {
				value = Array.from(value);
			}
		}
		else {
			if (type.indexOf('[]') === -1) {
				value = this.readParameters(iName, type);
				if (value !== undefined) {
					value = CSITools.createProxyParameters(value);
				}
			}
			else {
				value = this.readParametersArray(iName, type.replace('[]', ''));
				if (Array.isArray(value)) {
					for (var i = 0; i < value.length; i++) {
						value[i] = CSITools.createProxyParameters(value[i]);
					}
				}
			}
		}
        return value;
    };

    var proxyHandler = {
        get: function (iParameters, iProperty) {
			var value;
			if (iParameters.propertyMap_.hasOwnProperty(iProperty)) {
				value = readPropertyParameters.call(iParameters, iProperty);
			}
            else if (iProperty === '__parameters__') {
                value = iParameters;
			}
			else {
				value = Object.prototype[iProperty];
			}
            return value;
		},
		set: function () {
			return false;
		},
		getPrototypeOf: function () {
			return Object.prototype;
        },
        getOwnPropertyDescriptor: function (iParameters, iProperty) {
			var descriptor;
			if (iParameters.propertyMap_.hasOwnProperty(iProperty)) {
				descriptor = { enumerable: true, configurable: true };
			}
            return descriptor;
        },
        ownKeys: function (iParameters) {
            return Object.keys(iParameters.propertyMap_);
		},
		has: function (iParameters, iProperty) {
            return iParameters.propertyMap_.hasOwnProperty(iProperty);
        }
    };

    CSITools.createProxyParameters = function (iCSIParameters) {
        return new Proxy(iCSIParameters, proxyHandler);
	};

	var parametersSuffix = '_Parameters';
	var getSubTypeName = function (iParentTypeName, iLabel, iSuffix) {
		var subTypeName = iParentTypeName;
		if (subTypeName.endsWith(parametersSuffix)) {
			subTypeName = subTypeName.slice(0, -parametersSuffix.length);
		}
		subTypeName += '_' + iLabel + iSuffix;
		return subTypeName;
	};

	var getCSIPropertyDesc = function (iCSIProperty, iParentTypeName, iObjectTypes, iEnumTypes) {
		var csiPropertyDesc = {};
		if (iCSIProperty.parameters !== undefined || iCSIProperty.parametersArray !== undefined) {
			csiPropertyDesc.type = getSubTypeName(iParentTypeName, iCSIProperty.label, parametersSuffix);
			iObjectTypes.push({
				name: csiPropertyDesc.type,
				descriptor: CSITools.getCSITypeDescriptor(iCSIProperty.parameters || iCSIProperty.parametersArray, csiPropertyDesc.type, iObjectTypes, iEnumTypes)
			});
		}
		else {
			var csiType = iCSIProperty.basic || iCSIProperty.basicArray || iCSIProperty.type || iCSIProperty.typeArray;
			if (iEnumTypes !== undefined && csiType === 'string' && Array.isArray(iCSIProperty.enum)) {
				csiPropertyDesc.type = getSubTypeName(iParentTypeName, iCSIProperty.label, '_Enum');
				var EnumType = {};
				iCSIProperty.enum.forEach(function (enumValue) { EnumType[enumValue] = enumValue; });
				iEnumTypes.push({
					name: csiPropertyDesc.type,
					'enum': EnumType
				});
			}
			else {
				csiPropertyDesc.type = CSITools.getTypeByCSIType(csiType);
			}
		}
		if (iCSIProperty.basicArray !== undefined || iCSIProperty.typeArray !== undefined || iCSIProperty.parametersArray !== undefined) {
			csiPropertyDesc.type = 'Array<' + csiPropertyDesc.type + '>';
		}
		csiPropertyDesc.defaultValue = undefined;
		csiPropertyDesc.mandatory = true;
		if (iCSIProperty.optional !== undefined) {
			var defaultValue = iCSIProperty.optional.default_value;
			if (csiPropertyDesc.type === 'Buffer') {
				csiPropertyDesc.defaultValue = undefined;
			}
			else if (typeof defaultValue === 'string' && iCSIProperty.basic !== 'string') {
				csiPropertyDesc.defaultValue = JSON.parse(defaultValue);
			}
			else {
				csiPropertyDesc.defaultValue = defaultValue;
			}
			csiPropertyDesc.mandatory = !iCSIProperty.optional.isOptional && csiPropertyDesc.defaultValue === undefined;
		}
		return csiPropertyDesc;
	};

	CSITools.getCSITypeDescriptor = function (iCSIPropertyDefinitions, iParentTypeName, iObjectTypes, iEnumTypes) {
		var descriptor = {};
		var csiProperty;
		for (var p = 0; p < iCSIPropertyDefinitions.length; p++) {
			csiProperty = iCSIPropertyDefinitions[p];
			descriptor[csiProperty.label] = getCSIPropertyDesc(csiProperty, iParentTypeName, iObjectTypes, iEnumTypes);
		}
		return descriptor;
	};

	var isStringEnumType = function (iEnumType) {
		var result = Object.keys(iEnumType).every(function (key) { return typeof iEnumType[key] === 'string'; });
		return result;
	};

	var getCSIPropertyFromTypeProperty = function (iPropertyName, iProperty, iGraphContext, iPortType) {
		var csiProperty = {};
		csiProperty.label = iPropertyName;

        var arrayValueType = TypeLibrary.getArrayValueTypeName(iProperty.type);
        if (arrayValueType !== undefined) {
            if (CSITools.CSIIntrospection !== undefined && CSITools.CSIIntrospection.hasType(arrayValueType)) {
                csiProperty.typeArray = arrayValueType;
            }
            else if (arrayValueType === 'Object') {
                csiProperty.typeArray = 'Parameters';
            }
            else if (TypeLibrary.hasType(iGraphContext, arrayValueType, Enums.FTypeCategory.fObject)) {
                csiProperty.parametersArray = getCSIPropertyListFromType(arrayValueType, iGraphContext, iPortType);
            }
            else if (TypeLibrary.hasType(iGraphContext, arrayValueType, Enums.FTypeCategory.fEnum)) {
				var ArrayEnumType = TypeLibrary.getType(iGraphContext, arrayValueType);
				if (isStringEnumType(ArrayEnumType)) {
					csiProperty.basicArray = 'string';
					csiProperty.enum = Object.keys(ArrayEnumType).map(function (key) { return ArrayEnumType[key]; });
				}
				else {
                	csiProperty.basicArray = 'int32';
				}
            }
            else {
                csiProperty.basicArray = CSITools.getCSITypeByType(arrayValueType);
            }
        }
        else {
			if (CSITools.CSIIntrospection !== undefined && CSITools.CSIIntrospection.hasType(iProperty.type)) {
                csiProperty.type = iProperty.type;
            }
            else if (iProperty.type === 'Object') {
                csiProperty.type = 'Parameters';
            }
            else if (TypeLibrary.hasType(iGraphContext, iProperty.type, Enums.FTypeCategory.fObject)) {
                csiProperty.parameters = getCSIPropertyListFromType(iProperty.type, iGraphContext, iPortType);
            }
            else if (TypeLibrary.hasType(iGraphContext, iProperty.type, Enums.FTypeCategory.fEnum)) {
                var EnumType = TypeLibrary.getType(iGraphContext, iProperty.type);
				if (isStringEnumType(EnumType)) {
					csiProperty.basic = 'string';
					csiProperty.enum = Object.keys(EnumType).map(function (key) { return EnumType[key]; });
				}
				else {
                	csiProperty.basic = 'int32';
				}
            }
            else {
                csiProperty.basic = CSITools.getCSITypeByType(iProperty.type);
            }
        }
        if (iPortType !== Enums.EDataPortType.eOutput && iProperty.defaultValue !== undefined) {
            csiProperty.optional = {};
            csiProperty.optional.default_value = iProperty.defaultValue;
            if (typeof csiProperty.optional.default_value !== 'string') {
                csiProperty.optional.default_value = JSON.stringify(csiProperty.optional.default_value);
            }
        }
        else if (!iProperty.mandatory) {
            csiProperty.optional = {};
            csiProperty.optional.isOptional = true;
		}
		return csiProperty;
    };

    var getCSIPropertyListFromType = function (iTypeName, iGraphContext, iPortType) {
		var csiPropertyList = [];
        var descriptor = TypeLibrary.getType(iGraphContext, iTypeName);
        var keys = Object.keys(descriptor);
        var csiProperty, key;
        for (var k = 0; k < keys.length; k++) {
            key = keys[k];
            csiProperty = getCSIPropertyFromTypeProperty(key, descriptor[key], iGraphContext, iPortType);
            csiPropertyList.push(csiProperty);
		}
		return csiPropertyList;
    };

    var getCSISignatureFromType = function (iTypeName, iGraphContext, iPortType) {
		var csiSignature = {};
        if (CSITools.CSIIntrospection !== undefined && CSITools.CSIIntrospection.hasType(iTypeName)) {		
            csiSignature.type = iTypeName;
        }
        else if (TypeLibrary.hasType(iGraphContext, iTypeName, Enums.FTypeCategory.fObject)) {
            csiSignature.parameters = getCSIPropertyListFromType(iTypeName, iGraphContext, iPortType);
            if (csiSignature.parameters.length === 0) {
                delete csiSignature.parameters;
            }
        }
        else {
            csiSignature.type = 'Parameters';
		}
		return csiSignature;
    };

    CSITools.getCSISignatureFromDataPort = function (iDataPort) {
        var typeName = iDataPort.getValueType();
        var portType = iDataPort.getType();
        var graphContext = iDataPort.getGraphContext();
		var csiSignature = getCSISignatureFromType(typeName, graphContext, portType);
		return csiSignature;
    };

    /**
	* Create csi graph block from blocks
	*
	* @private
	* @param {Array<Block>} iBlocks
	* @return {CSIGraphBlock}
	*/
	CSITools.createCSIGraphBlockFromBlocks = function (iBlocks) {
		var Block = require('DS/EPSSchematicsModelWeb/EPSSchematicsBlock');
		if (!Array.isArray(iBlocks)) {
			throw new TypeError('iBlocks argument is not an Array');
		}
		if (iBlocks.length === 0) {
			throw new TypeError('iBlocks argument is an empty Array');
		}

		var parentGraph;
		var block;
		var b;
		for (b = 0; b < iBlocks.length; b++) {
			block = iBlocks[b];
			if (!(block instanceof Block)) {
				throw new TypeError('iBlocks[' + b + '] argument is not a Block');
			}
			if (block.graph === undefined || (parentGraph !== undefined && block.graph !== parentGraph)) {
				throw new TypeError('iBlocks[' + b + '] argument is not in the parent Graph');
			}
			parentGraph = block.graph;
		}

		var graphBlock = parentGraph.createBlock(CSITools.CSIGraphBlockUid);

		var dataPortsToLink = [];
		var dataLinksToAdd = [];
		var controlPortsToLink = [];
		var controlLinksToAdd = [];
		for (b = 0; b < iBlocks.length; b++) {
			block = iBlocks[b];

			var dataPorts = block.getDataPorts();
			var dataPort;
			for (var dp = 0; dp < dataPorts.length; dp++) {
				dataPort = dataPorts[dp];
				var dataLinks = dataPort.getDataLinks(parentGraph);
				var subDataPorts = dataPort.getDataPorts();
				for (var sdp = 0; sdp < subDataPorts.length; sdp++) {
					dataLinks = dataLinks.concat(subDataPorts[sdp].getDataLinks(parentGraph));
				}
				var dataLink;
				for (var dl = 0; dl < dataLinks.length; dl++) {
					dataLink = dataLinks[dl];
					if (dataLinksToAdd.indexOf(dataLink) === -1) {
						dataPortsToLink.push({
							startPort: dataLink.getStartPort(),
							endPort: dataLink.getEndPort()
						});
						dataLinksToAdd.push(dataLink);
					}
				}
			}

			var controlPorts = block.getControlPorts();
			var controlPort;
			for (var cp = 0; cp < controlPorts.length; cp++) {
				controlPort = controlPorts[cp];
				var controlLinks = controlPort.getControlLinks(parentGraph);
				var controlLink;
				for (var cl = 0; cl < controlLinks.length; cl++) {
					controlLink = controlLinks[cl];
					if (controlLinksToAdd.indexOf(controlLink) === -1) {
						controlPortsToLink.push({
							startPort: controlLink.getStartPort(),
							endPort: controlLink.getEndPort(),
							waitCount: controlLink.getWaitCount()
						});
						controlLinksToAdd.push(controlLink);
					}
				}
			}

			var nodeIdSelectorName = block.getNodeIdSelector();
			var nodeIdSelector = parentGraph.getNodeIdSelectorByName(nodeIdSelectorName);
			if (nodeIdSelector !== undefined && !graphBlock.hasNodeIdSelectorName(nodeIdSelectorName)) {
				var jsonNodeIdSelector = {};
				nodeIdSelector.toJSON(jsonNodeIdSelector);
				nodeIdSelector = graphBlock.createNodeIdSelector();
				nodeIdSelector.fromJSON(jsonNodeIdSelector);
			}
			parentGraph.removeBlock(block);
			graphBlock.addBlock(block);

			block.setNodeIdSelector(nodeIdSelectorName);
		}

		var startPort, endPort, link;
		var dataPortToLink;
		for (var dptl = 0; dptl < dataPortsToLink.length; dptl++) {
			dataPortToLink = dataPortsToLink[dptl];
			startPort = dataPortToLink.startPort;
			endPort = dataPortToLink.endPort;
			if (startPort.block.graph === graphBlock && endPort.block.graph === graphBlock) {
				graphBlock.createDataLink(startPort, endPort);
			}
		}

		var controlPortToLink;
		for (var cptl = 0; cptl < controlPortsToLink.length; cptl++) {
			controlPortToLink = controlPortsToLink[cptl];
			startPort = controlPortToLink.startPort;
			endPort = controlPortToLink.endPort;
			if (startPort.block.graph === graphBlock && endPort.block.graph === graphBlock) {
				link = graphBlock.createControlLink(startPort, endPort);
				link.setWaitCount(controlPortToLink.waitCount);
			}
		}

		return graphBlock;
	};

    return CSITools;
});
