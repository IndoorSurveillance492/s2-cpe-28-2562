//Reference to Firebase





new Vue({
    el: "#showDevice",
    data: {
        device: '',
        rawData: [],
        completeDevice: [],
        startTimeFilter: 0,
        lastMinFilter: 0
    },
    methods: {
        yutt: function () {
            console.log(this.rawData)
        },
        Draft: function () {

            Boolean: foundMatch = false;
            Boolean: alreadyExisted = false;

            for (i = 0; i < this.rawData.length - 2; i++) {
                if (this.rawData[i][0] == this.rawData[i + 1][0] && this.rawData[i + 1][0] == this.rawData[i + 2][0]) {
                    for (j = 0; j < this.completeDevice.length; j++) {
                        if (this.rawData[i][0] == this.completeDevice[j][0]) {
                            alreadyExisted = true;
                            this.completeDevice.splice(j, 3)

                            this.completeDevice.push(this.rawData[i])
                            this.completeDevice.push(this.rawData[i + 1])
                            this.completeDevice.push(this.rawData[i + 2])
                            //console.log("alreadyExisted Pushhhh")
                            j = j + 2;
                        }
                        
                    }
                    if (!alreadyExisted) {
                        this.completeDevice.push(this.rawData[i])
                        this.completeDevice.push(this.rawData[i + 1])
                        this.completeDevice.push(this.rawData[i + 2])
                        //console.log("New Pushhhh")
                        i = i + 2;
                    }
                }
                
            }

        },
        
        max: function () {
            var mins = this.selectedArray[0]
            for (var i = 0; i < this.selectedArray.length; i++) {
                if (this.selectedArray[i] < this.selectedArray[i + 1]) {
                    mins = this.selectedArray[i + 1]
                }
            }
            return mins
        },
        mean: function () {
            var total = 0

            for (var i = 0; i < this.selectedArray.length; i += 1) {
                total += this.selectedArray[i];
            }
            return total / this.selectedArray.length;
        },
        median: function () {
            var median = 0
            var numsLen = this.selectedArray.length;
            this.selectedArray.sort();

            if (
                numsLen % 2 === 0 // is even
            ) {
                // average of two middle numbers
                median = (this.selectedArray[numsLen / 2 - 1] + this.selectedArray[numsLen / 2]) / 2;
            } else { // is odd
                // middle number only
                median = this.selectedArray[(numsLen - 1) / 2];
            }
            return median;
        },

    },
    

    created() {


        this.startTimeFilter = Math.round(Date.now() / 1000) - 60;
        // orderByChild('time').startAt(this.startTimeFilter).
        dataRef.on('child_added', snapshot => {
            if (this.rawData.length <= 0) {
                var singleObj = [];
                singleObj[0] = snapshot.val().mac;
                singleObj[1] = snapshot.val().node;
                singleObj[2] = snapshot.val().rssi;
                singleObj[3] = snapshot.val().time;
                this.rawData.push(singleObj);
                //console.log("count " + this.rawData.length + " " + snapshot.val().mac)
            } else {
                Boolean: foundSameData = false;
                Boolean: compareThisData = false;
                foundIndex = 0;
                for (var i = 0; i < this.rawData.length; i++) {
                    if (this.rawData[i][0] == snapshot.val().mac && this.rawData[i][1] == snapshot.val().node) {
                        //console.log("Found " + snapshot.val().mac + " in NODE" + snapshot.val().node + " is already existed")
                        foundSameData = true;
                        foundIndex = i;
                        //console.log("compare HERE")
                        break;
                    }
                }
                if (!foundSameData) {
                    var singleObj = [];
                    singleObj[0] = snapshot.val().mac;
                    singleObj[1] = snapshot.val().node;
                    singleObj[2] = snapshot.val().rssi;
                    singleObj[3] = snapshot.val().time;
                    this.rawData.push(singleObj);
                    //console.log("count " + this.rawData.length + " " + snapshot.val().mac)
                } else {
                    if (this.rawData[foundIndex][2] < snapshot.val().rssi) {
                        //replace RSSI and TIME
                        this.rawData[foundIndex][2] = snapshot.val().rssi;
                        this.rawData[foundIndex][3] = snapshot.val().time;
                    }
                }
            }
        });

        setInterval(() => {
            this.lastMinFilter = Math.round(Date.now() / 1000) - 60;
        }, 1000);
        setInterval(() => {
            for (i = 0; i < this.rawData.length; i++) {
                if (this.rawData[i][3] <= this.lastMinFilter) {
                    //this.rawData.splice(i, 1);
                }
            }
            for (i = 0; i < this.completeDevice.length; i++) {
                if (this.completeDevice[i][3] <= this.lastMinFilter) {
                    //this.completeDevice.splice(0, this.completeDevice.length)
                }
            }
            this.rawData.sort();
            this.Draft();

        }, 500);
    }
})