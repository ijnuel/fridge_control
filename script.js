let data;
// data = {
//     "power_down_time": new Date().toLocaleTimeString(),
//     "power_up_time": new Date().toLocaleTimeString(),
//     "primary_switch": 1,
//     "secondary_switch": 1
// };

$(document).ready(function() {
    setTimeout(function() {
        runChecks();
    }, 5000)
    rootRef.orderByKey().limitToLast(1).on("value", function(snapshot) {

        data = snapshot.val().values;
        $('#power_down_time').val(data.power_down_time);
        $('#power_up_time').val(data.power_up_time);
        $('#secondary_switch')[0].checked = data.secondary_switch;
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});

$('#updateButton').click(function() {
    if (this.innerHTML == 'Edit') {
        this.innerHTML = 'Save';
        $('#power_down_time')[0].disabled = false;
        $('#power_up_time')[0].disabled = false;
        $('#secondary_switch')[0].disabled = false;
    } else {
        this.innerHTML = 'Edit';
        updateData();
        $('#power_down_time')[0].disabled = true;
        $('#power_up_time')[0].disabled = true;
        $('#secondary_switch')[0].disabled = true;
    }
});

function updateData() {
    data.power_down_time = $('#power_down_time')[0].value;
    data.power_up_time = $('#power_up_time')[0].value;
    data.secondary_switch = $('#secondary_switch')[0].checked;
    console.log("updating")
    console.log(data)
    rootRef.child("values").set(data);
}

function runChecks() {
    setInterval(function() {
        console.log("interval")
        let currentValue = data.primary_switch;
        let currentTime = new Date().toTimeString();
        console.log(currentTime)
        data.primary_switch = currentTime >= data.power_up_time && currentTime <= data.power_down_time;
        if (currentValue !== data.primary_switch) {
            console.log("interval update")
            updateData();
        }
    }, 10000)
}