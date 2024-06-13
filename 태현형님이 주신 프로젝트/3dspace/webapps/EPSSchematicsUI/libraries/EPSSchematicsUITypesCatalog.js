/// <amd-module name='DS/EPSSchematicsUI/libraries/EPSSchematicsUITypesCatalog'/>
define("DS/EPSSchematicsUI/libraries/EPSSchematicsUITypesCatalog", ["require", "exports", "DS/EPSSchematicsUI/tools/EPSSchematicsUITools", "text!DS/EPSSchematicsUI/assets/EPSSchematicsUIBaseTypes.json", "text!DS/EPSSchematicsUI/assets/EPSSchematicsUITypeTemplates.json", "DS/EPSSchematicsModelWeb/EPSSchematicsTypeLibrary", "DS/EPSSchematicsModelWeb/EPSSchematicsEvents", "DS/EPSSchematicsModelWeb/EPSSchematicsModelEnums", "DS/EPSSchematicsUI/typings/WebUX/tweakers/EPSWUXTypeRepresentationFactory"], function (require, exports, UITools, UIBaseTypes, UITypeTemplates, TypeLibrary, Events, ModelEnums, WUXTypeRepresentationFactory) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This singleton class defines the types catalog.
     * @class UITypesCatalog
     * @alias module:DS/EPSSchematicsUI/libraries/EPSSchematicsUITypesCatalog
     * @private
     */
    var UITypesCatalog = /** @class */ (function () {
        /**
         * @constructor
         * @param {UIEditor} editor - The UI editor.
         */
        function UITypesCatalog(editor) {
            var _this = this;
            this._onTypeLibraryRegisterGlobalCB = this.onTypeLibraryRegisterGlobal.bind(this);
            this._onTypeLibraryRegisterLocalCustomCB = this.onTypeLibraryRegisterLocalCustom.bind(this);
            this._isReady = false;
            this._editor = editor;
            this._typeRepFactory = new WUXTypeRepresentationFactory({ onReady: function () { _this._isReady = true; } });
            TypeLibrary.addListener(Events.TypeLibraryRegisterGlobalEvent, this._onTypeLibraryRegisterGlobalCB);
            TypeLibrary.addListener(Events.TypeLibraryRegisterLocalCustomEvent, this._onTypeLibraryRegisterLocalCustomCB);
            TypeLibrary.addListener(Events.TypeLibraryUpdateLocalCustomEvent, this._onTypeLibraryRegisterLocalCustomCB);
            this._typeRepFactory.registerTypeTemplates(UITypeTemplates);
            this.registerTypes();
        }
        /**
         * Removes the type catalog.
         * @public
         */
        UITypesCatalog.prototype.remove = function () {
            TypeLibrary.removeListener(Events.TypeLibraryRegisterGlobalEvent, this._onTypeLibraryRegisterGlobalCB);
            TypeLibrary.removeListener(Events.TypeLibraryRegisterLocalCustomEvent, this._onTypeLibraryRegisterLocalCustomCB);
            TypeLibrary.removeListener(Events.TypeLibraryUpdateLocalCustomEvent, this._onTypeLibraryRegisterLocalCustomCB);
            // Unregisters each local types from the given graph context
            var mainGraph = this._editor.getViewerController().getRootViewer().getMainGraph();
            var graphContext = mainGraph.getModel().getGraphContext();
            var localCustomTypeNameList = TypeLibrary.getLocalCustomTypeNameList(graphContext, ModelEnums.FTypeCategory.fObject);
            TypeLibrary.unregisterLocalCustomTypes(graphContext, localCustomTypeNameList);
            this._editor = undefined;
            this._typeRepFactory = undefined;
            this._onTypeLibraryRegisterGlobalCB = undefined;
            this._onTypeLibraryRegisterLocalCustomCB = undefined;
            this._isReady = undefined;
        };
        /**
         * Gets the WUX type representation factory.
         * @public
         * @returns {WUXTypeRepresentationFactory} The WUX type representation factory.
         */
        UITypesCatalog.prototype.getTypeRepresentationFactory = function () {
            return this._typeRepFactory;
        };
        /**
         * Checks if the types catalog is ready.
         * @public
         * @returns {boolean} True if the types catalog is ready else false.
         */
        UITypesCatalog.prototype.isReady = function () {
            return this._isReady;
        };
        /**
         * Creates an instance of the provided class type with the provided property values.
         * @public
         * @param {string} valueType - The value type.
         * @param {Object} value - The classType property values.
         * @returns {*} The instance of the class type.
         */
        UITypesCatalog.prototype.createClassTypeInstance = function (valueType, value) {
            var instance;
            if (TypeLibrary.hasGlobalType(valueType, ModelEnums.FTypeCategory.fClass | ModelEnums.FTypeCategory.fEvent)) {
                var classType = TypeLibrary.getGlobalType(valueType);
                var CtorClass = classType.constructor;
                instance = new CtorClass();
                for (var propertyName in classType.descriptor) {
                    if (classType.descriptor.hasOwnProperty(propertyName)) {
                        if (value[propertyName] !== undefined) {
                            instance[propertyName] = value[propertyName];
                        }
                        if (classType.descriptor[propertyName].mandatory && instance[propertyName] === undefined) {
                            instance[propertyName] = classType.descriptor[propertyName].defaultValue;
                        }
                    }
                }
            }
            else if (TypeLibrary.hasGlobalType(valueType, ModelEnums.FTypeCategory.fArray)) {
                var subValueType = TypeLibrary.getArrayValueTypeName(valueType);
                if (TypeLibrary.hasGlobalType(subValueType, ModelEnums.FTypeCategory.fClass | ModelEnums.FTypeCategory.fEvent)) {
                    instance = [];
                    for (var i = 0; i < value.length; i++) {
                        instance.push(this.createClassTypeInstance(subValueType, value[i]));
                    }
                }
            }
            return instance;
        };
        /**
         * Generates the type representation factory view for the given typePath.
         * @private
         * @param {Object} view - The view.
         * @param {*} value -  The value.
         * @param {string} typePath - The type path representation.
         * @param {Object} [possibleValues] - A structured object giving the list of possible value types.
         */
        /*public generateTypeRepFactoryView(view: any, value: any, typePath: string, possibleValues?: object): void {
            const options = {} as any;
            options.typePath = typePath;
            if (possibleValues !== undefined) {
                options.semantics = {
                    possibleValues: possibleValues,
                    usageDescription: 'Select an item',
                    allowResetToUndefinedByUIFlag: true
                };
            }
            if (typePath === 'Object') {
                options.configuration = {};
                this.getObjectConfiguration(options.configuration, value);
            }
            options.context = 'inlinedTemplate';
            options.onViewCreated = function (v: any) {
                if (v !== undefined) {
                    if (view.setContent !== undefined) {
                        view.setContent(v);
                    } else {
                        view.getContent().setContent(v);
                    }
                }
            };
            this._typeRepFactory.generateView(value, options);
        }*/
        /**
         * Computes the port or setting value to string format.
         * @public
         * @static
         * @param {string} valueType - The value type.
         * @param {*} value - The enumartion value.
         * @param {number} [maxCharLength] - The maximum character length to display.
         * @returns {string} The port or setting value in string format.
         */
        UITypesCatalog.getStringValue = function (valueType, value, maxCharLength) {
            var result;
            if (UITypesCatalog.isArrayEnumType(valueType)) {
                result = UITypesCatalog.getArrayEnumStringValue(valueType, value);
            }
            else if (UITypesCatalog.isEnumType(valueType)) {
                result = UITypesCatalog.getEnumStringValue(valueType, value);
            }
            else {
                result = UITools.getValueInlinePreview(value, maxCharLength);
            }
            return String(result);
        };
        /**
         * The callback on the type library register event.
         * Base types registration not authorized by model for now!
         * @private
         * @param {Events.TypeLibraryRegisterGlobalEvent} event - The type library register global event.
         */
        UITypesCatalog.prototype.onTypeLibraryRegisterGlobal = function (event) {
            var typeName = event.getName();
            if (TypeLibrary.hasGlobalType(typeName, ModelEnums.FTypeCategory.fEnum)) {
                this.registerEnumType(typeName);
            }
            else if (TypeLibrary.hasGlobalType(typeName, ModelEnums.FTypeCategory.fObject)) {
                this.registerObjectType(typeName);
            }
            else if (TypeLibrary.hasGlobalType(typeName, ModelEnums.FTypeCategory.fClass | ModelEnums.FTypeCategory.fEvent)) {
                this.registerClassType(typeName);
            }
        };
        /**
         * The callback on the type library register/update local custom event.
         * Only local object type is handled for now.
         * TODO: si le graph context exist sur l'editeur, faire un check du graph context!
         * TODO: passer la reference de l'editeur dans la method initialize pour avoir acces au graph context apres!
         * @private
         * @param {Events.TypeLibraryRegisterLocalCustomEvent|Events.TypeLibraryUpdateLocalCustomEvent} event - The type library register/update local custom event.
         */
        UITypesCatalog.prototype.onTypeLibraryRegisterLocalCustom = function (event) {
            var typeName = event.getName();
            var graphContext = event.getGraphContext();
            this.registerObjectType(typeName, graphContext);
        };
        /**
         * Registers all supported types.
         * @private
         */
        UITypesCatalog.prototype.registerTypes = function () {
            this.registerBaseTypes();
            this.registerEnumTypes();
            this.registerObjectTypes();
            this.registerClassTypes();
        };
        /**
         * Registers base types representation into the type representation factory.
         * @private
         */
        UITypesCatalog.prototype.registerBaseTypes = function () {
            var _this = this;
            this._typeRepFactory.registerTypeRepresentations(UIBaseTypes);
            var baseTypeNameList = TypeLibrary.getGlobalTypeNameList(ModelEnums.FTypeCategory.fBase);
            baseTypeNameList.forEach(function (baseTypeName) { return _this.registerArrayType(baseTypeName); });
        };
        /**
         * Registers enumeration types representation into the type representation factory.
         * @private
         */
        UITypesCatalog.prototype.registerEnumTypes = function () {
            var _this = this;
            var enumTypeNameList = TypeLibrary.getGlobalTypeNameList(ModelEnums.FTypeCategory.fEnum);
            enumTypeNameList.forEach(function (enumTypeName) { return _this.registerEnumType(enumTypeName); });
        };
        /**
         * Registers the given enumeration type representation into the type representation factory.
         * @private
         * @param {string} enumName - The enum type name.
         */
        UITypesCatalog.prototype.registerEnumType = function (enumName) {
            var enumType = TypeLibrary.getGlobalType(enumName);
            // Filter TypeScript number enums reverse mapping!
            /*const numberEnumKeys = Object.keys(enumType).filter(key => !Number.isNaN(key));
            if (numberEnumKeys.length > 0) {
                let numberEnum: object = {};
                numberEnumKeys.forEach(key => { numberEnum[enumType[key]] = key; });
                enumType = numberEnum;
            }*/
            this._typeRepFactory.registerEnum(enumName, enumType);
            this.registerArrayType(enumName);
        };
        /**
         * Registers object types into the type representation factory.
         * @private
         */
        UITypesCatalog.prototype.registerObjectTypes = function () {
            var _this = this;
            var objectTypeNameList = TypeLibrary.getGlobalTypeNameList(ModelEnums.FTypeCategory.fObject);
            objectTypeNameList.forEach(function (objectTypeName) { return _this.registerObjectType(objectTypeName); });
        };
        /**
         * Registers the given object type into the type representation factory.
         * @private
         * @param {string} objectName - The object type name.
         * @param {GraphBlock} [graphContext] - The graph context.
         */
        UITypesCatalog.prototype.registerObjectType = function (objectName, graphContext) {
            var objectType = TypeLibrary.getType(graphContext, objectName);
            var children = UITypesCatalog.parseChildrenTypes(objectType);
            var typeRepresentations = {};
            typeRepresentations[objectName] = {
                inlinedTemplate: 'objectinline',
                stdTemplate: 'object',
                children: children,
                semantics: {
                    augmentedDisplay: 'dialog',
                    typeDisplayFlag: true,
                    dialogOptions: {
                        modalFlag: true,
                        width: 800,
                        height: 500,
                        title: objectName + ' Editor',
                        icon: 'pencil'
                    },
                    configuration: objectType
                }
            };
            // Removing previous entry from the typeRepFactory
            delete this._typeRepFactory.typeReps[objectName];
            delete this._typeRepFactory.typeReps['Array<' + objectName + '>'];
            this._typeRepFactory.registerTypeRepresentations(typeRepresentations);
            this.registerArrayType(objectName);
        };
        /**
         * Registers class types into the type representation factory.
         * @private
         */
        UITypesCatalog.prototype.registerClassTypes = function () {
            var _this = this;
            var classTypeNameList = TypeLibrary.getGlobalTypeNameList(ModelEnums.FTypeCategory.fClass | ModelEnums.FTypeCategory.fEvent);
            classTypeNameList.forEach(function (classTypeName) { return _this.registerClassType(classTypeName); });
        };
        /**
         * Registers the given class type into the type representation factory.
         * @private
         * @param {string} className - The class type name.
         */
        UITypesCatalog.prototype.registerClassType = function (className) {
            var classType = TypeLibrary.getGlobalType(className);
            var children = UITypesCatalog.parseChildrenTypes(classType.descriptor);
            var typeRepresentations = {};
            typeRepresentations[className] = {
                inlinedTemplate: 'objectinline',
                stdTemplate: 'object',
                children: children
            };
            this._typeRepFactory.registerTypeRepresentations(typeRepresentations);
            this.registerArrayType(className);
        };
        /**
         * Registers array types into the type representation factory.
         * @private
         * @param {string} valueTypeName - The value type name.
         */
        UITypesCatalog.prototype.registerArrayType = function (valueTypeName) {
            var arrayValueTypeName = 'Array<' + valueTypeName + '>';
            var typeRepresentations = {};
            typeRepresentations[arrayValueTypeName] = {
                stdTemplate: 'array',
                inlinedTemplate: 'array',
                semantics: {
                    valueType: valueTypeName
                }
            };
            this._typeRepFactory.registerTypeRepresentations(typeRepresentations);
        };
        /**
         * Parses the children of the given parent type.
         * @private
         * @static
         * @param {Object} parentType - The parent type.
         * @returns {Object} The children type paths.
         */
        UITypesCatalog.parseChildrenTypes = function (parentType) {
            var children = {};
            for (var propertyName in parentType) {
                if (parentType.hasOwnProperty(propertyName)) {
                    var property = parentType[propertyName];
                    var typePath = '#' + property.type;
                    children[propertyName] = typePath;
                }
            }
            return children;
        };
        /**
         * Gets the object type representation configuration.
         * @private
         * @param {Object} configuration - The input and output configuration.
         * @param {Object} objectValue - The object value.
         * @param {string} [parentName] - The optionnal parent name.
         */
        /*private getObjectConfiguration(configuration: object, objectValue: object, parentName?: string): void {
            for (let propertyName in objectValue) {
                if (objectValue.hasOwnProperty(propertyName)) {
                    const propertyValue = objectValue[propertyName];
                    const configPropertyName = parentName !== undefined ? parentName + '.' + propertyName : propertyName;
                    if (typeof propertyValue === 'number') {
                        configuration[configPropertyName] = { type: 'Double' };
                    } else if (typeof propertyValue === 'boolean') {
                        configuration[configPropertyName] = { type: 'Boolean' };
                    } else if (typeof propertyValue === 'string') {
                        configuration[configPropertyName] = { type: 'String' };
                    } else if (typeof propertyValue === 'object') {
                        configuration[configPropertyName] = { type: 'Object' };
                        this.getObjectConfiguration(configuration, propertyValue, configPropertyName);
                    }
                }
            }
        }*/
        /**
         * Checks if the given value type is an array of enumeration.
         * @private
         * @static
         * @param {string} valueType - The value type.
         * @returns {boolean} True if the given value type is an array of enumeration else false.
         */
        UITypesCatalog.isArrayEnumType = function (valueType) {
            var arrayValueType = TypeLibrary.getArrayValueTypeName(valueType);
            return arrayValueType !== undefined ? TypeLibrary.hasGlobalType(arrayValueType, ModelEnums.FTypeCategory.fEnum) : false;
        };
        /**
         * Checks if the given value type is an enumeration.
         * @private
         * @static
         * @param {string} valueType - The value type.
         * @returns {boolean} True if the given value type is an enumeration else false.
         */
        UITypesCatalog.isEnumType = function (valueType) {
            return TypeLibrary.hasGlobalType(valueType, ModelEnums.FTypeCategory.fEnum);
        };
        /**
         * Gets the enumeration string value.
         * @private
         * @static
         * @param {string} valueType - The value type.
         * @param {*} value - The enumeration value.
         * @returns {string} The enumeration string value.
         */
        UITypesCatalog.getEnumStringValue = function (valueType, value) {
            var stringValue;
            var enumType = TypeLibrary.getGlobalType(valueType);
            if (enumType !== undefined) {
                for (var p in enumType) {
                    if (enumType.hasOwnProperty(p) && enumType[p] === value) {
                        stringValue = p;
                        break;
                    }
                }
            }
            return stringValue;
        };
        /**
         * Gets the array of enumeration string value.
         * @private
         * @static
         * @param {string} valueType - The value type.
         * @param {*} value - The array of enumeration value.
         * @returns {string} The array of enumeration string value.
         */
        UITypesCatalog.getArrayEnumStringValue = function (valueType, value) {
            var result = '';
            var arrayValueType = TypeLibrary.getArrayValueTypeName(valueType);
            if (arrayValueType !== undefined && Array.isArray(value)) {
                result += '[';
                for (var i = 0; i < value.length; i++) {
                    result += UITypesCatalog.getEnumStringValue(arrayValueType, value[i]);
                    if (i < value.length - 1) {
                        result += ', ';
                    }
                }
                result += ']';
            }
            return result;
        };
        return UITypesCatalog;
    }());
    return UITypesCatalog;
});
