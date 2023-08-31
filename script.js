let isUS = false;
let BMI;
let isValid;

function changeUnits(id) {
    const usContainer = document.getElementById("us-container");
    const metricContainer = document.getElementById("metric-container");
    
    if (id === "unitsUS") {
        usContainer.style.visibility = "visible";
        metricContainer.style.visibility = "hidden";
        isUS = true;
        resetFields();
    } else if (id === "unitsCM") {
        usContainer.style.visibility = "hidden";
        metricContainer.style.visibility = "visible";
        isUS = false;
        resetFields();
    }
}

function resetFields() {
    ageUS = heightFT = heightIN = weightUS = age = height = weight = "";
}

function calculateBMI() {
    isValid = true;

    if (isUS) {
        ageUS = getValue("ageUS");
        heightFT = getValue("heightFT");
        heightIN = getValue("heightIN");
        weightUS = getValue("weightUS");

        validateFields([heightFT, heightIN, weightUS, ageUS]);
        
        if (!isValid) {
            return;
        }

        const heightUS = heightFT * 12 + parseInt(heightIN);
        BMI = 703 * (weightUS / Math.pow(heightUS, 2));

        displayResult("result-textUS", BMI);
    } else {
        age = getValue("age");
        height = getValue("height");
        weight = getValue("weight");

        validateFields([height, weight, age]);

        if (!isValid) {
            return;
        }

        BMI = weight / Math.pow(height / 100, 2);

        displayResult("result-text", BMI);
    }

    getColorForBMI();
}

function getValue(id) {
    return document.getElementById(id).value;
}

function validateFields(fields) {
    for (const field of fields) {
        if (field === "" || isNaN(field) || parseFloat(field) <= 0) {
            showAlert("All fields must be positive numeric values.");
            isValid = false;
            break;
        }
    }
    
    if (isValid && isUS && parseFloat(ageUS) < 2) {
        showAlert("Age must be greater than 1.");
        isValid = false;
    }
    if (isValid && parseFloat(age) < 2) {
        showAlert("Age must be greater than 1.");
        isValid = false;
    }
}

function showAlert(message) {
    alert(message);
}

function displayResult(elementId, value) {
    document.getElementById(elementId).innerText = `Your BMI: ${value.toFixed(1)}`;
    const color = getColorForBMI(value);
    document.getElementById(elementId).style.color = color;
}

function getColorForBMI(bmi) {
    if (bmi < 18.5) {
        return "blue";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return "green";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        return "yellow";
    } else {
        return "red";
    }
}