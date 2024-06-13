define(`DS/CfgEffectivityCommands/commands/CfgCommandUtilityCmd`, [], () => {
    'use strict';

    /**
     * @description addState private function is adding +1 to nbVariablity and children count of ConfigFeature as nbVariablityValue for state. nbVariablity is a Variant and Variability Group, nbVariablityValue is an Option and Variant Value.
     * Thanks to that method we can know how many VV & OP is present in XML.
     * @param featureXML feature from XML
     * @param state state an array with nbVariablity & nbVariablityValue values
     */
    const addState = (featureXML, state, variabilityArray) => {
        //Need to add unique Variability Feature Name for tacking
        let parentNodeName = featureXML.getAttribute('Name');
        if (variabilityArray.indexOf(parentNodeName) == -1) variabilityArray.push(parentNodeName);

        //Track all children object as Variablity Value which consists Option and Variant Value
        if (featureXML.children.length > 0) state.nbVariablityValue += featureXML.children.length;
    };

    return {
        /**
         * @param iXML XML Variant Effectivity expression.
         * @returns {{nbVariablity: number, nbVariablityValue: number, complex: number}} It returns how many Variablity, Variablity Value & complexity are present in XML expression
         */
        getTrackerInformation: (iXML) => {
            const state = {
                nbVariablity: 0,
                nbVariablityValue: 0,
                complex: 0,
            };

            //Default value for clear Effectivity operation.
            if (iXML === undefined || iXML === '') return state;

            const parser = new DOMParser();
            const xmlDocument = parser.parseFromString(iXML, 'text/xml');
            let variabilityArray = [];

            let Expressions = xmlDocument.getElementsByTagName('Expression');
            if (Expressions.length > 0) {
                let complexity = 0;
                let Contexts = Expressions[0].getElementsByTagName('Context');
                let contextLength = Contexts.length;
                for (let count = 0; count < contextLength; count++) {
                    //For False Effectivity, need to use default values
                    if (Contexts[count].childNodes.length == 1 && Contexts[count].childNodes[0].tagName === 'Boolean') {
                        continue;
                    } else {
                        let Combinations = Contexts[count].getElementsByTagName('OR');
                        if (Combinations != null && (Combinations.length == undefined || Combinations.length == 0)) {
                            Combinations = new Array();
                            Combinations[0] = Contexts[count];
                        }

                        complexity += Combinations[0].childNodes.length;

                        for (let counter = 0; counter < Combinations[0].childNodes.length; counter++) {
                            if (Combinations[0].childNodes[counter].tagName == 'Feature') {
                                let parentXML = Combinations[0].childNodes[counter];
                                addState(parentXML, state, variabilityArray);
                            } else {
                                let ANDnode = Combinations[0].childNodes[counter];
                                for (let innerCounter = 0; innerCounter < ANDnode.childNodes.length; innerCounter++) {
                                    if (ANDnode.tagName == 'NOT') {
                                        let parentXML = ANDnode.childNodes[innerCounter];
                                        addState(parentXML, state, variabilityArray);
                                    } else if (ANDnode.childNodes[innerCounter].tagName == 'NOT') {
                                        let parentXML = ANDnode.childNodes[innerCounter].childNodes[0];
                                        addState(parentXML, state, variabilityArray);
                                    } else {
                                        let parentXML = ANDnode.childNodes[innerCounter];
                                        addState(parentXML, state, variabilityArray);
                                    }
                                }
                            }
                        }
                    }
                }

                if (variabilityArray.length > 0) state.nbVariablity = variabilityArray.length;

                if (contextLength > 0) {
                    let averageComplexity = complexity / contextLength;
                    let complexityValue = Math.round(averageComplexity);
                    if (complexityValue > 1) state.complex = complexityValue;
                    else state.complex = 1;
                }
            }
            console.log(state);
            return state;
        },
    };
});
