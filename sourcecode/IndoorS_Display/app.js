//Reference to Firebase





new Vue({
    el: "#showDevice",
    data: {
        device: '',
        search: '',
        rawData: [],
        cCompleteDevice: [],
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
                    for (j = 0; j < this.cCompleteDevice.length; j++) {
                        if (this.rawData[i][0] == this.cCompleteDevice[j][0]) {
                            alreadyExisted = true;
                            this.cCompleteDevice.splice(j, 1)


                            //console.log("alreadyExisted Pushhhh")
                            var singleObj = [];
                            singleObj[0] = this.rawData[i][0];
                            singleObj[1] = this.rawData[i][2];
                            singleObj[2] = this.rawData[i + 1][2];
                            singleObj[3] = this.rawData[i + 2][2];
                            this.cCompleteDevice.push(singleObj);
                            j = j + 2;
                        }

                    }
                    if (!alreadyExisted) {
                        var singleObj = [];
                        singleObj[0] = this.rawData[i][0];
                        singleObj[1] = this.rawData[i][2];
                        singleObj[2] = this.rawData[i + 1][2];
                        singleObj[3] = this.rawData[i + 2][2];
                        this.cCompleteDevice.push(singleObj);
                        //console.log("New Pushhhh")
                        i = i + 2;
                    }
                }
                this.calculateRSSI()
            }
            // for (i = 0; i < this.rawData.length - 2; i++) {
            //     if (this.rawData[i][0] == this.rawData[i + 1][0] && this.rawData[i + 1][0] == this.rawData[i + 2][0]) {
            //         for (j = 0; j < this.cCompleteDevice.length; j++) {
            //             if (this.rawData[i][0] == this.cCompleteDevice[j][0]) {
            //                 alreadyExisted = true;
            //                 this.cCompleteDevice.splice(j, 3)

            //                 this.cCompleteDevice.push(this.rawData[i])
            //                 this.cCompleteDevice.push(this.rawData[i + 1])
            //                 this.cCompleteDevice.push(this.rawData[i + 2])
            //                 //console.log("alreadyExisted Pushhhh")
            //                 j = j + 2;
            //             }

            //         }
            //         if (!alreadyExisted) {
            //             this.cCompleteDevice.push(this.rawData[i])
            //             this.cCompleteDevice.push(this.rawData[i + 1])
            //             this.cCompleteDevice.push(this.rawData[i + 2])
            //             //console.log("New Pushhhh")
            //             i = i + 2;
            //         }
            //     }
            //     this.calculateRSSI()
            // }

        },
        calculateRSSI: function () {
            measuredPower = -52 //RSSI per 1 meter
            nRange = 1 //noise from 2 to 4
            for (let i = 0; i < this.cCompleteDevice.length; i++) {
                let d = Math.pow(10, (measuredPower - this.cCompleteDevice[i][2]) / (10 * nRange));
                //let d = ( this.cCompleteDevice[i][2] + 1.82 - measuredPower )/1.77
                //let d = Math.pow(10,     (this.cCompleteDevice[i][2] + 7.36 - measuredPower)/(2.6*10*nRange) );
                this.cCompleteDevice[i][4] = d
                //console.log(d)
            }
        },
        filteredList() {
            return this.postList.filter(post => {
                return this.cCompleteDevice[0].toLowerCase().includes(this.search.toLowerCase())
            })
        }


    },



    created() {


        this.startTimeFilter = Math.round(Date.now() / 1000) - 60;
        // .orderByChild('time').startAt(this.startTimeFilter)
        //HERE  
        dataRef.orderByChild('time').startAt(this.startTimeFilter).on('child_added', snapshot => {
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
                    // new splint comes in -> replace immediately
                    if (this.rawData[foundIndex][3] < snapshot.val().time) {
                        this.rawData[foundIndex][2] = snapshot.val().rssi;
                        this.rawData[foundIndex][3] = snapshot.val().time;

                        //in same splint ->> replace with less RSSI
                    } else if (this.rawData[foundIndex][3] = snapshot.val().time) {
                        // less RSSI
                        if (this.rawData[foundIndex][2] < snapshot.val().rssi) {
                            //replace RSSI and TIME
                            this.rawData[foundIndex][2] = snapshot.val().rssi;
                            this.rawData[foundIndex][3] = snapshot.val().time;
                        }

                    }




                }
            }
        });




        setInterval(() => {
            this.lastMinFilter = Math.round(Date.now() / 1000) - 60;
        }, 200);
        setInterval(() => {
            for (i = 0; i < this.rawData.length; i++) {
                if (this.rawData[i][3] <= this.lastMinFilter) {
                    this.rawData.splice(i, 1);
                }
            }
            // for (i = 0; i < this.cCompleteDevice.length; i++) {
            //     if (this.cCompleteDevice[i][3] <= this.lastMinFilter) {
            this.cCompleteDevice.splice(0, this.cCompleteDevice.length)

            //     }
            // }
            this.rawData.sort();
            this.Draft();

        }, 500);
    }
})