/// <amd-module name='DS/EPSSchematicsPlay/EPSLoopManager'/>
define("DS/EPSSchematicsPlay/EPSLoopManager", ["require", "exports", "DS/EPSSchematicsPlay/typings/EPTaskPlayer/EPTaskPlayer", "DS/EPSSchematicsPlay/typings/EPTaskPlayer/EPPlayerContext", "DS/EP/EP"], function (require, exports, EPTaskPlayer, EPPlayerContext, EP) {
    "use strict";
    /* eslint-enable no-unused-vars */
    /**
     * This class defines the loop manager that will execute the specified engines task loop.
     * @class EPSLoopManager
     * @alias module:DS/EPSSchematicsPlay/EPSLoopManager
     * @private
     */
    var EPSLoopManager = /** @class */ (function () {
        /**
         * @constructor
         */
        function EPSLoopManager() {
            this._executeCBListener = this.executeCB.bind(this);
            this._previousTime = 0.0;
            this._elapsedTime = 0.0;
            this._deltaTime = 0.0;
            this._tasks = [];
        }
        /**
         * Adds an engine task to the task player.
         * @param {EPTask} task - The engine task to register.
         * @public
         */
        EPSLoopManager.prototype.registerTask = function (task) {
            if (task !== undefined && task !== null) {
                this._tasks.push(task);
                EPTaskPlayer.addTask(task);
            }
        };
        /**
         * Removes all the tasks from the task player.
         * @private
         */
        EPSLoopManager.prototype.unregisterTasks = function () {
            for (var i = 0; i < this._tasks.length; i++) {
                EPTaskPlayer.removeTask(this._tasks[i]);
            }
            this._tasks = [];
        };
        /**
         * Starts the task player.
         * @private
         */
        EPSLoopManager.prototype.start = function () {
            if (EPTaskPlayer.getPlayState() === EP.Task.EPlayState.eStopped) {
                this._previousTime = Date.now();
                this._elapsedTime = 0.0;
                this._deltaTime = 0.0;
                EPTaskPlayer.start();
                this.execute();
            }
        };
        /**
         * Resumes the task player.
         * @private
         */
        EPSLoopManager.prototype.resume = function () {
            if (EPTaskPlayer.getPlayState() === EP.Task.EPlayState.ePaused) {
                EPTaskPlayer.resume();
                this.execute();
            }
        };
        /**
         * Pauses the task player.
         * @private
         */
        // eslint-disable-next-line class-methods-use-this
        EPSLoopManager.prototype.pause = function () {
            if (EPTaskPlayer.getPlayState() === EP.Task.EPlayState.eExecuted) {
                EPTaskPlayer.pause();
            }
        };
        /**
         * Stops the task player.
         * @private
         */
        EPSLoopManager.prototype.stop = function () {
            EPTaskPlayer.stop();
            window.cancelAnimationFrame(this._currentRequestID);
            this.unregisterTasks();
        };
        /**
         * Executes the task player.
         * @private
         */
        EPSLoopManager.prototype.execute = function () {
            this._currentRequestID = window.requestAnimationFrame(this._executeCBListener);
        };
        /**
         * The callback to the execution of the task player.
         * @private
         */
        EPSLoopManager.prototype.executeCB = function () {
            var playState = EPTaskPlayer.getPlayState();
            if (playState === EP.Task.EPlayState.eExecuted || playState === EP.Task.EPlayState.eStarted || playState === EP.Task.EPlayState.eResumed) {
                var currentTime = Date.now();
                this._deltaTime = currentTime - this._previousTime;
                this._previousTime = currentTime;
                this._elapsedTime += this._deltaTime;
                var playerContext = new EPPlayerContext();
                playerContext.deltaTime = this._deltaTime;
                playerContext.elapsedTime = this._elapsedTime;
                EPTaskPlayer.execute(playerContext);
                this._currentRequestID = window.requestAnimationFrame(this._executeCBListener);
            }
        };
        return EPSLoopManager;
    }());
    return EPSLoopManager;
});
