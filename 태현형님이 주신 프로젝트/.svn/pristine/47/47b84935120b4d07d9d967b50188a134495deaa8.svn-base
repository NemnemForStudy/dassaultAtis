define("DS/MePreferencesUIBuilder/MePreferencesUIDataUtils", [

],
    function () {


        var UIJson = null;
        var nlsJSON = null;
        var preferenceValues = null;
        var enumValues = null;
        var rangeValues = null;
        var iconObj = null;


        var mePreferencesUIDataUtils = function () {
        };

        mePreferencesUIDataUtils.prototype.createDataUtils = function (UIJson, nlsJSON, preferenceValues, enumValues, rangeValues, iconObj, enumMap) {
            this.UIJson = UIJson;
            this.nlsJSON = nlsJSON;
            this.preferenceValues = preferenceValues;
            this.enumValues = enumValues;
            this.rangeValues = rangeValues;
            this.iconObj = iconObj;
            this.EnumMap = new Map();
        };

        mePreferencesUIDataUtils.prototype.getDataFromJsonResponse = function (dataCategoryStr, repositoryName, preferenceName, key) {
            let data = null;
            let dataCategory = null;
            if (dataCategoryStr === "enumValues") {
                dataCategory = this.enumValues;
            } else if (dataCategoryStr === "rangeValues") {
                dataCategory = this.rangeValues;
            } else if (dataCategoryStr === "preferenceValues") {
                dataCategory = this.preferenceValues;
            }

            if (dataCategory !== null) {
                for (let i = 0; i < dataCategory.repositories.length; i++) {
                    if (dataCategory.repositories[i].name === repositoryName) {
                        for (let j = 0; j < dataCategory.repositories[i].preferences.length; j++) {
                            if (dataCategory.repositories[i].preferences[j].name === preferenceName) {
                                data = dataCategory.repositories[i].preferences[j][key];
                                return data;
                            }
                        }
                    }
                }
            }
            return data;
        }

        return mePreferencesUIDataUtils;

    });
