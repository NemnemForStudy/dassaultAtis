/// <amd-module name='DS/EPSSchematicsModelWeb/EPSSchematicsLocalTypeLibrary'/>
define("DS/EPSSchematicsModelWeb/EPSSchematicsLocalTypeLibrary", ["require", "exports", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsModelWeb/EPSSchematicsPolyfill", "DS/EPEventServices/EPEventServices"], function (require, exports, Enums, Polyfill, EventServices) {
    "use strict";
    var LocalTypeLibrary = /** @class */ (function () {
        /**
         * @constructor
         */
        function LocalTypeLibrary() {
            this.basesByName = {};
            this.enumsByName = {};
            this.objectsByName = {};
            this.classesByName = {};
            this.eventsByName = {};
            this.temporariesByName = {};
            this.typesByDependency = {};
            this.castLevelMap = {};
            this.regExpAlphanumeric = new RegExp(/^[a-z0-9_]+$/i);
        }
        LocalTypeLibrary.prototype.filterTemporaries = function (name) {
            return !this.temporariesByName.hasOwnProperty(name);
        };
        LocalTypeLibrary.prototype.initCastLevel = function (iTypeName) {
            if (!this.castLevelMap.hasOwnProperty(iTypeName)) {
                this.castLevelMap[iTypeName] = {};
            }
        };
        LocalTypeLibrary.hasProperties = function (iObjectType) {
            var result = Object.keys(iObjectType.descriptor).length > 0;
            return result;
        };
        LocalTypeLibrary.isStringEnumType = function (iEnumType) {
            var result = Object.keys(iEnumType).every(function (key) { return typeof iEnumType[key] === 'string'; });
            return result;
        };
        LocalTypeLibrary.prototype.computeCastLevel = function (iFromTypeName, iToTypeName) {
            var allowExtraProperty = this.__TypeLibrary.allowExtraPropertyOnObjectTypeCast();
            if (!this.castLevelMap[iFromTypeName].hasOwnProperty(iToTypeName)) {
                var castLevel = void 0;
                var fromTypeCategory = this._getTypeCategory(iFromTypeName);
                var fromType = this._getType(iFromTypeName);
                if (fromTypeCategory === Enums.FTypeCategory.fObject) {
                    fromType = { constructor: Object, descriptor: fromType };
                }
                var toTypeCategory = this._getTypeCategory(iToTypeName);
                var toType = this._getType(iToTypeName);
                if (toTypeCategory === Enums.FTypeCategory.fObject) {
                    toType = { constructor: Object, descriptor: toType };
                }
                if (iFromTypeName === 'Object') {
                    if (toTypeCategory === Enums.FTypeCategory.fObject && !LocalTypeLibrary.hasProperties(toType)) {
                        castLevel = allowExtraProperty ? Enums.ECastLevel.eLossless : Enums.ECastLevel.eUnsafe;
                    }
                    else if (toTypeCategory === Enums.FTypeCategory.fObject ||
                        toTypeCategory === Enums.FTypeCategory.fClass ||
                        toTypeCategory === Enums.FTypeCategory.fEvent) {
                        castLevel = Enums.ECastLevel.eUnsafe;
                    }
                }
                else if (fromTypeCategory === Enums.FTypeCategory.fObject ||
                    fromTypeCategory === Enums.FTypeCategory.fClass ||
                    fromTypeCategory === Enums.FTypeCategory.fEvent) {
                    if (iToTypeName === 'Object') {
                        castLevel = Enums.ECastLevel.eLossy;
                    }
                    else if (toTypeCategory === Enums.FTypeCategory.fObject ||
                        toTypeCategory === Enums.FTypeCategory.fClass ||
                        toTypeCategory === Enums.FTypeCategory.fEvent) {
                        castLevel = this.getClassCastLevel(fromType, toType);
                    }
                }
                else if (iFromTypeName === 'String') {
                    if (toTypeCategory === Enums.FTypeCategory.fEnum && LocalTypeLibrary.isStringEnumType(toType)) {
                        castLevel = Enums.ECastLevel.eUnsafe;
                    }
                }
                else if (fromTypeCategory === Enums.FTypeCategory.fEnum) {
                    if (iToTypeName === 'String' && LocalTypeLibrary.isStringEnumType(fromType)) {
                        castLevel = Enums.ECastLevel.eLossless;
                    }
                }
                this.castLevelMap[iFromTypeName][iToTypeName] = castLevel;
            }
        };
        LocalTypeLibrary.prototype._getCastLevel = function (iFromTypeName, iToTypeName) {
            this.initCastLevel(iFromTypeName);
            this.computeCastLevel(iFromTypeName, iToTypeName);
            return this.castLevelMap[iFromTypeName][iToTypeName];
        };
        LocalTypeLibrary.prototype.getCastLevel = function (iFromTypeName, iToTypeName) {
            var castLevel;
            if (iFromTypeName === iToTypeName) {
                castLevel = Enums.ECastLevel.eNoCast;
            }
            else {
                var fromArrayValueTypeName = this.__TypeLibrary.getArrayValueTypeName(iFromTypeName);
                var toArrayValueTypeName = this.__TypeLibrary.getArrayValueTypeName(iToTypeName);
                if (fromArrayValueTypeName === undefined && toArrayValueTypeName === undefined) {
                    castLevel = this._getCastLevel(iFromTypeName, iToTypeName);
                }
                else if (fromArrayValueTypeName !== undefined && toArrayValueTypeName !== undefined) {
                    castLevel = this._getCastLevel(fromArrayValueTypeName, toArrayValueTypeName);
                }
                else if (fromArrayValueTypeName !== undefined && iToTypeName === 'Array') {
                    castLevel = Enums.ECastLevel.eLossy;
                }
                else if (iFromTypeName === 'Array' && toArrayValueTypeName !== undefined) {
                    castLevel = Enums.ECastLevel.eUnsafe;
                }
            }
            return castLevel;
        };
        LocalTypeLibrary.prototype.registerCastLevel = function (iFromTypeName, iToTypeName, iCastLevel) {
            this.initCastLevel(iFromTypeName);
            this.castLevelMap[iFromTypeName][iToTypeName] = iCastLevel;
        };
        LocalTypeLibrary.prototype.unregisterCastLevel = function (iTypeName) {
            delete this.castLevelMap[iTypeName];
            var typeNameList = Object.keys(this.castLevelMap);
            for (var tnl = 0; tnl < typeNameList.length; tnl++) {
                delete this.castLevelMap[typeNameList[tnl]][iTypeName];
            }
        };
        LocalTypeLibrary.prototype.getObjectCastLevel = function (iFromObjectDesc, iToObjectDesc) {
            var allowExtraProperty = this.__TypeLibrary.allowExtraPropertyOnObjectTypeCast();
            var castLevel = Enums.ECastLevel.eLossless;
            var keys = Object.keys(iFromObjectDesc).concat(Object.keys(iToObjectDesc)).filter(function (value, index, array) { return array.indexOf(value) === index; });
            for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                var fromPropertyDesc = iFromObjectDesc[key];
                var toPropertyDesc = iToObjectDesc[key];
                var propertyCastLevel = Enums.ECastLevel.eLossless;
                if (fromPropertyDesc !== undefined) {
                    if (toPropertyDesc !== undefined) {
                        if (fromPropertyDesc.type !== toPropertyDesc.type) {
                            if (!fromPropertyDesc.mandatory && !toPropertyDesc.mandatory) {
                                propertyCastLevel = Enums.ECastLevel.eUnsafe;
                            }
                            else {
                                propertyCastLevel = undefined;
                            }
                        }
                        else if (!fromPropertyDesc.mandatory && toPropertyDesc.mandatory) {
                            propertyCastLevel = Enums.ECastLevel.eUnsafe;
                        }
                    }
                    else if (allowExtraProperty) {
                        propertyCastLevel = Enums.ECastLevel.eLossy;
                    }
                    else if (fromPropertyDesc.mandatory) {
                        propertyCastLevel = undefined;
                    }
                    else {
                        propertyCastLevel = Enums.ECastLevel.eUnsafe;
                    }
                }
                else if (toPropertyDesc !== undefined) {
                    if (toPropertyDesc.mandatory) {
                        if (allowExtraProperty) {
                            propertyCastLevel = Enums.ECastLevel.eUnsafe;
                        }
                        else {
                            propertyCastLevel = undefined;
                        }
                    }
                }
                if (propertyCastLevel === undefined) {
                    castLevel = undefined;
                    break;
                }
                else if (propertyCastLevel > castLevel) {
                    castLevel = propertyCastLevel;
                }
            }
            return castLevel;
        };
        LocalTypeLibrary.prototype.getClassCastLevel = function (iFromClassType, iToClassType) {
            var castLevel;
            if (iFromClassType.constructor === iToClassType.constructor) {
                castLevel = Enums.ECastLevel.eLossless;
            }
            else if (iFromClassType.constructor.prototype instanceof iToClassType.constructor) {
                castLevel = Enums.ECastLevel.eLossy;
            }
            else if (iToClassType.constructor.prototype instanceof iFromClassType.constructor) {
                castLevel = Enums.ECastLevel.eUnsafe;
            }
            if (castLevel !== undefined) {
                var objectCastLevel = this.getObjectCastLevel(iFromClassType.descriptor, iToClassType.descriptor);
                if (!(objectCastLevel <= castLevel)) {
                    castLevel = objectCastLevel;
                }
            }
            return castLevel;
        };
        LocalTypeLibrary.prototype.registerEnumType = function (iName, iEnum) {
            if (!(iEnum instanceof Object)) {
                throw new TypeError('iEnum argument is not an EnumType');
            }
            var keys = Object.keys(iEnum);
            if (keys.length === 0) {
                throw new TypeError('iEnum argument has no properties');
            }
            for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                if (typeof iEnum[key] !== 'number' && typeof iEnum[key] !== 'string') {
                    throw new TypeError('iEnum.' + key + ' argument is not a number or a string');
                }
            }
            this.enumsByName[iName] = iEnum;
            this.unregisterCastLevel(iName);
            Object.freeze(iEnum);
        };
        LocalTypeLibrary.prototype.getTypeNameListByDependency = function (iDependencyTypeName) {
            if (!this.typesByDependency.hasOwnProperty(iDependencyTypeName)) {
                this.typesByDependency[iDependencyTypeName] = [];
            }
            return this.typesByDependency[iDependencyTypeName];
        };
        LocalTypeLibrary.prototype.registerDependency = function (iTypeName, iDependencyTypeName) {
            var types = this.getTypeNameListByDependency(iDependencyTypeName);
            types.push(iTypeName);
        };
        LocalTypeLibrary.prototype.registerDependencies = function (iName, iDesc) {
            this.typesByDependency[iName] = [];
            var keys = Object.keys(iDesc);
            for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                var propType = iDesc[key].type;
                if (propType !== iName) {
                    this.registerDependency(iName, propType);
                }
            }
        };
        LocalTypeLibrary.prototype.unregisterDependency = function (iTypeName, iDependencyTypeName) {
            var types = this.getTypeNameListByDependency(iDependencyTypeName);
            var index = types.indexOf(iTypeName);
            if (index !== -1) {
                types.splice(index, 1);
            }
        };
        LocalTypeLibrary.prototype.unregisterDependencies = function (iName, iDesc) {
            delete this.typesByDependency[iName];
            var keys = Object.keys(iDesc);
            for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                var propType = iDesc[key].type;
                if (propType !== iName) {
                    this.unregisterDependency(iName, propType);
                }
            }
        };
        LocalTypeLibrary.prototype.registerObjectType = function (iName, iObjectDesc) {
            if (!(iObjectDesc instanceof Object)) {
                throw new TypeError('iObjectDesc argument is not an Object');
            }
            var objectDesc = this.objectsByName[iName];
            if (objectDesc !== undefined) {
                this.unregisterDependencies(iName, objectDesc);
            }
            this.objectsByName[iName] = iObjectDesc;
            this.temporariesByName[iName] = undefined;
            try {
                var keys = Object.keys(iObjectDesc);
                for (var k = 0; k < keys.length; k++) {
                    var key = keys[k];
                    if (!this.regExpAlphanumeric.test(key)) {
                        throw new TypeError('iObjectDesc.' + key + ' argument is not alphanumeric');
                    }
                    var propValueType = iObjectDesc[key];
                    if (!(propValueType instanceof Object)) {
                        throw new TypeError('iObjectDesc.' + key + ' argument is not an Object');
                    }
                    if (!this._isValueType(propValueType.type, propValueType.defaultValue)) {
                        throw new TypeError('iObjectDesc.' + key + ' argument is not a valid value type');
                    }
                    if (typeof propValueType.mandatory !== 'boolean') {
                        throw new TypeError('iObjectDesc.' + key + '.mandatory argument is not a boolean');
                    }
                    Object.freeze(propValueType);
                }
            }
            catch (error) {
                if (objectDesc !== undefined) {
                    this.objectsByName[iName] = objectDesc;
                    this.registerDependencies(iName, objectDesc);
                }
                else {
                    delete this.objectsByName[iName];
                }
                delete this.temporariesByName[iName];
                throw error;
            }
            this.registerDependencies(iName, iObjectDesc);
            this.unregisterCastLevel(iName);
            delete this.temporariesByName[iName];
            Object.freeze(iObjectDesc);
        };
        LocalTypeLibrary.prototype.updateObjectType = function (iName, iObjectDesc) {
            var result = false;
            if (!this.hasType(iName, Enums.FTypeCategory.fObject)) {
                throw new TypeError('iName argument is not an object type');
            }
            if (!(iObjectDesc instanceof Object)) {
                throw new TypeError('iObjectDesc argument is not an Object');
            }
            var objectDesc = this.objectsByName[iName];
            if (JSON.stringify(objectDesc) !== JSON.stringify(iObjectDesc)) {
                this.registerObjectType(iName, iObjectDesc);
                result = true;
            }
            return result;
        };
        LocalTypeLibrary.prototype.unregisterObjectType = function (iName) {
            if (!this.hasType(iName, Enums.FTypeCategory.fObject)) {
                throw new TypeError('iName argument is not an object type');
            }
            if (this.getTypeNameListByDependency(iName).filter(this.filterTemporaries, this).length > 0) {
                throw new TypeError('iName argument is an object type used by others types');
            }
            this.unregisterDependencies(iName, this.objectsByName[iName]);
            this.unregisterCastLevel(iName);
            delete this.objectsByName[iName];
        };
        LocalTypeLibrary.prototype.registerClassType = function (iName, iClassCtor, iClassDesc) {
            if (typeof iClassCtor !== 'function') {
                throw new TypeError('iClassCtor argument is not a constructor');
            }
            if (!(iClassDesc instanceof Object)) {
                throw new TypeError('iClassDesc argument is not an Object');
            }
            var classType = { constructor: iClassCtor, descriptor: iClassDesc };
            this.classesByName[iName] = classType;
            this.temporariesByName[iName] = undefined;
            try {
                var keys = Object.keys(iClassDesc);
                for (var k = 0; k < keys.length; k++) {
                    var key = keys[k];
                    if (!this.regExpAlphanumeric.test(key)) {
                        throw new TypeError('iClassDesc.' + key + ' argument is not alphanumeric');
                    }
                    var propValueType = iClassDesc[key];
                    if (!(propValueType instanceof Object)) {
                        throw new TypeError('iClassDesc.' + key + ' argument is not an Object');
                    }
                    if (!this._isValueType(propValueType.type, propValueType.defaultValue)) {
                        throw new TypeError('iClassDesc.' + key + ' argument is not a valid value type');
                    }
                    if (typeof propValueType.mandatory !== 'boolean') {
                        throw new TypeError('iClassDesc.' + key + '.mandatory argument is not a boolean');
                    }
                    Object.freeze(propValueType);
                }
            }
            catch (error) {
                delete this.classesByName[iName];
                delete this.temporariesByName[iName];
                throw error;
            }
            delete this.temporariesByName[iName];
            Object.freeze(iClassDesc);
            Object.freeze(classType);
        };
        LocalTypeLibrary.prototype.registerEventType = function (iName, iEventCtor, iEventDesc, iSendable) {
            if (typeof iEventCtor !== 'function') {
                throw new TypeError('iEventCtor argument is not a constructor');
            }
            if (!(iEventDesc instanceof Object)) {
                throw new TypeError('iEventDesc argument is not an Object');
            }
            if (iSendable === undefined) {
                iSendable = true;
            }
            else if (typeof iSendable !== 'boolean') {
                throw new TypeError('iSendable argument is not a boolean');
            }
            var eventType = { constructor: iEventCtor, descriptor: iEventDesc, sendable: iSendable };
            this.eventsByName[iName] = eventType;
            this.temporariesByName[iName] = undefined;
            try {
                var keys = Object.keys(iEventDesc);
                for (var k = 0; k < keys.length; k++) {
                    var key = keys[k];
                    if (!this.regExpAlphanumeric.test(key)) {
                        throw new TypeError('iEventDesc.' + key + ' argument is not alphanumeric');
                    }
                    var propValueType = iEventDesc[key];
                    if (!(propValueType instanceof Object)) {
                        throw new TypeError('iEventDesc.' + key + ' argument is not an Object');
                    }
                    if (!this._isValueType(propValueType.type, propValueType.defaultValue)) {
                        throw new TypeError('iEventDesc.' + key + ' argument is not a valid value type');
                    }
                    if (typeof propValueType.mandatory !== 'boolean') {
                        throw new TypeError('iEventDesc.' + key + '.mandatory argument is not a boolean');
                    }
                    Object.freeze(propValueType);
                }
                if (iName !== iEventCtor.prototype.type) {
                    throw new TypeError('iName argument is not equal to iEventCtor.prototype.type argument');
                }
                if (EventServices.getEventByType(iName) !== iEventCtor) {
                    EventServices.registerEvent(iEventCtor);
                }
            }
            catch (error) {
                delete this.eventsByName[iName];
                delete this.temporariesByName[iName];
                throw error;
            }
            delete this.temporariesByName[iName];
            Object.freeze(iEventDesc);
            Object.freeze(eventType);
        };
        LocalTypeLibrary.prototype._unregisterTypes = function (iEnumTypes, iObjectTypes, iClassTypes, iEventTypes) {
            for (var et = 0; et < iEnumTypes.length; et++) {
                var enumType = iEnumTypes[et];
                if (enumType instanceof Object) {
                    delete this.enumsByName[enumType.name];
                    delete this.temporariesByName[enumType.name];
                }
            }
            for (var ot = 0; ot < iObjectTypes.length; ot++) {
                var objectType = iObjectTypes[ot];
                if (objectType instanceof Object) {
                    delete this.objectsByName[objectType.name];
                    delete this.temporariesByName[objectType.name];
                }
            }
            for (var ct = 0; ct < iClassTypes.length; ct++) {
                var classType = iClassTypes[ct];
                if (classType instanceof Object) {
                    delete this.classesByName[classType.name];
                    delete this.temporariesByName[classType.name];
                }
            }
            for (var et = 0; et < iEventTypes.length; et++) {
                var eventType = iEventTypes[et];
                if (eventType instanceof Object) {
                    delete this.eventsByName[eventType.name];
                    delete this.temporariesByName[eventType.name];
                }
            }
        };
        LocalTypeLibrary.prototype.registerTypes = function (iEnumTypes, iObjectTypes, iClassTypes, iEventTypes) {
            for (var et = 0; et < iEnumTypes.length; et++) {
                var enumType = iEnumTypes[et];
                this.enumsByName[enumType.name] = enumType.enum;
                this.temporariesByName[enumType.name] = undefined;
            }
            for (var ot = 0; ot < iObjectTypes.length; ot++) {
                var objectType = iObjectTypes[ot];
                this.objectsByName[objectType.name] = objectType.descriptor;
                this.temporariesByName[objectType.name] = undefined;
            }
            for (var ct = 0; ct < iClassTypes.length; ct++) {
                var classType = iClassTypes[ct];
                this.classesByName[classType.name] = { constructor: classType.constructor, descriptor: classType.descriptor };
                this.temporariesByName[classType.name] = undefined;
            }
            for (var et = 0; et < iEventTypes.length; et++) {
                var eventType = iEventTypes[et];
                this.eventsByName[eventType.name] = { constructor: eventType.constructor, descriptor: eventType.descriptor, sendable: eventType.sendable };
                this.temporariesByName[eventType.name] = undefined;
            }
            try {
                for (var et = 0; et < iEnumTypes.length; et++) {
                    var enumType = iEnumTypes[et];
                    this.registerEnumType(enumType.name, enumType.enum);
                }
                for (var ot = 0; ot < iObjectTypes.length; ot++) {
                    var objectType = iObjectTypes[ot];
                    this.registerObjectType(objectType.name, objectType.descriptor);
                }
                for (var ct = 0; ct < iClassTypes.length; ct++) {
                    var classType = iClassTypes[ct];
                    this.registerClassType(classType.name, classType.constructor, classType.descriptor);
                }
                for (var et = 0; et < iEventTypes.length; et++) {
                    var eventType = iEventTypes[et];
                    this.registerEventType(eventType.name, eventType.constructor, eventType.descriptor, eventType.sendable);
                }
            }
            catch (error) {
                this._unregisterTypes(iEnumTypes, iObjectTypes, iClassTypes, iEventTypes);
                throw error;
            }
        };
        LocalTypeLibrary.prototype.unregisterTypes = function (iObjectNames) {
            var objectTypes = [];
            for (var n = 0; n < iObjectNames.length; n++) {
                var name_1 = iObjectNames[n];
                this.temporariesByName[name_1] = undefined;
            }
            try {
                for (var n = 0; n < iObjectNames.length; n++) {
                    var name_2 = iObjectNames[n];
                    var descriptor = this.getType(name_2);
                    this.unregisterObjectType(name_2);
                    objectTypes.push({ name: name_2, descriptor: descriptor });
                }
            }
            catch (error) {
                this.temporariesByName = {};
                this.registerTypes([], objectTypes, [], []);
                throw error;
            }
            this.temporariesByName = {};
        };
        LocalTypeLibrary.prototype._isValueType = function (iTypeName, iValue) {
            var result = this.__TypeLibrary.isGlobalValueType(iTypeName, iValue);
            result = result || this.isValueType(iTypeName, iValue);
            return result;
        };
        LocalTypeLibrary.prototype.isValueType = function (iTypeName, iValue) {
            var _this = this;
            var result = false;
            if (iValue === undefined) {
                result = this.hasType(iTypeName, Enums.FTypeCategory.fAll);
            }
            else {
                var Type_1 = this.getType(iTypeName);
                if (this.hasType(iTypeName, Enums.FTypeCategory.fBase)) {
                    result = this.basesByName[iTypeName].is(iValue);
                }
                else if (this.hasType(iTypeName, Enums.FTypeCategory.fEnum)) {
                    result = Object.keys(Type_1).some(function (key) { return iValue === Type_1[key]; });
                }
                else if (this.hasType(iTypeName, Enums.FTypeCategory.fObject)) {
                    result = iValue instanceof Object && Object.keys(iValue).every(function (key) { return Type_1.hasOwnProperty(key) && _this._isValueType(Type_1[key].type, iValue[key]); });
                }
                else if (this.hasType(iTypeName, Enums.FTypeCategory.fClass | Enums.FTypeCategory.fEvent)) {
                    result = iValue instanceof Type_1.constructor && Object.keys(Type_1.descriptor).every(function (key) { return _this._isValueType(Type_1.descriptor[key].type, iValue[key]); });
                }
                else if (this.hasType(iTypeName, Enums.FTypeCategory.fArray)) {
                    var elementTypeName_1 = this.__TypeLibrary.getArrayValueTypeName(iTypeName);
                    result = Array.isArray(iValue) && iValue.every(function (element) { return _this.isValueType(elementTypeName_1, element); });
                }
            }
            return result;
        };
        LocalTypeLibrary.prototype.hasType = function (iName, iTypeCategory) {
            var result = false;
            if ((iTypeCategory & Enums.FTypeCategory.fBase) === Enums.FTypeCategory.fBase) {
                result = result || this.basesByName.hasOwnProperty(iName);
            }
            else if ((iTypeCategory & Enums.FTypeCategory.fNumerical) === Enums.FTypeCategory.fNumerical) {
                result = result || this.basesByName[iName] !== undefined ? this.basesByName[iName].numerical : false;
            }
            if ((iTypeCategory & Enums.FTypeCategory.fEnum) === Enums.FTypeCategory.fEnum) {
                result = result || this.enumsByName.hasOwnProperty(iName);
            }
            if ((iTypeCategory & Enums.FTypeCategory.fObject) === Enums.FTypeCategory.fObject) {
                result = result || this.objectsByName.hasOwnProperty(iName);
            }
            if ((iTypeCategory & Enums.FTypeCategory.fClass) === Enums.FTypeCategory.fClass) {
                result = result || this.classesByName.hasOwnProperty(iName);
            }
            if ((iTypeCategory & Enums.FTypeCategory.fEvent) === Enums.FTypeCategory.fEvent) {
                result = result || this.eventsByName.hasOwnProperty(iName);
            }
            if ((iTypeCategory & Enums.FTypeCategory.fArray) === Enums.FTypeCategory.fArray) {
                result = result || this.hasType(this.__TypeLibrary.getArrayValueTypeName(iName), Enums.FTypeCategory.fAll ^ Enums.FTypeCategory.fArray);
            }
            return result;
        };
        LocalTypeLibrary.prototype._getTypeCategory = function (iName) {
            var typeCategory = this.__TypeLibrary.getGlobalTypeCategory(iName);
            typeCategory = typeCategory || this.getTypeCategory(iName);
            return typeCategory;
        };
        LocalTypeLibrary.prototype.getTypeCategory = function (iName) {
            var typeCategory = Enums.FTypeCategory.fNone;
            if (this.basesByName.hasOwnProperty(iName)) {
                typeCategory = Enums.FTypeCategory.fBase;
            }
            else if (this.enumsByName.hasOwnProperty(iName)) {
                typeCategory = Enums.FTypeCategory.fEnum;
            }
            else if (this.objectsByName.hasOwnProperty(iName)) {
                typeCategory = Enums.FTypeCategory.fObject;
            }
            else if (this.classesByName.hasOwnProperty(iName)) {
                typeCategory = Enums.FTypeCategory.fClass;
            }
            else if (this.eventsByName.hasOwnProperty(iName)) {
                typeCategory = Enums.FTypeCategory.fEvent;
            }
            return typeCategory;
        };
        LocalTypeLibrary.prototype._getType = function (iName) {
            var type = this.__TypeLibrary.getGlobalType(iName);
            type = type || this.getType(iName);
            return type;
        };
        LocalTypeLibrary.prototype.getType = function (iName) {
            return (this.enumsByName[iName] || this.objectsByName[iName] || this.classesByName[iName] || this.eventsByName[iName]);
        };
        LocalTypeLibrary.prototype.getTypeNameList = function (iTypeCategory) {
            var _this = this;
            var typeNameList = [];
            if ((iTypeCategory & Enums.FTypeCategory.fBase) === Enums.FTypeCategory.fBase) {
                Array.prototype.push.apply(typeNameList, Object.keys(this.basesByName));
            }
            else if ((iTypeCategory & Enums.FTypeCategory.fNumerical) === Enums.FTypeCategory.fNumerical) {
                Array.prototype.push.apply(typeNameList, Object.keys(this.basesByName).filter(function (key) { return _this.basesByName[key].numerical; }));
            }
            if ((iTypeCategory & Enums.FTypeCategory.fEnum) === Enums.FTypeCategory.fEnum) {
                Array.prototype.push.apply(typeNameList, Object.keys(this.enumsByName));
            }
            if ((iTypeCategory & Enums.FTypeCategory.fObject) === Enums.FTypeCategory.fObject) {
                Array.prototype.push.apply(typeNameList, Object.keys(this.objectsByName));
            }
            if ((iTypeCategory & Enums.FTypeCategory.fClass) === Enums.FTypeCategory.fClass) {
                Array.prototype.push.apply(typeNameList, Object.keys(this.classesByName));
            }
            if ((iTypeCategory & Enums.FTypeCategory.fEvent) === Enums.FTypeCategory.fEvent) {
                Array.prototype.push.apply(typeNameList, Object.keys(this.eventsByName));
            }
            if ((iTypeCategory & Enums.FTypeCategory.fArray) === Enums.FTypeCategory.fArray) {
                var arrayTypeNameList = this.getTypeNameList(Enums.FTypeCategory.fAll ^ Enums.FTypeCategory.fArray);
                arrayTypeNameList = arrayTypeNameList.map(function (typeName) { return 'Array<' + typeName + '>'; });
                Array.prototype.push.apply(typeNameList, arrayTypeNameList);
            }
            return typeNameList;
        };
        LocalTypeLibrary.prototype.getDefaultValue = function (iTypeName) {
            var defaultValue;
            if (this.hasType(iTypeName, Enums.FTypeCategory.fObject)) {
                var type = this.getType(iTypeName);
                var desc = type;
                defaultValue = {};
                var keys = Object.keys(desc);
                for (var k = 0; k < keys.length; k++) {
                    var key = keys[k];
                    defaultValue[key] = desc[key].defaultValue;
                }
            }
            else if (this.hasType(iTypeName, Enums.FTypeCategory.fClass | Enums.FTypeCategory.fEvent)) {
                var type = this.getType(iTypeName);
                var desc = type.descriptor;
                var Constructor = type.constructor;
                defaultValue = new Constructor();
                var keys = Object.keys(desc);
                for (var k = 0; k < keys.length; k++) {
                    var key = keys[k];
                    defaultValue[key] = desc[key].defaultValue;
                }
            }
            return defaultValue;
        };
        LocalTypeLibrary.mergeObjects = function (iJSONObject, ioValue) {
            var keys = Object.keys(iJSONObject);
            for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                var jsonProp = iJSONObject[key];
                var valueProp = ioValue[key];
                if (jsonProp instanceof Object && valueProp instanceof Object) {
                    LocalTypeLibrary.mergeObjects(jsonProp, valueProp);
                }
                else {
                    ioValue[key] = iJSONObject[key];
                }
            }
        };
        LocalTypeLibrary.prototype._getValueFromJSONValue = function (iJSONValue, iTypeName) {
            var value;
            if (this.__TypeLibrary.hasGlobalType(iTypeName, Enums.FTypeCategory.fAll)) {
                value = this.__TypeLibrary.getValueFromJSONValue(undefined, iJSONValue, iTypeName);
            }
            else if (this.hasType(iTypeName, Enums.FTypeCategory.fAll)) {
                value = this.getValueFromJSONValue(iJSONValue, iTypeName);
            }
            return value;
        };
        LocalTypeLibrary.getArrayBufferFromJSONValue = function (iJSONValue) {
            var string = Polyfill.atob(iJSONValue);
            var bytes = new Uint8Array(string.length);
            for (var b = 0; b < bytes.length; b++) {
                bytes[b] = string[b].charCodeAt(0);
            }
            return bytes.buffer;
        };
        LocalTypeLibrary.prototype.getValueFromJSONValue = function (iJSONValue, iTypeName) {
            var value = iJSONValue;
            if (iJSONValue === undefined) {
                return value;
            }
            if (iTypeName === 'Buffer') {
                value = LocalTypeLibrary.getArrayBufferFromJSONValue(iJSONValue);
            }
            else if (this.hasType(iTypeName, Enums.FTypeCategory.fObject)) {
                var Type = this.getType(iTypeName);
                value = {};
                var keys = Object.keys(Type);
                for (var k = 0; k < keys.length; k++) {
                    var key = keys[k];
                    value[key] = this._getValueFromJSONValue(iJSONValue[key], Type[key].type);
                }
            }
            else if (this.hasType(iTypeName, Enums.FTypeCategory.fClass | Enums.FTypeCategory.fEvent)) {
                var Type = this.getType(iTypeName);
                var Ctor = Type.constructor;
                var desc = Type.descriptor;
                value = new Ctor();
                var keys = Object.keys(desc);
                for (var k = 0; k < keys.length; k++) {
                    var key = keys[k];
                    value[key] = this._getValueFromJSONValue(iJSONValue[key], desc[key].type);
                }
                LocalTypeLibrary.mergeObjects(iJSONValue, value);
            }
            else if (this.hasType(iTypeName, Enums.FTypeCategory.fArray)) {
                value = [];
                for (var i = 0; i < iJSONValue.length; i++) {
                    var elementJSONValue = iJSONValue[i] !== null ? iJSONValue[i] : undefined;
                    value.push(this._getValueFromJSONValue(elementJSONValue, this.__TypeLibrary.getArrayValueTypeName(iTypeName)));
                }
            }
            return value;
        };
        LocalTypeLibrary.prototype._getJSONValueFromValue = function (iValue, iTypeName) {
            var value;
            if (this.__TypeLibrary.hasGlobalType(iTypeName, Enums.FTypeCategory.fAll)) {
                value = this.__TypeLibrary.getJSONValueFromValue(undefined, iValue, iTypeName);
            }
            else if (this.hasType(iTypeName, Enums.FTypeCategory.fAll)) {
                value = this.getJSONValueFromValue(iValue, iTypeName);
            }
            return value;
        };
        LocalTypeLibrary.getJSONValueFromArrayBuffer = function (iArrayBuffer) {
            var string = '';
            var bytes = new Uint8Array(iArrayBuffer);
            for (var b = 0; b < bytes.length; b++) {
                string += String.fromCharCode(bytes[b]);
            }
            return Polyfill.btoa(string);
        };
        LocalTypeLibrary.prototype.getJSONValueFromValue = function (iValue, iTypeName) {
            var jsonValue = iValue;
            if (iValue === undefined) {
                return jsonValue;
            }
            if (iTypeName === 'Buffer') {
                jsonValue = LocalTypeLibrary.getJSONValueFromArrayBuffer(iValue);
            }
            else if (this.hasType(iTypeName, Enums.FTypeCategory.fObject)) {
                var Type = this.getType(iTypeName);
                jsonValue = {};
                var keys = Object.keys(Type);
                for (var k = 0; k < keys.length; k++) {
                    var key = keys[k];
                    jsonValue[key] = this._getJSONValueFromValue(iValue[key], Type[key].type);
                }
            }
            else if (this.hasType(iTypeName, Enums.FTypeCategory.fClass | Enums.FTypeCategory.fEvent)) {
                var Type = this.getType(iTypeName);
                var desc = Type.descriptor;
                jsonValue = {};
                var keys = Object.keys(desc);
                for (var k = 0; k < keys.length; k++) {
                    var key = keys[k];
                    jsonValue[key] = this._getJSONValueFromValue(iValue[key], desc[key].type);
                }
            }
            else if (this.hasType(iTypeName, Enums.FTypeCategory.fArray)) {
                jsonValue = [];
                for (var i = 0; i < iValue.length; i++) {
                    jsonValue.push(this._getJSONValueFromValue(iValue[i], this.__TypeLibrary.getArrayValueTypeName(iTypeName)));
                }
            }
            return jsonValue;
        };
        return LocalTypeLibrary;
    }());
    return LocalTypeLibrary;
});
