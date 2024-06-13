
define('DS/StuCore/StuProfilingObjectNa', ['StuCore/StuContext'], function (STU) {
	'use strict';

	/**
	 * Class which allow to profile a code section
	 *
	 * This object can be created through its constructor or through the profiling manager.
	 * However, if you directly use this constructor instead of the manager, you will have no way to know if the created
	 * profiling object is valid (for example, if the given name was already used for another object, it won't be valid).
	 *
	 * This profiling object V6 frame version will call the C++ CATICXPProfilingManager.
	 *
	 * @class 
	 * @private
	 * @constructor
	 * @param {string} iProfilingName, the profiling object name
	 */
	var ProfilingObject = function (iProfilingName) {
		var pm = STU.ProfilingManager.getInstance();

		this.name = (typeof (iProfilingName) === "string" && !(iProfilingName in pm.profilingObjects)) ? iProfilingName : "";
		this.profilingObj = (this.name.length > 0) ? new StuESProfilingObject(iProfilingName) : null;
		if (!this.profilingObj.IsValid())
			this.profilingObj = null;
		if (null !== this.profilingObj)
			pm.profilingObjects[this.name] = this;
	};

	ProfilingObject.prototype.constructor = ProfilingObject;

	/**
	 * Method used to start a section profiling
	 *
	 * @method startSectionProfiling
	 * @private
	 * @return {boolean} return if true this call was done (section profiling was not already started and this object is valid)
	 */
	ProfilingObject.prototype.startSectionProfiling = function () {
		return (null !== this.profilingObj) ? this.profilingObj.StartSectionProfiling() : false;
	};

	/**
   * Method used to pause a section profiling
   *
   * @method pauseSectionProfiling
   * @private
   * @return {boolean} return if true this call was done (section profiling was started and not already paused)
   */
	ProfilingObject.prototype.pauseSectionProfiling = function () {
		return (null !== this.profilingObj) ? this.profilingObj.PauseSectionProfiling() : false;
	};

	/**
   * Method used to unpause a section profiling
   *
   * @method unpauseSectionProfiling
   * @private
   * @return {boolean} return if true this call was done (section profiling was started and paused)
   */
	ProfilingObject.prototype.unpauseSectionProfiling = function () {
		return (null !== this.profilingObj) ? this.profilingObj.UnpauseSectionProfiling() : false;
	};

	/**
   * Method used to stop a section profiling
   * If this call has succeeded, the section profiling results could be seen through the C++ CATICXPProfilingManager.
   *
   * @method stopSectionProfiling
   * @private
   * @return {boolean} return if true this call was done (section profiling was started)
   */
	ProfilingObject.prototype.stopSectionProfiling = function () {
		return (null !== this.profilingObj) ? this.profilingObj.StopSectionProfiling() : false;
	};

	/**
   * Method used to invalidate this object and to remove it from the profiling manager
   *
   * @method dispose
   * @private
   */
	ProfilingObject.prototype.dispose = function () {
		if (null !== this.profilingObj) {
			this.profilingObj.DeleteProfilingObject();
			this.profilingObj = null;
		}

		var pm = STU.ProfilingManager.getInstance();
		if (this.name in pm.profilingObjects)
			delete pm.profilingObjects[this.name];
	};

	// Expose in STU namespace.
	STU.ProfilingObject = ProfilingObject;

	return ProfilingObject;
});
