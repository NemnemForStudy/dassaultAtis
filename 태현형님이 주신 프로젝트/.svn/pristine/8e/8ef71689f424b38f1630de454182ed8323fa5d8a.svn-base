/////////////////////////////////////////////
// Classes definition
//////////////////////////////////////////////
define("DS/XCityWorkers/WorkerPool", ['UWA/Class', 'DS/XCityTools/Debug'], function (UWAClass, Debug) {
    "use strict";

    /*--private
     * This is the description for the WorkerPool class.
     *
     * Itmanages a pool of web workers
     *
     * @class WorkerPool
     * @extends UWA.Class
     * @module UrbanWorkers
     */
    var WorkerPool = UWA.Class.extend({
        /*
         * @constructor
         * @private
         * @param {Urban} urban   Urban main element.
         */
        init: function (urban, workerURL, nbMaxWorkers, initMessage) {
            this.urban = urban;
            this.nbMaxWorkers = nbMaxWorkers;
            Debug.log('Workers enabled.');
            this._workers = [];
            this._assignTaskToWorker = 0;

            for (var i = 0; i < nbMaxWorkers; i++) {
                this._workers.push(new Worker(workerURL));
                this._workers[i].usage = 0;
                this._workers[i].session = [];

                if (initMessage !== undefined) {
                    this._workers[i].postMessage(initMessage);
                }
            }
        },


        postMessage: function(message){

            var w = null;
            var that = this;
            //Debug.log('worker ' + this._assignTaskToWorker);
            var w = this._workers[this._assignTaskToWorker];
          
            w.usage++;
            //Debug.log('worker usage ' + w.usage);
         //   Debug.log('Assign task to worker ', this._assignTaskToWorker);
          //  w.session.push(session);

            w.postMessage(message);

            this._assignTaskToWorker = (this._assignTaskToWorker + 1) % (this.nbMaxWorkers);
           // Debug.log('Assign task to worker ', this._assignTaskToWorker);
          


/*
             // assign Task To a FREE Worker
            if (this._workers.length > 0) {
                var w = this._workers.pop();
                Debug.log('Asssign to ', this.nbMaxWorkers - 1 - this._workers.length);
                w.usage = 1;
                w.postMessage(message);

            } else {
                Debug.log('NO WORKER AVAILABLE');
                //retry until a free worker has been found
            /*    setTimeout(function () {
                    that.postMessage(message);
                }, 100); *

                // assign Task To an already OCCUPIED Worker
                var w = this._workers[this._assignTaskToWorker];
                w.usage++;
                this._assignTaskToWorker = (this._assignTaskToWorker + 1) % (this.nbMaxWorkers - 1);
                Debug.log('Re-asssign to ', this._assignTaskToWorker);
            }
        */
           

            return w;
        },
        available: function (worker) {

            worker.usage--;
            return;
         //   var s = worker.session.pop();
          //  return s;
            // re-add a worker in the list of available workers
            // dot not push the same worker twice if two or more tasks were assigned to his worker
            if (worker.usage === 1) {
                this._workers.push(worker);
                Debug.log('worker available ! ');
            } else {
                worker.usage--;
                Debug.log('worker has ' + worker.usage + ' task(s)');
            }
        },
        terminate: function () {
            for (var i = 0; i < nbMaxWorkers; i++) {
                this._workers[i].terminate();
            }
        }

    });

    return WorkerPool;
});
