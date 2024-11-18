document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('ascvdForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // 获取用户输入
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseInt(document.getElementById('age').value);
        const totalCholesterol = parseFloat(document.getElementById('totalCholesterol').value);
        const hdlCholesterol = parseFloat(document.getElementById('hdlCholesterol').value);
        const bloodPressure = parseFloat(document.getElementById('bloodPressure').value);
        const isSmoker = document.getElementById('isSmoker').checked;
        const hasDiabetes = document.getElementById('hasDiabetes').checked;
        const hasFamilyHistory = document.getElementById('hasFamilyHistory').checked;

        // 计算ASCVD风险
        const risk = calculateAscvdRisk(gender, age, totalCholesterol, hdlCholesterol, bloodPressure, isSmoker, hasDiabetes, hasFamilyHistory);

        // 显示结果
        document.getElementById('result').innerText = `10年ASCVD风险: ${risk.toFixed(2)}%`;
    });
});

function calculateAscvdRisk(gender, age, totalCholesterol, hdlCholesterol, bloodPressure, isSmoker, hasDiabetes, hasFamilyHistory) {
    // 这里实现Pooled Cohort Equations方程
    // 由于方程比较复杂，这里仅提供一个简化的示例计算
    let risk = 0;

    // 根据性别调整风险
    if (gender === 'male') {
        risk += 10;
    } else {
        risk += 5;
    }

    // 根据年龄调整风险
    risk += age * 0.5;

    // 根据胆固醇水平调整风险
    risk += (totalCholesterol - 200) * 0.1;
    risk -= hdlCholesterol * 0.2;

    // 根据血压调整风险
    risk += (bloodPressure - 120) * 0.1;

    // 根据其他因素调整风险
    if (isSmoker) risk += 10;
    if (hasDiabetes) risk += 15;
    if (hasFamilyHistory) risk += 5;

    // 确保风险在合理范围内
    return Math.max(0, Math.min(100, risk));
}
